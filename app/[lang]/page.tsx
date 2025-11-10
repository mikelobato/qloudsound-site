import { notFound } from "next/navigation"
import { Hero } from "@/components/hero"
import { HowItWorks } from "@/components/how-it-works"
import { RequestForm } from "@/components/request-form"
import { Footer } from "@/components/footer"

const translations = {
  en: {
    howItWorks: "How it works",
    createSong: "Create my song",
    hero: {
      title: "Where your ideas",
      titleAccent: "become sound.",
        description:
        "Describe your ideal track, mood, or lyrics and we'll craft it with AI + human mastering, then publish it across streaming platforms at no cost.",
    },
    howItWorksSection: {
      title: "How it works",
      subtitle: "Tell us what you want and we ship the song.",
      steps: [
        {
          title: "Send your idea",
          description: "Share mood, references, or a quick voice note so we capture the vibe.",
        },
        {
          title: "We build the song",
          description: "AI drafts the base and the team polishes it until it feels right.",
        },
        {
          title: "We publish and deliver",
          description: "We push it live on streaming platforms and send you the files to keep.",
        },
      ],
    },
    form: {
      title: "Request your track",
      subtitle: "A short brief is all we need to get started.",
      formHint: "We’ll reach out with the first preview in less than a week.",
      nameLabel: "Name / Project *",
      emailLabel: "Email *",
      styleLabel: "Style or genre *",
      stylePlaceholder: "e.g., Reggaeton, Pop, Hip Hop...", // Added placeholder for text input
      descriptionLabel: "Description or lyrics (optional)",
      descriptionPlaceholder: "Mood, instruments, refs...",
      consentLabel: "I accept that QloudSound generates my song with AI and publishes it on streaming platforms.",
      submitButton: "CREATE SONG",
      disclaimer:
        "Songs are generated with AI and published for representative purposes. Submitting the form implies acceptance of these conditions.",
      successTitle: "Request Submitted!",
      successMessage: "Your song request has been received. We'll start working on it and contact you soon.",
      successQueue: "Your song is in the queue!",
      successEmailNotice: "Once it is processed you'll get an email to listen and download the track.",
      errorTitle: "Request Error",
      errorMessage: "There was a problem with your request. Please contact us at",
      close: "Close",
    },
    footer: {
      tagline: "Where your ideas become sound",
      subline: "AI music born from real briefs",
      legal: "Legal notice & privacy",
    },
  },
  es: {
    howItWorks: "¿Cómo funciona?",
    createSong: "Crear mi canción",
    hero: {
      title: "Donde tus ideas",
      titleAccent: "se convierten en sonido.",
        description:
        "Describe tu canción ideal, mood o letra y la fabricamos con IA + lado humano para publicarla en plataformas de streaming sin coste.",
    },
    howItWorksSection: {
      title: "Cómo funciona",
      subtitle: "Nos cuentas la idea y te mandamos la canción.",
      steps: [
        {
          title: "Cuéntanos la idea",
          description: "Mood, referencias o una nota de voz para fijar el estilo.",
        },
        {
          title: "Producimos el tema",
          description: "La IA propone y el equipo lo deja redondo.",
        },
        {
          title: "Publicamos y enviamos",
          description: "Lo lanzamos en streaming y te mandamos los archivos.",
        },
      ],
    },
    form: {
      title: "Pide tu canción",
      subtitle: "Un breve resumen basta para arrancar.",
      formHint: "Te mandaremos un primer avance en menos de una semana.",
      nameLabel: "Nombre / Proyecto *",
      emailLabel: "Email *",
      styleLabel: "Estilo o género *",
      stylePlaceholder: "ej: Reggaeton, Pop, Hip Hop...", // Added placeholder for text input
      descriptionLabel: "Descripción o letra (opcional)",
      descriptionPlaceholder: "Mood, instrumentos, refs...",
      consentLabel: "Acepto que QloudSound genere mi canción mediante IA y la publique en plataformas de streaming.",
      submitButton: "GENERAR CANCIÓN",
      disclaimer:
        "Las canciones se generan con IA y se publican con fines representativos. Enviar el formulario implica aceptar estas condiciones.",
      successTitle: "¡Solicitud Enviada!",
      successMessage: "Tu pedido de canción ha sido recibido. Comenzaremos a trabajar en él y te contactaremos pronto.",
      successQueue: "¡Tu canción ya está en la cola!",
      successEmailNotice: "Cuando esté lista recibirás un email para escucharla y descargarla.",
      errorTitle: "Error en la Solicitud",
      errorMessage: "Ha habido un problema en la solicitud. Por favor, contáctanos en",
      close: "Cerrar",
    },
    footer: {
      tagline: "Donde tus ideas se convierten en sonido",
      subline: "Música de IA nacida de briefs reales",
      legal: "Aviso legal y privacidad",
    },
  },
}

type Lang = "en" | "es"

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "es" }]
}

export default async function LangPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params

  if (lang !== "en" && lang !== "es") {
    notFound()
  }

  const t = translations[lang as Lang]

  return (
    <main className="min-h-screen">
      <Hero translations={t} lang={lang} />
      <HowItWorks translations={t} />
      <RequestForm translations={t} />
      <Footer translations={t} lang={lang} />
    </main>
  )
}
