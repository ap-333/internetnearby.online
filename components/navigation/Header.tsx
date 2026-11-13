"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "@/components/ui/Logo";
import PhoneCTA from "@/components/ui/PhoneCTA";
import { NAV } from "@/lib/site";

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/90 backdrop-blur">
      <div className="container-x flex h-[72px] items-center justify-between gap-6">
        <Logo height={34} className="shrink-0" />
        <nav aria-label="Main" className="hidden items-center gap-6 xl:gap-8 lg:flex">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="whitespace-nowrap text-sm font-semibold text-ink hover:text-blue">{n.label}</Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <div className="hidden whitespace-nowrap sm:block"><PhoneCTA location="header" /></div>
          <button className="rounded-lg p-2 lg:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {open && (
        <nav aria-label="Mobile" className="border-t border-line bg-white lg:hidden">
          <div className="container-x flex flex-col py-3">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className="border-b border-line py-3 font-semibold">{n.label}</Link>
            ))}
            <Link href="/check-availability" onClick={() => setOpen(false)} className="py-3 font-semibold text-blue">Check Availability</Link>
            <div className="py-3 sm:hidden"><PhoneCTA location="header-mobile" className="w-full" /></div>
          </div>
        </nav>
      )}
    </header>
  );
}
