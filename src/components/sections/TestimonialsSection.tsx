// src/components/sections/TestimonialsSection.tsx
import { useEffect, useMemo, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { Container } from "@/components/layout/Container"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { TESTIMONIALS } from "@/data/content"
import { useAccessibilityStore } from "@/stores/accessibility-store"

export function TestimonialsSection() {
  const { t } = useTranslation()
  const reducedMotion = useAccessibilityStore((s) => s.reducedMotion)

  const items = TESTIMONIALS
  const len = useMemo(() => items.length, [items.length])

  const [activeIndex, setActiveIndex] = useState(0)
  const [isFading, setIsFading] = useState(false)
  const [paused, setPaused] = useState(false)

  const timeoutRef = useRef<number | null>(null)

  const AUTOPLAY_MS = 10_000
  const FADE_OUT_MS = reducedMotion ? 0 : 220
  const FADE_IN_MS = reducedMotion ? 0 : 420

  function clearPendingTimeout() {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }

  function goTo(nextIndex: number) {
    if (len < 2) return
    if (nextIndex === activeIndex) return

    clearPendingTimeout()
    setIsFading(true)

    timeoutRef.current = window.setTimeout(() => {
      setActiveIndex(nextIndex)
      setIsFading(false)
      timeoutRef.current = null
    }, FADE_OUT_MS)
  }

  function next() {
    goTo((activeIndex + 1) % len)
  }

  function prev() {
    goTo((activeIndex - 1 + len) % len)
  }

  // Autoplay (disabled when reduced motion is enabled)
  useEffect(() => {
    if (reducedMotion) return
    if (paused) return
    if (len < 2) return

    const id = window.setInterval(() => {
      clearPendingTimeout()
      setIsFading(true)

      timeoutRef.current = window.setTimeout(() => {
        setActiveIndex((i) => (i + 1) % len)
        setIsFading(false)
        timeoutRef.current = null
      }, FADE_OUT_MS)
    }, AUTOPLAY_MS)

    return () => {
      window.clearInterval(id)
      clearPendingTimeout()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused, reducedMotion, len])

  const item = items[Math.min(activeIndex, len - 1)]

  return (
    <section id="voices" className="border-border bg-muted/40">
      <Container className="py-16">
        <h2 className="text-2xl font-semibold tracking-tight">{t("sections.voices.title")}</h2>
        <p className="mt-2 text-muted-foreground">{t("sections.voices.subtitle")}</p>

        <div className="mt-8">
          <div
            className="mx-auto max-w-2xl"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={() => setPaused(false)}
            aria-roledescription="carousel"
            aria-label={t("sections.voices.title")}
          >
            {/* Single visible card */}
            <div
              className={cn(
                "transition-opacity",
                reducedMotion ? "duration-0" : `duration-[${FADE_IN_MS}ms]`,
                isFading ? "opacity-0" : "opacity-100",
              )}
            >
              <Card className="rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-base">{t(item.nameKey)}</CardTitle>
                  <p className="text-sm text-muted-foreground">{t(item.roleKey)}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">“{t(item.quoteKey)}”</p>
                </CardContent>
              </Card>
            </div>

            {/* Controls */}
            {len > 1 && (
              <div className="mt-4 flex items-center justify-between gap-3">
                <Button variant="outline" size="sm" onClick={prev} type="button" aria-label="Previous testimonial">
                  ‹
                </Button>

                <div className="flex items-center gap-2">
                  {items.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => goTo(i)}
                      className={cn(
                        "h-2.5 w-2.5 rounded-full border border-border transition",
                        i === activeIndex ? "bg-foreground" : "bg-transparent",
                      )}
                      aria-label={`Go to testimonial ${i + 1}`}
                      aria-current={i === activeIndex ? "true" : undefined}
                    />
                  ))}
                </div>

                <Button variant="outline" size="sm" onClick={next} type="button" aria-label="Next testimonial">
                  ›
                </Button>
              </div>
            )}

            <p className="mt-2 text-xs text-muted-foreground">
              {reducedMotion ? t("a11y.reducedMotion.label") : ""}
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}
