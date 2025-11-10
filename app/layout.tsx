import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import Script from 'next/script'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const runtime = 'edge'

export const metadata: Metadata = {
  title: 'Where your ideas become sound',
  description: 'QloudSound — Where your ideas become sound with AI + human mastering.',
  generator: 'QloudSound',
  icons: {
    icon: [
      {
        url: '/favicon.svg',
        type: 'image/svg+xml',
      },
      {
        url: '/favicon.png',
        type: 'image/png',
        sizes: '512x512',
      },
    ],
    apple: '/favicon.png',
    shortcut: '/favicon.png',
  },
  openGraph: {
    title: 'Where your ideas become sound',
    description: 'Custom AI-powered songs crafted with human producers and published to streaming platforms.',
    url: 'https://www.qloudsound.com',
    siteName: 'QloudSound',
    images: [
      {
        url: 'https://www.qloudsound.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'QloudSound — Where your ideas become sound',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Where your ideas become sound',
    description: 'Custom AI-powered songs crafted with human producers and published to streaming platforms.',
    images: ['https://www.qloudsound.com/og-image.jpg'],
    creator: '@qloudsound',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-9LK43C2CN5" />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-9LK43C2CN5');`}
        </Script>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
