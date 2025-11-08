import Head from 'next/head';
import Link from 'next/link';
import type { GetServerSideProps } from 'next';
import { findRequest, type StoredRequest } from '../../../src/lib/storage';

type Props = {
  request: StoredRequest;
};

export const getServerSideProps: GetServerSideProps<Props> = async ({ params }) => {
  const id = params?.id;
  if (typeof id !== 'string') {
    return { notFound: true };
  }
  const request = await findRequest(id);
  if (!request) {
    return { notFound: true };
  }
  return { props: { request } };
};

export default function RequestDetail({ request }: Props) {
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
    <>
      <Head>
        <title>Detalle pedido — QloudSound Create</title>
      </Head>
      <div className="min-h-screen bg-[#050506] px-6 py-10 text-white">
        <header className="mx-auto flex max-w-3xl items-center justify-between border-b border-white/10 pb-4">
          <h1 className="title text-3xl font-bold">Pedido #{request.id}</h1>
          <Link href="/admin/requests" className="text-sm text-[#2bb2ff] hover:underline">
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
    </>
  );
}
