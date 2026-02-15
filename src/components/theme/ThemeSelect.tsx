import { THEME_OPTIONS } from "@/data/content"
import { type AppTheme, useAccessibilityStore } from "@/stores/accessibility-store"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function ThemeSelect() {
  const theme = useAccessibilityStore((s) => s.theme)
  const setTheme = useAccessibilityStore((s) => s.setTheme)

  return (
    <Select value={theme} onValueChange={(v) => setTheme(v as AppTheme)}>
      <SelectTrigger className="w-[190px]" aria-label="Theme">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent>
        {THEME_OPTIONS.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
