import { useMemo } from "react"
import { useTranslation } from "react-i18next"

/**
 * LEGAL PLACEHOLDERS
 * - Replace all [PLACEHOLDER] values with real business data.
 * - Keep text short and factual.
 * - If the business is regulated (e.g., Heilpraktiker/in), add the required professional law sections.
 */

type Language = "de" | "en"

function useLang(): Language {
  const { i18n } = useTranslation()
  return useMemo(() => {
    const lang = (i18n.resolvedLanguage ?? i18n.language ?? "en").toLowerCase()
    return lang.startsWith("de") ? "de" : "en"
  }, [i18n.language, i18n.resolvedLanguage])
}

function PlaceholderBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-muted/30 p-4 text-sm">
      <p className="font-medium">Template note</p>
      <p className="mt-1 text-muted-foreground">{children}</p>
    </div>
  )
}

export function ImpressumContent() {
  const lang = useLang()
  return lang === "de" ? <ImpressumDE /> : <ImpressumEN />
}

export function DatenschutzContent() {
  const lang = useLang()
  return lang === "de" ? <PrivacyDE /> : <PrivacyEN />
}

export function AccessibilityStatementContent() {
  const lang = useLang()
  return lang === "de" ? <AccessibilityDE /> : <AccessibilityEN />
}

/* ----------------------------- IMPRESSUM ----------------------------- */

function ImpressumDE() {
  return (
    <div className="space-y-6">
      <PlaceholderBox>
        Dieser Text ist ein Muster. Er ersetzt keine Rechtsberatung. Füllen Sie die Datenfelder vollständig aus und
        prüfen Sie, ob zusätzliche Angaben (z. B. Berufsrecht, Register, USt-IdNr.) für Mariem erforderlich sind.
      </PlaceholderBox>

      <section className="space-y-2">
        <h3 className="text-base font-semibold">Angaben gemäß § 5 DDG</h3>
        <div className="space-y-1 text-sm">
          <p>
            <span className="font-medium">Diensteanbieterin / Verantwortliche Unternehmerin:</span> [Vollständiger
            Name, z. B. Mariem Nachname]
          </p>
          <p>
            <span className="font-medium">Geschäftsbezeichnung:</span> Heart 2 Heart Somatics
          </p>
          <p>
            <span className="font-medium">Anschrift:</span> [Straße Hausnr.], [PLZ Ort], Deutschland
          </p>
          <p>
            <span className="font-medium">Kontakt:</span> E-Mail: [kontakt@domain.tld] · Telefon (optional): [Telefon]
          </p>
          <p>
            <span className="font-medium">Rechtsform:</span> [z. B. Einzelunternehmerin]
          </p>
        </div>
      </section>

      <section className="space-y-2">
        <h3 className="text-base font-semibold">Umsatzsteuer</h3>
        <p className="text-sm text-muted-foreground">
          Wenn Kleinunternehmerregelung genutzt wird, wird in der Regel keine Umsatzsteuer ausgewiesen. Tragen Sie hier
          nur zutreffende Angaben ein.
        </p>
        <div className="space-y-1 text-sm">
          <p>
            <span className="font-medium">Hinweis (falls zutreffend):</span> Kleinunternehmerin im Sinne des § 19 UStG.
          </p>
          <p>
            <span className="font-medium">USt-IdNr. (falls vorhanden):</span> [DE123456789]
          </p>
        </div>
      </section>

      <section className="space-y-2">
        <h3 className="text-base font-semibold">Inhaltlich Verantwortliche</h3>
        <p className="text-sm text-muted-foreground">
          Nur erforderlich, wenn Sie journalistisch-redaktionelle Inhalte anbieten (z. B. News/Blog mit regelmäßigen
          Beiträgen). Dann kann eine verantwortliche Person nach § 18 Abs. 2 MStV erforderlich sein.
        </p>
        <div className="space-y-1 text-sm">
          <p>
            <span className="font-medium">Verantwortlich i. S. d. § 18 Abs. 2 MStV (falls zutreffend):</span>{" "}
            [Vorname Nachname, Anschrift]
          </p>
        </div>
      </section>

      <section className="space-y-2">
        <h3 className="text-base font-semibold">Verbraucherstreitbeilegung (VSBG)</h3>
        <p className="text-sm">
          Wir sind nicht verpflichtet und nicht bereit, an einem Streitbeilegungsverfahren vor einer
          Verbraucherschlichtungsstelle teilzunehmen.
        </p>
        <p className="text-sm text-muted-foreground">
          Hinweis: Die frühere EU-OS/ODR-Plattform ist seit dem 20. Juli 2025 eingestellt; ein Link dorthin sollte nicht
          mehr verwendet werden.
        </p>
      </section>

      <section className="space-y-2">
        <h3 className="text-base font-semibold">Haftungshinweise</h3>
        <p className="text-sm text-muted-foreground">
          Inhalte wurden mit Sorgfalt erstellt. Für externe Links übernehmen wir keine Haftung; für Inhalte verlinkter
          Seiten sind ausschließlich deren Betreiber verantwortlich.
        </p>
      </section>

      <section className="space-y-2">
        <h3 className="text-base font-semibold">Stand</h3>
        <p className="text-sm">[TT. Monat JJJJ]</p>
      </section>
    </div>
  )
}

