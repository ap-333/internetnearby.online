import { NextResponse } from "next/server";
import { createHmac } from "node:crypto";
import { leadSchema } from "@/lib/validation";
import { db } from "@/lib/db";
import { rateLimit } from "@/lib/rateLimit";
import { CONSENT_VERSION } from "@/lib/site";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || null;
  if (!rateLimit(ip ?? "unknown")) return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });

  const origin = req.headers.get("origin");
  if (origin && process.env.NEXT_PUBLIC_SITE_URL && process.env.NODE_ENV === "production" && origin !== process.env.NEXT_PUBLIC_SITE_URL)
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  let body: unknown;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Invalid request" }, { status: 400 }); }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Validation failed", fields: parsed.error.flatten().fieldErrors }, { status: 422 });
  const d = parsed.data;
  if (d.website) return NextResponse.json({ ok: true }); // honeypot tripped: pretend success

  const a = d.attribution ?? {};
  let id: number;
  try {
    const r = await db().query(
      `INSERT INTO leads (street_address, unit, zip, needs, full_name, phone, email,
         consent_contact, consent_marketing_calls, consent_marketing_sms, consent_text_version, consent_at, consent_ip, user_agent, page_url,
         utm_source, utm_medium, utm_campaign, utm_term, utm_content, gclid, gbraid, wbraid, referrer, landing_path)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,now(),$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24) RETURNING id`,
      [d.street, d.unit ?? null, d.zip, d.needs, d.fullName, d.phone, d.email ?? null,
        d.consentContact, d.consentMarketingCalls, d.consentMarketingSms, CONSENT_VERSION, ip, req.headers.get("user-agent")?.slice(0, 400) ?? null, d.pageUrl ?? null,
        a.utm_source ?? null, a.utm_medium ?? null, a.utm_campaign ?? null, a.utm_term ?? null, a.utm_content ?? null,
        a.gclid ?? null, a.gbraid ?? null, a.wbraid ?? null, a.referrer ?? null, a.landing_path ?? null],
    );
    id = r.rows[0].id;
  } catch (e) {
    console.error("lead insert failed", e instanceof Error ? e.message : e);
    return NextResponse.json({ error: "We could not save your request. Please call us or try again shortly." }, { status: 503 });
  }

  // CRM readiness: optional signed webhook. Failures never block the customer.
  const hook = process.env.CRM_WEBHOOK_URL;
  if (hook) {
    const payload = JSON.stringify({ id, ...d, website: undefined, createdAt: new Date().toISOString() });
    const sig = createHmac("sha256", process.env.CRM_WEBHOOK_SECRET ?? "").update(payload).digest("hex");
    fetch(hook, { method: "POST", headers: { "content-type": "application/json", "x-signature": sig }, body: payload, signal: AbortSignal.timeout(5000) })
      .then(() => db().query("UPDATE leads SET crm_synced_at = now() WHERE id = $1", [id]))
      .catch((e) => console.error("crm webhook failed", e instanceof Error ? e.message : e));
  }
  return NextResponse.json({ ok: true, reference: `INB-${id}` });
}
