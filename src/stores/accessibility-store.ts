import { create } from "zustand"
import { persist } from "zustand/middleware"

export type AppTheme = "light" | "dark" | "contrast-light" | "contrast-dark"
export type FontSize = "sm" | "md" | "lg" | "xl"
export type FontFamily = "system" | "readable"
export type LineHeight = "normal" | "relaxed" | "loose"

export type AccessibilityState = {
  theme: AppTheme
  fontSize: FontSize
  fontFamily: FontFamily
  lineHeight: LineHeight
  reducedMotion: boolean
  highVisibilityLinks: boolean
  strongFocusOutline: boolean
  highlightHeadings: boolean

  setTheme: (theme: AppTheme) => void
  setFontSize: (v: FontSize) => void
  setFontFamily: (v: FontFamily) => void
  setLineHeight: (v: LineHeight) => void
  setReducedMotion: (v: boolean) => void
  setHighVisibilityLinks: (v: boolean) => void
  setStrongFocusOutline: (v: boolean) => void
  setHighlightHeadings: (v: boolean) => void
  reset: () => void
}

const DEFAULTS: Omit<
  AccessibilityState,
  | "setTheme"
  | "setFontSize"
  | "setFontFamily"
  | "setLineHeight"
  | "setReducedMotion"
  | "setHighVisibilityLinks"
  | "setStrongFocusOutline"
  | "setHighlightHeadings"
  | "reset"
> = {
  theme: "light",
  fontSize: "md",
  fontFamily: "system",
  lineHeight: "normal",
  reducedMotion: false,
  highVisibilityLinks: false,
  strongFocusOutline: true,
  highlightHeadings: false,
}

export const useAccessibilityStore = create<AccessibilityState>()(
  persist(
    (set) => ({
      ...DEFAULTS,
      setTheme: (theme) => set({ theme }),
      setFontSize: (fontSize) => set({ fontSize }),
      setFontFamily: (fontFamily) => set({ fontFamily }),
      setLineHeight: (lineHeight) => set({ lineHeight }),
      setReducedMotion: (reducedMotion) => set({ reducedMotion }),
      setHighVisibilityLinks: (highVisibilityLinks) => set({ highVisibilityLinks }),
      setStrongFocusOutline: (strongFocusOutline) => set({ strongFocusOutline }),
      setHighlightHeadings: (highlightHeadings) => set({ highlightHeadings }),
      reset: () => set({ ...DEFAULTS }),
    }),
    {
      name: "h2h_accessibility",
      version: 1,
    },
  ),
)
