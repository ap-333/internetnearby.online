// Provider data contract. Every commercial field is nullable: null renders as
// "Confirm with specialist" — never invent prices, coverage or terms.
export type Technology = "fiber" | "cable" | "5g-home" | "fixed-wireless" | "dsl" | "satellite";

export interface Plan {
  name: string;
  technology: Technology;
  downloadMbps: number | null;
  uploadMbps: number | null;
  monthlyPrice: number | null;
  promoPrice: number | null;
  promoDurationMonths: number | null;
  equipmentCost: string | null;
  installationCharge: string | null;
  contractRequirement: string | null;
  eligibility: string | null;
  sourceUrl?: string;       // where the figures were verified
  verifiedOn?: string;      // ISO date of last verification
}

export interface Provider {
  slug: string;
  name: string;
  /** Only set true once written authorization AND brand-use permission are on file. */
  authorized: boolean;
  logoUrl: string | null;   // only with brand-use permission
  overview: string;
  technologies: Technology[];
  verifiedCoverage: string | null;
  plans: Plan[];
  enrollmentNote?: string;
  providerWebsite?: string;
}
