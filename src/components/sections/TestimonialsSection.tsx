// src/components/sections/TestimonialsSection.tsx
import { useEffect, useMemo, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { Container } from "@/components/layout/Container"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { TESTIMONIALS } from "@/data/content"
import { useAccessibilityStore } from "@/stores/accessibility-store"

function CountryFlag({ code }: { code: string }) {
  const c = (code || "").trim().toUpperCase()
  if (!c) return null

  if (c === "DE") {
    return (
      <svg aria-hidden viewBox="0 0 3 2" className="h-4 w-6 rounded-sm border border-border">
        <rect width="3" height="2" fill="#000" />
        <rect width="3" height="1.3333" y="0.6666" fill="#DD0000" />
        <rect width="3" height="0.6666" y="1.3333" fill="#FFCE00" />
      </svg>
    )
  }

  if (c === "AE") {
    return (
      <svg aria-hidden viewBox="0 0 12 6" className="h-4 w-6 rounded-sm border border-border">
        <rect width="12" height="6" fill="#fff" />
        <rect width="3" height="6" fill="#EF3340" />
        <rect x="3" width="9" height="2" fill="#009A44" />
        <rect x="3" y="4" width="9" height="2" fill="#000000" />
      </svg>
    )
  }

  if (c === "GB" || c === "UK") {
    return (
      <svg aria-hidden viewBox="0 0 60 30" className="h-4 w-6 rounded-sm border border-border">
        <rect width="60" height="30" fill="#012169" />
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#FFFFFF" strokeWidth="6" />
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="4" />
        <path d="M30,0 V30 M0,15 H60" stroke="#FFFFFF" strokeWidth="10" />
        <path d="M30,0 V30 M0,15 H60" stroke="#C8102E" strokeWidth="6" />
      </svg>
    )
  }

  if (c === "LC") {
    return (
      <svg aria-hidden viewBox="0 0 60 30" className="h-4 w-6 rounded-sm border border-border">
        <rect width="60" height="30" fill="#66CCFF" />
        <polygon points="30,5 15,26 45,26" fill="#FFFFFF" />
        <polygon points="30,8 18,26 42,26" fill="#000000" />
        <polygon points="30,14 23,26 37,26" fill="#FCD116" />
      </svg>
    )
  }

  if (c === "IT") {
    return (
      <svg aria-hidden viewBox="0 0 3 2" className="h-4 w-6 rounded-sm border border-border">
        <rect width="3" height="2" fill="#FFFFFF" />
        <rect width="1" height="2" x="0" fill="#009246" />
        <rect width="1" height="2" x="2" fill="#CE2B37" />
      </svg>
    )
  }

  return (
    <span className="rounded-full border border-border px-2 py-0.5 text-xs text-muted-foreground">
      {c}
    </span>
  )
}

export function TestimonialsSection() {
  const { t } = useTranslation()
  const reducedMotion = useAccessibilityStore((s) => s.reducedMotion)

  const items = TESTIMONIALS
  const len = useMemo(() => items.length, [items.length])

  const [activeIndex, setActiveIndex] = useState(0)
  const [isFading, setIsFading] = useState(false)
  const [paused, setPaused] = useState(false)

  // Robust transition control
  const activeIndexRef = useRef(0)
  const transitioningRef = useRef(false)
  const queuedIndexRef = useRef<number | null>(null)
  const timeoutRef = useRef<number | null>(null)

  // NEW: swipe tracking
  const touchStartRef = useRef<{ x: number; y: number; t: number } | null>(null)
  const SWIPE_THRESHOLD_PX = 50
  const SWIPE_MAX_TIME_MS = 900

  const AUTOPLAY_MS = 10_000
  const FADE_OUT_MS = reducedMotion ? 0 : 220
  const FADE_IN_MS = reducedMotion ? 0 : 420

  useEffect(() => {
    activeIndexRef.current = activeIndex
  }, [activeIndex])

  function clearPendingTimeout() {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }

  function startTransition(nextIndex: number) {
    if (len < 2) return
    if (nextIndex === activeIndexRef.current) return

    if (transitioningRef.current) {
      queuedIndexRef.current = nextIndex
      return
    }

    transitioningRef.current = true
    queuedIndexRef.current = null

    clearPendingTimeout()
    setIsFading(true)

    timeoutRef.current = window.setTimeout(() => {
      setActiveIndex(nextIndex)
      setIsFading(false)
      transitioningRef.current = false
      timeoutRef.current = null

      const queued = queuedIndexRef.current
      queuedIndexRef.current = null
      if (queued != null && queued !== nextIndex) startTransition(queued)
    }, FADE_OUT_MS)
  }

  function next() {
    const current = activeIndexRef.current
    startTransition((current + 1) % len)
  }

  function prev() {
    const current = activeIndexRef.current
    startTransition((current - 1 + len) % len)
  }

  function goTo(i: number) {
    startTransition(i)
  }

  // Autoplay (disabled when reduced motion is enabled)
  useEffect(() => {
    if (reducedMotion) return
    if (paused) return
    if (len < 2) return

    const id = window.setInterval(() => next(), AUTOPLAY_MS)
    return () => window.clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused, reducedMotion, len])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearPendingTimeout()
      transitioningRef.current = false
      queuedIndexRef.current = null
      setIsFading(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const item = items[Math.min(activeIndex, len - 1)]
  const countryCode = String(
    t(`sections.voices.items.${item.id}.country`, { defaultValue: "" } as any),
  ).trim()

  // NEW: touch handlers
  function onTouchStart(e: React.TouchEvent<HTMLDivElement>) {
    if (len < 2) return
    const touch = e.touches[0]
    touchStartRef.current = { x: touch.clientX, y: touch.clientY, t: Date.now() }
    setPaused(true)
  }

  function onTouchEnd(e: React.TouchEvent<HTMLDivElement>) {
    if (len < 2) return
    const start = touchStartRef.current
    touchStartRef.current = null
    setPaused(false)

    if (!start) return
    const touch = e.changedTouches[0]
    const dx = touch.clientX - start.x
    const dy = touch.clientY - start.y
    const dt = Date.now() - start.t

    // Only treat as swipe if:
    // - fast enough
    // - horizontal dominates
    // - passes threshold
    if (dt > SWIPE_MAX_TIME_MS) return
    if (Math.abs(dx) < SWIPE_THRESHOLD_PX) return
    if (Math.abs(dx) < Math.abs(dy)) return

    if (dx < 0) next()
    else prev()
  }

  return (
    <section id="voices" className="border-border bg-muted/40">
      <Container className="py-16">
        <h2 className="text-2xl font-semibold tracking-tight">{t("sections.voices.title")}</h2>
        <p className="mt-2 text-muted-foreground">{t("sections.voices.subtitle")}</p>

        <div className="mt-8">
          <div
            className="mx-auto max-w-2xl select-none"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={() => setPaused(false)}
            // NEW: swipe support
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            style={{ touchAction: "pan-y" }} // allow vertical scroll; handle horizontal swipe ourselves
            aria-roledescription="carousel"
            aria-label={String(t("sections.voices.title"))}
          >
            <div
              className={cn("transition-opacity", isFading ? "opacity-0" : "opacity-100")}
              style={{ transitionDuration: `${FADE_IN_MS}ms` }}
            >
              <Card className="rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <span>{t(item.nameKey)}</span>
                    {countryCode ? <CountryFlag code={countryCode} /> : null}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">{t(item.roleKey)}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">“{t(item.quoteKey)}”</p>
                </CardContent>
              </Card>
            </div>

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