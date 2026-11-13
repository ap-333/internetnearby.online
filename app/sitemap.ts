import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { services } from "@/data/services";
import { providers } from "@/data/providers";
import { legalDocs } from "@/lib/legal";

export default function sitemap(): MetadataRoute.Sitemap {
  const top = ["", "/about", "/internet-plans", "/providers", "/check-availability", "/how-it-works", "/contact", "/faq", "/customer-assistance", "/enrollment-guidance", "/internet-providers-near-me", "/compare-internet-providers", "/internet-service-enrollment-assistance"];
  const paths = [...top, ...services.map((s) => `/services/${s.slug}`), ...providers.filter((p) => p.authorized).map((p) => `/providers/${p.slug}`), ...legalDocs.map((d) => `/legal/${d.slug}`)];
  return paths.map((p) => ({ url: `${SITE.url}${p}`, lastModified: new Date(), priority: p === "" ? 1 : p.startsWith("/legal") ? 0.2 : 0.7 }));
}
