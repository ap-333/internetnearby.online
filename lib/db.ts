import { Pool } from "pg";

declare global { var __pgPool: Pool | undefined }

export function db() {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not configured");
  return (globalThis.__pgPool ??= new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 5,
    ssl: process.env.DATABASE_SSL === "true" ? { rejectUnauthorized: true } : undefined,
  }));
}

export const LEAD_STATUSES = ["new", "contacted", "verifying_availability", "qualified", "enrolled", "not_available", "unreachable", "do_not_contact", "closed"] as const;
