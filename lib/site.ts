// Central business configuration. Every value comes from environment variables so that
// nothing unverified is ever hard-coded. Empty values render as clearly marked placeholders.

const env = (v: string | undefined) => (v && v.trim() ? v.trim() : "");

export const SITE = {
  name: "InternetNearby",
  tagline: "Better Internet Starts Closer.",
  url: env(process.env.NEXT_PUBLIC_SITE_URL) || "https://internetnearby.online",
  description:
    "InternetNearby is a multi-provider internet retailer in the United States. Check availability at your address, compare plans from authorized providers and get help getting connected.",
};

export const BUSINESS = {
  legalName: env(process.env.NEXT_PUBLIC_BUSINESS_LEGAL_NAME),
  address: env(process.env.NEXT_PUBLIC_BUSINESS_ADDRESS),
  registration: env(process.env.NEXT_PUBLIC_BUSINESS_REGISTRATION),
  email: env(process.env.NEXT_PUBLIC_SUPPORT_EMAIL),
  hours: env(process.env.NEXT_PUBLIC_BUSINESS_HOURS),
  // Default business line; NEXT_PUBLIC_PHONE_* overrides it (e.g. for a call-tracking number).
  phoneDisplay: env(process.env.NEXT_PUBLIC_PHONE_DISPLAY) || "(888) 710-5977",
  phoneE164: env(process.env.NEXT_PUBLIC_PHONE_E164) || "+18887105977",
};

export const SOCIAL = [
  { label: "Facebook", href: env(process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK) },
  { label: "LinkedIn", href: env(process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN) },
  { label: "X", href: env(process.env.NEXT_PUBLIC_SOCIAL_X) },
  { label: "Instagram", href: env(process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM) },
].filter((s) => s.href);

export const hasPhone = Boolean(BUSINESS.phoneE164 && BUSINESS.phoneDisplay);

/** Returns the configured value, or a visible bracketed placeholder flagged for review. */
export function detail(key: keyof typeof BUSINESS, label: string) {
  const value = BUSINESS[key];
  return { value: value || `[${label} — to be added]`, isPlaceholder: !value };
}

export const COMPANY_NAME = BUSINESS.legalName || "InternetNearby";

export const NAV = [
  { label: "Internet Plans", href: "/internet-plans" },
  { label: "Providers", href: "/providers" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const TRACKING = {
  gtmId: env(process.env.NEXT_PUBLIC_GTM_ID),
  adsId: env(process.env.NEXT_PUBLIC_GOOGLE_ADS_ID),
  callLabel: env(process.env.NEXT_PUBLIC_GADS_CALL_CONVERSION_LABEL),
  leadLabel: env(process.env.NEXT_PUBLIC_GADS_LEAD_CONVERSION_LABEL),
};

export const CONSENT_VERSION = "2026-11-draft-1";
