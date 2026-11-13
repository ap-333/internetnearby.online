import { providers } from "@/data/providers";

// Hub illustration: provider nodes (top) -> InternetNearby pin (center) -> homes and a business (bottom).
// Provider nodes show a real logo ONLY for providers marked authorized with a logoUrl in data/providers.ts.
// Until then they show generic technology labels, so no brand is implied without permission.

const TECH = ["Fiber", "Cable", "5G Home", "Wireless", "Satellite"];
const PX = [66, 173, 280, 387, 494];
const PY = [86, 50, 34, 50, 86];
const HX = [110, 230, 350, 470];
const HUB = { x: 280, y: 238 };

export default function HeroIllustration() {
  const logos = providers.filter((p) => p.authorized && p.logoUrl).slice(0, 5);
  const nodes = PX.map((x, i) => ({ x, y: PY[i], logo: logos[i], label: TECH[i] }));
  return (
    <svg viewBox="0 0 560 480" className="h-auto w-full" role="img" aria-label="InternetNearby connects internet providers and technologies to homes and businesses">
      <defs>
        <linearGradient id="hl" x1="0" x2="1"><stop stopColor="#1689E8" /><stop offset="1" stopColor="#16B8A6" /></linearGradient>
        <filter id="sh" x="-20%" y="-20%" width="140%" height="150%"><feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#000" floodOpacity=".25" /></filter>
      </defs>
      <circle cx={HUB.x} cy={HUB.y} r="215" fill="#fff" opacity=".04" />
      <circle cx={HUB.x} cy={HUB.y} r="150" fill="#fff" opacity=".06" />

      {/* connection lines */}
      <g fill="none" stroke="url(#hl)" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="3 9">
        {nodes.map((n, i) => <path key={`p${i}`} d={`M${n.x} ${n.y + 24} C${n.x} ${HUB.y - 60} ${HUB.x} ${HUB.y - 120} ${HUB.x + (n.x - HUB.x) * 0.18} ${HUB.y - 70}`}><animate attributeName="stroke-dashoffset" from="24" to="0" dur="1.6s" repeatCount="indefinite" /></path>)}
        {HX.map((x, i) => <path key={`h${i}`} d={`M${HUB.x + (x - HUB.x) * 0.2} ${HUB.y + 72} C${HUB.x + (x - HUB.x) * 0.2} ${HUB.y + 130} ${x} ${HUB.y + 100} ${x} 392`}><animate attributeName="stroke-dashoffset" from="24" to="0" dur="1.6s" repeatCount="indefinite" /></path>)}
      </g>

      {/* provider nodes */}
      {nodes.map((n, i) => (
        <g key={i} transform={`translate(${n.x - 50} ${n.y - 24})`} filter="url(#sh)">
          <rect width="100" height="48" rx="14" fill="#fff" />
          {n.logo ? (
            <image href={n.logo.logoUrl!} x="12" y="8" width="76" height="32" preserveAspectRatio="xMidYMid meet"><title>{n.logo.name}</title></image>
          ) : (
            <>
              <circle cx="16" cy="24" r="4.5" fill="#16B8A6" />
              <text x="28" y="28.5" fontSize="12" fontWeight="700" fill="#102A43" style={{ fontFamily: "var(--font-heading)" }}>{n.label}</text>
            </>
          )}
        </g>
      ))}

      {/* hub */}
      <g filter="url(#sh)" transform={`translate(${HUB.x} ${HUB.y}) scale(2.3) translate(-32 -32)`}>
        <path d="M32 61C32 61 7 39.5 7 24.5a25 25 0 0 1 50 0C57 39.5 32 61 32 61Z" fill="#fff" />
        <path d="M20.5 36V17.5L43.5 36V17.5" fill="none" stroke="#102A43" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="20.5" cy="36" r="4.6" fill="#16B8A6" /><circle cx="43.5" cy="17.5" r="4.6" fill="#16B8A6" />
      </g>

      {/* homes + business */}
      {HX.map((x, i) => (
        <g key={i} transform={`translate(${x - 30} 392)`} filter="url(#sh)">
          <rect width="60" height="60" rx="16" fill="#fff" />
          {i < 3 ? (
            <>
              <path d="M11 32 30 15l19 17v16a2 2 0 0 1-2 2H13a2 2 0 0 1-2-2Z" fill="#F4F7FA" stroke="#102A43" strokeWidth="3" strokeLinejoin="round" />
              <rect x="25" y="36" width="10" height="14" rx="2" fill="#16B8A6" />
            </>
          ) : (
            <>
              <rect x="14" y="12" width="32" height="38" rx="3" fill="#F4F7FA" stroke="#102A43" strokeWidth="3" />
              <g fill="#16B8A6"><rect x="20" y="18" width="6" height="6" rx="1" /><rect x="34" y="18" width="6" height="6" rx="1" /><rect x="20" y="30" width="6" height="6" rx="1" /><rect x="34" y="30" width="6" height="6" rx="1" /></g>
            </>
          )}
        </g>
      ))}
      <text x="280" y="472" textAnchor="middle" fontSize="11" fontWeight="700" letterSpacing="2" fill="#fff" opacity=".55" style={{ fontFamily: "var(--font-heading)" }}>HOMES · APARTMENTS · BUSINESSES</text>
    </svg>
  );
}
