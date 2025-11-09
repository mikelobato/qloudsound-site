import type { Metadata } from "next"

type CatalogTrack = {
  id: string
  title: string
  status: "requested" | "published"
  isrc?: string
  upc?: string
  submittedAt: string
}

const texts = {
  en: {
    badge: "Catalog",
    heading: "Published Tracks",
    subheading: "Internal-only view with ISRC/UPC identifiers for every track we've released to streaming platforms.",
  },
  es: {
    badge: "Catálogo",
    heading: "Canciones Publicadas",
    subheading: "Vista interna con identificadores ISRC/UPC de cada tema que hemos lanzado en plataformas de streaming.",
  },
}

async function fetchCatalog(): Promise<CatalogTrack[]> {
  const response = await fetch("https://api.qloudsound.com/public-site/catalog", {
    next: { revalidate: 3600 },
  })

  if (!response.ok) {
    throw new Error("Failed to load catalog")
  }

  const data = (await response.json()) as { tracks: CatalogTrack[] }
  return data.tracks
}

export const metadata: Metadata = {
  title: "QloudSound Catalog",
  description: "Tracks published by QloudSound across major streaming platforms.",
}

export default async function CatalogPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const locale = lang === "es" ? "es" : "en"
  const copy = texts[locale]
  const tracks = await fetchCatalog()

  return (
    <main className="min-h-screen bg-background px-4 py-20">
      <section className="mx-auto w-full max-w-5xl space-y-10">
        <div className="space-y-4 text-center">
          <p className="text-sm uppercase tracking-wide text-[#2592d0]">{copy.badge}</p>
          <h1 className="text-4xl font-bold">{copy.heading}</h1>
          <p className="text-muted-foreground">{copy.subheading}</p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          <table className="w-full border-collapse text-left">
            <thead className="bg-muted/40 text-sm uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-6 py-4">Track ID</th>
                <th className="px-6 py-4">{locale === "es" ? "Título" : "Track Name"}</th>
                <th className="px-6 py-4">ISRC</th>
                <th className="px-6 py-4">UPC</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-base">
              {tracks.map((track) => (
                <tr key={track.id} className="hover:bg-muted/30">
                  <td className="px-6 py-4 font-semibold text-muted-foreground">{track.id}</td>
                  <td className="px-6 py-4 font-medium">{track.title}</td>
                  <td className="px-6 py-4 font-mono text-sm text-muted-foreground">{track.isrc ?? "—"}</td>
                  <td className="px-6 py-4 font-mono text-sm text-muted-foreground">{track.upc ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  )
}
