import { useTranslation } from "react-i18next"
import { Container } from "@/components/layout/Container"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TESTIMONIALS } from "@/data/content"

export function TestimonialsSection() {
  const { t } = useTranslation()

  return (
    <section id="voices" className=" border-border bg-muted/40"> {/* border-y */}
      <Container className="py-16">
        <h2 className="text-2xl font-semibold tracking-tight">{t("sections.voices.title")}</h2>
        <p className="mt-2 text-muted-foreground">{t("sections.voices.subtitle")}</p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {TESTIMONIALS.map((item) => (
            <Card key={item.id} className="rounded-2xl">
              <CardHeader>
                <CardTitle className="text-base">{t(item.nameKey)}</CardTitle>
                <p className="text-sm text-muted-foreground">{t(item.roleKey)}</p>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">“{t(item.quoteKey)}”</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  )
}
