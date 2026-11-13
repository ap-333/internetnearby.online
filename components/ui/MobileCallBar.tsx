"use client";
import Link from "next/link";
import { Phone } from "lucide-react";
import { BUSINESS, hasPhone } from "@/lib/site";
import { trackCallClick } from "@/lib/tracking";

/** Sticky tap-to-call bar for phones: the main conversion action for paid traffic. */
export default function MobileCallBar() {
  const cls = "flex items-center justify-center gap-2 rounded-xl bg-blue py-3.5 text-sm font-bold uppercase tracking-wide text-white shadow-lift";
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur lg:hidden">
      {hasPhone ? (
        <a href={`tel:${BUSINESS.phoneE164}`} onClick={() => trackCallClick("mobile-bar")} className={cls}><Phone size={18} aria-hidden /> Call {BUSINESS.phoneDisplay}</a>
      ) : (
        <Link href="/contact" className={cls}><Phone size={18} aria-hidden /> Speak With a Specialist</Link>
      )}
    </div>
  );
}
