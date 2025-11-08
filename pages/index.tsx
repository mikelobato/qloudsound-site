import { useEffect } from 'react';
import { useRouter } from 'next/router';

const SUPPORTED = ['en', 'es'] as const;
type SupportedLocale = (typeof SUPPORTED)[number];

function detectLocale(): SupportedLocale {
  if (typeof window === 'undefined') {
    return 'en';
  }

  const stored = window.localStorage.getItem('ql-lang');
  if (stored && SUPPORTED.includes(stored as SupportedLocale)) {
    return stored as SupportedLocale;
  }

  const browser = window.navigator.language?.slice(0, 2).toLowerCase();
  if (browser && SUPPORTED.includes(browser as SupportedLocale)) {
    return browser as SupportedLocale;
  }

  return 'en';
}

export default function IndexRedirect() {
  const router = useRouter();

  useEffect(() => {
    const locale = detectLocale();
    router.replace(`/${locale}`);
  }, [router]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#030409] text-white">
      <p className="text-sm text-white/60">Redirigiendo…</p>
    </main>
  );
}
