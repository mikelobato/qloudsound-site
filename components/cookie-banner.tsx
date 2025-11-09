"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

export function CookieBanner({ lang }: { lang: string }) {
  const [showBanner, setShowBanner] = useState(false)

  const text = {
    en: {
      message:
        "We use cookies to improve your experience and analyze site traffic. By accepting, you agree to our use of cookies.",
      accept: "Accept",
      decline: "Decline",
      learnMore: "Learn more",
    },
    es: {
      message:
        "Utilizamos cookies para mejorar tu experiencia y analizar el tráfico del sitio. Al aceptar, aceptas nuestro uso de cookies.",
      accept: "Aceptar",
      decline: "Rechazar",
      learnMore: "Más información",
    },
  }

  const t = text[lang as keyof typeof text] || text.en

  useEffect(() => {
    const consent = document.cookie.split(";").some((c) => c.trim().startsWith("ql-cookie="))
    if (!consent) {
      setShowBanner(true)
    }
  }, [])

  const acceptCookies = () => {
    document.cookie = "ql-cookie=accepted; path=/; max-age=31536000; SameSite=Lax"
    setShowBanner(false)
    // Load GTM if available
    if (typeof window !== "undefined" && (window as any).__loadGTM) {
      ;(window as any).__loadGTM()
    }
  }

  const declineCookies = () => {
    document.cookie = "ql-cookie=declined; path=/; max-age=31536000; SameSite=Lax"
    setShowBanner(false)
  }

  if (!showBanner) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-card border-t border-border shadow-lg">
      <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground flex-1">
          {t.message}{" "}
          <a href={`/${lang}/legal`} className="text-[#2592d0] hover:underline">
            {t.learnMore}
          </a>
        </p>
        <div className="flex gap-3">
          <Button variant="outline" size="sm" onClick={declineCookies}>
            {t.decline}
          </Button>
          <Button size="sm" onClick={acceptCookies} className="bg-[#2592d0] hover:bg-[#1e7ab8] text-white">
            {t.accept}
          </Button>
        </div>
      </div>
    </div>
  )
}
