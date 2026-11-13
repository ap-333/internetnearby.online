import Link from "next/link";
import Image from "next/image";
import PhoneCTA from "@/components/ui/PhoneCTA";
import { technologies } from "@/data/technologies";
import type { Provider } from "@/types/provider";

const TBC = <span className="text-muted">Confirmed by specialist</span>;
const money = (n: number | null) => (n == null ? TBC : `$${n.toFixed(2)}/mo`);
const mbps = (n: number | null) => (n == null ? TBC : n >= 1000 ? `${n / 1000} Gbps` : `${n} Mbps`);
const techName = (t: string) => technologies.find((x) => x.slug.replace(/-internet$/, "") === t || x.slug.startsWith(t))?.name ?? t;

export default function ProviderProfile({ p }: { p: Provider }) {
  return (
    <div className="container-x grid gap-12 py-16 lg:grid-cols-[2fr_1fr]">
      <div className="space-y-12">
        <section><h2 className="text-2xl font-extrabold">About {p.name}</h2><p className="mt-3 leading-relaxed">{p.overview}</p>
          <p className="mt-3 text-sm"><strong>Technologies:</strong> {p.technologies.map(techName).join(", ")}</p></section>
        <section><h2 className="text-2xl font-extrabold">Service coverage</h2><p className="mt-3">{p.verifiedCoverage ?? "Coverage is verified address by address. Submit your address and a specialist will confirm whether this provider can serve you."}</p></section>
        <section><h2 className="text-2xl font-extrabold">Plans</h2>
          {p.plans.length === 0 ? <p className="mt-3 text-muted">Plan details are being verified. A specialist can provide current plans for your address.</p> : (
            <div className="mt-5 grid gap-5 md:grid-cols-2">
              {p.plans.map((pl) => (
                <article key={pl.name} className="card p-6">
                  <h3 className="text-lg font-bold">{pl.name}</h3>
                  <dl className="mt-4 divide-y divide-line text-sm">
                    {([["Download", mbps(pl.downloadMbps)], ["Upload", mbps(pl.uploadMbps)], ["Monthly price", money(pl.monthlyPrice)], ["Promotional price", pl.promoPrice == null ? TBC : `${money(pl.promoPrice)}${pl.promoDurationMonths ? ` for ${pl.promoDurationMonths} months` : ""}`], ["Equipment", pl.equipmentCost ?? TBC], ["Installation", pl.installationCharge ?? TBC], ["Contract", pl.contractRequirement ?? TBC], ["Eligibility", pl.eligibility ?? TBC]] as const).map(([k, v]) => (
                      <div key={k} className="flex justify-between gap-4 py-2"><dt className="text-muted">{k}</dt><dd className="text-right font-semibold">{v}</dd></div>
                    ))}
                  </dl>
                  {pl.verifiedOn && <p className="mt-3 text-xs text-muted">Verified {pl.verifiedOn}{pl.sourceUrl ? <> · <a className="underline" href={pl.sourceUrl} rel="noopener noreferrer">source</a></> : null}</p>}
                </article>
              ))}
            </div>
          )}
        </section>
        <section className="rounded-xl bg-cloud p-6 text-sm leading-relaxed text-ink/80" aria-label="Retailer disclosure">
          <h2 className="text-base font-bold">Authorized retailer disclosure</h2>
          <p className="mt-2">InternetNearby is an independent retailer {p.authorized ? `authorized to sell ${p.name} service` : "[AUTHORIZATION STATUS TO BE CONFIRMED]"}. We are not ${p.name} and this is not ${p.name}'s official website. ${p.name} is solely responsible for its service, pricing, billing, installation and support. See the <Link className="underline" href="/legal/authorized-retailer-disclosure">Authorized Retailer Disclosure</Link>.</p>
        </section>
      </div>
      <aside><div className="card sticky top-24 p-6">
        {p.logoUrl && p.authorized && <Image src={p.logoUrl} alt={p.name} width={140} height={40} className="mb-4 h-10 w-auto" />}
        <h3 className="text-lg font-bold">Interested in {p.name}?</h3>
        <p className="mt-2 text-sm text-muted">Call a specialist to confirm availability at your address and walk through enrollment.</p>
        <PhoneCTA location={`provider-${p.slug}`} className="mt-4 w-full" /><Link href={`/check-availability?provider=${p.slug}`} className="mt-3 block text-center text-sm font-semibold text-blue hover:underline">Or check availability online</Link>
      </div></aside>
    </div>
  );
}
