import type { Metadata } from "next";
import ContentPage from "@/components/ui/ContentPage";
export const metadata: Metadata = { title: "Enrollment Guidance", description: "What to prepare, what to ask and what to expect when enrolling in a new internet service with the help of InternetNearby.", alternates: { canonical: "/enrollment-guidance" } };
export default function Page() {
  return <ContentPage eyebrow="Support" title="Enrollment guidance" intro="A checklist so enrolling feels simple and nothing is a surprise."
    blocks={[
      { h: "Have ready", list: ["Service address, including unit", "Contact details", "Identification or credit-check information if the provider requires it (the provider handles this directly)", "Preferred installation window"] },
      { h: "Ask before you agree", list: ["What is the price after the promotional period ends?", "What equipment is included and what does it cost?", "Are there installation or activation fees?", "How long is the contract and what happens if I cancel early?", "Are there data limits or speed management policies?"] },
      { h: "After you enroll", list: ["Keep your confirmation details.", "Keep your current service until the new service works.", "Return any equipment from a previous provider as instructed."] },
    ]} />;
}
