import { useTranslation } from "react-i18next"
import { Container } from "@/components/layout/Container"

export function IntroSection() {
  const { t } = useTranslation()

  return (
    <section id="intro">
      <Container className="py-16">
        <h2 className="text-2xl font-semibold tracking-tight">{t("sections.intro.title")}</h2>

        <div className="mt-6 space-y-4 text-muted-foreground">
          <p>{t("sections.intro.p1")}</p>
          <p>{t("sections.intro.p2")}</p>
          <p>{t("sections.intro.p3")}</p>
          <p>{t("sections.intro.p4")}</p>
        </div>
      </Container>
    </section>
  )
}
