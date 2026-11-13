import type { Metadata } from "next";
import ContentPage from "@/components/ui/ContentPage";
export const metadata: Metadata = { title: "About InternetNearby", description: "InternetNearby is an independent multi-provider internet retailer helping US customers find, compare and enroll in internet service.", alternates: { canonical: "/about" } };
export default function About() {
  return <ContentPage eyebrow="About us" title="Better internet starts closer" intro="InternetNearby exists to make finding and starting internet service simpler, with honest guidance and real people."
    blocks={[
      { h: "What we do", p: ["We are an independent retailer that helps customers across the United States discover internet options at their address, understand the differences between them, and complete enrollment with an authorized provider.", "We are not an internet service provider. We do not own the networks. That is exactly why we can talk about more than one option."] },
      { h: "How we work", list: ["Address first: availability is verified for your exact location.", "Plain language: we explain technologies, terms and costs without jargon.", "Transparency: we tell you who the provider is and what they are responsible for.", "No pressure: you decide if and when to enroll."] },
      { h: "Our commitments", list: ["We never invent prices, speeds, coverage or offers.", "We only list providers we are authorized to represent.", "Promotional calls and texts happen only with your separate, opt-in consent.", "We make it easy to stop contact whenever you ask."] },
      { h: "Company details", p: ["Business registration and address details are shown in the site footer once verified."] },
    ]} />;
}
