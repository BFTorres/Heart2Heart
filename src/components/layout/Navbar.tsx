import { useMemo, useState } from "react";
import { Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { NAV } from "@/data/content";
import { useAccessibilityStore } from "@/stores/accessibility-store";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Container } from "@/components/layout/Container";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { AccessibilityDialog } from "@/components/accessibility/AccessibilityDialog";
import { LanguageToggle } from "@/components/i18n/LanguageToggle";
import logoBlack from "@/assets/brand/logo-black.png";
import logoWhite from "@/assets/brand/logo-white.png";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const reducedMotion = useAccessibilityStore((s) => s.reducedMotion);
  const { t } = useTranslation();
  const theme = useAccessibilityStore((s) => s.theme);
  const isDarkTheme = theme === "dark" || theme === "contrast-dark";
  const logoSrc = isDarkTheme ? logoWhite : logoBlack;

  // Height of the inner nav (64px) + top spacing + a little buffer
  const headerOffset = 88;

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    const top = el.getBoundingClientRect().top + window.scrollY - headerOffset;
    window.scrollTo({
      top: Math.max(0, top),
      behavior: reducedMotion ? "auto" : "smooth",
    });
  };

  const links = useMemo(
    () =>
      NAV.map((item) => (
        <button
          key={item.id}
          className="text-sm text-muted-foreground hover:text-foreground"
          onClick={() => scrollToId(item.id)}
          type="button"
        >
          {t(item.labelKey)}
        </button>
      )),
    [reducedMotion, t],
  );

  return (
    <header className="sticky top-0 z-40 pt-3">
      <Container>
        {/* Border around nav content (rounded), with space from top via header pt-3 */}
        <div className="flex h-16 items-center justify-between gap-4 rounded-2xl border border-border bg-background/80 px-3 backdrop-blur sm:px-4">
          <div className="flex items-center gap-3">
            {/* <a
              className="font-semibold tracking-tight"
              href="#home"
              onClick={(e) => (e.preventDefault(), scrollToId("home"))}
            >
              {SITE.brand}
            </a> */}
            <img
              src={logoSrc}
              alt="Heart 2 Heart Somatics"
              className="h-8 w-auto"
            />
          </div>

          <nav className="hidden items-center gap-6 md:flex">{links}</nav>

          <div className="flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
            <AccessibilityDialog />

            <div className="md:hidden">
              <Dialog open={mobileOpen} onOpenChange={setMobileOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    aria-label={t("nav.openMenu")}
                  >
                    <Menu className="size-4" />
                  </Button>
                </DialogTrigger>

                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle className="flex items-center justify-between">
                      {t("nav.menu")}
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label={t("nav.closeMenu")}
                        onClick={() => setMobileOpen(false)}
                        type="button"
                      >
                        <X className="size-4" />
                      </Button>
                    </DialogTitle>
                  </DialogHeader>

                  <div className="mt-4 grid gap-3">
                    <div className="flex items-center gap-2">
                      <LanguageToggle />
                      <ThemeToggle />
                    </div>

                    <div className="grid gap-2 pt-2">
                      {NAV.map((item) => (
                        <Button
                          key={item.id}
                          variant="ghost"
                          className="justify-start"
                          onClick={() => (
                            scrollToId(item.id),
                            setMobileOpen(false)
                          )}
                          type="button"
                        >
                          {t(item.labelKey)}
                        </Button>
                      ))}
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
}