function ImpressumEN() {
  return (
    <div className="space-y-6">
      <PlaceholderBox>
        This is a template. It is not legal advice. Fill in all placeholders and verify whether additional disclosures
        apply (e.g., regulated professions, registers, VAT ID).
      </PlaceholderBox>

      <section className="space-y-2">
        <h3 className="text-base font-semibold">Provider identification (Germany)</h3>
        <div className="space-y-1 text-sm">
          <p>
            <span className="font-medium">Service provider / business owner:</span> [Full legal name]
          </p>
          <p>
            <span className="font-medium">Business name:</span> Heart 2 Heart Somatics
          </p>
          <p>
            <span className="font-medium">Address:</span> [Street + No], [Postal code City], Germany
          </p>
          <p>
            <span className="font-medium">Contact:</span> Email: [contact@domain.tld] · Phone (optional): [Phone]
          </p>
          <p>
            <span className="font-medium">Legal form:</span> [e.g., sole proprietor]
          </p>
        </div>
      </section>

      <section className="space-y-2">
        <h3 className="text-base font-semibold">VAT</h3>
        <p className="text-sm text-muted-foreground">
          If the small-business VAT scheme applies, VAT is typically not shown. Only include what is accurate.
        </p>
        <div className="space-y-1 text-sm">
          <p>
            <span className="font-medium">Note (if applicable):</span> Small-business VAT scheme under § 19 UStG
            (Germany).
          </p>
          <p>
            <span className="font-medium">VAT ID (if available):</span> [DE123456789]
          </p>
        </div>
      </section>

      <section className="space-y-2">
        <h3 className="text-base font-semibold">Editorial responsibility</h3>
        <p className="text-sm text-muted-foreground">
          Only relevant if you publish journalistic/editorial content (e.g., a news/blog with regular articles). In that
          case an editorial contact under the German Media State Treaty may be required.
        </p>
        <p className="text-sm">
          <span className="font-medium">Responsible person (if applicable):</span> [Name, Address]
        </p>
      </section>

      <section className="space-y-2">
        <h3 className="text-base font-semibold">Consumer dispute resolution</h3>
        <p className="text-sm">
          We are not obliged and not willing to participate in dispute resolution proceedings before a consumer
          arbitration board.
        </p>
        <p className="text-sm text-muted-foreground">
          Note: The former EU ODR platform is discontinued as of July 20, 2025.
        </p>
      </section>

      <section className="space-y-2">
        <h3 className="text-base font-semibold">Liability note</h3>
        <p className="text-sm text-muted-foreground">
          We prepare content with care. We are not responsible for external links; linked pages remain the
          responsibility of their operators.
        </p>
      </section>

      <section className="space-y-2">
        <h3 className="text-base font-semibold">Last updated</h3>
        <p className="text-sm">[Month DD, YYYY]</p>
      </section>
    </div>
  )
}

/* ----------------------------- PRIVACY ----------------------------- */

