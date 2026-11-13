import type { Metadata } from "next";
import ContentPage from "@/components/ui/ContentPage";
export const metadata: Metadata = { title: "Internet Providers Near Me", description: "Find out which internet providers serve your address, why ZIP-code lists can mislead, and how to get an address-level check.", alternates: { canonical: "/internet-providers-near-me" } };
export default function Page() {
  return <ContentPage eyebrow="Providers near you" title="Which internet providers are near me?" intro="The honest answer depends on your exact address, not just your ZIP code."
    blocks={[
      { h: "Why ZIP-code lists can mislead", p: ["Networks are built street by street. Two neighbors can have different choices, and a provider that covers part of a ZIP code may not reach your home."] },
      { h: "What to check at your address", list: ["Which technologies reach your building: fiber, cable, 5G home, fixed wireless, DSL, satellite", "Maximum and typical speeds, both download and upload", "Pricing after introductory periods", "Installation requirements"] },
      { h: "How InternetNearby helps", p: ["Submit your address. A specialist verifies availability with authorized providers and calls you with options you can actually order."] },
    ]} />;
}
