import { z } from "zod";

export const NEEDS = ["new-connection", "switching", "better-speeds", "affordable", "business"] as const;
export const NEED_LABELS: Record<(typeof NEEDS)[number], string> = {
  "new-connection": "New internet connection",
  switching: "Switching providers",
  "better-speeds": "Looking for better speeds",
  affordable: "Looking for affordable plans",
  business: "Business internet requirements",
};

const clean = (s: string) => s.replace(/[\u0000-\u001f\u007f]/g, "").trim();
const text = (max: number) => z.string().transform(clean).pipe(z.string().min(1).max(max));
const optText = (max: number) => z.string().max(max).optional().transform((v) => (v ? clean(v) : undefined));

export const leadSchema = z.object({
  street: text(160),
  unit: optText(40),
  zip: z.string().regex(/^\d{5}(-\d{4})?$/, "Enter a valid 5-digit ZIP code"),
  needs: z.array(z.enum(NEEDS)).min(1, "Select at least one option").max(5),
  fullName: text(100).refine((v) => v.length >= 2 && /\p{L}/u.test(v), "Enter your full name"),
  phone: z.string().transform((v) => v.replace(/[^\d+]/g, "")).refine((v) => /^(\+?1)?\d{10}$/.test(v), "Enter a valid US phone number")
    .transform((v) => v.replace(/^\+?1?/, "")),
  email: z.string().max(200).optional().transform((v) => (v ? v.trim() : undefined)).refine((v) => !v || z.string().email().safeParse(v).success, "Enter a valid email address"),
  consentContact: z.literal(true, { message: "Please confirm we may contact you about this request" }),
  consentMarketingCalls: z.boolean().default(false),
  consentMarketingSms: z.boolean().default(false),
  pageUrl: optText(500),
  website: z.string().max(0).optional(), // honeypot
  attribution: z.record(z.string(), z.string().max(300)).optional(),
});
export type LeadInput = z.infer<typeof leadSchema>;
