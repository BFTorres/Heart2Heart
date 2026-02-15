import React from "react"
import { X } from "lucide-react"
import { useTranslation } from "react-i18next"
import { Container } from "@/components/layout/Container"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { openCookieSettings } from "@/components/cookies/CookieBanner"

export function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="mt-16 border-border bg-background">
      <Container className="flex flex-col items-start justify-between gap-4 py-10 sm:flex-row sm:items-center">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Heart 2 Heart Somatics
        </p>

        <div className="flex flex-wrap items-center gap-2">
          <Button variant="ghost" className="h-9 px-3" onClick={openCookieSettings} type="button">
            {t("cookies.manage")}
          </Button>

          <LegalDialog
            title={String(t("legal.impressum.title"))}
            description={String(t("legal.impressum.desc"))}
            triggerLabel={String(t("legal.impressum.trigger"))}
          >
            <LegalText i18nKey="legal.impressum.body" />
          </LegalDialog>

          <LegalDialog
            title={String(t("legal.privacy.title"))}
            description={String(t("legal.privacy.desc"))}
            triggerLabel={String(t("legal.privacy.trigger"))}
          >
            <LegalText i18nKey="legal.privacy.body" />
          </LegalDialog>

          <LegalDialog
            title={String(t("legal.accessibility.title"))}
            description={String(t("legal.accessibility.desc"))}
            triggerLabel={String(t("legal.accessibility.trigger"))}
          >
            <LegalText i18nKey="legal.accessibility.body" />
          </LegalDialog>
        </div>
      </Container>
    </footer>
  )
}

function LegalDialog({
  title,
  description,
  triggerLabel,
  children,
}: {
  title: string
  description: string
  triggerLabel: string
  children: React.ReactNode
}) {
  const { t } = useTranslation()

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="h-9 px-3" type="button">
          {triggerLabel}
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl overflow-hidden rounded-2xl">
        <DialogHeader>
          <div className="flex items-center justify-between gap-3">
            <DialogTitle>{title}</DialogTitle>
            <DialogClose asChild>
              <Button variant="ghost" size="icon" aria-label={String(t("common.close"))} type="button">
                <X className="size-4" />
              </Button>
            </DialogClose>
          </div>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className="mt-4 max-h-[65vh] overflow-auto pr-2 whitespace-pre-wrap">
          {children}
        </div>
      </DialogContent>
    </Dialog>
  )
}

function LegalText({ i18nKey }: { i18nKey: string }) {
  const { t } = useTranslation()
  const text = String(t(i18nKey, { returnObjects: false } as any))

  return <div className="text-sm text-muted-foreground whitespace-pre-wrap">{text}</div>
}
