# InternetNearby (internetnearby.online)

Next.js 15 · TypeScript · Tailwind 4 · PostgreSQL · Lucide.

## Run

```bash
cp .env.example .env.local      # fill in VERIFIED business details only
npm install
psql "$DATABASE_URL" -f db/schema.sql   # or: npm run db:migrate
npm run dev                      # http://localhost:3000
npm run build && npm start
```

## Where things live

| Need | File |
|---|---|
| Phone number, address, legal name, socials | `.env.local` → read by `lib/site.ts` (empty = visible placeholder; phone CTAs fall back to a link to /contact) |
| Providers & plans | `data/providers.ts` (empty on purpose; schema in `types/provider.ts`) |
| Legal drafts | `lib/legal.ts` (bracketed text = must confirm; counsel review required) |
| Service/landing copy | `data/services.ts`, `data/faqs.ts`, `data/technologies.ts` |
| Lead intake | `components/forms/AvailabilityForm.tsx` → `app/api/leads/route.ts` → `leads` table |
| Lead status management | `GET/PATCH /api/admin/leads` with `Authorization: Bearer $ADMIN_API_TOKEN` |
| CRM readiness | `CRM_WEBHOOK_URL` (HMAC-signed JSON, after storage) |
| Tracking | `lib/tracking.ts`, `components/ui/Analytics.tsx` (GTM, Google Ads call + lead conversion labels, UTM/gclid capture) |
| Brand | `public/brand/*.svg`, `public/brand/png/*`, regenerate with `node scripts/build-brand.mjs` |

## Brand colors
Midnight Navy `#102A43` · Connectivity Blue `#1689E8` · Signal Teal `#16B8A6` · Cloud White `#F4F7FA` · White `#FFFFFF` · Text `#172B3A` · Secondary `#64748B`. Manrope (headings), Inter (body), self-hosted via Fontsource.

## Before launch checklist
- [ ] Provide verified phone, address, legal name, registration, email, hours
- [ ] Add providers only with signed retailer agreement + brand-use permission; set `authorized: true`
- [ ] Legal review of `lib/legal.ts`; add consent banner where required
- [ ] Set `DATABASE_URL`, `ADMIN_API_TOKEN`, tracking IDs; consider a shared rate limiter (Redis) for multi-instance hosting
- [ ] Replace `public/og-image.png` if desired; add lifestyle photography to `public/images` (licensed)
- [ ] Run accessibility and Lighthouse audits on the deployed site

## Search-intent landing pages
`/internet-providers-near-me`, `/compare-internet-providers`, `/internet-service-enrollment-assistance`, `/internet-plans`, `/services/fiber-internet`, `/services/home-internet`, `/services/new-internet-connections`, `/services/business-internet`. Each has distinct content; no templated city pages.
