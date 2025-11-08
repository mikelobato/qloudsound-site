import type { GetServerSideProps } from 'next';

const SUPPORTED = ['en', 'es'] as const;
type SupportedLocale = (typeof SUPPORTED)[number];

function pickLocale(header?: string | null): SupportedLocale {
  if (!header) return 'en';
  const candidates = header
    .split(',')
    .map((part) => part.split(';')[0]?.trim()?.slice(0, 2).toLowerCase())
    .filter(Boolean) as SupportedLocale[];

  for (const locale of candidates) {
    if (SUPPORTED.includes(locale)) return locale;
  }
  return 'en';
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const preferred = pickLocale(req.headers['accept-language']);
  return {
    redirect: {
      destination: `/${preferred}`,
      permanent: false
    }
  };
};

export default function IndexRedirect() {
  return null;
}