function PrivacyDE() {
  return (
    <div className="space-y-6">
      <PlaceholderBox>
        Diese Datenschutzhinweise sind auf eine einfache Website ohne Kontaktformular/Newsletter ausgelegt. Wenn Sie
        später Tools wie eingebettetes Calendly, Analytics, Newsletter, Social Media Embeds o. ä. hinzufügen, muss
        dieser Text angepasst werden.
      </PlaceholderBox>

      <section className="space-y-2">
        <h3 className="text-base font-semibold">1. Verantwortliche Stelle</h3>
        <div className="space-y-1 text-sm">
          <p>[Vollständiger Name / Unternehmen]</p>
          <p>[Straße Hausnr.]</p>
          <p>[PLZ Ort], Deutschland</p>
          <p>
            E-Mail: <a className="underline" href="mailto:[kontakt@domain.tld]">[kontakt@domain.tld]</a>
          </p>
        </div>
      </section>

      <section className="space-y-2">
        <h3 className="text-base font-semibold">2. Hosting und Server-Logs</h3>
        <p className="text-sm">
          Diese Website wird bei einem Hosting-Anbieter betrieben: <span className="font-medium">[Hosting-Anbieter]</span>.
        </p>
        <p className="text-sm text-muted-foreground">
          Bei jedem Zugriff verarbeitet der Hosting-Anbieter technische Zugriffsdaten (z. B. IP-Adresse, Datum/Uhrzeit,
          aufgerufene Seite/Datei, User-Agent, Referrer). Die Verarbeitung erfolgt zur Bereitstellung und Sicherheit der
          Website.
        </p>
        <p className="text-sm text-muted-foreground">
          Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an sicherem Betrieb). Falls ein
          Auftragsverarbeitungsvertrag besteht, erfolgt die Verarbeitung zudem im Rahmen der Auftragsverarbeitung.
        </p>
      </section>

      <section className="space-y-2">
        <h3 className="text-base font-semibold">3. Cookies / Local Storage</h3>
        <p className="text-sm">
          Wir verwenden auf dieser Website technisch notwendige Speicherung, um Ihre Einstellungen zu speichern (z. B.
          Theme/Barrierefreiheitsoptionen und Sprache).
        </p>
        <p className="text-sm text-muted-foreground">
          Rechtsgrundlage: § 25 Abs. 2 TDDDG (technisch erforderlich) sowie Art. 6 Abs. 1 lit. f DSGVO. Optionale
          Kategorien (z. B. Marketing/Externe Medien) werden nur genutzt, wenn tatsächlich entsprechende Inhalte
          eingebunden werden, und dann nur nach Einwilligung.
        </p>
      </section>

      <section className="space-y-2">
        <h3 className="text-base font-semibold">4. Externe Links (z. B. Calendly)</h3>
        <p className="text-sm">
          Wenn Sie auf externe Links klicken (z. B. Terminbuchung über Calendly), verlassen Sie unsere Website. Für die
          Datenverarbeitung auf den verlinkten Seiten ist der jeweilige Anbieter verantwortlich.
        </p>
        <p className="text-sm text-muted-foreground">
          Hinweis: Aktuell wird Calendly nur als Link in einem neuen Tab geöffnet (kein eingebettetes Widget). Wenn
          später ein Widget eingebettet wird, sollte dies über Einwilligung („Externe Medien/Marketing“) gesteuert und
          hier dokumentiert werden.
        </p>
      </section>

      <section className="space-y-2">
        <h3 className="text-base font-semibold">5. Ihre Rechte</h3>
        <ul className="list-disc space-y-1 pl-5 text-sm">
          <li>Auskunft (Art. 15 DSGVO)</li>
          <li>Berichtigung (Art. 16 DSGVO)</li>
          <li>Löschung (Art. 17 DSGVO)</li>
          <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
          <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
          <li>Widerspruch gegen Verarbeitung auf Grundlage berechtigter Interessen (Art. 21 DSGVO)</li>
          <li>Widerruf einer Einwilligung mit Wirkung für die Zukunft (Art. 7 Abs. 3 DSGVO)</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h3 className="text-base font-semibold">6. Beschwerderecht (Niedersachsen)</h3>
        <p className="text-sm text-muted-foreground">
          Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren. Zuständig in Niedersachsen ist:
        </p>
        <div className="space-y-1 text-sm">
          <p className="font-medium">Der Landesbeauftragte für den Datenschutz Niedersachsen</p>
          <p>Prinzenstraße 5, 30159 Hannover (Besucheranschrift)</p>
          <p>Postfach 221, 30002 Hannover (Postanschrift)</p>
          <p>Telefon: 0511 120-4500</p>
          <p>E-Mail: poststelle@lfd.niedersachsen.de</p>
        </div>
      </section>

      <section className="space-y-2">
        <h3 className="text-base font-semibold">7. Stand</h3>
        <p className="text-sm">[TT. Monat JJJJ]</p>
      </section>
    </div>
  )
}

