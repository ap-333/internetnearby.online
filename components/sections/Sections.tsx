import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Building2, Home, MapPinned, Headset, Layers, LifeBuoy } from "lucide-react";
import Icon from "@/components/ui/Icon";
import { technologies } from "@/data/technologies";
import { providers } from "@/data/providers";
import AvailabilityForm from "@/components/forms/AvailabilityForm";
import PhoneCTA from "@/components/ui/PhoneCTA";
import AuthorizedBadge from "@/components/ui/AuthorizedBadge";

export const SectionHead = ({ eyebrow, title, text, center = true }: { eyebrow: string; title: string; text?: string; center?: boolean }) => (
  <div className={`mb-12 max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
    <p className="eyebrow">{eyebrow}</p>
    <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">{title}</h2>
    {text && <p className="mt-4 text-lg text-muted">{text}</p>}
  </div>
);

export function ProviderEcosystem() {
  const list = providers.filter((p) => p.authorized && p.logoUrl);
  const dev = process.env.NODE_ENV !== "production";
  return (
    <section className="relative overflow-hidden border-b border-line bg-gradient-to-b from-cloud to-white py-14 sm:py-16" aria-labelledby="eco">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-48 w-[40rem] -translate-x-1/2 rounded-full bg-teal/10 blur-3xl" />
      <div className="container-x relative text-center">
        <AuthorizedBadge />
        <h2 id="eco" className="mx-auto mt-7 max-w-2xl text-2xl font-extrabold sm:text-3xl">Shop internet from the providers you already know</h2>
        <p className="mx-auto mt-3 max-w-xl text-muted">We are an authorized retailer for the providers below. Availability and plans depend on your address, and a specialist confirms what you can actually order.</p>
        {list.length > 0 ? (
          <ul className="mx-auto mt-9 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2">
            {list.map((p) => (
              <li key={p.slug}><Link href={`/providers/${p.slug}`} className="logo-tile" aria-label={`${p.name} through InternetNearby`}><Image src={p.logoUrl!} alt={p.name} width={400} height={100} /></Link></li>
            ))}
          </ul>
        ) : dev ? (
          <ul className="mx-auto mt-9 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4" aria-hidden>
            {[0, 1, 2, 3].map((i) => <li key={i} className="logo-tile border-dashed text-xs font-semibold text-muted">Logo slot {i + 1}</li>)}
          </ul>
        ) : null}
        <p className="mx-auto mt-8 max-w-2xl text-xs leading-relaxed text-muted">InternetNearby is an independent retailer, not an internet service provider. Provider names and logos are trademarks of their respective owners and appear with permission. <Link href="/legal/authorized-retailer-disclosure" className="underline">Authorized Retailer Disclosure</Link></p>
      </div>
    </section>
  );
}

const steps = [
  { n: "01", t: "Share Your Location", d: "Call us or send your address so we can look at what is offered where you live or run your business.", svg: <path d="M32 54s18-14 18-28a18 18 0 1 0-36 0c0 14 18 28 18 28Zm0-20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" /> },
  { n: "02", t: "Explore Your Options", d: "A specialist verifies which authorized providers can serve you and walks through plans, terms and costs, by phone.", svg: <path d="M12 46V30m14 16V18m14 28V24m14 22V12M8 52h48" /> },
  { n: "03", t: "Get Connected", d: "Choose what fits. We guide you through enrollment and installation scheduling with your provider.", svg: <path d="M14 34l12 12 24-26" /> },
];
export function HowItWorks() {
  return (
    <section className="section bg-cloud" aria-labelledby="how">
      <div className="container-x">
        <SectionHead eyebrow="How it works" title="Three simple steps to better internet" />
        <ol className="grid gap-6 md:grid-cols-3">
          {steps.map((s) => (
            <li key={s.n} className="card relative p-8">
              <span className="font-heading text-5xl font-extrabold text-blue/15">{s.n}</span>
              <svg viewBox="0 0 64 64" className="my-4 h-14 w-14 rounded-2xl bg-navy p-3" fill="none" stroke="#16B8A6" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>{s.svg}</svg>
              <h3 className="text-xl font-bold">{s.t}</h3><p className="mt-2 text-muted">{s.d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Technologies() {
  return (
    <section className="section" aria-labelledby="tech">
      <div className="container-x">
        <SectionHead eyebrow="Internet technologies" title="Understand your options before you choose" text="Different technologies suit different addresses and needs. Which ones are available depends on where you are." />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {technologies.map((t) => (
            <article key={t.slug} className="card flex flex-col p-7 transition hover:-translate-y-1 hover:shadow-lift">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-blue/10 text-blue"><Icon name={t.icon} size={24} /></span>
              <h3 className="mt-5 text-xl font-bold">{t.name}</h3>
              <p className="mt-2 text-muted">{t.blurb}</p>
              <ul className="mt-4 space-y-1.5 text-sm">{t.benefits.map((b) => <li key={b} className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />{b}</li>)}</ul>
              <p className="mt-4 text-sm"><strong className="text-navy">Best for:</strong> {t.bestFor}</p>
              {t.slug !== "dsl-internet" ? <Link href={`/services/${t.slug}`} className="mt-auto inline-flex items-center gap-1 pt-5 text-sm font-semibold text-blue">Learn more <ArrowRight size={14} /></Link> : <span className="mt-auto pt-5 text-xs text-muted">{t.limits}</span>}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WhyUs() {
  const items = [
    { i: Layers, t: "Multiple Provider Choices", d: "We work with more than one provider, so recommendations are not limited to a single company's plans." },
    { i: Headset, t: "Personalized Assistance", d: "Talk with a real specialist who listens to how you use the internet and explains your options plainly." },
    { i: MapPinned, t: "Location-Based Availability", d: "Options are verified at your exact address. We do not rely on ZIP-code guesses." },
    { i: LifeBuoy, t: "Support Through Enrollment", d: "We stay with you from your first question through completing enrollment with your provider." },
  ];
  return (
    <section className="section bg-navy text-white" aria-labelledby="why">
      <div className="container-x">
        <div className="mb-12 max-w-2xl"><p className="eyebrow">Why InternetNearby</p><h2 className="mt-2 text-3xl font-extrabold !text-white sm:text-4xl">Local-feeling help for a national choice</h2></div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ i: I, t, d }) => (
            <div key={t} className="rounded-2xl border border-white/10 bg-white/5 p-6"><I className="text-teal" size={28} aria-hidden /><h3 className="mt-4 text-lg font-bold !text-white">{t}</h3><p className="mt-2 text-sm leading-relaxed text-white/70">{d}</p></div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HomeBusiness() {
  const blocks = [
    { icon: Home, tag: "Residential", title: "Internet for the way your household lives", text: "Streaming, remote work, online classes and smart devices all share your connection. We help you match speed, technology and terms to your household.", pts: ["Compare technologies available at your address", "Understand price after promotional periods", "Help moving or switching service"], href: "/services/home-internet", cta: "Explore home internet" },
    { icon: Building2, tag: "Business", title: "Connectivity that keeps your business running", text: "Reliable internet matters for point-of-sale, cloud tools, video conferencing and customers. We help you ask the right questions about service levels and support.", pts: ["Options for offices, shops and remote sites", "Questions to ask about static IPs and support", "Guidance through business enrollment"], href: "/services/business-internet", cta: "Explore business internet" },
  ];
  return (
    <section className="section" aria-label="Home and business internet">
      <div className="container-x grid gap-8 lg:grid-cols-2">
        {blocks.map((b) => (
          <div key={b.tag} className="card p-8 sm:p-10">
            <span className="inline-flex items-center gap-2 rounded-full bg-teal/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-teal"><b.icon size={14} aria-hidden />{b.tag}</span>
            <h2 className="mt-4 text-2xl font-extrabold sm:text-3xl">{b.title}</h2>
            <p className="mt-3 text-muted">{b.text}</p>
            <ul className="mt-5 space-y-2 text-sm">{b.pts.map((p) => <li key={p} className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue" />{p}</li>)}</ul>
            <Link href={b.href} className="btn btn-secondary mt-7">{b.cta} <ArrowRight size={16} /></Link>
          </div>
        ))}
      </div>
    </section>
  );
}

export function CheckAvailabilitySection() {
  return (
    <section id="check-availability" className="section scroll-mt-20 bg-cloud" aria-labelledby="avail">
      <div className="container-x grid items-start gap-10 lg:grid-cols-[1fr_1.2fr]">
        <div className="lg:sticky lg:top-28">
          <p className="eyebrow">Check availability</p>
          <h2 id="avail" className="mt-2 text-3xl font-extrabold sm:text-4xl">Rather not call? Tell us your address.</h2>
          <p className="mt-4 text-lg text-muted">Send your address and what you need. A specialist verifies which authorized providers can serve you and contacts you with real options. We do not show instant results because availability is confirmed address by address.</p>
          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-muted"><span>Faster by phone:</span><PhoneCTA location="availability-section" variant="text" /></div>
        </div>
        <AvailabilityForm />
      </div>
    </section>
  );
}
