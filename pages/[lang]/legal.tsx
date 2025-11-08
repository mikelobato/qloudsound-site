import Head from 'next/head';
import Link from 'next/link';
import { COPY, type Locale } from '../../src/content/site';
import type { GetStaticPaths, GetStaticProps } from 'next';

interface PageProps {
  locale: Locale;
}

export default function LegalPage({ locale }: PageProps) {
  const copy = COPY[locale];
  const year = new Date().getFullYear();
  const homeHref = locale === 'es' ? '/es' : '/en';

  const COMPANY = 'SMART CLOUD PROJECTS, S.L.U.';
  const masked = COMPANY.split('').join('\u200B');

  return (
    <>
      <Head>
        <title>{copy.legal.title} — QloudSound</title>
        <meta name="robots" content="noindex" />
      </Head>
      <main className="min-h-screen bg-[#030409] text-white">
        <div className="mx-auto max-w-4xl px-6 py-12">
          <Link href={homeHref} className="text-sm text-[#2592d0] hover:underline">
            ← {locale === 'es' ? 'Volver al inicio' : 'Back to home'}
          </Link>
          <h1 className="title mt-6 text-3xl font-semibold">{copy.legal.title}</h1>
          <p className="mt-3 text-sm text-white/70">{copy.legal.intro}</p>
          <ul className="mt-6 space-y-4 text-sm text-white/70">
            {copy.legal.points.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-[#2592d0]" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5 text-xs text-white/60">
            <p>
              <span aria-label={COMPANY}>{masked}</span>. {copy.legal.notice}
            </p>
            <p className="mt-3">© {year} QloudSound.</p>
          </div>
        </div>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = () => ({
  paths: [{ params: { lang: 'en' } }, { params: { lang: 'es' } }],
  fallback: false
});

export const getStaticProps: GetStaticProps<PageProps> = async ({ params }) => {
  const langParam = typeof params?.lang === 'string' ? params.lang.toLowerCase() : 'en';
  const locale: Locale = langParam === 'es' ? 'es' : 'en';
  return { props: { locale } };
};
