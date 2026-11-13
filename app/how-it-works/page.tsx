import type { Metadata } from "next";
import ContentPage from "@/components/ui/ContentPage";
import { HowItWorks } from "@/components/sections/Sections";
export const metadata: Metadata = { title: "How InternetNearby Works", description: "Share your location, explore verified options with a specialist and get connected. See exactly how InternetNearby helps you start internet service.", alternates: { canonical: "/how-it-works" } };
export default function How() {
  return <><ContentPage cta={false} eyebrow="How it works" title="From first question to connected" intro="A clear process with real people, and no surprises about who provides your service."
    blocks={[
      { h: "Who does what", list: ["You tell us your address and what you need.", "InternetNearby verifies options with authorized providers and explains them.", "The provider delivers, bills and supports your service after you enroll."] },
      { h: "What to expect on the call", p: ["Your specialist will confirm your address, ask how you use the internet, describe what is available and what it costs, and explain contract, equipment and installation terms before you decide."] },
      { h: "How long does it take?", p: ["Requesting an availability check takes about a minute. Installation timing depends on the provider and technology and is confirmed during enrollment."] },
    ]} /><HowItWorks /></>;
}
