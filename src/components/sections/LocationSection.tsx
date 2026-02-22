// src/components/sections/LocationSection.tsx
import { useMemo } from "react"
import { useTranslation } from "react-i18next"
import { ExternalLink, MapPin } from "lucide-react"

import { Container } from "@/components/layout/Container"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Map, MapControls, MapMarker, MarkerContent, MarkerPopup } from "@/components/ui/map"
import { useAccessibilityStore } from "@/stores/accessibility-store"
import { SITE } from "@/data/content"

function buildGoogleDirectionsUrl(destination: string) {
  const base = "https://www.google.com/maps/dir/?api=1"
  return `${base}&destination=${encodeURIComponent(destination)}`
}

export function LocationSection() {
  const { t } = useTranslation()
  const theme = useAccessibilityStore((s) => s.theme)

  // Your theme keys are: light | dark | contrast-light | contrast
  const mapTheme = theme === "dark" || theme === "contrast-dark" ? "dark" : "light"

  const destination = useMemo(() => {
    const { addressLine1, postalCity, country, venueName } = SITE.location
    return venueName
      ? `${venueName}, ${addressLine1}, ${postalCity}, ${country}`
      : `${addressLine1}, ${postalCity}, ${country}`
  }, [])

  const { lat, lng, name, addressLine1, postalCity, venueName, floor } = SITE.location

  // Force label strings (prevents typed i18n returning non-string in some setups)
  const venueLabel = String(t("sections.location.venueLabel", { defaultValue: "Ort" } as any))
  const floorLabel = String(t("sections.location.floorLabel", { defaultValue: "Etage" } as any))
  /* const parkingLabel = String(t("sections.location.parkingLabel", { defaultValue: "Parken" } as any)) */

  return (
    <section id="location" className="border-border bg-background">
      <Container className="py-16">
        <h2 className="text-2xl font-semibold tracking-tight">{t("sections.location.title")}</h2>
        <p className="mt-2 text-muted-foreground">{t("sections.location.subtitle")}</p>

        <Card className="mt-8 overflow-hidden rounded-2xl p-0">
          <div className="flex flex-col gap-0 lg:flex-row">
            {/* Left: Map */}
            <div className="relative h-[380px] w-full lg:h-140 lg:w-[65%]">
              <Map
                className="h-full w-full"
                theme={mapTheme}
                center={[lng, lat]}
                zoom={14.5}
                scrollZoom={false}
                dragPan
                doubleClickZoom
                touchZoomRotate
              >
                <MapControls position="bottom-right" showZoom showCompass />

                <MapMarker longitude={lng} latitude={lat}>
                  <MarkerContent>
                    <button
                      type="button"
                      className="grid size-10 place-items-center rounded-full border border-border bg-background shadow-sm"
                      aria-label={t("sections.location.markerAria")}
                    >
                      <MapPin className="size-5 text-primary" aria-hidden />
                    </button>
                  </MarkerContent>

                  <MarkerPopup closeButton className="rounded-xl p-0">
                    <div className="w-[280px] rounded-xl bg-background p-4">
                      <p className="text-sm font-semibold">{name}</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {venueName ? (
                          <>
                            {venueName}
                            {floor ? ` · ${floor}` : ""}
                            <br />
                          </>
                        ) : null}
                        {addressLine1}
                        <br />
                        {postalCity}
                      </p>

                      <div className="mt-3 flex justify-end">
                        <Button asChild size="sm">
                          <a href={buildGoogleDirectionsUrl(destination)} target="_blank" rel="noreferrer">
                            {t("sections.location.directionsCta")}
                            <ExternalLink className="ml-2 size-4" aria-hidden />
                          </a>
                        </Button>
                      </div>
                    </div>
                  </MarkerPopup>
                </MapMarker>
              </Map>
            </div>

            {/* Right: Address + CTA */}
            <div className="w-full border-t border-border p-6 lg:w-[35%] lg:border-l lg:border-t-0">
              <p className="text-sm font-semibold">{t("sections.location.cardTitle")}</p>

              <div className="mt-3 rounded-2xl border border-border bg-muted/30 p-4">
                <p className="text-sm text-muted-foreground">{t("sections.location.addressLabel")}</p>

                <p className="mt-1 text-sm">
                  {name}
                  <br />
                  {addressLine1}
                  <br />
                  {postalCity}
                </p>

                {(venueName || floor ) && (
                  <div className="mt-3 grid gap-2 text-sm">
                    {venueName ? (
                      <div className="flex items-start justify-between gap-4">
                        <span className="text-muted-foreground">{venueLabel}</span>
                        <span className="text-right">{venueName}</span>
                      </div>
                    ) : null}

                    {floor ? (
                      <div className="flex items-start justify-between gap-4">
                        <span className="text-muted-foreground">{floorLabel}</span>
                        <span className="text-right">{floor}</span>
                      </div>
                    ) : null}

                  </div>
                )}
              </div>

              <div className="mt-4 flex justify-end">
                <Button asChild variant="outline">
                  <a href={buildGoogleDirectionsUrl(destination)} target="_blank" rel="noreferrer">
                    {t("sections.location.openInMaps")}
                  </a>
                </Button>
              </div>

              <p className="mt-4 text-xs text-muted-foreground">{t("sections.location.privacyNote")}</p>
            </div>
          </div>
        </Card>
      </Container>
    </section>
  )
}