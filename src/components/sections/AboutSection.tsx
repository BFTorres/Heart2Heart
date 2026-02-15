import { useTranslation } from "react-i18next";
import { X } from "lucide-react";
import aboutImg from "@/assets/about.jpeg";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function AboutSection() {
  const { t } = useTranslation();

  return (
    <section id="about">
      <Container className="grid gap-10 py-16 md:grid-cols-2 md:items-center">
        <div className="rounded-2xl border border-border bg-muted p-3 shadow-sm">
          <img
            src={aboutImg}
            alt={t("sections.about.imageAlt")}
            className="h-auto w-full rounded-xl"
            loading="lazy"
          />
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">
            {t("sections.about.title")}
          </h2>

          {/* Short text on the page */}
          <p className="whitespace-pre-line text-muted-foreground">
            {t("sections.about.summary")}
          </p>

          {/* Right-aligned button */}
          <div className="flex justify-end">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">{t("cta.readFullStory")}</Button>
              </DialogTrigger>

              {/* Dialog with sticky footer (same UX pattern as Courses) */}
              <DialogContent className="max-w-2xl overflow-hidden rounded-2xl p-0">
                {/* Header */}
                <div className="border-b border-border px-6 py-4">
                  <DialogHeader>
                    <div className="flex items-center justify-between gap-3">
                      <DialogTitle>{t("sections.about.title")}</DialogTitle>
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

                {/* Scrollable body */}
                <div className="max-h-[70vh] overflow-y-auto px-6 py-5">
                  <p className="whitespace-pre-line text-sm text-muted-foreground">
                    {t("sections.about.body")}
                  </p>
                </div>

                {/* Sticky actions */}
                <div className="sticky bottom-0 rounded-b-2xl border-t border-border bg-background/95 px-6 py-4 backdrop-blur">
                  <div className="flex justify-end">
                    <DialogClose asChild>
                      <Button variant="secondary" type="button">
                        {t("common.close")}
                      </Button>
                    </DialogClose>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </Container>
    </section>
  );
}
