import type { Metadata } from "next";
import Hero from "@/components/hero/Hero";
import { ProviderEcosystem, HowItWorks, Technologies, WhyUs, HomeBusiness, SectionHead, CheckAvailabilitySection } from "@/components/sections/Sections";
import CtaBand from "@/components/ui/CtaBand";
import Faq from "@/components/ui/Faq";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "InternetNearby | Find Internet Providers & Plans at Your Address" },
  description: "Check internet availability at your address, compare options from authorized providers and get help enrolling. InternetNearby is an independent multi-provider internet retailer.",
  alternates: { canonical: "/" },
};

export default function Home() {
  const ld = { "@context": "https://schema.org", "@type": "Organization", name: SITE.name, url: SITE.url, logo: `${SITE.url}/brand/png/logo-symbol.png`, description: SITE.description, areaServed: "US" };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <Hero />
      <ProviderEcosystem />
      <HowItWorks />
      <Technologies />
      <WhyUs />
      <CheckAvailabilitySection />
      <HomeBusiness />
      <CtaBand />
      <section className="section"><div className="container-x"><SectionHead eyebrow="FAQ" title="Questions we hear most" /><Faq /></div></section>
    </>
  );
}
