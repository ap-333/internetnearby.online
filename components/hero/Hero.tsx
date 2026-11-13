import Link from "next/link";
import { ShieldCheck, Clock, PhoneCall } from "lucide-react";
import HeroIllustration from "./HeroIllustration";
import PhoneCTA from "@/components/ui/PhoneCTA";
import { BUSINESS, hasPhone } from "@/lib/site";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy text-white">
      <div aria-hidden className="absolute -right-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-blue/30 blur-3xl" />
      <div aria-hidden className="absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-teal/20 blur-3xl" />
      <div className="container-x relative grid items-center gap-10 py-14 lg:grid-cols-[1.15fr_1fr] lg:py-24">
        <div>
          <p className="eyebrow">Better Internet Starts Closer</p>
          <h1 className="mt-3 text-4xl font-extrabold leading-[1.08] !text-white sm:text-5xl lg:text-[3.4rem]">Find the Right Internet. Get Connected Without the Guesswork.</h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/80">Explore internet options available at your address, compare plans and get assistance from our connectivity specialists. We make finding and getting started with internet service simpler.</p>

          <div className="mt-8 flex flex-col items-start gap-4">
            <PhoneCTA location="hero" label={hasPhone ? `Call ${BUSINESS.phoneDisplay}` : "Speak With a Specialist"} className="!w-full !px-8 !py-5 !text-base sm:!w-auto" />
            <ul className="flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-white/75">
              <li className="flex items-center gap-1.5"><PhoneCall size={15} className="text-teal" aria-hidden /> Speak with a connectivity specialist</li>
              {BUSINESS.hours && <li className="flex items-center gap-1.5"><Clock size={15} className="text-teal" aria-hidden /> {BUSINESS.hours}</li>}
            </ul>
            <Link href="/#check-availability" className="text-sm font-semibold text-white/90 underline decoration-teal decoration-2 underline-offset-4 hover:text-white">Prefer to check online? Check availability &darr;</Link>
          </div>
          <p className="mt-7 flex items-center gap-2 text-sm text-white/65"><ShieldCheck size={16} className="text-teal" aria-hidden /> Independent authorized retailer. Service is provided by the provider you choose.</p>
        </div>
        <div className="mx-auto w-full max-w-lg lg:max-w-none"><HeroIllustration /></div>
      </div>
    </section>
  );
}
