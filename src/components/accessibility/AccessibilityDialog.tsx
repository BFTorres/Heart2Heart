import { Settings2, X } from "lucide-react"
import { useTranslation } from "react-i18next"
import { useAccessibilityStore } from "@/stores/accessibility-store"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function AccessibilityDialog() {
  const { t } = useTranslation()
  const {
    fontSize,
    fontFamily,
    lineHeight,
    reducedMotion,
    highVisibilityLinks,
    strongFocusOutline,
    highlightHeadings,
    setFontSize,
    setFontFamily,
    setLineHeight,
    setReducedMotion,
    setHighVisibilityLinks,
    setStrongFocusOutline,
    setHighlightHeadings,
    reset,
  } = useAccessibilityStore()

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" aria-label={t("a11y.open")}>
          <Settings2 className="size-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-xl">
        <DialogHeader>
          <div className="flex items-center justify-between gap-3">
            <DialogTitle>{t("a11y.title")}</DialogTitle>
            <DialogClose asChild>
              <Button variant="ghost" size="icon" aria-label={t("common.close")} type="button">
                <X className="size-4" />
              </Button>
            </DialogClose>
          </div>
          <DialogDescription>{t("a11y.description")}</DialogDescription>
        </DialogHeader>

        <div className="mt-6 grid gap-5">
          <div className="grid gap-2">
            <Label htmlFor="fontSize">{t("a11y.fontSize.label")}</Label>
            <Select value={fontSize} onValueChange={(v) => setFontSize(v as any)}>
              <SelectTrigger id="fontSize">
                <SelectValue placeholder={t("a11y.fontSize.placeholder")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sm">{t("a11y.fontSize.sm")}</SelectItem>
                <SelectItem value="md">{t("a11y.fontSize.md")}</SelectItem>
                <SelectItem value="lg">{t("a11y.fontSize.lg")}</SelectItem>
                <SelectItem value="xl">{t("a11y.fontSize.xl")}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="fontFamily">{t("a11y.fontFamily.label")}</Label>
            <Select value={fontFamily} onValueChange={(v) => setFontFamily(v as any)}>
              <SelectTrigger id="fontFamily">
                <SelectValue placeholder={t("a11y.fontFamily.placeholder")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="system">{t("a11y.fontFamily.system")}</SelectItem>
                <SelectItem value="readable">{t("a11y.fontFamily.readable")}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="lineHeight">{t("a11y.lineHeight.label")}</Label>
            <Select value={lineHeight} onValueChange={(v) => setLineHeight(v as any)}>
              <SelectTrigger id="lineHeight">
                <SelectValue placeholder={t("a11y.lineHeight.placeholder")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="normal">{t("a11y.lineHeight.normal")}</SelectItem>
                <SelectItem value="relaxed">{t("a11y.lineHeight.relaxed")}</SelectItem>
                <SelectItem value="loose">{t("a11y.lineHeight.loose")}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between gap-3">
            <div>
              <Label>{t("a11y.reducedMotion.label")}</Label>
              <p className="text-sm text-muted-foreground">{t("a11y.reducedMotion.help")}</p>
            </div>
            <Switch checked={reducedMotion} onCheckedChange={setReducedMotion} />
          </div>

          <div className="flex items-center justify-between gap-3">
            <div>
              <Label>{t("a11y.links.label")}</Label>
              <p className="text-sm text-muted-foreground">{t("a11y.links.help")}</p>
            </div>
            <Switch checked={highVisibilityLinks} onCheckedChange={setHighVisibilityLinks} />
          </div>

          <div className="flex items-center justify-between gap-3">
            <div>
              <Label>{t("a11y.focus.label")}</Label>
              <p className="text-sm text-muted-foreground">{t("a11y.focus.help")}</p>
            </div>
            <Switch checked={strongFocusOutline} onCheckedChange={setStrongFocusOutline} />
          </div>

          <div className="flex items-center justify-between gap-3">
            <div>
              <Label>{t("a11y.headings.label")}</Label>
              <p className="text-sm text-muted-foreground">{t("a11y.headings.help")}</p>
            </div>
            <Switch checked={highlightHeadings} onCheckedChange={setHighlightHeadings} />
          </div>

          <div className="pt-2">
            <Button variant="secondary" onClick={reset} type="button">
              {t("common.reset")}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
