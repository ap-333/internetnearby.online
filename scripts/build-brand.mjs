// Generates all InternetNearby logo SVGs + PNG exports. Run: node scripts/build-brand.mjs
import opentype from "opentype.js";
import sharp from "sharp";
import { writeFileSync, readFileSync } from "node:fs";

const C = { navy: "#102A43", blue: "#1689E8", teal: "#16B8A6", white: "#FFFFFF" };
const buf = readFileSync("node_modules/@fontsource/manrope/files/manrope-latin-800-normal.woff");
const font = opentype.parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength));
const out = (n, s) => writeFileSync(`public/brand/${n}.svg`, s);

// 64x64 symbol (3A "i-dot node"): compact pin, lowercase i whose dot is a network node, then N.
// Monogram is sized and spaced to sit optically centered in the round part of the pin.
const PIN = "M32 61L47.56 45.56A22 22 0 1 0 16.44 45.56Z";
const FIT = "translate(-2.9 -7.7) scale(1.09)"; // fits pin + ground shadow into the 64 box
const MONO = "translate(32 30.2) scale(.86) translate(-32 -29.2)"; // smaller monogram, optically centered
const I_STEM = "M20.65 29.3V38.5";
const N = "M30.85 38.5V21.5L43.35 38.5V21.5";
const SHADOW = (c, o) => `<ellipse cx="32" cy="62.2" rx="8.5" ry="2" fill="${c}" opacity="${o}"/>`;
function mark({ pin, ink, dot, mask, shadow, shadowOpacity = 0.22 }) {
  const id = "k" + Math.random().toString(36).slice(2, 6);
  const st = (c) => `fill="none" stroke="${c}" stroke-width="4.4" stroke-linecap="round" stroke-linejoin="round"`;
  const parts = (c, d) => `<g transform="${MONO}"><path d="${I_STEM}" ${st(c)}/><path d="${N}" ${st(c)}/><circle cx="20.65" cy="21.5" r="3.7" fill="${d}"/></g>`;
  const sh = SHADOW(shadow ?? pin, shadowOpacity);
  if (mask)
    return `<g transform="${FIT}">${sh}<mask id="${id}" maskUnits="userSpaceOnUse" x="0" y="0" width="64" height="64"><rect width="64" height="64" fill="#fff"/>${parts("#000", "#000")}</mask><path d="${PIN}" fill="${pin}" mask="url(#${id})"/></g>`;
  return `<g transform="${FIT}">${sh}<path d="${PIN}" fill="${pin}"/>${parts(ink, dot)}</g>`;
}
const marks = {
  navy: mark({ pin: C.navy, ink: C.white, dot: C.teal }),
  color: mark({ pin: C.blue, ink: C.white, dot: C.teal, shadow: C.navy }),
  dark: mark({ pin: C.white, ink: C.navy, dot: C.teal, shadow: C.white, shadowOpacity: 0.25 }),
  mono: mark({ pin: C.navy, mask: true }),
  monoWhite: mark({ pin: C.white, mask: true, shadowOpacity: 0.25 }),
};

// Wordmark as outlined paths (no font dependency).
const SIZE = 40;
const w1 = font.getAdvanceWidth("Internet", SIZE, { letterSpacing: -0.01 });
const wTotal = font.getAdvanceWidth("InternetNearby", SIZE, { letterSpacing: -0.01 });
const p1 = (y, f) => font.getPath("Internet", 0, y, SIZE, { letterSpacing: -0.01 }).toPathData(2);
const p2 = (y) => font.getPath("Nearby", w1, y, SIZE, { letterSpacing: -0.01 }).toPathData(2);
const word = (c1, c2, ox, oy) =>
  `<g transform="translate(${ox} ${oy})"><path d="${p1(0)}" fill="${c1}"/><path d="${p2(0)}" fill="${c2}"/></g>`;

const svg = (w, h, body, title) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-label="${title}"><title>${title}</title>${body}</svg>`;

const H = 64, GAP = 14, TW = Math.ceil(wTotal) + 6;
const horizontal = (m, c1, c2, t) =>
  svg(64 + GAP + TW, H, `${m}${word(c1, c2, 64 + GAP, 45)}`, t);
const stacked = (m, c1, c2, t) => {
  const W = TW + 8;
  return svg(W, 64 + 16 + 40, `<g transform="translate(${(W - 64) / 2} 0)">${m}</g>${word(c1, c2, 4, 64 + 16 + 31)}`, t);
};

const T = "InternetNearby";
const set = [
  ["logo-horizontal", horizontal(marks.color, C.navy, C.blue, T)],
  ["logo-horizontal-white", horizontal(marks.dark, C.white, C.white, T)],
  ["logo-horizontal-dark", horizontal(marks.navy, C.navy, C.navy, T)],
  ["logo-horizontal-mono", horizontal(marks.mono, C.navy, C.navy, T)],
  ["logo-horizontal-mono-white", horizontal(marks.monoWhite, C.white, C.white, T)],
  ["logo-stacked", stacked(marks.color, C.navy, C.blue, T)],
  ["logo-stacked-white", stacked(marks.dark, C.white, C.white, T)],
  ["logo-symbol", svg(64, 64, marks.color, T + " symbol")],
  ["logo-symbol-white", svg(64, 64, marks.dark, T + " symbol")],
  ["logo-symbol-mono", svg(64, 64, marks.mono, T + " symbol")],
];
// Favicon: pin only, tight crop. App icon: navy rounded square with white pin.
const fav = svg(64, 64, `<rect width="64" height="64" rx="14" fill="${C.navy}"/><g transform="translate(9 8) scale(.72)">${marks.dark}</g>`, T);
set.push(["favicon", fav], ["app-icon", fav]);
for (const [n, s] of set) out(n, s);

// PNG exports (transparent except app icons)
const png = async (n, w) =>
  sharp(Buffer.from(set.find(([k]) => k === n)[1]), { density: 384 }).resize({ width: w }).png().toFile(`public/brand/png/${n}.png`);
for (const n of set.map(([k]) => k)) await png(n, n.includes("symbol") || n.includes("icon") || n === "favicon" ? 512 : 1200);
writeFileSync("public/favicon.svg", fav);
await sharp(Buffer.from(fav), { density: 384 }).resize(180).png().toFile("public/apple-touch-icon.png");
await sharp(Buffer.from(fav), { density: 384 }).resize(512).png().toFile("public/icon-512.png");
await sharp(Buffer.from(fav), { density: 384 }).resize(32).png().toFile("public/favicon-32.png");
console.log("brand assets built");
