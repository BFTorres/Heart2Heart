import {
  Waves,
  Music2,
  Users,
  PersonStanding,
  Layers,
  SunMedium,
} from "lucide-react";

export const SITE = {
  brand: "Heart 2 Heart Somatics",
  calendlyUrl: "https://calendly.com/heart2heartsomatics/",
  newsletterUrl:
    (import.meta.env.VITE_NEWSLETTER_URL as string) ??
    "https://de72348c.sibforms.com/serve/MUIFAF21N5rXe68vEBCjdWHQW2HCUPWB_GnTg85IT9ZIXr_h6W24Zeayhm6kpnQHYLxWDlEw5h_q5M56MCOH1lBb-es60tkHPEqRN8MxRrkVvcb7-wrzq3yKnGuBehDnO6EStoyZW0Af3W1V2BEFppDCFfpZyZc3jZSqN1uVjCrBdi78Yj4ZLZMhjp7IVaowz-f23KYKVpphKNi3EA==",
  contactEmail:
    (import.meta.env.VITE_CONTACT_EMAIL as string) ??
    "info@heart2heartsomatics.com",

  location: {
    name: "Heart 2 Heart Somatics",
    addressLine1: "Mercedesstraße 3",
    postalCity: "30453 Hannover",
    country: "Germany",

    // Coordinates as before
    lat: 52.34777,
    lng: 9.709247,

    // UX wayfinding
    venueName: "Rossini GmbH",
    floor: "1. OG",
    // Choose ONE parking wording:
    /* parkingHint: "Parken auf dem Rossini-Parkplatz möglich.", */
    // or (more cautious):
    // parkingHint: "Parkmöglichkeiten am Rossini-Parkplatz (je nach Verfügbarkeit)."
  } as const,
};

export const NAV = [
  { id: "home", labelKey: "nav.home" },
  /* { id: "intro", labelKey: "nav.intro" }, */
  { id: "courses", labelKey: "nav.courses" },
  { id: "about", labelKey: "nav.about" },
  { id: "voices", labelKey: "nav.voices" },
  { id: "pricing", labelKey: "nav.pricing" },
  { id: "faq", labelKey: "nav.faq" },
] as const;

/* export const COURSES = [
  {
    id: "sound-healing",
    titleKey: "sections.courses.items.sound-healing.title",
    descriptionKey: "sections.courses.items.sound-healing.description",
    Icon: Waves,
  },
  {
    id: "sound-bath",
    titleKey: "sections.courses.items.sound-bath.title",
    descriptionKey: "sections.courses.items.sound-bath.description",
    Icon: Wind,
  },
  {
    id: "yoga-and-meditation",
    titleKey: "sections.courses.items.yoga-and-meditation.title",
    descriptionKey: "sections.courses.items.yoga-and-meditation.description",
    Icon: HeartHandshake,
  },
  {
    id: "somatic-coaching",
    titleKey: "sections.courses.items.somatic-coaching.title",
    descriptionKey: "sections.courses.items.somatic-coaching.description",
    Icon: Sparkles,
  },
  {
    id: "trainings-and-workshops",
    titleKey: "sections.courses.items.trainings-and-workshops.title",
    descriptionKey: "sections.courses.items.trainings-and-workshops.description",
    Icon: Flower,
  },
  {
    id: "ifs",
    titleKey: "sections.courses.items.ifs.title",
    descriptionKey: "sections.courses.items.ifs.description",
    Icon: Flower,
  }
] as const */

/**
 * Courses are keyed by id.
 * Text is fully controlled via i18n under:
 * sections.courses.items.<id>.*
 */
export const COURSES = [
  { id: "sound-healing", Icon: Music2 },
  { id: "sound-bath", Icon: Waves },
  { id: "yoga-and-meditation", Icon: SunMedium },
  { id: "somatic-coaching", Icon: PersonStanding },
  { id: "trainings-and-workshops", Icon: Users },
  { id: "ifs", Icon: Layers },
] as const;

export const TESTIMONIALS = [
  {
    id: "t1",
    quoteKey: "sections.voices.items.t1.quote",
    nameKey: "sections.voices.items.t1.name",
    roleKey: "sections.voices.items.t1.role",
  },
  {
    id: "t2",
    quoteKey: "sections.voices.items.t2.quote",
    nameKey: "sections.voices.items.t2.name",
    roleKey: "sections.voices.items.t2.role",
  },
  {
    id: "t3",
    quoteKey: "sections.voices.items.t3.quote",
    nameKey: "sections.voices.items.t3.name",
    roleKey: "sections.voices.items.t3.role",
  },
  {
    id: "t4",
    quoteKey: "sections.voices.items.t4.quote",
    nameKey: "sections.voices.items.t4.name",
    roleKey: "sections.voices.items.t4.role",
  },
  {
    id: "t5",
    quoteKey: "sections.voices.items.t5.quote",
    nameKey: "sections.voices.items.t5.name",
    roleKey: "sections.voices.items.t5.role",
  },
  {
    id: "t6",
    quoteKey: "sections.voices.items.t6.quote",
    nameKey: "sections.voices.items.t6.name",
    roleKey: "sections.voices.items.t6.role",
  },
  {
    id: "t7",
    quoteKey: "sections.voices.items.t7.quote",
    nameKey: "sections.voices.items.t7.name",
    roleKey: "sections.voices.items.t7.role",
  },
] as const;

export const PRICING = [
  {
    id: "bundles",
    featured: true,
    titleKey: "sections.pricing.plans.bundles.title",
    bulletKeys: [
      "sections.pricing.plans.bundles.bullets.b1",
      "sections.pricing.plans.bundles.bullets.b2",
      "sections.pricing.plans.bundles.bullets.b3",
/*       "sections.pricing.plans.bundles.bullets.b4", */
    ],
    ctaLabelKey: "cta.freeWelcomeSession",
    ctaType: "calendly",
  },
  {
    id: "business",
    featured: false,
    titleKey: "sections.pricing.plans.business.title",
    bulletKeys: [
      "sections.pricing.plans.business.bullets.b1",
      "sections.pricing.plans.business.bullets.b2",
      "sections.pricing.plans.business.bullets.b3",
      "sections.pricing.plans.business.bullets.b4",
      "sections.pricing.plans.business.bullets.b5",
    ],
    ctaLabelKey: "cta.requestBusinessPackage",
    ctaType: "email",
  },
] as const;

export const FAQ = [
  {
    id: "q1",
    qKey: "sections.faq.items.q1.q",
    aKey: "sections.faq.items.q1.a",
  },
  {
    id: "q2",
    qKey: "sections.faq.items.q2.q",
    aKey: "sections.faq.items.q2.a",
  },
  {
    id: "q3",
    qKey: "sections.faq.items.q3.q",
    aKey: "sections.faq.items.q3.a",
  },
  {
    id: "q4",
    qKey: "sections.faq.items.q4.q",
    aKey: "sections.faq.items.q4.a",
  },
  {
    id: "q5",
    qKey: "sections.faq.items.q5.q",
    aKey: "sections.faq.items.q5.a",
  },
  {
    id: "q6",
    qKey: "sections.faq.items.q6.q",
    aKey: "sections.faq.items.q6.a",
  },
  {
    id: "q7",
    qKey: "sections.faq.items.q7.q",
    aKey: "sections.faq.items.q7.a",
  },
] as const;
