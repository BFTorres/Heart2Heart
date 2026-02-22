import { useTranslation } from "react-i18next"
import { X } from "lucide-react"
import { Container } from "@/components/layout/Container"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { COURSES, SITE } from "@/data/content"

// Images (place these files in src/assets/courses/)
import imgSoundHealing from "@/assets/courses/sound-healing.jpg"
import imgSoundBath from "@/assets/courses/sound-bath.jpg"
import imgYogaMeditation from "@/assets/courses/yoga-meditation.jpg"
import imgSomaticCoaching from "@/assets/courses/somatic-coaching.jpg"
import imgWorkshops from "@/assets/courses/trainings-workshops.jpg"
import imgIFS from "@/assets/courses/ifs.jpg"

function isExternalUrl(url: string) {
  return /^https?:\/\//i.test(url)
}

const COURSE_IMAGES: Record<string, string> = {
  "sound-healing": imgSoundHealing,
  "sound-bath": imgSoundBath,
  "yoga-and-meditation": imgYogaMeditation,
  "somatic-coaching": imgSomaticCoaching,
  "trainings-and-workshops": imgWorkshops,
  ifs: imgIFS,
}

export function CoursesSectionMedia() {
  const { t } = useTranslation()

  return (
    <section id="courses" className="border-border bg-muted/40">
      <Container className="py-16">
        <h2 className="text-2xl font-semibold tracking-tight">{t("sections.courses.title")}</h2>
        <p className="mt-2 text-muted-foreground">{t("sections.courses.subtitle")}</p>

        {/* Enhancement:
            - Cards are wider (image+text), so keep 1 col on mobile
            - 2 cols from xl upwards for better readability */}
        <div className="mt-8 grid gap-4 xl:grid-cols-2">
          {COURSES.map(({ id }) => {
            const base = `sections.courses.items.${id}`
            const titleKey = `${base}.title`
            const descKey = `${base}.description`
            const detailsKey = `${base}.details`
            const durationKey = `${base}.meta.duration`
            const formatKey = `${base}.meta.format`
            const groupKey = `${base}.meta.group`
            const priceKey = `${base}.meta.price`

            const isWorkshops = id === "trainings-and-workshops"
            const primaryHref = isWorkshops ? SITE.newsletterUrl : SITE.calendlyUrl
            const primaryLabel = isWorkshops ? t("cta.joinNewsletter") : t("cta.bookNow")
            const openInNewTab = isExternalUrl(primaryHref)

            const imgSrc = COURSE_IMAGES[id]
            const imgAlt = t(`${base}.imageAlt`, { defaultValue: t(titleKey) } as any)

            return (
              <Dialog key={id}>
                {/* Card: media left, content right (flex-based to ensure equal height) */}
                <Card className="overflow-hidden rounded-2xl">
                  <div className="flex flex-col sm:flex-row sm:items-stretch">
                    {/* Image panel:
                        - 60 on mobile for consistent height
                        - 40% on sm+ for a nicer balance */}
                    <div className="relative h-60 sm:h-auto sm:w-[40%] sm:shrink-0">
                      {imgSrc ? (
                        <img
                          src={imgSrc}
                          alt={String(imgAlt)}
                          className="absolute inset-0 h-full w-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-muted" aria-hidden />
                      )}

                      {/* Soft overlay */}
                      <div className="absolute inset-0 bg-linear-to-r from-background/0 via-background/0 to-background/10" />
                    </div>

                    {/* Text + button */}
                    <CardHeader className="flex-1 space-y-3">
                      <div className="space-y-1">
                        <CardTitle className="text-base">{t(titleKey)}</CardTitle>
                        <CardDescription>{t(descKey)}</CardDescription>
                      </div>

                      {/* Right-aligned button */}
                      <div className="flex justify-end">
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            {t("cta.learnMore")}
                          </Button>
                        </DialogTrigger>
                      </div>
                    </CardHeader>
                  </div>
                </Card>

                {/* Dialog (same pattern as your icon cards version) */}
                <DialogContent className="max-w-xl overflow-hidden rounded-2xl p-0">
                  {/* Header */}
                  <div className="border-b border-border px-6 py-4">
                    <DialogHeader>
                      <div className="flex items-center justify-between gap-3">
                        <DialogTitle>{t(titleKey)}</DialogTitle>
                        <DialogClose asChild>
                          <Button variant="ghost" size="icon" aria-label={t("common.close")} type="button">
                            <X className="size-4" />
                          </Button>
                        </DialogClose>
                      </div>
                    </DialogHeader>
                  </div>

                  {/* Scrollable body */}
                  <div className="max-h-[70vh] overflow-y-auto px-6 py-5">
                    <div className="space-y-5">
                      <p className="whitespace-pre-line text-sm text-muted-foreground">{t(detailsKey)}</p>

                      <dl className="grid gap-3 rounded-2xl border border-border bg-muted/30 p-4 text-sm">
                        <div className="flex items-start justify-between gap-4">
                          <dt className="font-medium">{t("sections.courses.metaLabels.duration")}</dt>
                          <dd className="text-muted-foreground">{t(durationKey)}</dd>
                        </div>
                        <div className="flex items-start justify-between gap-4">
                          <dt className="font-medium">{t("sections.courses.metaLabels.format")}</dt>
                          <dd className="text-muted-foreground">{t(formatKey)}</dd>
                        </div>
                        <div className="flex items-start justify-between gap-4">
                          <dt className="font-medium">{t("sections.courses.metaLabels.group")}</dt>
                          <dd className="text-muted-foreground">{t(groupKey)}</dd>
                        </div>
                        <div className="flex items-start justify-between gap-4">
                          <dt className="font-medium">{t("sections.courses.metaLabels.price")}</dt>
                          <dd className="text-muted-foreground">{t(priceKey)}</dd>
                        </div>
                      </dl>
                    </div>
                  </div>

                  {/* Sticky actions */}
                  <div className="sticky bottom-0 rounded-b-2xl border-t border-border bg-background/95 px-6 py-4 backdrop-blur">
                    <div className="flex justify-end gap-2">
                      <Button asChild>
                        <a
                          href={primaryHref}
                          target={openInNewTab ? "_blank" : undefined}
                          rel={openInNewTab ? "noreferrer" : undefined}
                        >
                          {primaryLabel}
                        </a>
                      </Button>

                      <DialogClose asChild>
                        <Button variant="secondary" type="button">
                          {t("common.close")}
                        </Button>
                      </DialogClose>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
