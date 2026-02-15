import { useEffect } from "react"
import { useAccessibilityStore } from "@/stores/accessibility-store"

export function useAccessibilityEffects() {
  const {
    theme,
    fontSize,
    fontFamily,
    lineHeight,
    reducedMotion,
    highVisibilityLinks,
    strongFocusOutline,
    highlightHeadings,
  } = useAccessibilityStore()

  useEffect(() => {
    const root = document.documentElement

    // --- Theme --------------------------------------------------------------
    root.classList.remove(
      "app-theme-light",
      "app-theme-dark",
      "app-theme-contrast",
      "app-theme-contrast-light",
    )

    const themeClass =
      theme === "light"
        ? "app-theme-light"
        : theme === "dark"
          ? "app-theme-dark"
          : theme === "contrast-light"
            ? "app-theme-contrast-light"
            : "app-theme-contrast"

    root.classList.add(themeClass)

    // --- Accessibility classes ---------------------------------------------
    root.classList.remove(
      "a11y-font-size-sm",
      "a11y-font-size-md",
      "a11y-font-size-lg",
      "a11y-font-size-xl",
      "a11y-font-family-system",
      "a11y-font-family-readable",
      "a11y-line-height-normal",
      "a11y-line-height-relaxed",
      "a11y-line-height-loose",
      "a11y-reduced-motion",
      "a11y-high-visibility-links",
      "a11y-strong-focus",
      "a11y-highlight-headings",
    )

    root.classList.add(`a11y-font-size-${fontSize}`)
    root.classList.add(`a11y-font-family-${fontFamily}`)
    root.classList.add(`a11y-line-height-${lineHeight}`)

    if (reducedMotion) root.classList.add("a11y-reduced-motion")
    if (highVisibilityLinks) root.classList.add("a11y-high-visibility-links")
    if (strongFocusOutline) root.classList.add("a11y-strong-focus")
    if (highlightHeadings) root.classList.add("a11y-highlight-headings")
  }, [
    theme,
    fontSize,
    fontFamily,
    lineHeight,
    reducedMotion,
    highVisibilityLinks,
    strongFocusOutline,
    highlightHeadings,
  ])
}
