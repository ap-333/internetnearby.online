import type { Provider } from "@/types/provider";

/**
 * CENTRAL PROVIDER DATA. Intentionally empty until real retailer agreements,
 * brand-use permissions and verified plan data are on file.
 * Add one object per provider; pages, sitemap and directory update automatically.
 */
export const providers: Provider[] = [];

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
