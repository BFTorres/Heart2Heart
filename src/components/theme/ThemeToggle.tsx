import { Moon, Sun, SunDim, MoonStar } from "lucide-react"
import { type AppTheme, useAccessibilityStore } from "@/stores/accessibility-store"
import { Button } from "@/components/ui/button"

const ORDER: AppTheme[] = ["light", "dark", "contrast-light", "contrast-dark"]

function nextTheme(current: AppTheme): AppTheme {
  const idx = ORDER.indexOf(current)
  return ORDER[(idx + 1) % ORDER.length]
}

function themeMeta(theme: AppTheme) {
  switch (theme) {
    case "light":
      return { label: "Light", Icon: Sun }
    case "dark":
      return { label: "Dark", Icon: Moon }
    case "contrast-light":
      return { label: "Light (contrast)", Icon: SunDim }
    case "contrast-dark":
      return { label: "Dark (contrast)", Icon: MoonStar }
    default:
      return { label: "Theme", Icon: Sun }
  }
}

export function ThemeToggle() {
  const theme = useAccessibilityStore((s) => s.theme)
  const setTheme = useAccessibilityStore((s) => s.setTheme)
  const { label, Icon } = themeMeta(theme)

  return (
    <Button
      variant="outline"
      size="icon"
      aria-label={`Theme: ${label}. Click to switch.`}
      title={`Theme: ${label}`}
      onClick={() => setTheme(nextTheme(theme))}
      type="button"
    >
      <Icon className="size-4" />
    </Button>
  )
}
