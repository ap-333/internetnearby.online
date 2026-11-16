import type { Metadata } from "next";
import ContentPage from "@/components/ui/ContentPage";
export const metadata: Metadata = { title: "About InternetNearby", description: "InternetNearby is an independent internet service advisor helping US customers understand their options and get connected. We are not an internet provider.", alternates: { canonical: "/about" } };
export default function About() {
  return <ContentPage eyebrow="About us" title="Better internet starts closer" intro="InternetNearby exists to make finding and starting internet service simpler, with honest guidance and real people."
    blocks={[
      { h: "What we do", p: ["We are an independent advisory service that helps customers across the United States discover internet options at their address, understand the differences between them, and get connected with the provider they choose.", "We are not an internet service provider. We do not own the networks. That is exactly why we can talk about more than one option."] },
      { h: "How we work", list: ["Address first: availability is verified for your exact location.", "Plain language: we explain technologies, terms and costs without jargon.", "Transparency: we tell you who the provider is and what they are responsible for.", "No pressure: you decide if and when to enroll."] },
      { h: "Our commitments", list: ["We never invent prices, speeds, coverage or offers.", "We are not affiliated with, endorsed by or sponsored by any internet provider, and we say so.", "Promotional calls and texts happen only with your separate, opt-in consent.", "We make it easy to stop contact whenever you ask."] },
      { h: "Company details", p: ["Business registration and address details are shown in the site footer once verified."] },
    ]} />;
}
