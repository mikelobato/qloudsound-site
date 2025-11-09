import { redirect } from "next/navigation"
import { headers } from "next/headers"

export default async function RootPage() {
  const headersList = await headers()
  const acceptLanguage = headersList.get("accept-language") || ""

  // Detect if browser prefers Spanish
  const isSpanish = acceptLanguage.toLowerCase().includes("es")
  const locale = isSpanish ? "es" : "en"

  redirect(`/${locale}`)
}
