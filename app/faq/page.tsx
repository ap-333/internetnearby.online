import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Faq from "@/components/ui/Faq";
import CtaBand from "@/components/ui/CtaBand";
export const metadata: Metadata = { title: "Frequently Asked Questions", description: "Answers about InternetNearby, checking internet availability, contracts, switching providers, business internet and calls or texts.", alternates: { canonical: "/faq" } };
export default function FaqPage() { return <><PageHero eyebrow="Support" title="Frequently asked questions">Straight answers about how InternetNearby works.</PageHero><section className="section"><div className="container-x"><Faq /></div></section><CtaBand /></>; }
