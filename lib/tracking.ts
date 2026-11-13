"use client";
// Client-side tracking helpers: dataLayer events, Google Ads conversions, campaign attribution.
import { TRACKING } from "./site";

type W = Window & { dataLayer?: unknown[]; gtag?: (...a: unknown[]) => void };
const w = () => (typeof window === "undefined" ? undefined : (window as W));

export function track(event: string, params: Record<string, unknown> = {}) {
  const win = w();
  if (!win) return;
  (win.dataLayer = win.dataLayer || []).push({ event, ...params });
}

function adsConversion(label: string) {
  const win = w();
  if (!win?.gtag || !TRACKING.adsId || !label) return;
  win.gtag("event", "conversion", { send_to: `${TRACKING.adsId}/${label}` });
}

export const trackCallClick = (location: string) => {
  track("call_click", { location });
  adsConversion(TRACKING.callLabel);
};
export const trackLeadSubmit = (needs: string[]) => {
  track("lead_form_submit", { needs });
  adsConversion(TRACKING.leadLabel);
};
export const trackFormStep = (step: number) => track("availability_step", { step });

const KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "gbraid", "wbraid"] as const;

/** Persist first-touch campaign attribution for the session. Call once on load. */
export function captureAttribution() {
  const win = w();
  if (!win) return;
  try {
    const p = new URLSearchParams(win.location.search);
    const existing = JSON.parse(sessionStorage.getItem("inb_attr") || "{}");
    const next = { ...existing };
    for (const k of KEYS) if (p.get(k)) next[k] = p.get(k);
    if (!next.landing_path) {
      next.landing_path = win.location.pathname;
      next.referrer = document.referrer || "";
    }
    sessionStorage.setItem("inb_attr", JSON.stringify(next));
  } catch {}
}

export function getAttribution(): Record<string, string> {
  try {
    return JSON.parse(sessionStorage.getItem("inb_attr") || "{}");
  } catch {
    return {};
  }
}
