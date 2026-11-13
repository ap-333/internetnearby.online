import type { Metadata } from "next";
import ContentPage from "@/components/ui/ContentPage";
export const metadata: Metadata = { title: "Customer Assistance", description: "Get help choosing internet service, understanding your options and reaching the right provider contact after you are connected.", alternates: { canonical: "/customer-assistance" } };
export default function Page() {
  return <ContentPage eyebrow="Support" title="Customer assistance" intro="Know who to contact, and when."
    blocks={[
      { h: "Before you enroll", p: ["InternetNearby specialists can help you understand options, compare plans and prepare questions for the provider."] },
      { h: "During enrollment", p: ["We can help you complete enrollment steps and schedule installation with your provider."] },
      { h: "After you are connected", p: ["Your provider handles service outages, repairs, billing questions and equipment issues. If you are unsure how to reach them, contact us and we will point you to the right provider support channel."] },
      { h: "Opting out of contact", list: ["Reply STOP to any text message.", "Tell any specialist to add you to our do-not-contact list.", "Contact us using the details on our Contact page."] },
    ]} />;
}
