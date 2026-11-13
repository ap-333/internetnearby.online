import { NextResponse } from "next/server";
import { timingSafeEqual } from "node:crypto";
import { z } from "zod";
import { db, LEAD_STATUSES } from "@/lib/db";

export const runtime = "nodejs";

function authorized(req: Request) {
  const t = process.env.ADMIN_API_TOKEN;
  const got = req.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ?? "";
  if (!t || t.length < 24 || got.length !== t.length) return false;
  return timingSafeEqual(Buffer.from(got), Buffer.from(t));
}

export async function GET(req: Request) {
  if (!authorized(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const status = new URL(req.url).searchParams.get("status");
  const r = status
    ? await db().query("SELECT * FROM leads WHERE status = $1 ORDER BY created_at DESC LIMIT 200", [status])
    : await db().query("SELECT * FROM leads ORDER BY created_at DESC LIMIT 200");
  return NextResponse.json({ leads: r.rows });
}

const patch = z.object({ id: z.number().int().positive(), status: z.enum(LEAD_STATUSES), notes: z.string().max(2000).optional() });
export async function PATCH(req: Request) {
  if (!authorized(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const p = patch.safeParse(await req.json().catch(() => null));
  if (!p.success) return NextResponse.json({ error: "Invalid" }, { status: 422 });
  await db().query("UPDATE leads SET status = $1, notes = COALESCE($2, notes), updated_at = now() WHERE id = $3", [p.data.status, p.data.notes ?? null, p.data.id]);
  return NextResponse.json({ ok: true });
}
