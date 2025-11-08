import Link from 'next/link';
import type { Metadata } from 'next';
import { listRequests } from '../../../src/lib/storage';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Admin — QloudSound Create'
};

export default async function AdminRequestsPage() {
  const requests = await listRequests();

  return (
    <div className="min-h-screen bg-[#050506] px-6 py-10 text-white">
      <header className="mx-auto flex max-w-5xl items-center justify-between border-b border-white/10 pb-4">
        <h1 className="title text-3xl font-bold">Pedidos</h1>
        <Link href="/#create" className="text-sm text-[#2592d0] hover:underline">
          ← Volver
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
                    <Link href={`/admin/requests/${req.id}`} className="text-[#2592d0] hover:underline">
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
  );
}
