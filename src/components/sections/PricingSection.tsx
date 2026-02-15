import { useTranslation } from "react-i18next"
import { Container } from "@/components/layout/Container"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PRICING, SITE } from "@/data/content"

function buildMailto(to: string, subject: string, body: string) {
  const params = new URLSearchParams()
  params.set("subject", subject)
  params.set("body", body)
  return `mailto:${to}?${params.toString()}`
}

export function PricingSection() {
  const { t } = useTranslation()

  const businessMailto = buildMailto(
    SITE.contactEmail,
    t("sections.pricing.businessEmail.subject"),
    t("sections.pricing.businessEmail.body"),
  )

  return (
    <section id="pricing">
      <Container className="py-16">
        <h2 className="text-2xl font-semibold tracking-tight">{t("sections.pricing.title")}</h2>
        <p className="mt-2 text-muted-foreground">{t("sections.pricing.subtitle")}</p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {PRICING.map((plan) => {
            const href =
              plan.ctaType === "calendly" ? SITE.calendlyUrl : businessMailto

            const isExternal = plan.ctaType === "calendly"

            return (
              <Card
                key={plan.id}
                className={`rounded-2xl ${plan.featured ? "border-2" : ""}`}
              >
                <CardHeader className="space-y-1">
                  <CardTitle className="text-base">{t(plan.titleKey)}</CardTitle>
                </CardHeader>

                <CardContent className="space-y-5">
                  <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                    {plan.bulletKeys.map((k) => (
                      <li key={k}>{t(k)}</li>
                    ))}
                  </ul>

                  <div className="flex justify-end">
                    <Button asChild>
                      <a
                        href={href}
                        target={isExternal ? "_blank" : undefined}
                        rel={isExternal ? "noreferrer" : undefined}
                      >
                        {t(plan.ctaLabelKey)}
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
