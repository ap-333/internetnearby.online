// Logo exploration. Run: node scripts/build-concepts.mjs  -> brand-concepts/
import opentype from "opentype.js";
import sharp from "sharp";
import { writeFileSync, readFileSync } from "node:fs";

const C = { navy: "#102A43", blue: "#1689E8", teal: "#16B8A6", cloud: "#F4F7FA", white: "#FFFFFF" };
const buf = readFileSync("node_modules/@fontsource/manrope/files/manrope-latin-800-normal.woff");
const font = opentype.parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength));
const SIZE = 40, LS = -0.01;
const w1 = font.getAdvanceWidth("Internet", SIZE, { letterSpacing: LS });
const TW = Math.ceil(font.getAdvanceWidth("InternetNearby", SIZE, { letterSpacing: LS })) + 6;
const word = (c1, c2, x, y) => `<g transform="translate(${x} ${y})"><path d="${font.getPath("Internet", 0, 0, SIZE, { letterSpacing: LS }).toPathData(2)}" fill="${c1}"/><path d="${font.getPath("Nearby", w1, 0, SIZE, { letterSpacing: LS }).toPathData(2)}" fill="${c2}"/></g>`;

const PIN = "M32 61C32 61 7 39.5 7 24.5a25 25 0 0 1 50 0C57 39.5 32 61 32 61Z";
// Each concept: symbol(dark=false|true) -> svg fragment in a 64x64 box
const concepts = [
  {
    id: "1-route-pin", name: "Route Pin", note: "The right leg of the N plants a location pin. A hollow start node and a pin end make the N read as a route.",
    symbol: (d) => `<rect x="2" y="2" width="60" height="60" rx="16" fill="${d ? C.white : C.navy}"/>
      <path d="M19 46V19L44 46V32" fill="none" stroke="${d ? C.navy : C.white}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="19" cy="46" r="4.2" fill="${d ? C.white : C.navy}" stroke="${C.teal}" stroke-width="3"/>
      <path d="M44 33.5C44 33.5 35.5 26.5 35.5 20.5a8.5 8.5 0 0 1 17 0C52.5 26.5 44 33.5 44 33.5Z" fill="${C.teal}"/><circle cx="44" cy="20.5" r="3" fill="${d ? C.white : C.navy}"/>`,
  },
  {
    id: "2-pointed-n", name: "Pointed N", note: "A bold flat N whose left leg ends in a pin tip, with signal arcs rising from the right leg. Strongest silhouette at tiny sizes.",
    symbol: (d) => `<g transform="translate(2 6) scale(.84)"><path d="M10 46V12H20L38 38V12H47V52H37L19 26V46L14.5 56Z" fill="${d ? C.white : C.navy}"/></g>
      <path d="M43 20a10 10 0 0 1 10-10" fill="none" stroke="${C.teal}" stroke-width="3.6" stroke-linecap="round"/>
      <path d="M44 28a18 18 0 0 1 18-18" fill="none" stroke="${C.blue}" stroke-width="3.6" stroke-linecap="round"/>`,
  },
  {
    id: "3-compact-pin", name: "Compact Pin", note: "A squat, friendly marker (circle with one sharp corner) in Connectivity Blue, N in white, one teal node. Works as an app icon without a container.",
    symbol: (d) => `<path d="M32 61L47.56 45.56A22 22 0 1 0 16.44 45.56Z" fill="${d ? C.white : C.blue}"/>
      <path d="M22.5 39V22L41.5 39V22" fill="none" stroke="${d ? C.navy : C.white}" stroke-width="5.2" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="41.5" cy="22" r="4.4" fill="${C.teal}"/>`,
  },
  {
    id: "4-outline-network", name: "Network Outline", note: "A lighter, technical feel: outlined pin, N drawn as a connected line with three nodes. Suits a more premium, engineered brand voice.",
    symbol: (d) => `<path d="${PIN}" fill="none" stroke="${d ? C.white : C.navy}" stroke-width="4.5" stroke-linejoin="round" transform="translate(32 33) scale(.93) translate(-32 -33)"/>
      <path d="M22 37V19L42 37V19" fill="none" stroke="${C.blue}" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>
      <g fill="${d ? C.navy : C.white}" stroke="${C.teal}" stroke-width="3"><circle cx="22" cy="37" r="4.2"/><circle cx="22" cy="19" r="4.2"/><circle cx="42" cy="37" r="4.2"/><circle cx="42" cy="19" r="4.2"/></g>`,
  },
];

