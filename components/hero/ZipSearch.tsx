"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MapPin } from "lucide-react";
import { track } from "@/lib/tracking";

export default function ZipSearch() {
  const r = useRouter();
  const [zip, setZip] = useState("");
  const [err, setErr] = useState("");
  return (
    <form noValidate onSubmit={(e) => { e.preventDefault(); if (!/^\d{5}$/.test(zip)) return setErr("Enter a 5-digit ZIP code"); track("hero_zip_start"); r.push(`/check-availability?zip=${zip}`); }} className="rounded-2xl bg-white p-2 shadow-lift">
      <div className="flex flex-col gap-2 sm:flex-row">
        <label className="relative flex-1"><span className="sr-only">ZIP code</span>
          <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" size={18} aria-hidden />
          <input className="input !border-transparent" style={{ paddingLeft: "2.75rem" }} inputMode="numeric" maxLength={5} placeholder="Enter your ZIP code" value={zip} onChange={(e) => { setZip(e.target.value.replace(/\D/g, "")); setErr(""); }} aria-invalid={!!err} />
        </label>
        <button className="btn btn-primary">Check Availability</button>
      </div>
      {err && <p role="alert" className="px-3 pb-1 pt-2 text-sm text-red-600">{err}</p>}
    </form>
  );
}
