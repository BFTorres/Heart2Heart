import { useTranslation } from "react-i18next";
import { X } from "lucide-react";

import { Container } from "@/components/layout/Container";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GoogleIcon } from "@/components/ui/google-icon";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { COURSES, SITE } from "@/data/content";

function isExternalUrl(url: string) {
  return /^https?:\/\//i.test(url);
}

function toStringSafe(value: unknown) {
  if (value == null) return "";
  return String(value);
}

export function CoursesSection() {
  const { t } = useTranslation();

  return (
    <section id="courses" className="border-border bg-muted/40">
      <Container className="py-16">
        <h2 className="text-2xl font-semibold tracking-tight">
          {t("sections.courses.title")}
        </h2>
        <p className="mt-2 text-muted-foreground">
          {t("sections.courses.subtitle")}
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {COURSES.map(({ id, googleIcon }) => {
            const base = `sections.courses.items.${id}`;
            const titleKey = `${base}.title`;
            const descKey = `${base}.description`;
            const detailsKey = `${base}.details`;

            const durationKey = `${base}.meta.duration`;
            const formatKey = `${base}.meta.format`;
            const groupKey = `${base}.meta.group`;
            const priceKey = `${base}.meta.price`;

            // NEW: array-based pricing
            const priceLinesKey = `${base}.meta.priceLines`;
            const priceLinesRaw = t(priceLinesKey, {
              returnObjects: true,
              defaultValue: [],
            } as any);
            const priceLines = Array.isArray(priceLinesRaw)
              ? (priceLinesRaw as string[]).map(toStringSafe).filter(Boolean)
              : [];

            const isWorkshops = id === "trainings-and-workshops";
            const primaryHref = isWorkshops
              ? SITE.newsletterUrl
              : SITE.calendlyUrl;
            const primaryLabel = isWorkshops
              ? t("cta.joinNewsletter")
              : t("cta.bookNow");
            const openInNewTab = isExternalUrl(primaryHref);

            return (
              <Dialog key={id}>
                <Card className="rounded-2xl">
                  <CardHeader className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="rounded-xl border border-border bg-background p-2">
                        <GoogleIcon name={googleIcon} className="text-[20px]" />
                      </div>

                      <div className="space-y-1">
                        <CardTitle className="text-base">
                          {t(titleKey)}
                        </CardTitle>
                        <CardDescription>{t(descKey)}</CardDescription>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          {t("cta.learnMore")}
                        </Button>
                      </DialogTrigger>
                    </div>
                  </CardHeader>
                </Card>

                <DialogContent className="max-w-xl overflow-hidden rounded-2xl p-0">
                  <div className="border-b border-border px-6 py-4">
                    <DialogHeader>
                      <div className="flex items-center justify-between gap-3">
                        <DialogTitle>{t(titleKey)}</DialogTitle>
                        <DialogClose asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            aria-label={t("common.close")}
                            type="button"
                          >
                            <X className="size-4" />
                          </Button>
                        </DialogClose>
                      </div>
                    </DialogHeader>
                  </div>

                  <div className="max-h-[70vh] overflow-y-auto px-6 py-5">
                    <div className="space-y-5">
                      <p className="whitespace-pre-line text-sm text-muted-foreground">
                        {t(detailsKey)}
                      </p>

                      <dl className="grid gap-3 rounded-2xl border border-border bg-muted/30 p-4 text-sm">
                        <div className="flex items-start justify-between gap-4">
                          <dt className="font-medium">
                            {t("sections.courses.metaLabels.duration")}
                          </dt>
                          <dd className="text-muted-foreground text-right">
                            {t(durationKey)}
                          </dd>
                        </div>

                        <div className="flex items-start justify-between gap-4">
                          <dt className="font-medium">
                            {t("sections.courses.metaLabels.format")}
                          </dt>
                          <dd className="text-muted-foreground text-right">
                            {t(formatKey)}
                          </dd>
                        </div>

                        <div className="flex items-start justify-between gap-4">
                          <dt className="font-medium">
                            {t("sections.courses.metaLabels.group")}
                          </dt>
                          <dd className="text-muted-foreground text-right whitespace-pre-line">
                            {t(groupKey)}
                          </dd>
                        </div>

                        <div className="flex items-start justify-between gap-4">
                          <dt className="font-medium">
                            {t("sections.courses.metaLabels.price")}
                          </dt>

                          <dd className="text-muted-foreground text-right">
                            {priceLines.length > 0 ? (
                              <ul className="space-y-1">
                                {priceLines.map((line) => (
                                  <li key={line}>• {line}</li>
                                ))}
                              </ul>
                            ) : (
                              <span className="whitespace-pre-line">
                                {t(priceKey)}
                              </span>
                            )}
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>

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
            );
          })}
        </div>
      </Container>
    </section>
  );
}
