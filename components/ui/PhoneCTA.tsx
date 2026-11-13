"use client";
import Link from "next/link";
import { Phone } from "lucide-react";
import { BUSINESS, hasPhone } from "@/lib/site";
import { trackCallClick } from "@/lib/tracking";

type Props = { location: string; variant?: "primary" | "secondary" | "light" | "text"; label?: string; className?: string };

/**
 * Single source of truth for telephone CTAs. The number is read from NEXT_PUBLIC_PHONE_* config.
 * If no number is configured, it renders an honest link to the contact page rather than a dead or fake number.
 */
export default function PhoneCTA({ location, variant = "primary", label, className = "" }: Props) {
  const cls = {
    primary: "btn btn-primary",
    secondary: "btn btn-secondary",
    light: "btn btn-ghost-light",
    text: "inline-flex items-center gap-2 font-semibold text-navy hover:text-blue",
  }[variant];
  if (!hasPhone)
    return (
      <Link href="/contact" className={`${cls} ${className}`}>
        <Phone size={16} aria-hidden /> {label ?? "Speak With a Specialist"}
      </Link>
    );
  return (
    <a href={`tel:${BUSINESS.phoneE164}`} onClick={() => trackCallClick(location)} className={`${cls} ${className}`} data-call-location={location}>
      <Phone size={16} aria-hidden /> {label ?? BUSINESS.phoneDisplay}
    </a>
  );
}
