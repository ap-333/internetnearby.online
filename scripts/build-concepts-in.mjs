// Logo exploration. Run: node scripts/build-concepts.mjs  -> brand-concepts/in-
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
const P3 = "M32 61L47.56 45.56A22 22 0 1 0 16.44 45.56Z";
const stroke = (d, col, w) => `fill="none" stroke="${col}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"`;
const concepts = [
  {
    id: "3-ref", name: "3 · Reference", note: "Current Compact Pin: N only, for comparison.",
    symbol: (d) => `<path d="${P3}" fill="${d ? C.white : C.blue}"/>
      <path d="M22.5 39V22L41.5 39V22" ${stroke(0, d ? C.navy : C.white, 5.2)}/><circle cx="41.5" cy="22" r="4.4" fill="${C.teal}"/>`,
  },
  {
    id: "3a-i-dot-n", name: "3A · i-dot node", note: "A lowercase i followed by N. The dot of the i is the teal connection node, so the monogram reads IN and carries the network idea in one gesture.",
    symbol: (d) => `<path d="${P3}" fill="${d ? C.white : C.blue}"/>
      <circle cx="19.5" cy="21.5" r="3.4" fill="${C.teal}"/>
      <path d="M19.5 29.5V41" ${stroke(0, d ? C.navy : C.white, 4.8)}/>
      <path d="M28.5 41V22L46 41V22" ${stroke(0, d ? C.navy : C.white, 4.8)}/>`,
  },
  {
    id: "3b-two-tone", name: "3B · Two-tone IN", note: "A teal I bar stands beside a white N on a navy marker: the signal and the destination. Cleanest and most legible at favicon size.",
    symbol: (d) => `<path d="${P3}" fill="${d ? C.white : C.navy}"/>
      <path d="M19.5 22V41" ${stroke(0, C.teal, 5.2)}/>
      <path d="M29 41V22L46 41V22" ${stroke(0, d ? C.navy : C.white, 5.2)}/>`,
  },
  {
    id: "3c-pin-dot", name: "3C · Pin-dot i", note: "The dot of the i is itself a tiny location pin, nested inside the big pin. The most conceptual: a pin within a pin, reading IN.",
    symbol: (d) => `<path d="${P3}" fill="${d ? C.white : C.blue}"/>
      <path d="M19.5 26.5C19.5 26.5 15.2 23 15.2 20a4.3 4.3 0 0 1 8.6 0C23.8 23 19.5 26.5 19.5 26.5Z" fill="${C.teal}"/>
      <path d="M19.5 30.5V41" ${stroke(0, d ? C.navy : C.white, 4.8)}/>
      <path d="M28.5 41V20.5L46 41V20.5" ${stroke(0, d ? C.navy : C.white, 4.8)}/>`,
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
  writeFileSync(`brand-concepts/in-${c.id}-horizontal.svg`, svgDoc(l.w, l.h, l.body, c.name));
  writeFileSync(`brand-concepts/in-${c.id}-horizontal-white.svg`, svgDoc(d.w, d.h, d.body, c.name));
  writeFileSync(`brand-concepts/in-${c.id}-symbol.svg`, svgDoc(64, 64, c.symbol(false), c.name));
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
const sheet = svgDoc(W, H, `<rect width="${W}" height="${H}" fill="#EEF2F6"/>${cards}`, "InternetNearby IN monogram variations");
writeFileSync("brand-concepts/in-logo-concepts.svg", sheet);
await sharp(Buffer.from(sheet), { density: 144 }).png().toFile("brand-concepts/in-logo-concepts.png");
console.log("done");
