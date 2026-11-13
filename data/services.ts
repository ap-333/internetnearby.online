export interface ServicePage {
  slug: string; title: string; metaTitle: string; metaDescription: string; intro: string;
  sections: { heading: string; body: string[] }[]; steps?: string[]; relatedTech?: string;
}

export const services: ServicePage[] = [
  {
    slug: "new-internet-connections", title: "New Internet Connections", metaTitle: "New Internet Service Setup Help",
    metaDescription: "Moving or setting up a new home or business? InternetNearby helps you find providers at your address and get a new internet connection started.",
    intro: "Setting up internet at a new address involves more than picking a plan. We help you identify who serves the address, understand installation requirements and schedule service.",
    sections: [
      { heading: "When to start", body: ["Installation scheduling can take days or weeks depending on the provider and technology, so it helps to start as soon as you know your new address.", "If a technician visit is needed, availability depends on the provider's schedule in your area."] },
      { heading: "What we help with", body: ["Confirming which providers have service at your exact address.", "Explaining installation type: self-install kits versus professional installation, and any charges the provider discloses.", "Walking through the provider's enrollment so you know each step."] },
      { heading: "What to have ready", body: ["Your full service address, including unit number.", "A phone number and optional email for follow-up.", "Your move-in date, if you know it."] },
    ],
  },
  {
    slug: "switch-internet-providers", title: "Switch Internet Providers", metaTitle: "Switch Internet Providers",
    metaDescription: "Thinking about changing internet providers? Compare what is available at your address and understand contracts, equipment and timing before you switch.",
    intro: "Switching can mean better speeds, simpler pricing or more reliable service, but it should be done with eyes open. We help you compare real options at your address first.",
    sections: [
      { heading: "Before you cancel", body: ["Check whether your current plan has an early termination fee or leased equipment to return.", "Keep your existing service active until the new service is installed and working."] },
      { heading: "Compare like for like", body: ["Look at the price after any promotional period ends, not just the first-year rate.", "Compare upload speeds as well as download speeds, especially for video calls and cloud backups.", "Ask about equipment fees, installation charges and contract length."] },
      { heading: "What we do", body: ["Verify which providers can serve your address.", "Explain differences between the available technologies and plans in plain language.", "Support you through enrollment with your chosen provider."] },
    ],
  },
  {
    slug: "home-internet", title: "Home Internet", metaTitle: "Home Internet Options",
    metaDescription: "Explore home internet options by technology and learn how to match service to your household's needs. Verified availability at your address.",
    intro: "A good home connection depends on how many people and devices you have and what you do online. Start with your needs, then check which options reach your address.",
    sections: [
      { heading: "Matching service to your household", body: ["A one- or two-person home that browses and streams has different needs from a household with several remote workers, students and gamers.", "Upload speed matters for video calls, cloud backups and sharing large files."] },
      { heading: "Technologies available at homes", body: ["Fiber, cable, 5G home internet, fixed wireless, DSL and satellite each fit different situations and different addresses."] },
      { heading: "Wi-Fi coverage", body: ["Your plan's speed is measured at the connection to your home. Router placement, home size and the number of devices all affect what you experience on Wi-Fi. Ask about equipment options such as mesh systems."] },
    ],
  },
  {
    slug: "business-internet", title: "Business Internet", metaTitle: "Business Internet Providers",
    metaDescription: "Find business internet options at your location. Learn about service levels, static IPs, business support and what to ask before choosing a provider.",
    intro: "Business internet is about reliability and support as much as speed. We help small and growing businesses identify options at their location and ask the right questions.",
    sections: [
      { heading: "What to look for", body: ["Symmetrical upload and download speeds, if your workflows depend on cloud tools or video conferencing.", "Static IP availability, if you host services or use certain VPN or security setups.", "Business-class support hours and repair commitments, where offered.", "Service level terms in writing, from the provider."] },
      { heading: "Residential versus business plans", body: ["Business plans may differ in terms of use, support, pricing and contract. Ask which one is appropriate for your use before signing."] },
      { heading: "How to start", body: ["Tell us your business address and requirements in the availability form. A specialist verifies options with authorized providers and follows up with you."] },
    ],
  },
  {
    slug: "fiber-internet", title: "Fiber Internet", metaTitle: "Fiber Internet Availability",
    metaDescription: "Learn how fiber internet works, who benefits most, and how to check whether fiber is available at your address.",
    intro: "Fiber sends data as pulses of light. It is often the fastest and most consistent home technology where available, but it is not available everywhere.",
    relatedTech: "fiber-internet",
    sections: [
      { heading: "Why people choose fiber", body: ["Higher potential speeds and uploads that can match downloads.", "Consistent performance and low latency, helpful for calls, gaming and cloud work."] },
      { heading: "Is fiber available at my address?", body: ["Fiber coverage is street-by-street and sometimes building-by-building. ZIP-code level claims are not reliable. Submit your address and a specialist will verify."] },
      { heading: "Things to ask", body: ["Speed tiers and whether the advertised speed is symmetrical.", "Installation steps, timing and any charges.", "Contract terms and the price after promotions."] },
    ],
  },
  {
    slug: "cable-internet", title: "Cable Internet", metaTitle: "Cable Internet Service",
    metaDescription: "Understand cable internet: how it works, typical strengths and trade-offs, and how to see which cable providers serve your address.",
    intro: "Cable internet runs over the same coaxial network used for cable TV. It is widely available and often offers strong download speeds.",
    relatedTech: "cable-internet",
    sections: [
      { heading: "Strengths", body: ["Broad availability in cities and suburbs.", "High download speeds on many plans.", "Frequently offered alongside TV or phone services."] },
      { heading: "Trade-offs", body: ["Capacity is shared with neighbors, so speeds may dip at busy times.", "Upload speeds are often lower than download speeds."] },
      { heading: "Choosing a plan", body: ["Pick a download tier based on devices and activity, and check the upload speed if you work from home or back up large files."] },
    ],
  },
  {
    slug: "5g-home-internet", title: "5G Home Internet", metaTitle: "5G Home Internet",
    metaDescription: "5G home internet uses a wireless gateway instead of a wired line. See how it works, who it suits and how availability is confirmed.",
    intro: "5G home internet uses a gateway in your home that connects to a nearby cellular 5G network. Setup is usually self-install.",
    relatedTech: "5g-home-internet",
    sections: [
      { heading: "How it works", body: ["The gateway receives a 5G signal and shares it as Wi-Fi. No cable run into your home is typically required."] },
      { heading: "Who it suits", body: ["Renters who cannot or prefer not to have installation work, households wanting simple setup, and addresses where wired options are limited."] },
      { heading: "What affects performance", body: ["Signal strength at your address, gateway placement and how busy the local network is. Providers may offer a way to test signal before you commit; ask your specialist."] },
    ],
  },
  {
    slug: "fixed-wireless-internet", title: "Fixed Wireless Internet", metaTitle: "Fixed Wireless Internet",
    metaDescription: "Fixed wireless internet connects your property to a nearby tower with a rooftop receiver. Learn when it makes sense and what installation involves.",
    intro: "Fixed wireless connects a small receiver on your property to a tower nearby. It is a practical option in many rural and semi-rural areas.",
    relatedTech: "fixed-wireless-internet",
    sections: [
      { heading: "How it differs from 5G home internet", body: ["Fixed wireless typically uses an outdoor-mounted receiver with a professional installation and a dedicated link to a tower, rather than a plug-in indoor gateway."] },
      { heading: "Site considerations", body: ["A clear path between your receiver and the tower matters. Trees, hills and buildings can block the signal; a provider survey usually decides."] },
      { heading: "When to consider it", body: ["When fiber and cable are not available and you want a land-based alternative to satellite."] },
    ],
  },
  {
    slug: "satellite-internet", title: "Satellite Internet", metaTitle: "Satellite Internet Options",
    metaDescription: "Satellite internet can reach remote locations. Learn what to expect from speeds, latency and data policies, and how to see options for your address.",
    intro: "Satellite internet reaches places where wired and many wireless options do not. It requires a dish and a clear view of the sky.",
    relatedTech: "satellite-internet",
    sections: [
      { heading: "What to expect", body: ["Latency is typically higher than wired technologies, which can affect real-time uses such as gaming and some video calls. Newer low-orbit systems have improved this."] },
      { heading: "Data and policies", body: ["Plans can include data thresholds or prioritization. Ask the provider how heavy usage is handled."] },
      { heading: "Getting started", body: ["Share your address; a specialist will confirm what is available and explain installation and equipment terms disclosed by the provider."] },
    ],
  },
];
export const getService = (slug: string) => services.find((s) => s.slug === slug);
