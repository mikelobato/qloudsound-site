export function Footer({ translations, lang }: { translations: any; lang: string }) {
  const t = translations.footer

  return (
    <footer className="py-12 px-4 border-t border-border">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-sm text-muted-foreground text-center md:text-left">
            <p>
              © {new Date().getFullYear()} QloudSound. {t.tagline}
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            <a
              href="https://www.instagram.com/qloudsound"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-muted hover:bg-[#2592d0] hover:text-white flex items-center justify-center transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-5 h-5">
                <rect x="4" y="4" width="16" height="16" rx="4"></rect>
                <circle cx="12" cy="12" r="3.3"></circle>
                <circle cx="17" cy="7" r="1.2" fill="currentColor"></circle>
              </svg>
            </a>
            <a
              href="https://www.tiktok.com/@qloudsound"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-muted hover:bg-[#2592d0] hover:text-white flex items-center justify-center transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M15.5 3h3.3c.1 2.2 1.4 3.4 3.2 3.6v3.2c-1.2.1-2.3-.3-3.2-.9v6.2c0 4-2.4 6.1-5.7 6.1-3 0-5.4-2-5.4-5s2.3-5 5.4-5c.6 0 1.2.1 1.7.2V7.5c-2.9-.3-3.6-2.2-4-4.5h0V3h4.7Z"></path>
              </svg>
            </a>
            <a
              href="https://www.youtube.com/channel/UCtwC6JHP73P2COtYD4hJi3A"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-muted hover:bg-[#2592d0] hover:text-white flex items-center justify-center transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M21.6 7.2c-.2-.7-.7-1.2-1.4-1.4C18.6 5.4 12 5.4 12 5.4s-6.6 0-8.2.4c-.7.2-1.2.7-1.4 1.4C2 8.8 2 12 2 12s0 3.2.4 4.8c.2.7.7 1.2 1.4 1.4 1.6.4 8.2.4 8.2.4s6.6 0 8.2-.4c.7-.2 1.2-.7 1.4-1.4.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8ZM10.5 15.5v-7L16 12l-5.5 3.5Z"></path>
              </svg>
            </a>
            <a
              href="https://open.spotify.com/artist/5vI34V1yXBmRNZJyUjLdlQ"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-muted hover:bg-[#2592d0] hover:text-white flex items-center justify-center transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
                <circle cx="12" cy="12" r="9"></circle>
                <path d="M8 10.5c2.3-1 5.7-.8 7.9.3" strokeLinecap="round"></path>
                <path d="M8.6 13.2c1.8-.8 4.3-.6 5.9.2" strokeLinecap="round"></path>
                <path d="M9.2 15.7c1.3-.6 3-.4 4 .2" strokeLinecap="round"></path>
              </svg>
            </a>
            <a
              href="https://music.youtube.com/channel/UCtwC6JHP73P2COtYD4hJi3A"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-muted hover:bg-[#2592d0] hover:text-white flex items-center justify-center transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-5 h-5">
                <circle cx="12" cy="12" r="9"></circle>
                <path d="M10.5 9.5v5l4-2.5-4-2.5z" fill="currentColor" stroke="none"></path>
              </svg>
            </a>
          </div>
        </div>

        <div className="mt-6 text-center">
          <a href={`/${lang}/legal`} className="text-sm text-muted-foreground hover:text-[#2592d0]">
            {t.legal}
          </a>
        </div>
      </div>
    </footer>
  )
}
