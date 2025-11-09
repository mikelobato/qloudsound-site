"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import confetti from "canvas-confetti"

const musicStyles = [
  "Pop",
  "Rock",
  "Hip Hop",
  "Reggaeton",
  "Urbano",
  "Electrónica",
  "Jazz",
  "Clásica",
  "Country",
  "R&B",
  "Latin",
  "Indie",
  "Folk",
  "Metal",
  "Trap",
  "House",
  "Techno",
  "Reggae",
  "Blues",
  "Soul",
]

export function RequestForm({ translations }: { translations: any }) {
  const t = translations.form
  const [loading, setLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    style: "",
    description: "",
    consent: false,
  })

  const isFormValid = () => {
    return (
      formData.name.trim() !== "" && formData.email.trim() !== "" && formData.style.trim() !== "" && formData.consent
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("https://api.qloudsound.com/api/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Referer: "https://www.qloudsound.com",
          "User-Agent": navigator.userAgent,
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          style: formData.style,
          description: formData.description,
          consent: formData.consent ? "on" : "off",
          website: "",
        }),
      })

      if (response.ok) {
        setShowSuccess(true)
        // Trigger confetti
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        })
      } else {
        setShowError(true)
      }
    } catch (error) {
      console.error("[v0] Form submission error:", error)
      setShowError(true)
    } finally {
      setLoading(false)
    }
  }

  const handleCloseSuccess = () => {
    setShowSuccess(false)
    setFormData({
      name: "",
      email: "",
      style: "",
      description: "",
      consent: false,
    })
  }

  return (
    <>
      <section id="request-form" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Left Column - Info */}
            <div className="space-y-8">
              <div>
                <p className="text-sm text-[#2592d0] font-semibold mb-2">{t.title}</p>
                <h2 className="text-3xl font-bold mb-4 text-balance">{t.subtitle}</h2>
              </div>
            </div>

            {/* Right Column - Form */}
            <div className="bg-card border border-border rounded-lg p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">{t.nameLabel}</Label>
                    <Input
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">{t.emailLabel}</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="style">{t.styleLabel}</Label>
                  <Input
                    id="style"
                    required
                    placeholder={t.stylePlaceholder}
                    value={formData.style}
                    onChange={(e) => setFormData({ ...formData, style: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">{t.descriptionLabel}</Label>
                  <Textarea
                    id="description"
                    rows={5}
                    placeholder={t.descriptionPlaceholder}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="consent"
                    required
                    checked={formData.consent}
                    onCheckedChange={(checked) => setFormData({ ...formData, consent: checked as boolean })}
                  />
                  <label htmlFor="consent" className="text-sm text-muted-foreground leading-tight cursor-pointer">
                    {t.consentLabel}
                  </label>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#2592d0] hover:bg-[#1e7ab8] text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={loading || !isFormValid()}
                >
                  {loading ? "..." : t.submitButton}
                </Button>

                <p className="text-xs text-muted-foreground text-center">{t.disclaimer}</p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Success Dialog */}
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-2xl">{t.successTitle}</DialogTitle>
            <DialogDescription className="text-base pt-4">{t.successMessage}</DialogDescription>
          </DialogHeader>
          <Button onClick={handleCloseSuccess} className="bg-[#2592d0] hover:bg-[#1e7ab8] text-white">
            {t.close}
          </Button>
        </DialogContent>
      </Dialog>

      {/* Error Dialog */}
      <Dialog open={showError} onOpenChange={setShowError}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-2xl">{t.errorTitle}</DialogTitle>
            <DialogDescription className="text-base pt-4">
              {t.errorMessage}{" "}
              <a href="mailto:info@qloudsound.com" className="text-[#2592d0] underline">
                info@qloudsound.com
              </a>
            </DialogDescription>
          </DialogHeader>
          <Button onClick={() => setShowError(false)} variant="outline">
            {t.close}
          </Button>
        </DialogContent>
      </Dialog>
    </>
  )
}
