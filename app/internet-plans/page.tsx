import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import CtaBand from "@/components/ui/CtaBand";
import { Technologies } from "@/components/sections/Sections";
import { providers } from "@/data/providers";

export const metadata: Metadata = { title: "Internet Plans Available in Your Area", description: "Understand internet plan types by technology and find out which plans are available at your address through InternetNearby.", alternates: { canonical: "/internet-plans" } };

export default function Plans() {
  const withPlans = providers.filter((p) => p.authorized && p.plans.length);
  return (
    <>
      <PageHero eyebrow="Internet plans" title="Internet plans available in your area">Plans and prices depend on your address, so we confirm them with you instead of showing one-size-fits-all offers.</PageHero>
      <section className="section"><div className="container-x grid gap-8 md:grid-cols-3">
        {[["Start with your address", "Plan availability is set by each provider and differs from one address to the next, even on the same street."], ["Compare what matters", "Look at download and upload speeds, price after promotions, equipment, installation, contract and data policies."], ["Confirm before you enroll", "Your specialist and the provider disclose the final terms before you commit."]].map(([t, d]) => <div key={t} className="card p-7"><h2 className="text-xl font-bold">{t}</h2><p className="mt-2 text-muted">{d}</p></div>)}
      </div></section>
      {withPlans.length > 0 && <section className="container-x pb-12"><h2 className="mb-5 text-2xl font-extrabold">Plans by provider</h2><ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{withPlans.map((p) => <li key={p.slug}><Link className="card block p-5 font-bold hover:shadow-lift" href={`/providers/${p.slug}`}>{p.name} <span className="block text-sm font-normal text-muted">{p.plans.length} plans</span></Link></li>)}</ul></section>}
      <Technologies />
      <CtaBand />
    </>
  );
}
