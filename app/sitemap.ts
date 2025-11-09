import type { MetadataRoute } from "next"

const baseUrl = "https://www.qloudsound.com"
const locales = ["en", "es"] as const

const localizedPaths = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/legal", changeFrequency: "yearly", priority: 0.7 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return localizedPaths.flatMap(({ path, changeFrequency, priority }) =>
    locales.map((locale) => {
      const url = `${baseUrl}/${locale}${path}`
      const alternates: Record<string, string> = {}

      locales.forEach((altLocale) => {
        if (altLocale !== locale) {
          alternates[altLocale] = `${baseUrl}/${altLocale}${path}`
        }
      })

      return {
        url,
        lastModified,
        changeFrequency,
        priority,
        alternates: {
          languages: alternates,
        },
      }
    })
  )
}
