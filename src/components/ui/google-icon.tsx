import { cn } from "@/lib/utils"

type Props = {
  name: string
  className?: string
  ariaLabel?: string
}

export function GoogleIcon({ name, className, ariaLabel }: Props) {
  // Material Symbols are text-glyph icons.
  // If ariaLabel is provided, expose it; otherwise treat as decorative.
  const isDecorative = !ariaLabel

  return (
    <span
      className={cn("material-symbols-rounded leading-none select-none", className)}
      style={{
        fontVariationSettings: '"FILL" 0, "wght" 400, "GRAD" 0, "opsz" 24',
      }}
      aria-hidden={isDecorative ? "true" : undefined}
      aria-label={!isDecorative ? ariaLabel : undefined}
    >
      {name}
    </span>
  )
}