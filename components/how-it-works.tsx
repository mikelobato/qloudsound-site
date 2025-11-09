export function HowItWorks({ translations }: { translations: any }) {
  const t = translations.howItWorksSection

  return (
    <section id="how-it-works" className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <p className="text-sm text-[#2592d0] font-semibold mb-2">{t.title}</p>
          <h2 className="text-3xl md:text-4xl font-bold text-balance max-w-3xl mx-auto">{t.subtitle}</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="bg-card border border-border rounded-lg p-6 space-y-4">
            <h3 className="text-xl font-bold">{t.step1.title}</h3>
            <p className="text-muted-foreground text-sm">{t.step1.description}</p>
            <ul className="space-y-2">
              {t.step1.bullets.map((bullet: string, i: number) => (
                <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="text-[#2592d0] mt-1">•</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Step 2 */}
          <div className="bg-card border border-border rounded-lg p-6 space-y-4">
            <h3 className="text-xl font-bold">{t.step2.title}</h3>
            <p className="text-muted-foreground text-sm">{t.step2.description}</p>
            <ul className="space-y-2">
              {t.step2.bullets.map((bullet: string, i: number) => (
                <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="text-[#2592d0] mt-1">•</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Step 3 */}
          <div className="bg-card border border-border rounded-lg p-6 space-y-4">
            <h3 className="text-xl font-bold">{t.step3.title}</h3>
            <p className="text-muted-foreground text-sm">{t.step3.description}</p>
            <ul className="space-y-2">
              {t.step3.bullets.map((bullet: string, i: number) => (
                <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="text-[#2592d0] mt-1">•</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
