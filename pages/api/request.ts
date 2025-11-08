import { NextResponse, type NextRequest } from 'next/server';
import { listRequests, getRequest, saveRequest } from '../../src/lib/storage';
import type { StoredRequest } from '../../src/types/requests';

export const runtime = 'edge';

export default async function handler(req: NextRequest) {
  if (req.method === 'GET') {
    return handleGet(req);
  }
  if (req.method === 'POST') {
    return handlePost(req);
  }
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405, headers: { Allow: 'GET, POST' } });
}

async function handleGet(req: NextRequest) {
  const url = new URL(req.url);
  const id = url.searchParams.get('id');
  try {
    if (id) {
      const request = await getRequest(id);
      return NextResponse.json({ ok: true, request });
    }
    const requests = await listRequests();
    return NextResponse.json({ ok: true, requests });
  } catch (error) {
    console.error('GET /api/request failed', error);
    return NextResponse.json({ error: 'Failed to read requests' }, { status: 500 });
  }
}

async function handlePost(req: NextRequest) {
  let payload: Record<string, string> = {};
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 });
  }

  const honeypot = (payload.website ?? '').trim();
  if (honeypot) {
    return NextResponse.json({ error: 'Invalid submission' }, { status: 400 });
  }

  const name = (payload.name ?? '').trim();
  const email = (payload.email ?? '').trim();
  const style = (payload.style ?? '').trim();
  const description = (payload.description ?? '').trim();

  if (!name || !email || !style) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const entry: StoredRequest = {
    id: Date.now().toString(),
    name,
    email,
    style,
    description,
    filename: undefined,
    createdAt: new Date().toISOString(),
    status: 'pending'
  };

  // TODO: Integrate Udio/Mubert generation API before persisting final assets.

  let notifyNote = '';
  try {
    await saveRequest(entry);
    notifyNote = 'Guardado en D1';
  } catch (err) {
    console.error('D1 persist error', err);
    notifyNote = `Error D1: ${err instanceof Error ? err.message : String(err)}`;
  }

  await notifyTelegram(entry, notifyNote).catch((error) => {
    console.error('Telegram notify failed', error);
  });

  // TODO: Trigger DistroKid (or other) distribution API once track is approved.

  return NextResponse.json({ ok: true });
}

const TELEGRAM_TOKEN = '8569580291:AAGmlcW72QooX00CCpEAE3sco7uA2NV6j2U';
const TELEGRAM_CHAT = '887525450';

async function notifyTelegram(entry: StoredRequest, extra?: string) {
  if (!TELEGRAM_TOKEN || !TELEGRAM_CHAT) return;
  const lines = [
    '🆕 Nueva solicitud de canción',
    `• Nombre: ${entry.name}`,
    `• Email: ${entry.email}`,
    `• Estilo: ${entry.style}`,
    entry.description ? `• Descripción: ${entry.description}` : '',
    entry.filename ? `• Archivo: ${entry.filename}` : '',
    extra ? `• Notas: ${extra}` : ''
  ]
    .filter(Boolean)
    .join('\n');

  await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: TELEGRAM_CHAT,
      text: lines
    })
  });
}
