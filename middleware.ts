import { NextRequest, NextResponse } from 'next/server';

const SUPPORTED = ['en', 'es'] as const;
type SupportedLocale = (typeof SUPPORTED)[number];

const PUBLIC_FILE = /\.(?:\w{2,5})$/;

function parseAcceptLanguage(header: string | null): SupportedLocale {
  if (!header) return 'en';
  const locales = header
    .split(',')
    .map((part) => part.split(';')[0]?.trim())
    .filter(Boolean) as string[];

  for (const locale of locales) {
    const normalized = locale.slice(0, 2).toLowerCase();
    if (SUPPORTED.includes(normalized as SupportedLocale)) {
      return normalized as SupportedLocale;
    }
  }
  return 'en';
}

function getPreferredLocale(request: NextRequest): SupportedLocale {
  const cookieLocale = request.cookies.get('ql-lang')?.value as SupportedLocale | undefined;
  if (cookieLocale && SUPPORTED.includes(cookieLocale)) {
    return cookieLocale;
  }
  return parseAcceptLanguage(request.headers.get('accept-language'));
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  if (pathname === '/' || pathname === '') {
    const targetLocale = getPreferredLocale(request);
    const url = request.nextUrl.clone();
    url.pathname = `/${targetLocale}`;
    return NextResponse.redirect(url);
  }

  if (pathname.startsWith('/en') || pathname.startsWith('/es')) {
    const locale: SupportedLocale = pathname.startsWith('/es') ? 'es' : 'en';
    const response = NextResponse.next();
    response.cookies.set('ql-lang', locale, { path: '/', maxAge: 60 * 60 * 24 * 180 });
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!static).*)']
};
