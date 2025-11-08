import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getRequest } from '../../../../src/lib/storage';

export const dynamic = 'force-dynamic';

type ParamsPromise = Promise<{ id: string }>;

export async function generateMetadata({ params }: { params: ParamsPromise }): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Pedido ${id} — QloudSound Create`
  };
}

export default async function RequestDetail({ params }: { params: ParamsPromise }) {
  const { id } = await params;
  const request = await getRequest(id);
  if (!request) {
    notFound();
  }

  const items = [
    { label: 'Nombre / proyecto', value: request.name },
    { label: 'Email', value: request.email },
    { label: 'Estilo / género', value: request.style },
    { label: 'Descripción', value: request.description || '—' },
    { label: 'Archivo', value: request.filename || 'Sin archivo' },
    {
      label: 'Fecha',
      value: new Date(request.createdAt).toLocaleString('es-ES', {
        dateStyle: 'full',
        timeStyle: 'short'
      })
    },
    { label: 'Estado', value: request.status }
  ];

  return (
    <div className="min-h-screen bg-[#050506] px-6 py-10 text-white">
      <header className="mx-auto flex max-w-3xl items-center justify-between border-b border-white/10 pb-4">
        <h1 className="title text-3xl font-bold">Pedido #{id}</h1>
        <Link href="/admin/requests" className="text-sm text-[#2592d0] hover:underline">
          ← Volver a la lista
        </Link>
      </header>
      <main className="mx-auto mt-8 max-w-3xl space-y-4">
        {items.map((item) => (
          <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="text-xs uppercase tracking-[0.3em] text-white/50">{item.label}</div>
            <p className="mt-2 text-sm text-white/85">{item.value}</p>
          </div>
        ))}
      </main>
    </div>
  );
}
