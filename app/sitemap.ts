import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { services } from "@/data/services";
import { legalDocs } from "@/lib/legal";

export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  const top = ["", "/about", "/internet-plans", "/check-availability", "/how-it-works", "/contact", "/faq", "/customer-assistance", "/enrollment-guidance", "/internet-providers-near-me", "/compare-internet-providers", "/internet-service-enrollment-assistance"];
  const paths = [...top, ...services.map((s) => `/services/${s.slug}`), ...legalDocs.map((d) => `/legal/${d.slug}`)];
  return paths.map((p) => ({ url: `${SITE.url}${p}`, lastModified: new Date(), priority: p === "" ? 1 : p.startsWith("/legal") ? 0.2 : 0.7 }));
}
