import { notFound } from "next/navigation"
import { Hero } from "@/components/hero"
import { HowItWorks } from "@/components/how-it-works"
import { WhyCreate } from "@/components/why-create"
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
      title: "HOW IT WORKS",
      subtitle:
        "From the moment you submit your brief, the request enters a tightly monitored pipeline that mixes automation with human review.",
      step1: {
        title: "Share the idea",
        description: "Moodboard, voice reference, or a simple voice note are enough to capture your intention.",
        bullets: ["Letter, video/audio reference", "Preferred energy, tempo, or instrumentation"],
      },
      step2: {
        title: "Render & refine",
        description: "Custom AI model output theme. Producers remix, add beats, and prepare mandatory.",
        bullets: ["Guarantee publishing royalty", "Creative and paratextual stems"],
      },
      step3: {
        title: "Publish & deliver",
        description: "We release to major streaming platforms and mirror assets in a private archive.",
        bullets: ["File delivery: MP3 and lossless master", "We transferred creative direction"],
      },
    },
    whyCreate: {
      title: "Why QloudSound Create exists",
      description:
        "We wanted a zero-friction way for anyone to brief a professional or indie pipeline without budgets or middle layers.",
      feature1: {
        title: "Zero cost publishing",
        description: "You brief, we generate, we publish. Experimental phase covers DMP fees.",
      },
      feature2: {
        title: "Human + IA workflow",
        description: "AI writes speed, humans ensure taste, mix, criteria, and metadata are impeccable.",
      },
      feature3: {
        title: "Full hand back",
        description: "Receive master, stems, and release links delivered once the track is live.",
      },
    },
    form: {
      title: "SUBMIT YOUR REQUEST",
      subtitle: "The more context you share, the faster we can turn around a song ready for streaming.",
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
      title: "¿CÓMO FUNCIONA?",
      subtitle: "Tu brief entra en un pipeline vigilado donde combinamos automatización con revisión humana.",
      step1: {
        title: "Comparte la idea",
        description: "Moodboard, referencia o una simple nota de voz bastan para fijar tu intención.",
        bullets: ["Letra, video/referencia sonora", "Energía, tempo o instrumentos preferidos"],
      },
      step2: {
        title: "Generamos y refinamos",
        description: "Salida de modelo IA personalizado. Productores remixan, añaden beats y preparan mandatarios.",
        bullets: ["Garantizamos publicación en royalty", "Stems creativos y paratextuales"],
      },
      step3: {
        title: "Publicamos y entregamos",
        description: "Lanzamos en las principales plataformas y reflejamos los assets en un archivo privado.",
        bullets: ["Entrega de archivos: MP3 y máster sin pérdida", "Trasladamos la dirección creativa"],
      },
    },
    whyCreate: {
      title: "Por qué existe Create",
      description:
        "Buscamos una vía sin fricción para que cualquiera pueda briefear un pipeline profesional o indie sin presupuestos ni capas intermediarias.",
      feature1: {
        title: "Publicación sin coste",
        description: "Tú haces el brief, nosotros generamos y publicamos. La fase experimental cubre tarifas DMP.",
      },
      feature2: {
        title: "Flujo IA + humano",
        description: "La IA aporta velocidad, los humanos aseguran el gusto, mezcla, criterio, y metadatos impecables.",
      },
      feature3: {
        title: "Entrega completa",
        description: "Recibes máster, stems y enlaces del lanzamiento una vez esté activo.",
      },
    },
    form: {
      title: "ENVÍA TU PEDIDO",
      subtitle: "Cuanto más contexto compartas, más rápido convertimos tu idea en una canción lista para streaming.",
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
      <WhyCreate translations={t} />
      <RequestForm translations={t} />
      <Footer translations={t} lang={lang} />
    </main>
  )
}
