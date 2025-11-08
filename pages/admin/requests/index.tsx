import Head from 'next/head';
import Link from 'next/link';
import type { GetServerSideProps } from 'next';
import { readRequests, type StoredRequest } from '../../../src/lib/storage';

// TODO: proteger con auth básica antes de producción.

type Props = {
  requests: StoredRequest[];
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const requests = await readRequests();
  const sorted = [...requests].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  return { props: { requests: sorted } };
};

export default function AdminRequestsPage({ requests }: Props) {
  return (
    <>
      <Head>
        <title>Admin — QloudSound Create</title>
      </Head>
      <div className="min-h-screen bg-[#050506] px-6 py-10 text-white">
        <header className="mx-auto flex max-w-5xl items-center justify-between border-b border-white/10 pb-4">
          <h1 className="title text-3xl font-bold">Pedidos</h1>
          <Link href="/#create-form" className="text-sm text-[#2bb2ff] hover:underline">
            ← Volver a Create
          </Link>
        </header>
        <main className="mx-auto mt-8 max-w-5xl overflow-x-auto">
          {requests.length === 0 ? (
            <p className="text-sm text-white/60">Aún no hay pedidos.</p>
          ) : (
            <table className="w-full text-left text-sm">
              <thead className="text-white/60">
                <tr>
                  <th className="border-b border-white/10 px-3 py-2">Nombre</th>
                  <th className="border-b border-white/10 px-3 py-2">Estilo</th>
                  <th className="border-b border-white/10 px-3 py-2">Fecha</th>
                  <th className="border-b border-white/10 px-3 py-2">Estado</th>
                  <th className="border-b border-white/10 px-3 py-2">Detalle</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((req) => (
                  <tr key={req.id} className="text-white/80">
                    <td className="border-b border-white/10 px-3 py-3">{req.name}</td>
                    <td className="border-b border-white/10 px-3 py-3">{req.style}</td>
                    <td className="border-b border-white/10 px-3 py-3">
                      {new Date(req.createdAt).toLocaleString('es-ES', {
                        dateStyle: 'medium',
                        timeStyle: 'short'
                      })}
                    </td>
                    <td className="border-b border-white/10 px-3 py-3 capitalize">{req.status.replace('_', ' ')}</td>
                    <td className="border-b border-white/10 px-3 py-3">
                      <Link href={`/admin/requests/${req.id}`} className="text-[#2bb2ff] hover:underline">
                        Ver
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </main>
      </div>
    </>
  );
}
