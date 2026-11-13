import Link from "next/link";
import PhoneCTA from "./PhoneCTA";
export default function CtaBand({ title = "Not Sure Which Internet Plan Is Right for You?", text = "Our team can help you understand your available options, compare plans and navigate the enrollment process.", cta = "TALK TO OUR TEAM" }: { title?: string; text?: string; cta?: string }) {
  return (
    <section className="section bg-cloud">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-3xl bg-navy px-6 py-14 text-center text-white sm:px-14">
          <div aria-hidden className="absolute -left-16 -top-16 h-64 w-64 rounded-full bg-teal/20 blur-3xl" />
          <div aria-hidden className="absolute -bottom-20 -right-10 h-72 w-72 rounded-full bg-blue/30 blur-3xl" />
          <h2 className="relative mx-auto max-w-2xl text-3xl font-extrabold !text-white sm:text-4xl">{title}</h2>
          <p className="relative mx-auto mt-4 max-w-xl text-white/80">{text}</p>
          <div className="relative mt-8 flex flex-wrap justify-center gap-3">
            <PhoneCTA location="cta-band" label={cta} />
            <Link href="/check-availability" className="btn btn-ghost-light">Check Availability</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
