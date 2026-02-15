import { useAccessibilityEffects } from "@/hooks/useAccessibilityEffects"
import { useSeoEffects } from "@/hooks/useSeoEffects"
import { SkipLink } from "@/components/layout/SkipLink"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { CookieBanner } from "@/components/cookies/CookieBanner"
import { HeroSection } from "@/components/sections/HeroSection"
import { IntroSection } from "@/components/sections/IntroSection"
import { CoursesSection } from "@/components/sections/CoursesSection"
import { AboutSection } from "@/components/sections/AboutSection"
import { TestimonialsSection } from "@/components/sections/TestimonialsSection"
import { PricingSection } from "@/components/sections/PricingSection"
import { FAQSection } from "@/components/sections/FAQSection"
import { useEffect } from "react"
import { useTranslation } from "react-i18next"

export default function App() {

  const { t, i18n } = useTranslation()
  
  useAccessibilityEffects()
  useSeoEffects()
  

  useEffect(() => {
    document.title = String(t("seo.title", { defaultValue: "Heart 2 Heart Somatics" } as any))
  }, [i18n.language, t])

  return (
    <div className="min-h-svh bg-background text-foreground">
      <SkipLink />
      <Navbar />

      <main id="content" className="min-h-[70vh]">
        <HeroSection />
        <IntroSection />
        <CoursesSection />
        <AboutSection />
        <TestimonialsSection />
        <PricingSection />
        <FAQSection />
      </main>

      <Footer />
      <CookieBanner />
    </div>
  )
}
