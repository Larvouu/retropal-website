/**
 * Shared UI strings used in Nav, Footer, LangSwitch, and a few inline bits.
 * Long-form page content (privacy text, feature blurbs) lives inline in each page.
 *
 * Adding a new key:
 *   1) Add the key to the `Strings` type below
 *   2) Add the FR translation in `fr`
 *   3) Add the EN translation in `en`
 *   TypeScript will fail compilation if either locale is missing a key.
 */

export type Locale = "fr" | "en";

export const LOCALES: readonly Locale[] = ["fr", "en"] as const;

export const DEFAULT_LOCALE: Locale = "fr";

/** Launch state controls App Store CTA copy + badge link */
export type LaunchState = "coming-soon" | "live";
export const LAUNCH_STATE: LaunchState = "coming-soon";

/** Once known, this becomes the App Store URL. Until then, badge is disabled. */
export const APP_STORE_URL: string | null = null;

/** Public contact + dev email aliases. Both forward to Antoine's inbox. */
export const SUPPORT_EMAIL = "support@retropal.fr";
export const DEV_EMAIL = "dev@retropal.fr";

export type Strings = {
  nav: {
    features: string;
    pro: string;
    support: string;
    skipToContent: string;
  };
  footer: {
    legalHeading: string;
    privacy: string;
    terms: string;
    legal: string;
    support: string;
    builtBy: string;
    openSource: string;
    poweredBy: string;
    siretLabel: string;
  };
  cta: {
    appStoreLive: string;
    appStoreSoon: string;
    learnMore: string;
  };
  meta: {
    siteName: string;
    tagline: string;
    description: string;
  };
  langSwitch: {
    label: string;
    fr: string;
    en: string;
  };
};

export const fr: Strings = {
  nav: {
    features: "Fonctionnalités",
    pro: "Pro",
    support: "Support",
    skipToContent: "Aller au contenu principal",
  },
  footer: {
    legalHeading: "Légal",
    privacy: "Confidentialité",
    terms: "Conditions",
    legal: "Mentions légales",
    support: "Support",
    builtBy: "Conçu et développé en France.",
    openSource: "Open source.",
    poweredBy:
      "Propulsé par mGBA (MPL-2.0) et melonDS (GPL-3.0). Code source non modifié.",
    siretLabel: "SIRET",
  },
  cta: {
    appStoreLive: "Télécharger sur l'App Store",
    appStoreSoon: "Bientôt sur l'App Store",
    learnMore: "En savoir plus",
  },
  meta: {
    siteName: "Retro Pal",
    tagline: "L'émulateur rétro que ton iPhone mérite",
    description:
      "Joue à tes jeux GBA, Game Boy, Game Boy Color et Nintendo DS sur iPhone. Sans pub, sans collecte de données, sans abonnement obligatoire. Pour toujours.",
  },
  langSwitch: {
    label: "Langue",
    fr: "Français",
    en: "English",
  },
};

export const en: Strings = {
  nav: {
    features: "Features",
    pro: "Pro",
    support: "Support",
    skipToContent: "Skip to main content",
  },
  footer: {
    legalHeading: "Legal",
    privacy: "Privacy",
    terms: "Terms",
    legal: "Legal notice",
    support: "Support",
    builtBy: "Designed and built in France.",
    openSource: "Open source.",
    poweredBy:
      "Powered by mGBA (MPL-2.0) and melonDS (GPL-3.0). Source code not modified.",
    siretLabel: "SIRET",
  },
  cta: {
    appStoreLive: "Download on the App Store",
    appStoreSoon: "Coming soon to the App Store",
    learnMore: "Learn more",
  },
  meta: {
    siteName: "Retro Pal",
    tagline: "The retro emulator your iPhone deserves",
    description:
      "Play your GBA, Game Boy, Game Boy Color and Nintendo DS games on iPhone. No ads, no tracking, no required subscription. Forever.",
  },
  langSwitch: {
    label: "Language",
    fr: "Français",
    en: "English",
  },
};

const STRINGS: Record<Locale, Strings> = { fr, en };

export function getUi(locale: Locale): Strings {
  return STRINGS[locale];
}

/**
 * Resolve the current locale from an Astro URL pathname.
 * Returns "en" for /en/* paths, "fr" otherwise (FR is the unprefixed default).
 */
export function localeFromPath(pathname: string): Locale {
  return pathname.startsWith("/en") || pathname === "/en" ? "en" : "fr";
}

/**
 * Path helper: prefix paths with /en for the EN locale.
 *   localePath("/support", "fr") -> "/support"
 *   localePath("/support", "en") -> "/en/support"
 *   localePath("/", "en")        -> "/en"
 */
export function localePath(path: string, locale: Locale): string {
  if (locale === "fr") return path;
  if (path === "/") return "/en";
  return `/en${path}`;
}

/**
 * Map of equivalent pages across locales. Used by the language switcher to
 * jump from /confidentialite -> /en/privacy (not /en/confidentialite).
 */
export const ROUTE_EQUIVALENTS: Record<string, { fr: string; en: string }> = {
  home: { fr: "/", en: "/en" },
  support: { fr: "/support", en: "/en/support" },
  privacy: { fr: "/confidentialite", en: "/en/privacy" },
  terms: { fr: "/conditions", en: "/en/terms" },
  legal: { fr: "/mentions-legales", en: "/en/legal" },
};

/** Given a current pathname, return the equivalent path in the other locale. */
export function equivalentPath(pathname: string, target: Locale): string {
  // Normalize trailing slash
  const path = pathname.replace(/\/$/, "") || "/";
  for (const entry of Object.values(ROUTE_EQUIVALENTS)) {
    if (entry.fr === path || entry.en === path) {
      return entry[target];
    }
  }
  // Fallback: jump to the locale's home
  return target === "fr" ? "/" : "/en";
}
