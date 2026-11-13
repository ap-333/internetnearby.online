import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/ui/PageHero";
import PhoneCTA from "@/components/ui/PhoneCTA";
import CtaBand from "@/components/ui/CtaBand";
import { getService, services } from "@/data/services";

export const dynamicParams = false;
export const generateStaticParams = () => services.map((s) => ({ slug: s.slug }));
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const s = getService((await params).slug);
  return s ? { title: s.metaTitle, description: s.metaDescription, alternates: { canonical: `/services/${s.slug}` } } : {};
}
export default async function Service({ params }: { params: Promise<{ slug: string }> }) {
  const s = getService((await params).slug);
  if (!s) notFound();
  const others = services.filter((x) => x.slug !== s.slug).slice(0, 5);
  return (
    <>
      <PageHero eyebrow="Services" title={s.title} crumbs={[["Home", "/"], ["Services", "/internet-plans"]]}>{s.intro}</PageHero>
      <div className="container-x grid gap-12 py-16 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-10">
          {s.sections.map((sec) => (
            <section key={sec.heading}><h2 className="text-2xl font-extrabold">{sec.heading}</h2>{sec.body.map((b) => <p key={b} className="mt-3 leading-relaxed text-ink/90">{b}</p>)}</section>
          ))}
          <p className="rounded-xl bg-cloud p-5 text-sm text-muted">Availability, speeds, pricing and terms depend on your address and are set and confirmed by the provider. InternetNearby is an independent retailer, not the service provider.</p>
        </div>
        <aside className="space-y-6">
          <div className="card p-6"><h3 className="text-lg font-bold">Talk to a specialist about your address</h3><p className="mt-2 text-sm text-muted">A specialist verifies options with authorized providers while you are on the line.</p><PhoneCTA location={`service-${s.slug}`} className="mt-4 w-full" /><Link href="/check-availability" className="mt-3 block text-center text-sm font-semibold text-blue hover:underline">Or check availability online</Link></div>
          <div className="card p-6"><h3 className="text-lg font-bold">Related services</h3><ul className="mt-3 space-y-2 text-sm">{others.map((o) => <li key={o.slug}><Link className="font-semibold text-blue hover:underline" href={`/services/${o.slug}`}>{o.title}</Link></li>)}</ul></div>
        </aside>
      </div>
      <CtaBand />
    </>
  );
}
