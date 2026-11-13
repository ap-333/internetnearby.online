import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHero from "@/components/ui/PageHero";
import ProviderProfile from "@/components/provider/ProviderProfile";
import { getProvider, providers, templatePreview } from "@/data/providers";

export const dynamicParams = false;
// Static export needs at least one param. With no providers yet, the template-preview slug is emitted and 404s in production.
export const generateStaticParams = () => (providers.length ? providers.map((p) => ({ slug: p.slug })) : [{ slug: templatePreview.slug }]);
const find = (slug: string) => getProvider(slug) ?? (process.env.NODE_ENV !== "production" && slug === templatePreview.slug ? templatePreview : undefined);

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = find((await params).slug);
  if (!p) return {};
  return { title: `${p.name} Internet Plans & Availability`, description: `Learn about ${p.name} internet service, technologies and plans, and get help from InternetNearby, an independent retailer.`, alternates: { canonical: `/providers/${p.slug}` }, robots: p.authorized ? undefined : { index: false } };
}
export default async function ProviderPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = find((await params).slug);
  if (!p) notFound();
  return (<><PageHero eyebrow="Provider profile" title={p.name} crumbs={[["Home", "/"], ["Providers", "/providers"]]}>Information about {p.name} service, offered through InternetNearby.</PageHero><ProviderProfile p={p} /></>);
}