function PrivacyEN() {
  return (
    <div className="space-y-6">
      <PlaceholderBox>
        This privacy notice is designed for a simple brochure website (no contact form/newsletter). If you add embedded
        Calendly, analytics, newsletter tools, social embeds, etc., update this text accordingly.
      </PlaceholderBox>

      <section className="space-y-2">
        <h3 className="text-base font-semibold">1. Controller</h3>
        <div className="space-y-1 text-sm">
          <p>[Full legal name / business]</p>
          <p>[Street + No]</p>
          <p>[Postal code City], Germany</p>
          <p>
            Email: <a className="underline" href="mailto:[contact@domain.tld]">[contact@domain.tld]</a>
          </p>
        </div>
      </section>

      <section className="space-y-2">
        <h3 className="text-base font-semibold">2. Hosting and server logs</h3>
        <p className="text-sm">
          This website is hosted by: <span className="font-medium">[Hosting provider]</span>.
        </p>
        <p className="text-sm text-muted-foreground">
          When you access the site, technical access data may be processed (e.g., IP address, timestamp, requested page,
          user agent, referrer) for delivery and security of the website.
        </p>
        <p className="text-sm text-muted-foreground">
          Legal basis: Art. 6(1)(f) GDPR (legitimate interest in secure operation). If applicable, processing may also be
          performed under a data processing agreement.
        </p>
      </section>

      <section className="space-y-2">
        <h3 className="text-base font-semibold">3. Cookies / local storage</h3>
        <p className="text-sm">
          We use technically necessary storage to remember your preferences (e.g., theme/accessibility settings and
          language).
        </p>
        <p className="text-sm text-muted-foreground">
          Legal basis: German TDDDG § 25(2) (strictly necessary) and Art. 6(1)(f) GDPR. Optional categories (e.g.,
          marketing/external media) are only used if such third-party content is actually embedded and only after you
          consent.
        </p>
      </section>

      <section className="space-y-2">
        <h3 className="text-base font-semibold">4. External links (e.g., Calendly)</h3>
        <p className="text-sm">
          If you click external links (e.g., booking via Calendly), you leave our website. The linked provider is
          responsible for processing on their site.
        </p>
        <p className="text-sm text-muted-foreground">
          Note: At the moment Calendly is opened only in a new tab (no embedded widget). If an embed is added later, it
          should be gated behind consent (“external media/marketing”) and documented here.
        </p>
      </section>

      <section className="space-y-2">
        <h3 className="text-base font-semibold">5. Your rights</h3>
        <ul className="list-disc space-y-1 pl-5 text-sm">
          <li>Access (Art. 15 GDPR)</li>
          <li>Rectification (Art. 16 GDPR)</li>
          <li>Erasure (Art. 17 GDPR)</li>
          <li>Restriction (Art. 18 GDPR)</li>
          <li>Data portability (Art. 20 GDPR)</li>
          <li>Objection to processing based on legitimate interests (Art. 21 GDPR)</li>
          <li>Withdraw consent at any time with future effect (Art. 7(3) GDPR)</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h3 className="text-base font-semibold">6. Supervisory authority (Lower Saxony)</h3>
        <p className="text-sm text-muted-foreground">
          You may lodge a complaint with a data protection supervisory authority. In Lower Saxony (Niedersachsen), the
          competent authority is:
        </p>
        <div className="space-y-1 text-sm">
          <p className="font-medium">The State Commissioner for Data Protection Lower Saxony</p>
          <p>Prinzenstraße 5, 30159 Hannover, Germany</p>
          <p>PO Box 221, 30002 Hannover, Germany</p>
          <p>Phone: +49 511 120-4500</p>
          <p>Email: poststelle@lfd.niedersachsen.de</p>
        </div>
      </section>

      <section className="space-y-2">
        <h3 className="text-base font-semibold">7. Last updated</h3>
        <p className="text-sm">[Month DD, YYYY]</p>
      </section>
    </div>
  )
}

/* ----------------------------- ACCESSIBILITY ----------------------------- */

