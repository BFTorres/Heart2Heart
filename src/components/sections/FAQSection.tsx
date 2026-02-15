import { useTranslation } from "react-i18next"
import { Container } from "@/components/layout/Container"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { FAQ } from "@/data/content"

export function FAQSection() {
  const { t } = useTranslation()

  return (
    <section id="faq" className=" border-border bg-muted/40"> {/* border-t */}
      <Container className="py-16">
        <h2 className="text-2xl font-semibold tracking-tight">{t("sections.faq.title")}</h2>
        <p className="mt-2 text-muted-foreground">{t("sections.faq.subtitle")}</p>

        <div className="mt-8">
          <Accordion type="single" collapsible className="rounded-2xl border border-border bg-background px-4">
            {FAQ.map((item) => (
              <AccordionItem key={item.id} value={item.id}>
                <AccordionTrigger>{t(item.qKey)}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{t(item.aKey)}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Container>
    </section>
  )
}
