import { useEffect } from "react"
import { useTranslation } from "react-i18next"

function setMetaByName(name: string, content: string) {
  const el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null
  if (el) el.content = content
}

function setMetaByProperty(property: string, content: string) {
  const el = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null
  if (el) el.content = content
}

export function useSeoEffects() {
  const { t, i18n } = useTranslation()

  useEffect(() => {
    const title = t("seo.title")
    const description = t("seo.description")
    const lang = (i18n.resolvedLanguage || i18n.language || "en").toLowerCase().startsWith("de") ? "de" : "en"

    document.title = title

    setMetaByName("description", description)
    setMetaByProperty("og:title", title)
    setMetaByProperty("og:description", description)
    setMetaByName("twitter:title", title)
    setMetaByName("twitter:description", description)

    document.documentElement.lang = lang
  }, [t, i18n.resolvedLanguage, i18n.language])
}
