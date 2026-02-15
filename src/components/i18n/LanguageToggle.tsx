import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function LanguageToggle() {
  const { i18n } = useTranslation()
  const lang = (i18n.resolvedLanguage || i18n.language || "en").toLowerCase().startsWith("de") ? "de" : "en"

  const set = async (next: "de" | "en") => {
    if (next === lang) return
    await i18n.changeLanguage(next)
  }

  return (
    <div
      className="inline-flex items-center rounded-full border border-border bg-background p-1"
      role="group"
      aria-label="Language"
    >
      <Button
        variant="ghost"
        className={cn("h-8 rounded-full px-3 text-xs", lang === "de" && "bg-accent")}
        onClick={() => set("de")}
        type="button"
        aria-pressed={lang === "de"}
      >
        DE
      </Button>
      <Button
        variant="ghost"
        className={cn("h-8 rounded-full px-3 text-xs", lang === "en" && "bg-accent")}
        onClick={() => set("en")}
        type="button"
        aria-pressed={lang === "en"}
      >
        EN
      </Button>
    </div>
  )
}
