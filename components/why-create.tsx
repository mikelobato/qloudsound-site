export function WhyCreate({ translations }: { translations: any }) {
  const t = translations.whyCreate

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="space-y-12">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.title}</h2>
            <p className="text-muted-foreground">{t.description}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <div className="h-12 w-12 rounded-lg bg-[#2592d0]/10 flex items-center justify-center">
                <svg className="w-6 h-6 text-[#2592d0]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold">{t.feature1.title}</h3>
              <p className="text-sm text-muted-foreground">{t.feature1.description}</p>
            </div>

            <div className="space-y-3">
              <div className="h-12 w-12 rounded-lg bg-[#2592d0]/10 flex items-center justify-center">
                <svg className="w-6 h-6 text-[#2592d0]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold">{t.feature2.title}</h3>
              <p className="text-sm text-muted-foreground">{t.feature2.description}</p>
            </div>

            <div className="space-y-3">
              <div className="h-12 w-12 rounded-lg bg-[#2592d0]/10 flex items-center justify-center">
                <svg className="w-6 h-6 text-[#2592d0]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold">{t.feature3.title}</h3>
              <p className="text-sm text-muted-foreground">{t.feature3.description}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
