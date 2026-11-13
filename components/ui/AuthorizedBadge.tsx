// "Authorized Retailer" seal. Pure SVG + CSS, no external assets. Animation is decorative
// and disabled automatically for prefers-reduced-motion (see globals.css).
export default function AuthorizedBadge({ size = "lg" }: { size?: "md" | "lg" }) {
  const s = size === "lg" ? 76 : 56;
  return (
    <div className="badge-glow relative inline-flex items-center gap-4 overflow-hidden rounded-full border border-teal/30 bg-white py-2.5 pl-2.5 pr-8 shadow-lift" role="img" aria-label="Authorized retailer">
      <span className="badge-shine" aria-hidden />
      <svg width={s} height={s} viewBox="0 0 80 80" aria-hidden className="shrink-0">
        <defs>
          <linearGradient id="ab-g" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#1689E8" /><stop offset="1" stopColor="#16B8A6" /></linearGradient>
        </defs>
        {/* rotating dashed orbit */}
        <circle className="badge-orbit" cx="40" cy="40" r="37" fill="none" stroke="url(#ab-g)" strokeWidth="2" strokeDasharray="3 6" strokeLinecap="round" />
        {/* scalloped seal */}
        <path fill="#102A43" d="M40 7l6.2 4.6 7.7-.9 3.2 7 7 3.2-.9 7.7L68 35.4v9.2l-4.8 6.8.9 7.7-7 3.2-3.2 7-7.7-.9L40 73l-6.2-4.6-7.7.9-3.2-7-7-3.2.9-7.7L12 44.6v-9.2l4.8-6.8-.9-7.7 7-3.2 3.2-7 7.7.9z" />
        <circle cx="40" cy="40" r="22" fill="none" stroke="#16B8A6" strokeWidth="1.5" opacity=".6" />
        <path d="M29 41.5l8 8L52 32" fill="none" stroke="#fff" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="text-left leading-tight">
        <span className="block font-heading text-[11px] font-bold uppercase tracking-[.2em] text-teal">Verified partnerships</span>
        <span className="block font-heading text-xl font-extrabold text-navy sm:text-2xl">Authorized Retailer</span>
      </span>
    </div>
  );
}
