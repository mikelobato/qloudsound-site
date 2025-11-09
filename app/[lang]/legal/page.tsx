import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import type { Metadata } from "next"

const legalContent = {
  en: {
    title: "Legal Notice & Privacy Policy",
    backHome: "Back to home",
    sections: {
      companyInfo: {
        title: "Company Information",
        content: `QloudSound is a service operated by SMART CLOUD PROJECTS, S.L.U., with Tax ID (NIF) B66585084.`,
      },
      service: {
        title: "About Our Service",
        content: `QloudSound Create is an AI-powered music generation service. We create custom songs based on user requests using artificial intelligence technology combined with human review and mastering. The songs we generate are published on streaming platforms including Spotify, Apple Music, and YouTube Music at no cost to the user during our experimental phase.`,
      },
      rights: {
        title: "Intellectual Property & Rights",
        content: `All songs generated through QloudSound are created using AI technology. While we publish these songs on various streaming platforms, users who submit requests do not earn revenue from the streams or downloads of these songs. QloudSound retains all commercial rights to the generated content. Users receive the final master files and stems for personal use only.`,
      },
      dataCollection: {
        title: "Data Collection & Privacy",
        content: `When you submit a song request, we collect your name, email address, and the creative brief you provide. This information is used solely to process your request, communicate with you about your song, and deliver the final files. We do not sell or share your personal information with third parties except as necessary to fulfill our service (such as distribution to streaming platforms).`,
      },
      cookies: {
        title: "Cookies",
        content: `We use cookies to improve your experience and analyze site traffic. In production, we use Google Tag Manager for analytics purposes. You can accept or decline cookies through the banner that appears on your first visit. Declining cookies may limit some functionality of the website.`,
      },
      contact: {
        title: "Contact",
        content: `For any questions or concerns regarding our legal policies or privacy practices, please contact us at info@qloudsound.com`,
      },
    },
  },
  es: {
    title: "Aviso Legal y Política de Privacidad",
    backHome: "Volver al inicio",
    sections: {
      companyInfo: {
        title: "Información de la Empresa",
        content: `QloudSound es un servicio operado por SMART CLOUD PROJECTS, S.L.U., con NIF B66585084.`,
      },
      service: {
        title: "Sobre Nuestro Servicio",
        content: `QloudSound Create es un servicio de generación de música mediante inteligencia artificial. Creamos canciones personalizadas basadas en las solicitudes de los usuarios utilizando tecnología de IA combinada con revisión y masterización humana. Las canciones que generamos se publican en plataformas de streaming como Spotify, Apple Music y YouTube Music sin coste para el usuario durante nuestra fase experimental.`,
      },
      rights: {
        title: "Propiedad Intelectual y Derechos",
        content: `Todas las canciones generadas a través de QloudSound se crean utilizando tecnología de IA. Aunque publicamos estas canciones en varias plataformas de streaming, los usuarios que envían solicitudes no obtienen ingresos de las reproducciones o descargas de estas canciones. QloudSound retiene todos los derechos comerciales del contenido generado. Los usuarios reciben los archivos máster finales y stems únicamente para uso personal.`,
      },
      dataCollection: {
        title: "Recopilación de Datos y Privacidad",
        content: `Cuando envías una solicitud de canción, recopilamos tu nombre, dirección de correo electrónico y el brief creativo que proporcionas. Esta información se utiliza únicamente para procesar tu solicitud, comunicarnos contigo sobre tu canción y entregar los archivos finales. No vendemos ni compartimos tu información personal con terceros, excepto cuando sea necesario para cumplir con nuestro servicio (como la distribución en plataformas de streaming).`,
      },
      cookies: {
        title: "Cookies",
        content: `Utilizamos cookies para mejorar tu experiencia y analizar el tráfico del sitio. En producción, utilizamos Google Tag Manager con fines analíticos. Puedes aceptar o rechazar las cookies a través del banner que aparece en tu primera visita. Rechazar las cookies puede limitar algunas funcionalidades del sitio web.`,
      },
      contact: {
        title: "Contacto",
        content: `Para cualquier pregunta o inquietud sobre nuestras políticas legales o prácticas de privacidad, contáctanos en info@qloudsound.com`,
      },
    },
  },
}

type Lang = "en" | "es"

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  const content = legalContent[lang as Lang]

  return {
    title: content.title,
    robots: {
      index: false,
      follow: false,
      nocache: true,
      googleBot: {
        index: false,
        follow: false,
      },
    },
  }
}

export default async function LegalPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params

  if (lang !== "en" && lang !== "es") {
    notFound()
  }

  const content = legalContent[lang as Lang]

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <Link
          href={`/${lang}`}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-[#2592d0] mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          {content.backHome}
        </Link>

        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-12">{content.title}</h1>

        <div className="space-y-12">
          {Object.values(content.sections).map((section, index) => (
            <section key={index} className="space-y-4">
              <h2 className="text-2xl font-semibold text-[#2592d0]">{section.title}</h2>
              <p className="text-muted-foreground leading-relaxed">{section.content}</p>
            </section>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>SMART CLOUD PROJECTS, S.L.U. | NIF: B66585084</p>
          <p className="mt-2">© {new Date().getFullYear()} QloudSound. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}
