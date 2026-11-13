import type { Provider } from "@/types/provider";

/**
 * CENTRAL PROVIDER DATA. Logos are the "Authorized Retailer" lockups supplied by the business.
 * Plans, prices, coverage and technologies stay empty until verified figures are supplied;
 * empty values render as "Confirmed by specialist". Never invent commercial details.
 */
const overview = (name: string) =>
  `${name} service is available through InternetNearby, an independent authorized retailer. Plans, pricing, speeds and availability vary by address; a specialist confirms what ${name} offers at your location before you enroll.`;

export const providers: Provider[] = [
  { slug: "xfinity", name: "Xfinity", authorized: true, logoUrl: "/images/providers/xfinity-authorized-retailer.png", overview: overview("Xfinity"), technologies: [], verifiedCoverage: null, plans: [] },
  { slug: "att", name: "AT&T", authorized: true, logoUrl: "/images/providers/att-authorized-retailer.png", overview: overview("AT&T"), technologies: [], verifiedCoverage: null, plans: [] },
  { slug: "spectrum", name: "Spectrum", authorized: true, logoUrl: "/images/providers/spectrum-authorized-retailer.png", overview: overview("Spectrum"), technologies: [], verifiedCoverage: null, plans: [] },
  { slug: "verizon", name: "Verizon", authorized: true, logoUrl: "/images/providers/verizon-authorized-retailer.svg", overview: overview("Verizon"), technologies: [], verifiedCoverage: null, plans: [] },
];

/** Dev-only sample (renders at /providers/template-preview when NODE_ENV !== "production"). */
export const templatePreview: Provider = {
  slug: "template-preview",
  name: "Example Provider (template preview)",
  authorized: false,
  logoUrl: null,
  overview: "Placeholder overview. Replace with a verified description supplied or approved by the provider.",
  technologies: ["fiber", "5g-home"],
  verifiedCoverage: null,
  plans: [
    { name: "Example Plan A", technology: "fiber", downloadMbps: null, uploadMbps: null, monthlyPrice: null, promoPrice: null, promoDurationMonths: null, equipmentCost: null, installationCharge: null, contractRequirement: null, eligibility: null },
  ],
};

export const getProvider = (slug: string) => providers.find((p) => p.slug === slug);
