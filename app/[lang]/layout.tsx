import type React from "react"
import type { Metadata } from "next"
import { Outfit, Plus_Jakarta_Sans } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import Script from "next/script"
import "../globals.css"
import { CookieBanner } from "@/components/cookie-banner"

const outfit = Outfit({ subsets: ["latin"], variable: "--font-sans" })
const plusJakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-display" })

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  const isEs = lang === "es"

  const title = isEs
    ? "QloudSound - Donde tus ideas se convierten en sonido"
    : "QloudSound - Where your ideas become sound"
  const description = isEs
    ? "Crea música con IA y masterización humana. Publicamos tu canción en Spotify sin coste durante nuestra fase experimental."
    : "Create music with AI and human mastering. We publish your song on Spotify at no cost during our experimental phase."

  return {
    title,
    description,
    keywords: isEs
      ? "crear música, IA música, generar canciones, música gratis, Spotify, producción musical, QloudSound"
      : "create music, AI music, generate songs, free music, Spotify, music production, QloudSound",
    authors: [{ name: "QloudSound" }],
    creator: "QloudSound",
    publisher: "QloudSound",
    icons: {
      icon: "/favicon.svg",
      apple: "/favicon.svg",
    },
    manifest: "/site.webmanifest",
    openGraph: {
      type: "website",
      locale: isEs ? "es_ES" : "en_US",
      url: `https://www.qloudsound.com/${lang}`,
      title,
      description,
      siteName: "QloudSound",
      images: [
        {
          url: "https://www.qloudsound.com/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "QloudSound - AI Music Creation",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://www.qloudsound.com/og-image.jpg"],
      creator: "@qloudsound",
    },
    alternates: {
      canonical: `https://www.qloudsound.com/${lang}`,
      languages: {
        "en-US": "https://www.qloudsound.com/en",
        "es-ES": "https://www.qloudsound.com/es",
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: "your-google-verification-code", // Replace with actual code
    },
  }
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const isProduction = process.env.NODE_ENV === "production"

  return (
    <html lang={lang} className={`dark ${outfit.variable} ${plusJakarta.variable}`}>
      <head>
        {isProduction && (
          <Script id="gtm-loader" strategy="afterInteractive">
            {`(function(){
              function hasConsent(){
                return document.cookie.split(';').some(c => c.trim() === 'ql-cookie=accepted');
              }
              function loadGTM(){
                if(window.__gtmLoaded) return;
                window.__gtmLoaded = true;
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-KX7C2B7C');
              }
              window.__loadGTM = loadGTM;
              if(hasConsent()){ loadGTM(); }
            })();`}
          </Script>
        )}
      </head>
      <body className="font-sans antialiased">
        {isProduction && (
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-KX7C2B7C"
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}
        {children}
        <CookieBanner lang={lang} />
        <Analytics />
      </body>
    </html>
  )
}
