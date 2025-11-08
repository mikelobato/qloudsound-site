import { useState, useEffect, FormEvent } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { COPY, type Copy, type Locale } from '../../src/content/site';

declare global {
  interface Window {
    __loadGTM?: () => void;
    __gtmLoaded?: boolean;
  }
}
import type { GetServerSideProps } from 'next';

const socials = [
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/qloudsound',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="4" y="4" width="16" height="16" rx="4"></rect>
        <circle cx="12" cy="12" r="3.3"></circle>
        <circle cx="17" cy="7" r="1.2" fill="currentColor"></circle>
      </svg>
    )
  },
  {
    name: 'TikTok',
    href: 'https://www.tiktok.com/@qloudsound',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M15.5 3h3.3c.1 2.2 1.4 3.4 3.2 3.6v3.2c-1.2.1-2.3-.3-3.2-.9v6.2c0 4-2.4 6.1-5.7 6.1-3 0-5.4-2-5.4-5s2.3-5 5.4-5c.6 0 1.2.1 1.7.2V7.5c-2.9-.3-3.6-2.2-4-4.5h0V3h4.7Z"></path>
      </svg>
    )
  },
  {
    name: 'YouTube',
    href: 'https://www.youtube.com/@qloudsound',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M21.6 7.2c-.2-.7-.7-1.2-1.4-1.4C18.6 5.4 12 5.4 12 5.4s-6.6 0-8.2.4c-.7.2-1.2.7-1.4 1.4C2 8.8 2 12 2 12s0 3.2.4 4.8c.2.7.7 1.2 1.4 1.4 1.6.4 8.2.4 8.2.4s6.6 0 8.2-.4c.7-.2 1.2-.7 1.4-1.4.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8ZM10.5 15.5v-7L16 12l-5.5 3.5Z"></path>
      </svg>
    )
  },
  {
    name: 'Spotify',
    href: 'https://open.spotify.com/artist/5vI34V1yXBmRNZJyUjLdlQ',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="9"></circle>
        <path d="M8 10.5c2.3-1 5.7-.8 7.9.3" strokeLinecap="round"></path>
        <path d="M8.6 13.2c1.8-.8 4.3-.6 5.9.2" strokeLinecap="round"></path>
        <path d="M9.2 15.7c1.3-.6 3-.4 4 .2" strokeLinecap="round"></path>
      </svg>
    )
  },
  {
    name: 'YouTube Music',
    href: 'https://music.youtube.com/channel/UCtwC6JHP73P2COtYD4hJi3A',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="12" cy="12" r="9"></circle>
        <path d="M10.5 9.5v5l4-2.5-4-2.5z" fill="currentColor" stroke="none"></path>
      </svg>
    )
  }
];

type Locale = 'en' | 'es';


interface PageProps {
  locale: Locale;
}