function AccessibilityDE() {
  return (
    <div className="space-y-6">
      <PlaceholderBox>
        Diese Erklärung kann freiwillig sein. Das BFSG gilt ab 2025 für bestimmte digitale Dienstleistungen, aber
        Kleinstunternehmen (weniger als 10 Beschäftigte und max. 2 Mio. EUR Umsatz/Bilanzsumme) sind für
        Dienstleistungen ausgenommen. Unabhängig davon ist Barrierefreiheit fachlich sinnvoll und reduziert Risiko.
      </PlaceholderBox>

      <section className="space-y-2">
        <h3 className="text-base font-semibold">Erklärung zur Barrierefreiheit</h3>
        <p className="text-sm">
          Heart 2 Heart Somatics ist bemüht, diese Website barrierefrei zugänglich zu machen. Wir orientieren uns
          freiwillig an WCAG 2.2 AA und der EN 301 549 als gängige Referenz.
        </p>
      </section>

      <section className="space-y-2">
        <h3 className="text-base font-semibold">Stand der Vereinbarkeit</h3>
        <p className="text-sm">
          Diese Website ist <span className="font-medium">[vollständig / teilweise / nicht]</span> mit den genannten
          Anforderungen vereinbar.
        </p>
        <p className="text-sm text-muted-foreground">
          Bitte wählen Sie „teilweise“, solange Sie bekannte Einschränkungen haben (z. B. Drittanbieter-Inhalte).
        </p>
      </section>

      <section className="space-y-2">
        <h3 className="text-base font-semibold">Nicht barrierefreie Inhalte (falls vorhanden)</h3>
        <ul className="list-disc space-y-1 pl-5 text-sm">
          <li>[Beispiel: Einzelne Bilder haben noch keine optimalen Alternativtexte.]</li>
          <li>[Beispiel: Externe Inhalte (z. B. eingebettete Widgets) sind ggf. nicht vollständig barrierefrei.]</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h3 className="text-base font-semibold">Feedback und Kontakt</h3>
        <p className="text-sm">
          Wenn Ihnen Barrieren auffallen, kontaktieren Sie uns bitte:
          <br />
          E-Mail: <a className="underline" href="mailto:[kontakt@domain.tld]">[kontakt@domain.tld]</a>
        </p>
      </section>

      <section className="space-y-2">
        <h3 className="text-base font-semibold">Durchsetzungsverfahren (optional)</h3>
        <p className="text-sm text-muted-foreground">
          Wenn Sie keine zufriedenstellende Antwort erhalten, können Sie sich an eine Schlichtungsstelle wenden. Je nach
          Anwendungsfall kommen insbesondere Stellen nach dem Behindertengleichstellungsgesetz in Betracht.
        </p>
      </section>

      <section className="space-y-2">
        <h3 className="text-base font-semibold">Stand</h3>
        <p className="text-sm">[TT. Monat JJJJ]</p>
      </section>
    </div>
  )
}

function AccessibilityEN() {
  return (
    <div className="space-y-6">
      <PlaceholderBox>
        This statement may be voluntary depending on your scope. The German BFSG applies to certain digital services
        from 2025, but microenterprises are exempt for services under specific conditions. Regardless, accessibility is
        a quality and risk-reduction measure.
      </PlaceholderBox>

      <section className="space-y-2">
        <h3 className="text-base font-semibold">Accessibility statement</h3>
        <p className="text-sm">
          Heart 2 Heart Somatics aims to make this website accessible. We voluntarily follow WCAG 2.2 AA and commonly
          used references such as EN 301 549.
        </p>
      </section>

      <section className="space-y-2">
        <h3 className="text-base font-semibold">Conformance status</h3>
        <p className="text-sm">
          This website is <span className="font-medium">[fully / partially / not]</span> conformant with the stated
          requirements.
        </p>
      </section>

      <section className="space-y-2">
        <h3 className="text-base font-semibold">Non-accessible content (if any)</h3>
        <ul className="list-disc space-y-1 pl-5 text-sm">
          <li>[Example: Some images still need improved alt text.]</li>
          <li>[Example: Third-party embeds may not be fully accessible.]</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h3 className="text-base font-semibold">Feedback and contact</h3>
        <p className="text-sm">
          If you encounter barriers, please contact us:
          <br />
          Email: <a className="underline" href="mailto:[contact@domain.tld]">[contact@domain.tld]</a>
        </p>
      </section>

      <section className="space-y-2">
        <h3 className="text-base font-semibold">Enforcement procedure (optional)</h3>
        <p className="text-sm text-muted-foreground">
          If you do not receive a satisfactory response, you may contact an appropriate conciliation body depending on
          your case.
        </p>
      </section>

      <section className="space-y-2">
        <h3 className="text-base font-semibold">Last updated</h3>
        <p className="text-sm">[Month DD, YYYY]</p>
      </section>
    </div>
  )
}
