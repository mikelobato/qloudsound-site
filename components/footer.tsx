import Image from "next/image"

export function Footer({ translations, lang }: { translations: any; lang: string }) {
  const t = translations.footer
  const socialLinks = [
    {
      href: "https://www.instagram.com/qloudsound",
      label: "Instagram",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-5 h-5">
          <rect x="4" y="4" width="16" height="16" rx="4"></rect>
          <circle cx="12" cy="12" r="3.3"></circle>
          <circle cx="17" cy="7" r="1.2" fill="currentColor"></circle>
        </svg>
      ),
    },
    {
      href: "https://www.tiktok.com/@qloudsound",
      label: "TikTok",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M15.5 3h3.3c.1 2.2 1.4 3.4 3.2 3.6v3.2c-1.2.1-2.3-.3-3.2-.9v6.2c0 4-2.4 6.1-5.7 6.1-3 0-5.4-2-5.4-5s2.3-5 5.4-5c.6 0 1.2.1 1.7.2V7.5c-2.9-.3-3.6-2.2-4-4.5h0V3h4.7Z"></path>
        </svg>
      ),
    },
    {
      href: "https://www.youtube.com/channel/UCtwC6JHP73P2COtYD4hJi3A",
      label: "YouTube",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M21.6 7.2c-.2-.7-.7-1.2-1.4-1.4C18.6 5.4 12 5.4 12 5.4s-6.6 0-8.2.4c-.7.2-1.2.7-1.4 1.4C2 8.8 2 12 2 12s0 3.2.4 4.8c.2.7.7 1.2 1.4 1.4 1.6.4 8.2.4 8.2.4s6.6 0 8.2-.4c.7-.2 1.2-.7 1.4-1.4.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8ZM10.5 15.5v-7L16 12l-5.5 3.5Z"></path>
        </svg>
      ),
    },
    {
      href: "https://open.spotify.com/artist/5vI34V1yXBmRNZJyUjLdlQ",
      label: "Spotify",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
          <circle cx="12" cy="12" r="9"></circle>
          <path d="M8 10.5c2.3-1 5.7-.8 7.9.3" strokeLinecap="round"></path>
          <path d="M8.6 13.2c1.8-.8 4.3-.6 5.9.2" strokeLinecap="round"></path>
          <path d="M9.2 15.7c1.3-.6 3-.4 4 .2" strokeLinecap="round"></path>
        </svg>
      ),
    },
    {
      href: "https://music.youtube.com/channel/UCtwC6JHP73P2COtYD4hJi3A",
      label: "YouTube Music",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-5 h-5">
          <circle cx="12" cy="12" r="9"></circle>
          <path d="M10.5 9.5v5l4-2.5-4-2.5z" fill="currentColor" stroke="none"></path>
        </svg>
      ),
    },
  ]

  return (
    <footer className="border-t border-border bg-background/80 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-3 text-center md:text-left">
            <div className="flex flex-col items-center md:items-start gap-2">
              <Image
                src="/qloudsound-dark.svg"
                alt="QloudSound"
                width={200}
                height={40}
                className="hidden dark:block h-9 w-auto"
                priority
              />
              <Image
                src="/qloudsound-light.svg"
                alt="QloudSound"
                width={200}
                height={40}
                className="dark:hidden block h-9 w-auto"
                priority
              />
            </div>
            <p className="text-base text-foreground">{t.tagline}</p>
            {t.subline && <p className="text-sm text-muted-foreground">{t.subline}</p>}
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} QloudSound ·{" "}
              <a href="mailto:info@qloudsound.com" className="text-foreground/70 underline decoration-dotted">
                info@qloudsound.com
              </a>
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="w-10 h-10 rounded-full border border-border bg-muted/70 hover:bg-[#2592d0] hover:text-white flex items-center justify-center transition-colors"
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center md:text-left">
          <a href={`/${lang}/legal`} className="text-sm text-muted-foreground hover:text-[#2592d0]">
            {t.legal}
          </a>
        </div>
      </div>
    </footer>
  )
}
