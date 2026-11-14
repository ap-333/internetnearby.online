import Link from "next/link";
import Logo from "@/components/ui/Logo";
import PhoneCTA from "@/components/ui/PhoneCTA";
import { BUSINESS, COMPANY_NAME, SOCIAL, detail } from "@/lib/site";

const cols = [
  { title: "Explore", links: [["Internet Plans", "/internet-plans"], ["Providers", "/providers"], ["Check Availability", "/check-availability"], ["How It Works", "/how-it-works"], ["About Us", "/about"], ["Contact Us", "/contact"]] },
  { title: "Services", links: [["New Connections", "/services/new-internet-connections"], ["Switch Providers", "/services/switch-internet-providers"], ["Home Internet", "/services/home-internet"], ["Business Internet", "/services/business-internet"], ["Fiber", "/services/fiber-internet"], ["Cable", "/services/cable-internet"], ["5G Home", "/services/5g-home-internet"], ["Fixed Wireless", "/services/fixed-wireless-internet"], ["Satellite", "/services/satellite-internet"]] },
  { title: "Support", links: [["FAQ", "/faq"], ["Customer Assistance", "/customer-assistance"], ["Enrollment Guidance", "/enrollment-guidance"]] },
  { title: "Legal", links: [["Privacy Policy", "/legal/privacy-policy"], ["Terms & Conditions", "/legal/terms-and-conditions"], ["Customer Disclosure", "/legal/customer-disclosure"], ["Authorized Retailer Disclosure", "/legal/authorized-retailer-disclosure"], ["Cookie & Tracking Notice", "/legal/cookie-notice"], ["Telephone & SMS Consent", "/legal/telephone-sms-consent"], ["Accessibility", "/legal/accessibility-statement"]] },
];

export default function Footer() {
  const addr = detail("address", "Business address");
  const email = detail("email", "Support email");
  const hours = detail("hours", "Business hours");
  const reg = detail("registration", "Business registration details");
  return (
    <footer className="bg-navy text-white">
      <div className="container-x py-16">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_3fr]">
          <div>
            <Logo variant="white" height={34} />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/70">Better Internet Starts Closer. InternetNearby is an independent multi-provider internet retailer serving customers across the United States.</p>
            <address className="mt-6 space-y-1.5 text-sm not-italic text-white/80">
              <p className="font-semibold text-white">InternetNearby</p>
              <p className="text-white/60">A brand of {COMPANY_NAME}</p>
              <p className={addr.isPlaceholder ? "text-amber-300" : ""}>{addr.value}</p>
              <p className={email.isPlaceholder ? "text-amber-300" : ""}>{BUSINESS.email ? <a className="underline" href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a> : email.value}</p>
              <p className={hours.isPlaceholder ? "text-amber-300" : ""}>{hours.value}</p>
            </address>
            <div className="mt-5"><PhoneCTA location="footer" variant="light" /></div>
            {SOCIAL.length > 0 && (
              <ul className="mt-5 flex gap-4 text-sm">
                {SOCIAL.map((s) => <li key={s.label}><a href={s.href} rel="noopener noreferrer" target="_blank" className="text-white/80 hover:text-white">{s.label}</a></li>)}
              </ul>
            )}
          </div>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {cols.map((c) => (
              <nav key={c.title} aria-label={c.title}>
                <h3 className="mb-4 text-sm font-bold uppercase tracking-wider !text-white/60">{c.title}</h3>
                <ul className="space-y-2.5 text-sm">
                  {c.links.map(([l, h]) => <li key={h}><Link href={h} className="text-white/85 hover:text-white">{l}</Link></li>)}
                </ul>
              </nav>
            ))}
          </div>
        </div>
        <div className="mt-12 space-y-3 border-t border-white/15 pt-8 text-xs leading-relaxed text-white/60">
          <p><strong className="text-white/80">Retailer disclosure.</strong> InternetNearby is an independent retailer of internet services and is not an internet service provider. We are not the official website of any provider. Service, pricing, availability, speeds and equipment are provided and set by each provider and vary by address. See our <Link className="underline" href="/legal/authorized-retailer-disclosure">Authorized Retailer Disclosure</Link>.</p>
          {!reg.isPlaceholder && <p>{reg.value}</p>}
          <p>© {new Date().getFullYear()} {COMPANY_NAME}. All rights reserved. All third-party names and marks belong to their respective owners.</p>
        </div>
      </div>
    </footer>
  );
}
