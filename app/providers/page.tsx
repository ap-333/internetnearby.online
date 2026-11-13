import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/ui/PageHero";
import CtaBand from "@/components/ui/CtaBand";
import { providers } from "@/data/providers";

export const metadata: Metadata = { title: "Internet Provider Directory", description: "Directory of internet providers available through InternetNearby, an independent multi-provider retailer. Availability is confirmed by address.", alternates: { canonical: "/providers" } };

export default function Providers() {
  const list = providers.filter((p) => p.authorized);
  return (
    <>
      <PageHero eyebrow="Provider directory" title="Internet providers available through InternetNearby">We list a provider only where we hold an authorized retailer relationship. Availability depends on your address.</PageHero>
      <section className="section"><div className="container-x">
        {list.length === 0 ? (
          <div className="card mx-auto max-w-2xl p-10 text-center"><h2 className="text-2xl font-extrabold">Provider directory coming soon</h2><p className="mt-3 text-muted">We are finalizing our provider authorizations. In the meantime, a specialist can tell you which providers serve your address.</p><Link href="/check-availability" className="btn btn-primary mt-6">Check Availability</Link></div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{list.map((p) => (
            <Link key={p.slug} href={`/providers/${p.slug}`} className="card p-6 transition hover:-translate-y-1 hover:shadow-lift">{p.logoUrl && <Image src={p.logoUrl} alt="" width={120} height={36} className="mb-4 h-9 w-auto" />}<h2 className="text-lg font-bold">{p.name}</h2><p className="mt-2 line-clamp-3 text-sm text-muted">{p.overview}</p></Link>
          ))}</div>
        )}
      </div></section>
      <CtaBand />
    </>
  );
}
