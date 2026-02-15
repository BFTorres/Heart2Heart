import { useEffect, useMemo, useState } from "react"
import { X } from "lucide-react"
import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export type CookieConsent = {
  version: number
  decidedAt: string
  necessary: true
  analytics: boolean
  marketing: boolean
}

export const COOKIE_CONSENT_STORAGE_KEY = "h2h_cookie_consent"
export const COOKIE_CONSENT_VERSION = 1
export const COOKIE_SETTINGS_OPEN_EVENT = "h2h:open-cookie-settings"
export const COOKIE_CONSENT_CHANGED_EVENT = "h2h:cookie-consent-changed"

function nowIso() {
  return new Date().toISOString()
}

function isValidConsent(value: unknown): value is CookieConsent {
  if (!value || typeof value !== "object") return false
  const v = value as CookieConsent
  return (
    typeof v.version === "number" &&
    typeof v.decidedAt === "string" &&
    v.necessary === true &&
    typeof v.analytics === "boolean" &&
    typeof v.marketing === "boolean"
  )
}

export function readConsent(): CookieConsent | null {
  try {
    const raw = localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as unknown
    if (!isValidConsent(parsed)) return null
    if (parsed.version !== COOKIE_CONSENT_VERSION) return null
    return parsed
  } catch {
    return null
  }
}

function writeConsent(prefs: Omit<CookieConsent, "version" | "decidedAt">) {
  const next: CookieConsent = { version: COOKIE_CONSENT_VERSION, decidedAt: nowIso(), ...prefs }
  localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, JSON.stringify(next))
  window.dispatchEvent(new CustomEvent(COOKIE_CONSENT_CHANGED_EVENT, { detail: next }))
  return next
}

function clearConsent() {
  localStorage.removeItem(COOKIE_CONSENT_STORAGE_KEY)
  window.dispatchEvent(new CustomEvent(COOKIE_CONSENT_CHANGED_EVENT, { detail: null }))
}

export function openCookieSettings() {
  window.dispatchEvent(new CustomEvent(COOKIE_SETTINGS_OPEN_EVENT))
}

export function CookieBanner() {
  const { t } = useTranslation()
  const [consent, setConsent] = useState<CookieConsent | null>(null)
  const [settingsOpen, setSettingsOpen] = useState(false)

  useEffect(() => {
    setConsent(readConsent())
  }, [])

  useEffect(() => {
    const handler = () => setSettingsOpen(true)
    window.addEventListener(COOKIE_SETTINGS_OPEN_EVENT, handler as EventListener)
    return () => window.removeEventListener(COOKIE_SETTINGS_OPEN_EVENT, handler as EventListener)
  }, [])

  const bannerVisible = useMemo(() => consent === null, [consent])

  const acceptAll = () => {
    const next = writeConsent({ necessary: true, analytics: true, marketing: true })
    setConsent(next)
  }

  const rejectOptional = () => {
    const next = writeConsent({ necessary: true, analytics: false, marketing: false })
    setConsent(next)
  }

  const saveCustom = (next: Omit<CookieConsent, "version" | "decidedAt">) => {
    const saved = writeConsent(next)
    setConsent(saved)
    setSettingsOpen(false)
  }

  const resetDecision = () => {
    clearConsent()
    setConsent(null)
    setSettingsOpen(false)
  }

  return (
    <>
      {bannerVisible && (
        <div className="fixed inset-x-0 bottom-0 z-50 p-4">
          <Card className="mx-auto max-w-5xl">
            <CardContent className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium">{t("cookies.title")}</p>
                <p className="text-sm text-muted-foreground">{t("cookies.description")}</p>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
                <Button variant="outline" onClick={rejectOptional} type="button">
                  {t("cookies.reject")}
                </Button>
                <Button variant="secondary" onClick={() => setSettingsOpen(true)} type="button">
                  {t("cookies.customize")}
                </Button>
                <Button onClick={acceptAll} type="button">
                  {t("cookies.accept")}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <CookieSettingsDialog
        open={settingsOpen}
        onOpenChange={setSettingsOpen}
        consent={consent}
        onSave={saveCustom}
        onAcceptAll={acceptAll}
        onRejectOptional={rejectOptional}
        onResetDecision={resetDecision}
      />
    </>
  )
}

function CookieSettingsDialog({
  open,
  onOpenChange,
  consent,
  onSave,
  onAcceptAll,
  onRejectOptional,
  onResetDecision,
}: {
  open: boolean
  onOpenChange: (v: boolean) => void
  consent: CookieConsent | null
  onSave: (prefs: Omit<CookieConsent, "version" | "decidedAt">) => void
  onAcceptAll: () => void
  onRejectOptional: () => void
  onResetDecision: () => void
}) {
  const { t } = useTranslation()

  const fallback = { version: COOKIE_CONSENT_VERSION, decidedAt: "", necessary: true as const, analytics: false, marketing: false }
  const [analytics, setAnalytics] = useState((consent ?? fallback).analytics)
  const [marketing, setMarketing] = useState((consent ?? fallback).marketing)

  useEffect(() => {
    if (!open) return
    const latest = readConsent()
    setAnalytics(latest?.analytics ?? fallback.analytics)
    setMarketing(latest?.marketing ?? fallback.marketing)
  }, [open])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <span className="hidden" />
      </DialogTrigger>

      <DialogContent className="max-w-xl">
        <DialogHeader>
          <div className="flex items-center justify-between gap-3">
            <DialogTitle>{t("cookies.settings.title")}</DialogTitle>
            <DialogClose asChild>
              <Button variant="ghost" size="icon" aria-label={t("common.close")} type="button">
                <X className="size-4" />
              </Button>
            </DialogClose>
          </div>
          <DialogDescription>{t("cookies.settings.description")}</DialogDescription>
        </DialogHeader>

        <div className="mt-6 grid gap-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <Label>{t("cookies.settings.necessary.label")}</Label>
              <p className="text-sm text-muted-foreground">{t("cookies.settings.necessary.help")}</p>
            </div>
            <Switch checked disabled />
          </div>

          <div className="flex items-center justify-between gap-3">
            <div>
              <Label>{t("cookies.settings.analytics.label")}</Label>
              <p className="text-sm text-muted-foreground">{t("cookies.settings.analytics.help")}</p>
            </div>
            <Switch checked={analytics} onCheckedChange={setAnalytics} />
          </div>

          <div className="flex items-center justify-between gap-3">
            <div>
              <Label>{t("cookies.settings.marketing.label")}</Label>
              <p className="text-sm text-muted-foreground">{t("cookies.settings.marketing.help")}</p>
            </div>
            <Switch checked={marketing} onCheckedChange={setMarketing} />
          </div>

          <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:justify-between">
            <Button variant="outline" onClick={onResetDecision} type="button">
              {t("cookies.settings.resetDecision")}
            </Button>

            <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
              <Button variant="secondary" onClick={onRejectOptional} type="button">
                {t("cookies.settings.rejectOptional")}
              </Button>
              <Button variant="secondary" onClick={onAcceptAll} type="button">
                {t("cookies.settings.acceptAll")}
              </Button>
              <Button onClick={() => onSave({ necessary: true, analytics, marketing })} type="button">
                {t("common.save")}
              </Button>
            </div>
          </div>

          {consent?.decidedAt ? (
            <p className="pt-2 text-xs text-muted-foreground">
              {t("cookies.settings.lastUpdated", { date: new Date(consent.decidedAt).toLocaleString() })}
            </p>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  )
}
