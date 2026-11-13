import type { Metadata } from "next";
import { Suspense } from "react";
import PageHero from "@/components/ui/PageHero";
import PhoneCTA from "@/components/ui/PhoneCTA";
import AvailabilityForm from "@/components/forms/AvailabilityForm";
import { BUSINESS, detail } from "@/lib/site";
export const metadata: Metadata = { title: "Contact InternetNearby", description: "Contact InternetNearby by phone, email or by requesting a callback from a connectivity specialist.", alternates: { canonical: "/contact" } };
export default function Contact() {
  const rows = [["Email", detail("email", "Support email")], ["Address", detail("address", "Business address")], ["Hours", detail("hours", "Business hours")]] as const;
  return (<>
    <PageHero eyebrow="Contact us" title="Talk with a connectivity specialist">Call us or send a request and we will reach out.</PageHero>
    <section className="section"><div className="container-x grid items-start gap-10 lg:grid-cols-[1fr_1.3fr]">
      <div className="card space-y-5 p-7">
        <PhoneCTA location="contact" />
        <dl className="space-y-4 text-sm">{rows.map(([k, v]) => <div key={k}><dt className="font-bold text-navy">{k}</dt><dd className={v.isPlaceholder ? "text-amber-700" : ""}>{k === "Email" && BUSINESS.email ? <a className="underline" href={`mailto:${BUSINESS.email}`}>{v.value}</a> : v.value}</dd></div>)}</dl>
      </div>
      <div><h2 className="mb-4 text-2xl font-extrabold">Request a callback</h2><Suspense><AvailabilityForm compact /></Suspense></div>
    </div></section></>);
}