export default function LocalePage({ locale }: PageProps) {
  const copy = COPY[locale];
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const legalHref = locale === 'es' ? '/es/legal' : '/en/legal';

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    setMessage('');
    const form = e.currentTarget;
    const formData = new FormData(form);
    try {
      const res = await fetch('/api/request', { method: 'POST', body: formData });
      const data = await res.json();
      if (!res.ok || !data?.ok) throw new Error();
      form.reset();
      setStatus('success');
      setShowModal(true);
    } catch {
      setStatus('error');
      setMessage(copy.form.error); setShowModal(false);
    }
  }

  return (
    <>
      <Head>
        <title>{copy.meta.title}</title>
        <meta name="description" content={copy.meta.description} />
      </Head>

      <div className="min-h-screen bg-[#030409] text-white scroll-smooth">
        <div className="pointer-events-none fixed inset-0 -z-10 opacity-60">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(37,146,208,0.3),transparent_55%)] animate-pulse-slow" />
        </div>

        <header className="sticky top-0 z-50 border-b border-white/5 bg-transparent">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-4 px-6 py-4">
            <div className="flex flex-shrink-0 items-center gap-3">
              <Link href={locale === 'es' ? '/es' : '/en'} className="inline-flex items-center" aria-label="QloudSound home">
                <Image src="/images/qloudsound_over_dark.svg" alt="QloudSound" width={155} height={40} priority />
              </Link>
              <div className="lang-toggle" role="group" aria-label="Language selector">
                <Link
                  href="/en"
                  className={`rounded-full px-3 py-1 text-[0.65rem] tracking-[0.2em] ${locale === 'en' ? 'bg-white text-black' : 'text-white/70'}`}
                >
                  EN
                </Link>
                <Link
                  href="/es"
                  className={`rounded-full px-3 py-1 text-[0.65rem] tracking-[0.2em] ${locale === 'es' ? 'bg-white text-black' : 'text-white/70'}`}
                >
                  ES
                </Link>
              </div>
            </div>
            <div className="ml-auto flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2">
                {socials.map((social) => (
                  <a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" className="social-link" aria-label={social.name}>
                    <span className="social-icon" aria-hidden="true">
                      {social.icon}
                    </span>
                  </a>
                ))}
              </div>
              <a
                href="#how"
                className="inline-flex items-center rounded-full border border-white/20 px-4 py-2 text-sm font-medium tracking-wide text-white/85 transition hover:border-[#2592d0] hover:text-[#2592d0]"
              >
                {copy.hero.ctaHow}
              </a>
              <a
                href="#create"
                className="inline-flex items-center rounded-full bg-[#2592d0] px-4 py-2 text-sm font-medium tracking-wide text-black shadow-lg shadow-[#2592d0]/40"
              >
                {copy.hero.ctaCreate}
              </a>
            </div>
          </div>
        </header>

        <section id="hero" className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(37,146,208,0.35),transparent_60%)] animate-pulse-slow" />
          </div>
          <h1 className="title text-5xl font-semibold leading-tight sm:text-6xl lg:text-8xl">
            {copy.hero.title[0]}
            <br className="hidden sm:block" />
            {copy.hero.title[1]}
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-white/75">{copy.hero.subtitle}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#how"
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-7 py-3 text-sm font-semibold tracking-wide text-white/80 transition hover:border-[#2592d0] hover:text-[#2592d0]"
            >
              {copy.hero.ctaHow}
            </a>
            <a
              href="#create"
              className="inline-flex items-center justify-center rounded-full bg-[#2592d0] px-8 py-4 text-sm font-semibold tracking-wide text-black shadow-lg shadow-[#2592d0]/40 transition hover:brightness-110"
            >
              {copy.hero.ctaCreate}
            </a>
          </div>
        </section>

        <section className="border-y border-white/10 bg-[#05070f]" id="how">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <p className="text-xs uppercase tracking-[0.35em] text-white/50">{copy.how.title}</p>
            <h2 className="title mt-3 text-3xl font-semibold">{copy.how.body}</h2>
            <div className="mt-10 grid gap-8 md:grid-cols-3">
              {copy.how.steps.map((step) => (
                <div key={step.title} className="rounded-3xl border border-white/10 bg-white/5 p-6">
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                  <p className="mt-3 text-sm text-white/70">{step.body}</p>
                  <ul className="mt-4 space-y-2 text-xs text-white/60">
                    {step.details.map((detail) => (
                      <li key={detail} className="flex items-start gap-2">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#2592d0]" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="create" className="mx-auto max-w-6xl px-6 py-16">
          <div className="rounded-[36px] border border-white/10 bg-gradient-to-br from-[#05070f] to-[#04050b] p-8 backdrop-blur">
            <div className="grid gap-10 lg:grid-cols-5">
              <div className="space-y-6 lg:col-span-2">
                <div>
                  <h2 className="title text-3xl font-semibold">{copy.creation.title}</h2>
                  <p className="mt-3 text-sm text-white/70">{copy.creation.body}</p>
                </div>
                <div className="space-y-4">
                  {copy.creation.highlights.map((card) => (
                    <div key={card.title} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                      <h3 className="text-lg font-semibold">{card.title}</h3>
                      <p className="mt-2 text-sm text-white/70">{card.body}</p>
                    </div>
                  ))}
                </div>
              </div>
              <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-5 rounded-3xl border border-white/10 bg-white/5 p-6 lg:col-span-3">
                <p className="text-xs uppercase tracking-[0.35em] text-white/50">{copy.form.sectionTitle}</p>
                <h3 className="title text-2xl font-semibold">{copy.form.intro}</h3>
              <div className="grid gap-5 sm:grid-cols-2">
                {[{ label: copy.form.fields.name, name: 'name', type: 'text' }, { label: copy.form.fields.email, name: 'email', type: 'email' }].map(
                  (field) => (
                    <label key={field.name} className="space-y-2 text-sm">
                      <span>{field.label}</span>
                      <input
                        required
                        type={field.type}
                        name={field.name}
                        className="w-full rounded-2xl border border-white/20 bg-[#050506] px-4 py-3 text-white focus:border-[#2592d0] focus:outline-none"
                      />
                    </label>
                  )
                )}
              </div>
              <label className="space-y-2 text-sm">
                <span>{copy.form.fields.style}</span>
                <input
                  required
                  type="text"
                  name="style"
                  className="w-full rounded-2xl border border-white/20 bg-[#050506] px-4 py-3 text-white focus:border-[#2592d0] focus:outline-none"
                />
              </label>
              <label className="space-y-2 text-sm">
                <span>{copy.form.fields.description}</span>
                <textarea
                  name="description"
                  rows={4}
                  className="w-full rounded-2xl border border-white/20 bg-[#050506] px-4 py-3 text-white focus:border-[#2592d0] focus:outline-none"
                  placeholder="Mood, instrumentos, letra..."
                />
              </label>
                            <label className="flex items-start gap-3 text-sm">
                <input required type="checkbox" name="consent" className="mt-1" />
                <span>{copy.form.fields.consent}</span>
              </label>
                <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full rounded-2xl bg-[#2592d0] px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-black transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === 'loading' ? copy.form.submitLoading : copy.form.submitIdle}
              </button>
              {message && <p className={`text-center text-sm ${status === 'error' ? 'text-red-400' : 'text-[#2592d0]'}`}>{message}</p>}
              <p className="text-center text-xs text-white/60">{copy.form.legal}</p>
            </form>
            </div>
          </div>
        </section>

        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
            <div className="w-full max-w-sm rounded-3xl border border-white/10 bg-[#05070c] p-6 text-center shadow-[0_40px_120px_-60px_rgba(37,146,208,0.9)]">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#0b1924]">
                <span className="inline-block animate-pop text-3xl text-[#2ae39a]">✔</span>
              </div>
              <h3 className="title mt-4 text-2xl font-semibold">{copy.form.successTitle}</h3>
              <p className="mt-2 text-sm text-white/70">{copy.form.successBody}</p>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="mt-6 inline-flex items-center justify-center rounded-full bg-[#2592d0] px-6 py-2 text-sm font-semibold tracking-wide text-black shadow-lg shadow-[#2592d0]/40"
              >
                {locale === 'es' ? 'Entendido' : 'Got it'}
              </button>
            </div>
          </div>
        )}

        <footer className="border-t border-white/10 py-10 text-center text-xs text-white/50">
          <div className="space-y-2">
            <div>© {new Date().getFullYear()} QloudSound. {copy.footer.rights}</div>
            <div className="text-[11px] uppercase tracking-[0.3em] text-white/60">{copy.footer.slogan}</div>
            <div className="flex justify-center gap-3 pt-3">
              {socials.map((social) => (
                <a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" className="social-link" aria-label={social.name}>
                  <span className="social-icon" aria-hidden="true">
                    {social.icon}
                  </span>
                </a>
              ))}
            </div>
            <div className="pt-2 text-xs text-white/60">
              <Link href={legalHref} className="underline decoration-dotted hover:text-white">
                {copy.legal.title}
              </Link>
            </div>
          </div>
        </footer>
        <CookieBanner copy={copy.cookies} />
      </div>
    </>
  );
}

function CookieBanner({ copy }: { copy: Copy['cookies'] }) {
  const [visible, setVisible] = useState(false);
  const consentKey = 'ql-cookie';

  function readConsent() {
    if (typeof document === 'undefined') return null;
    const match = document.cookie.split(';').find((c) => c.trim().startsWith(`${consentKey}=`));
    return match ? match.split('=')[1] : null;
  }

  function setConsent(value: 'accepted' | 'declined') {
    document.cookie = `${consentKey}=${value}; path=/; max-age=${60 * 60 * 24 * 180}`;
  }

  function triggerGTM() {
    if (typeof window !== 'undefined' && typeof window.__loadGTM === 'function') {
      window.__loadGTM();
    }
  }

  function handleAccept() {
    setConsent('accepted');
    setVisible(false);
    triggerGTM();
  }

  function handleDecline() {
    setConsent('declined');
    setVisible(false);
  }

  useEffect(() => {
    const existing = readConsent();
    if (existing === 'accepted') {
      triggerGTM();
      setVisible(false);
      return;
    }
    if (existing === 'declined') {
      setVisible(false);
      return;
    }
    setVisible(true);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-3xl rounded-2xl border border-white/10 bg-[#05060d]/95 p-4 shadow-2xl backdrop-blur">
      <div className="flex flex-col gap-4 text-sm text-white/80 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex-1">{copy.message}</p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={handleDecline}
            className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold tracking-[0.08em] text-white/80 transition hover:border-white/40"
          >
            {copy.decline}
          </button>
          <button
            onClick={handleAccept}
            className="rounded-full bg-[#2592d0] px-4 py-2 text-xs font-semibold tracking-[0.08em] text-black shadow-lg shadow-[#2592d0]/40 transition hover:brightness-110"
          >
            {copy.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
export const getServerSideProps: GetServerSideProps<PageProps> = async ({ params }) => {
  const langParam = typeof params?.lang === 'string' ? params.lang.toLowerCase() : 'en';
  const locale: Locale = langParam === 'es' ? 'es' : 'en';
  return { props: { locale } };
};