const horizontal = (c, dark) => {
  const sym = c.symbol(dark);
  const [c1, c2] = dark ? [C.white, C.white] : [C.navy, C.blue];
  return { w: 64 + 14 + TW, h: 64, body: `${sym}${word(c1, c2, 78, 45)}` };
};
const svgDoc = (w, h, body, title) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-label="${title}"><title>${title}</title>${body}</svg>`;

// individual files
for (const c of concepts) {
  const l = horizontal(c, false), d = horizontal(c, true);
  writeFileSync(`brand-concepts/${c.id}-horizontal.svg`, svgDoc(l.w, l.h, l.body, c.name));
  writeFileSync(`brand-concepts/${c.id}-horizontal-white.svg`, svgDoc(d.w, d.h, d.body, c.name));
  writeFileSync(`brand-concepts/${c.id}-symbol.svg`, svgDoc(64, 64, c.symbol(false), c.name));
}

// comparison sheet: 2x2 cards, each with light lockup, dark lockup, small-size row
const CW = 640, CH = 470, G = 24, PAD = 24;
const label = (t, x, y, s = 13, fill = C.navy, wgt = 700, op = 1) => `<text x="${x}" y="${y}" font-family="Manrope, Inter, Arial, sans-serif" font-size="${s}" font-weight="${wgt}" fill="${fill}" opacity="${op}">${t}</text>`;
const wrap = (t, n) => t.split(" ").reduce((a, w) => { const l = a[a.length - 1]; (l + " " + w).length > n ? a.push(w) : (a[a.length - 1] = (l + " " + w).trim()); return a; }, [""]);
let cards = "";
concepts.forEach((c, i) => {
  const x = G + (i % 2) * (CW + G), y = G + Math.floor(i / 2) * (CH + G);
  const l = horizontal(c, false), d = horizontal(c, true);
  const k = 1.15;
  cards += `<g transform="translate(${x} ${y})">
    <rect width="${CW}" height="${CH}" rx="22" fill="#fff" stroke="#E2E8F0"/>
    ${label(`${i + 1}`, PAD, 40, 13, C.teal, 800)}${label(c.name, PAD + 18, 40, 18, C.navy, 800)}
    <g transform="translate(${PAD} 66) scale(${k})">${l.body}</g>
    <rect x="${PAD}" y="160" width="${CW - 2 * PAD}" height="110" rx="14" fill="${C.navy}"/>
    <g transform="translate(${PAD + 28} 183) scale(${k})">${d.body}</g>
    <rect x="${PAD}" y="286" width="${CW - 2 * PAD}" height="70" rx="14" fill="${C.cloud}"/>
    <g transform="translate(${PAD + 24} 296) scale(.75)">${c.symbol(false)}</g>
    <g transform="translate(${PAD + 100} 304) scale(.5)">${c.symbol(false)}</g>
    <g transform="translate(${PAD + 148} 311) scale(.3)">${c.symbol(false)}</g>
    <g transform="translate(${PAD + 180} 313) scale(.25)">${c.symbol(false)}</g>
    <g transform="translate(${PAD + 230} 296) scale(.34)">${horizontal(c, false).body}</g>
    ${wrap(c.note, 78).map((ln, j) => label(ln, PAD, 384 + j * 20, 13, "#475569", 500)).join("")}
  </g>`;
});
const W = G + 2 * (CW + G), H = G + 2 * (CH + G);
const sheet = svgDoc(W, H, `<rect width="${W}" height="${H}" fill="#EEF2F6"/>${cards}`, "InternetNearby logo concepts");
writeFileSync("brand-concepts/logo-concepts.svg", sheet);
await sharp(Buffer.from(sheet), { density: 144 }).png().toFile("brand-concepts/logo-concepts.png");
console.log("done");
