"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { NEEDS, NEED_LABELS } from "@/lib/validation";
import { getAttribution, trackFormStep, trackLeadSubmit } from "@/lib/tracking";
import PhoneCTA from "@/components/ui/PhoneCTA";

type Needs = (typeof NEEDS)[number];
const empty = { street: "", unit: "", zip: "", needs: [] as Needs[], fullName: "", phone: "", email: "", consentContact: false, consentMarketingCalls: false, consentMarketingSms: false, website: "" };
const STEPS = ["Location", "Needs", "Contact", "Done"];

export default function AvailabilityForm({ initialZip = "", compact = false }: { initialZip?: string; compact?: boolean }) {
  const [step, setStep] = useState(1);
  const [f, setF] = useState({ ...empty, zip: initialZip });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [ref, setRef] = useState("");
  const [serverError, setServerError] = useState("");
  const top = useRef<HTMLDivElement>(null);

  useEffect(() => { const z = new URLSearchParams(location.search).get("zip"); if (z && /^\d{5}$/.test(z)) setF((p) => ({ ...p, zip: z })); }, []);
  const set = <K extends keyof typeof empty>(k: K, v: (typeof empty)[K]) => setF((p) => ({ ...p, [k]: v }));
  const go = (n: number) => { setStep(n); trackFormStep(n); top.current?.scrollIntoView({ block: "nearest", behavior: "smooth" }); };

  function validate(s: number) {
    const e: Record<string, string> = {};
    if (s === 1) {
      if (f.street.trim().length < 4) e.street = "Enter your street address";
      if (!/^\d{5}(-\d{4})?$/.test(f.zip)) e.zip = "Enter a valid 5-digit ZIP code";
    }
    if (s === 2 && f.needs.length === 0) e.needs = "Select at least one option";
    if (s === 3) {
      if (f.fullName.trim().length < 2) e.fullName = "Enter your full name";
      if (!/^(\+?1)?\d{10}$/.test(f.phone.replace(/[^\d+]/g, ""))) e.phone = "Enter a valid US phone number";
      if (f.email && !/^\S+@\S+\.\S+$/.test(f.email)) e.email = "Enter a valid email address";
      if (!f.consentContact) e.consentContact = "Please confirm we may contact you about this request";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function submit() {
    if (!validate(3)) return;
    setBusy(true); setServerError("");
    try {
      const res = await fetch("/api/leads", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ ...f, pageUrl: location.href, attribution: getAttribution() }) });
      const data = await res.json().catch(() => ({}));
      if (res.ok) { setRef(data.reference ?? ""); trackLeadSubmit(f.needs); go(4); }
      else if (res.status === 422 && data.fields) setErrors(Object.fromEntries(Object.entries(data.fields as Record<string, string[]>).map(([k, v]) => [k, v[0]])));
      else setServerError(data.error ?? "Something went wrong. Please try again.");
    } catch { setServerError("Network error. Please try again."); }
    setBusy(false);
  }

  const err = (k: string) => errors[k] && <p role="alert" className="mt-1 text-sm text-red-600">{errors[k]}</p>;
  const Label = ({ id, children }: { id: string; children: React.ReactNode }) => <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-navy">{children}</label>;

  return (
    <div ref={top} className={`card ${compact ? "p-5" : "p-6 sm:p-8"}`}>
      <ol className="mb-6 flex items-center gap-2" aria-label="Progress">
        {STEPS.map((s, i) => (
          <li key={s} className="flex flex-1 items-center gap-2" aria-current={step === i + 1 ? "step" : undefined}>
            <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-bold ${step > i + 1 ? "bg-teal text-white" : step === i + 1 ? "bg-blue text-white" : "bg-cloud text-muted"}`}>{i + 1}</span>
            <span className={`hidden text-xs font-semibold sm:block ${step === i + 1 ? "text-navy" : "text-muted"}`}>{s}</span>
            {i < 3 && <span className="h-px flex-1 bg-line" />}
          </li>
        ))}
      </ol>

      {step === 1 && (
        <form noValidate onSubmit={(e) => { e.preventDefault(); if (validate(1)) go(2); }} className="space-y-4">
          <h2 className="text-xl font-bold">Where do you need internet?</h2>
          <div><Label id="street">Street address</Label><input id="street" className="input" autoComplete="street-address" value={f.street} onChange={(e) => set("street", e.target.value)} aria-invalid={!!errors.street} />{err("street")}</div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div><Label id="unit">Apt / unit (optional)</Label><input id="unit" className="input" value={f.unit} onChange={(e) => set("unit", e.target.value)} /></div>
            <div><Label id="zip">ZIP code</Label><input id="zip" className="input" inputMode="numeric" autoComplete="postal-code" maxLength={10} value={f.zip} onChange={(e) => set("zip", e.target.value)} aria-invalid={!!errors.zip} />{err("zip")}</div>
          </div>
          <button className="btn btn-primary w-full">Continue <ArrowRight size={16} /></button>
          <p className="text-xs text-muted">We use your address only to verify service options. Availability varies by address and is confirmed by a specialist.</p>
        </form>
      )}

      {step === 2 && (
        <form noValidate onSubmit={(e) => { e.preventDefault(); if (validate(2)) go(3); }} className="space-y-4">
          <fieldset><legend className="text-xl font-bold">What are you looking for?</legend><p className="mb-3 mt-1 text-sm text-muted">Select all that apply.</p>
            <div className="grid gap-2.5">
              {NEEDS.map((n) => (
                <label key={n} className={`flex cursor-pointer items-center gap-3 rounded-xl border-[1.5px] p-3.5 text-sm font-medium ${f.needs.includes(n) ? "border-blue bg-blue/5" : "border-line"}`}>
                  <input type="checkbox" className="h-4 w-4 accent-[#1689e8]" checked={f.needs.includes(n)} onChange={() => set("needs", f.needs.includes(n) ? f.needs.filter((x) => x !== n) : [...f.needs, n])} />{NEED_LABELS[n]}
                </label>
              ))}
            </div>{err("needs")}
          </fieldset>
          <div className="flex gap-3"><button type="button" onClick={() => go(1)} className="btn btn-secondary"><ArrowLeft size={16} />Back</button><button className="btn btn-primary flex-1">Continue <ArrowRight size={16} /></button></div>
        </form>
      )}

      {step === 3 && (
        <form noValidate onSubmit={(e) => { e.preventDefault(); submit(); }} className="space-y-4">
          <h2 className="text-xl font-bold">How can we reach you?</h2>
          <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px] h-0 w-0 opacity-0" value={f.website} onChange={(e) => set("website", e.target.value)} />
          <div><Label id="fullName">Full name</Label><input id="fullName" className="input" autoComplete="name" value={f.fullName} onChange={(e) => set("fullName", e.target.value)} aria-invalid={!!errors.fullName} />{err("fullName")}</div>
          <div><Label id="phone">Telephone number</Label><input id="phone" type="tel" className="input" autoComplete="tel" value={f.phone} onChange={(e) => set("phone", e.target.value)} aria-invalid={!!errors.phone} />{err("phone")}</div>
          <div><Label id="email">Email address (optional)</Label><input id="email" type="email" className="input" autoComplete="email" value={f.email} onChange={(e) => set("email", e.target.value)} aria-invalid={!!errors.email} />{err("email")}</div>

          <div className="space-y-3 rounded-xl bg-cloud p-4 text-[13px] leading-relaxed text-ink">
            <label className="flex items-start gap-3"><input type="checkbox" className="mt-1 h-4 w-4 shrink-0 accent-[#1689e8]" checked={f.consentContact} onChange={(e) => set("consentContact", e.target.checked)} />
              <span>I agree that InternetNearby may contact me by phone, text message or email about this availability request, including to verify service options. Message and data rates may apply. This consent is not a condition of purchase.</span></label>
            {err("consentContact")}
            <label className="flex items-start gap-3"><input type="checkbox" className="mt-1 h-4 w-4 shrink-0 accent-[#1689e8]" checked={f.consentMarketingCalls} onChange={(e) => set("consentMarketingCalls", e.target.checked)} />
              <span><em className="font-semibold not-italic">Optional.</em> I agree to receive promotional telephone calls, which may use automated technology, from InternetNearby at the number provided. Consent is not a condition of purchase.</span></label>
            <label className="flex items-start gap-3"><input type="checkbox" className="mt-1 h-4 w-4 shrink-0 accent-[#1689e8]" checked={f.consentMarketingSms} onChange={(e) => set("consentMarketingSms", e.target.checked)} />
              <span><em className="font-semibold not-italic">Optional.</em> I agree to receive promotional text messages from InternetNearby at the number provided. Message frequency varies. Msg &amp; data rates may apply. Reply STOP to opt out, HELP for help.</span></label>
            <p className="text-xs text-muted">See our <Link className="underline" href="/legal/telephone-sms-consent">Telephone &amp; SMS Consent</Link> and <Link className="underline" href="/legal/privacy-policy">Privacy Policy</Link>.</p>
          </div>

          {serverError && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{serverError}</p>}
          <div className="flex gap-3"><button type="button" onClick={() => go(2)} className="btn btn-secondary"><ArrowLeft size={16} />Back</button>
            <button disabled={busy} className="btn btn-primary flex-1">{busy ? <Loader2 className="animate-spin" size={16} /> : null}Request availability check</button></div>
        </form>
      )}

      {step === 4 && (
        <div className="space-y-4 text-center" role="status">
          <CheckCircle2 className="mx-auto text-teal" size={52} />
          <h2 className="text-2xl font-bold">Request received</h2>
          {ref && <p className="text-sm text-muted">Reference: <strong className="text-navy">{ref}</strong></p>}
          <ul className="mx-auto max-w-md space-y-2 text-left text-sm text-ink">
            <li><strong>1.</strong> A specialist reviews which authorized providers may serve your address.</li>
            <li><strong>2.</strong> They contact you at the number you provided to confirm what is actually available and explain plan terms.</li>
            <li><strong>3.</strong> If you choose to proceed, they guide you through the provider's enrollment.</li>
          </ul>
          <p className="text-xs text-muted">This request does not guarantee availability or pricing. Those are confirmed by the provider.</p>
          <div className="flex justify-center"><PhoneCTA location="form-confirmation" variant="secondary" /></div>
        </div>
      )}
    </div>
  );
}
