export type Locale = 'en' | 'es';

export type Copy = {
  meta: { title: string; description: string };
  hero: { kicker: string; title: [string, string]; subtitle: string; ctaHow: string; ctaCreate: string };
  how: { title: string; body: string; steps: { title: string; body: string; details: string[] }[] };
  creation: { title: string; body: string; highlights: { title: string; body: string }[] };
  form: {
    sectionTitle: string;
    intro: string;
    fields: { name: string; email: string; style: string; description: string; consent: string };
    submitIdle: string;
    submitLoading: string;
    success: string;
    successTitle: string;
    successBody: string;
    error: string;
    legal: string;
  };
  footer: { rights: string; slogan: string };
  cookies: { message: string; accept: string; decline: string };
  legal: { title: string; intro: string; points: string[]; notice: string };
};

export const COPY: Record<Locale, Copy> = {
  en: {
    meta: {
      title: 'QloudSound — Where your ideas become sound',
      description: 'Describe your ideal song and we publish it on Spotify for free.'
    },
    hero: {
      kicker: 'Create your song',
      title: ['Where your ideas', 'become sound.'],
      subtitle: 'Describe your ideal track, mood, or lyrics and we will craft it with AI + human mastering, then publish it on Spotify at no cost.',
      ctaHow: 'How it works',
      ctaCreate: 'Create my song'
    },
    how: {
      title: 'How it works',
      body: 'From the moment you submit your brief, the request enters a tightly monitored pipeline that mixes automation with human review.',
      steps: [
        {
          title: 'Share the idea',
          body: 'Moodboards, references, or a simple voice note are enough to anchor intent.',
          details: ['Lyrics or themes (optional)', 'Preferred energy, tempo, or instrumentation']
        },
        {
          title: 'Render & refine',
          body: 'Custom IA stacks output stems. Producers master, add details, and prepare metadata.',
          details: ['Quality control for every version', 'Granular credits + stems']
        },
        {
          title: 'Publish & deliver',
          body: 'We release to Spotify, Apple Music, YouTube Music, and mirror assets in a private archive.',
          details: ['Publishing remains free in the experimental phase', 'You retain creative direction']
        }
      ]
    },
    creation: {
      title: 'Why QloudSound Create exists',
      body: 'We wanted a zero-friction way for anyone to brief a professional music pipeline without budgets or middle layers.',
      highlights: [
        { title: 'Zero cost publishing', body: 'You brief, we generate, we publish. Experimental phase covers DSP fees.' },
        { title: 'Human + IA workflow', body: 'AI handles speed, humans ensure taste, mix, and metadata accuracy.' },
        { title: 'Full hand back', body: 'Receive mastered files, stems, and release links once live.' }
      ]
    },
    form: {
      sectionTitle: 'Submit your request',
      intro: 'The more context you share, the faster we can turn around a song ready for streaming.',
      fields: {
        name: 'Name / Project *',
        email: 'Email *',
        style: 'Style or genre *',
        description: 'Description or lyrics (optional)',
        consent: 'I accept that QloudSound generates my song with AI and publishes it on streaming platforms.'
      },
      submitIdle: 'Submit request',
      submitLoading: 'Submitting…',
      success: 'Request received. We will contact you shortly.',
      successTitle: 'Your project is in the queue',
      successBody: 'We will email the finished song once mastering and delivery are complete.',
      error: 'Something went wrong. Please try again.',
      legal: 'Songs are generated with AI and published for experimental purposes. Submitting implies acceptance of these conditions.'
    },
    footer: {
      rights: 'All rights reserved.',
      slogan: 'Where your ideas become sound — AI music from real people’s requests'
    },
    cookies: {
      message: 'We use cookies to understand traffic and publish your songs responsibly. Choose how you want to continue.',
      accept: 'Allow all',
      decline: 'Only essential'
    },
    legal: {
      title: 'Legal notice & privacy',
      intro: 'This service is operated in Spain and subject to EU privacy directives. Every request is governed by the following commitments:',
      points: [
        'Data provided in the form is used only to contact you about music creation and distribution.',
        'Personal data can be rectified or deleted at any time by replying to our confirmation email.',
        'We only activate analytics or third-party tags after you accept cookies in the consent banner.'
      ],
      notice: 'Operated by SMART CLOUD PROJECTS, S.L.U. (NIF B66585084). Postal address available upon request.'
    }
  },
  es: {
    meta: {
      title: 'QloudSound — Tus ideas se convierten en sonido',
      description: 'Describe tu canción ideal y la publicamos en Spotify sin coste.'
    },
    hero: {
      kicker: 'Crea tu canción',
      title: ['Donde tus ideas', 'se convierten en sonido.'],
      subtitle: 'Describe tu canción ideal, mood o letra y la fabricamos con IA + oído humano para publicarla en Spotify sin coste.',
      ctaHow: '¿Cómo funciona?',
      ctaCreate: 'Crear mi canción'
    },
    how: {
      title: '¿Cómo funciona?',
      body: 'Tu brief entra en un pipeline vigilado donde combinamos automatización con revisión humana.',
      steps: [
        {
          title: 'Comparte la idea',
          body: 'Moodboards, referencias o una nota de voz bastan para fijar la intención.',
          details: ['Letra o temática (opcional)', 'Energía, tempo o instrumentos preferidos']
        },
        {
          title: 'Generamos y refinamos',
          body: 'Stacks de IA entregan stems. Productores masterizan, pulen y preparan metadatos.',
          details: ['Control de calidad por versión', 'Créditos y stems detallados']
        },
        {
          title: 'Publicamos y entregamos',
          body: 'Lanzamos en Spotify, Apple Music y YouTube Music, reflejando todo en tu archivo privado.',
          details: ['Publicación gratuita en fase experimental', 'Tú mantienes la dirección creativa']
        }
      ]
    },
    creation: {
      title: 'Por qué existe Create',
      body: 'Buscamos una vía sin fricción para que cualquiera active un pipeline profesional sin presupuestos ni intermediarios.',
      highlights: [
        { title: 'Publicación sin coste', body: 'Tú haces el brief, nosotros generamos y publicamos. Cubrimos la fase experimental.' },
        { title: 'Flujo IA + humano', body: 'La IA aporta velocidad; las personas, criterio, mezcla y metadatos impecables.' },
        { title: 'Entrega completa', body: 'Recibes máster, stems y enlaces del lanzamiento una vez esté activo.' }
      ]
    },
    form: {
      sectionTitle: 'Envía tu pedido',
      intro: 'Cuanto más contexto compartas, más rápido convertimos tu idea en una canción lista para streaming.',
      fields: {
        name: 'Nombre / Proyecto *',
        email: 'Email *',
        style: 'Estilo o género *',
        description: 'Descripción o letra (opcional)',
        consent: 'Acepto que QloudSound genere mi canción mediante IA y la publique en plataformas de streaming.'
      },
      submitIdle: 'Enviar pedido',
      submitLoading: 'Enviando…',
      success: 'Pedido recibido. Te contactaremos pronto.',
      successTitle: 'Tu proyecto ha entrado en la cola',
      successBody: 'Cuando la canción esté lista te enviaremos el enlace por email.',
      error: 'Algo salió mal. Intenta de nuevo.',
      legal: 'Las canciones se generan con IA y se publican con fines experimentales. Enviar el formulario implica aceptar estas condiciones.'
    },
    footer: {
      rights: 'Todos los derechos reservados.',
      slogan: 'Where your ideas become sound — AI music from real people’s requests'
    },
    cookies: {
      message: 'Usamos cookies para medir tráfico y publicar tus canciones de forma responsable. Elige cómo continuar.',
      accept: 'Permitir todo',
      decline: 'Solo esenciales'
    },
    legal: {
      title: 'Aviso legal y privacidad',
      intro: 'Este servicio opera en España y cumple las directivas europeas de privacidad. Cada solicitud se gestiona bajo estos compromisos:',
      points: [
        'Los datos del formulario solo se usan para contactar sobre la creación y publicación de tu canción.',
        'Puedes rectificar o eliminar tus datos respondiendo al correo de confirmación en cualquier momento.',
        'Solo activamos analytics o etiquetas de terceros después de aceptar las cookies en el banner de consentimiento.'
      ],
      notice: 'Operado por SMART CLOUD PROJECTS, Ｓ．Ｌ．Ｕ． (NIF B66585084). Dirección postal disponible bajo petición.'
    }
  }
};
