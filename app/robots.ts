import type { MetadataRoute } from "next"

const baseUrl = "https://www.qloudsound.com"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/en", "/es", "/en/legal", "/es/legal"],
        disallow: ["/admin", "/api"],
      },
    ],
    sitemap: [`${baseUrl}/sitemap.xml`],
    host: baseUrl,
  }
}
