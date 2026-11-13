import type { Metadata } from "next";
import ContentPage from "@/components/ui/ContentPage";
export const metadata: Metadata = { title: "Internet Service Enrollment Assistance", description: "Get step-by-step help enrolling in internet service: verifying availability, understanding terms and scheduling installation.", alternates: { canonical: "/internet-service-enrollment-assistance" } };
export default function Page() {
  return <ContentPage eyebrow="Enrollment help" title="Internet service enrollment assistance" intro="Enrolling should not feel like a maze. A specialist stays with you through each step."
    blocks={[
      { h: "How assistance works", list: ["We verify availability at your address", "We explain plan terms and costs the provider discloses", "We help you complete enrollment with the provider", "We help you schedule installation or self-install shipment"] },
      { h: "Your decision", p: ["You choose whether to enroll. Final plan, price and terms are the provider's and are disclosed before you agree."] },
    ]} />;
}
