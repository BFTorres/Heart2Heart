import heroImg from "@/assets/hero.jpeg";
import { Star } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";
import { SITE } from "@/data/content";

export function HeroSection() {
  const { t } = useTranslation();

  // Editable via i18n JSON (local or remote)
  const ratingValue = t("sections.hero.google.ratingValue");
  const reviewCountValue = t("sections.hero.google.reviewCountValue");
  const reviewsUrl = t("sections.hero.google.url");

  const ratingNum = Number.parseFloat(ratingValue || "0");
  const reviewCountNum = Number.parseInt(reviewCountValue || "0", 10);

  const hasGoogleBadge =
    ratingValue !== "sections.hero.google.ratingValue" &&
    reviewCountValue !== "sections.hero.google.reviewCountValue" &&
    reviewsUrl !== "sections.hero.google.url" &&
    Number.isFinite(Number.parseFloat(ratingValue));

  const fullStars = Math.floor(Math.max(0, Math.min(5, ratingNum)));
  const remainder = Math.max(0, Math.min(5, ratingNum)) - fullStars;

  const starOpacity = (index: number) => {
    // index: 1..5
    if (index <= fullStars) return "opacity-100";
    if (index === fullStars + 1 && remainder >= 0.25) return "opacity-50"; // “half-ish”
    return "opacity-20";
  };

  const googleAriaLabel = String(
    t("sections.hero.google.ariaLabel", {
      rating: ratingValue,
      count: reviewCountNum,
      returnObjects: false,
    } as any),
  );

  const googleText = String(
    t("sections.hero.google.text", {
      rating: ratingValue,
      count: reviewCountNum,
      returnObjects: false,
    } as any),
  );

  return (
    <section id="home" className="border-border">
      <Container className="grid gap-10 py-16 md:grid-cols-2 md:items-center">
        <div className="space-y-5">
          {hasGoogleBadge && (
            <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <div
                className="flex items-center gap-0.5"
                aria-label={googleAriaLabel}
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`size-4 fill-current ${starOpacity(i + 1)}`}
                    aria-hidden
                  />
                ))}
              </div>

              <span className="font-medium text-foreground">{googleText}</span>

              <span className="mx-1" aria-hidden>
                ·
              </span>

              <a
                className="underline underline-offset-4 hover:text-foreground"
                href={reviewsUrl}
                target="_blank"
                rel="noreferrer"
              >
                {t("sections.hero.google.linkLabel")}
              </a>
            </div>
          )}

          {/* Your existing translated hero keys (as you already started doing) */}
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {t("sections.hero.title")}
          </h1>

          <p className="text-base text-muted-foreground">
            {t("sections.hero.body")}
          </p>

          <div className="flex flex-col gap-2 sm:flex-row">
            <Button asChild>
              <a href={SITE.calendlyUrl} target="_blank" rel="noreferrer">
                {t("cta.bookCall")}
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href="#pricing">{t("cta.viewPricing")}</a>
            </Button>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-muted p-3 shadow-sm">
          <img
            src={heroImg}
            alt={t("sections.hero.imageAlt")}
            className="h-auto w-full rounded-xl"
            loading="eager"
          />
        </div>
      </Container>
    </section>
  );
}
