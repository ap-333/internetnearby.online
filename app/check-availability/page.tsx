import type { Metadata } from "next";
import { Suspense } from "react";
import PageHero from "@/components/ui/PageHero";
import AvailabilityForm from "@/components/forms/AvailabilityForm";
import PhoneCTA from "@/components/ui/PhoneCTA";

export const metadata: Metadata = { title: "Check Internet Availability at Your Address", description: "Tell us your address and needs. A specialist verifies which authorized providers can serve you and contacts you with next steps.", alternates: { canonical: "/check-availability" } };

export default function Check() {
  return (
    <>
      <PageHero eyebrow="Check availability" title="See what internet is available at your address">It takes about a minute. A specialist confirms real availability and follows up with you.</PageHero>
      <section className="section"><div className="container-x grid items-start gap-10 lg:grid-cols-[1.3fr_1fr]">
        <Suspense><AvailabilityForm /></Suspense>
        <aside className="space-y-5">
          <div className="card p-6"><h2 className="text-lg font-bold">What happens next</h2><ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-ink/90"><li>We receive your request.</li><li>A specialist verifies provider availability for your exact address.</li><li>We contact you to explain real options, terms and costs.</li></ol></div>
          <div className="card p-6"><h2 className="text-lg font-bold">Prefer to talk?</h2><p className="mt-2 text-sm text-muted">Speak with a connectivity specialist directly.</p><div className="mt-4"><PhoneCTA location="check-availability" variant="secondary" /></div></div>
          <p className="text-xs text-muted">We do not display instant availability results because availability must be verified with each provider for your address.</p>
        </aside>
      </div></section>
    </>
  );
}
