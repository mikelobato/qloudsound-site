import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const SUPPORTED_LANGS = ["en", "es"] as const
const LANG_COOKIE = "ql-lang"
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365 // 1 year

const getPreferredLang = (request: NextRequest) => {
  const cookieLang = request.cookies.get(LANG_COOKIE)?.value
  if (cookieLang && SUPPORTED_LANGS.includes(cookieLang as (typeof SUPPORTED_LANGS)[number])) {
    return cookieLang
  }

  const acceptLanguage = request.headers.get("accept-language")?.toLowerCase() ?? ""
  return acceptLanguage.includes("es") ? "es" : "en"
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith("/_next") || pathname.startsWith("/api") || pathname.includes(".")) {
    return NextResponse.next()
  }

  if (pathname === "/") {
    const targetLang = getPreferredLang(request)
    const redirectUrl = new URL(`/${targetLang}`, request.url)
    const response = NextResponse.redirect(redirectUrl)
    response.cookies.set({
      name: LANG_COOKIE,
      value: targetLang,
      path: "/",
      maxAge: COOKIE_MAX_AGE,
    })
    return response
  }

  const firstSegment = pathname.split("/").filter(Boolean)[0]
  if (firstSegment && SUPPORTED_LANGS.includes(firstSegment as (typeof SUPPORTED_LANGS)[number])) {
    const response = NextResponse.next()
    response.cookies.set({
      name: LANG_COOKIE,
      value: firstSegment,
      path: "/",
      maxAge: COOKIE_MAX_AGE,
    })
    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
}
