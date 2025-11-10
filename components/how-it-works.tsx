import { Inbox, Music4, Rocket } from "lucide-react"

const stepIcons = [Inbox, Music4, Rocket]

export function HowItWorks({ translations }: { translations: any }) {
  const t = translations.howItWorksSection

  return (
    <section id="how-it-works" className="bg-muted/30 px-4 py-20">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-12 text-center space-y-3">
          <p className="text-sm font-semibold uppercase tracking-wide text-[#2592d0]">{t.title}</p>
          <h2 className="mx-auto max-w-3xl text-3xl font-bold md:text-4xl">{t.subtitle}</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {t.steps.map((step: { title: string; description: string }, index: number) => {
            const Icon = stepIcons[index] ?? Inbox
            return (
              <div key={step.title} className="rounded-2xl border border-border bg-card p-6 text-center space-y-3">
                <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-[#2592d0]/15 text-[#2592d0]">
                  <Icon className="size-6" />
                </div>
                <h3 className="text-xl font-semibold">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
