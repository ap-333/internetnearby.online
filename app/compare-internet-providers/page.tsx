import type { Metadata } from "next";
import ContentPage from "@/components/ui/ContentPage";
export const metadata: Metadata = { title: "Compare Internet Providers", description: "A practical checklist for comparing internet providers: speed, price after promotions, equipment, installation, contracts and support.", alternates: { canonical: "/compare-internet-providers" } };
export default function Page() {
  return <ContentPage eyebrow="Compare" title="How to compare internet providers" intro="A practical checklist you can use whether or not you work with us."
    blocks={[
      { h: "1. Compare technology first", p: ["Fiber, cable, 5G home, fixed wireless, DSL and satellite behave differently in speed consistency, upload capability and latency."] },
      { h: "2. Compare the real monthly cost", list: ["Promotional price and how long it lasts", "Price after the promotion", "Equipment rental or purchase", "Installation and activation fees", "Taxes and fees"] },
      { h: "3. Compare terms", list: ["Contract length and early termination", "Data limits or throttling", "Price-lock or guarantee terms, if any, in writing"] },
      { h: "4. Compare support", p: ["Ask about support hours and repair process, especially for business use."] },
    ]} />;
}
