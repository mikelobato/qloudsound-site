import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import { type StoredRequest } from '../../src/lib/storage';

export const config = {
  api: {
    bodyParser: false
  }
};

type SimpleField = string | number | boolean | (string | number | boolean)[] | undefined | null;
type SimpleFields = Record<string, SimpleField>;

function fieldValue(field: SimpleField): string {
  if (field === undefined || field === null) return '';
  const value = Array.isArray(field) ? field[0] : field;
  return value === undefined || value === null ? '' : String(value);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const form = formidable({
      multiples: false,
      keepExtensions: true,
      filter: () => false
    });

  const fields = await new Promise<SimpleFields>((resolve, reject) => {
    form.parse(req, (err: any, formFields: Record<string, any>) => {
      if (err) return reject(err);
      resolve(formFields as SimpleFields);
    });
  });

    const honeypot = fieldValue(fields.website);
    if (honeypot) {
      return res.status(400).json({ error: 'Invalid submission' });
    }

    const name = fieldValue(fields.name);
    const email = fieldValue(fields.email);
    const style = fieldValue(fields.style);
    const description = fieldValue(fields.description);

    if (!name || !email || !style) {
      return res.status(400).json({ error: 'Missing required fields' });
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

    let notifyNote = "";
    try {
      await persistInD1(entry);
      notifyNote = "Guardado en D1";
    } catch (err) {
      console.error("D1 persist error", err);
      notifyNote = `Error D1: ${err instanceof Error ? err.message : String(err)}`;
    }

    await notifyTelegram(entry, notifyNote).catch(() => {});

    // TODO: Trigger DistroKid (or other) distribution API once track is approved.

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Request error', error);
    try {
      await notifyTelegram(
        { id: 'error', name: 'N/A', email: 'N/A', style: 'N/A', createdAt: new Date().toISOString(), status: 'pending' } as StoredRequest,
        `Fatal: ${error instanceof Error ? error.message : String(error)}`
      );
    } catch (_e) {
      console.error('Telegram fallback failed');
    }
    return res.status(500).json({ error: 'Internal server error' });
  }
}

const TELEGRAM_TOKEN = '8569580291:AAGmlcW72QooX00CCpEAE3sco7uA2NV6j2U';
const TELEGRAM_CHAT = '887525450';
const CF_ACCOUNT_ID = 'b7eb9a280f73e95d5d278026959c1a60';
const CF_D1_DATABASE_ID = '62930b15-a8a9-4863-bb42-374c5d7a6d8d';
const CF_D1_TOKEN = 'Ym59gOTHFK8U3lXyuHdGLJ9XVaypjaQw2OMlbwcI';

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

async function persistInD1(entry: StoredRequest) {
  if (!CF_ACCOUNT_ID || !CF_D1_DATABASE_ID || !CF_D1_TOKEN) return;
  await runD1(
    `CREATE TABLE IF NOT EXISTS requests (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      style TEXT NOT NULL,
      description TEXT,
      filename TEXT,
      created_at TEXT NOT NULL,
      status TEXT NOT NULL
    )`
  );

  await runD1(
    'INSERT OR REPLACE INTO requests (id, name, email, style, description, filename, created_at, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [entry.id, entry.name, entry.email, entry.style, entry.description ?? null, entry.filename ?? null, entry.createdAt, entry.status]
  );
}

async function runD1(sql: string, params: (string | null)[] = []) {
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${CF_ACCOUNT_ID}/d1/database/${CF_D1_DATABASE_ID}/query`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${CF_D1_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ sql, params })
    }
  );
  const data = await response.json();
  if (!response.ok || data.success === false) {
    throw new Error('D1 query failed');
  }
}
