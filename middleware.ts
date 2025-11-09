import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip middleware for static files and api routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") ||
    pathname.startsWith("/en") ||
    pathname.startsWith("/es")
  ) {
    return NextResponse.next()
  }

  if (pathname === "/") {
    const acceptLanguage = request.headers.get("accept-language")?.toLowerCase() ?? ""
    const targetLang = acceptLanguage.includes("es") ? "es" : "en"
    const redirectUrl = new URL(`/${targetLang}`, request.url)
    return NextResponse.redirect(redirectUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
}
