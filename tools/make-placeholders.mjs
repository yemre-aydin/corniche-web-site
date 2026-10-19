// Generate placeholder panels for the ring and the galleries.
//
// These stand in until Corniche's own photographs arrive. They are abstract
// compositions drawn only from the brand palette — no new hues, no third-party
// imagery — built to carry the light and depth of an interior photograph so the
// layout can be judged, without pretending to be one.
//
//   npm install --no-save sharp@0.33.5
//   node tools/make-placeholders.mjs
//
// Output is deterministic: the same category list produces byte-identical
// files, so re-running does not churn the repository.

import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const WIDTH = 1448;
const HEIGHT = 1086;
const PER_CATEGORY = 10;
const OUT = path.resolve("site/public");

// The brand palette, darkest to lightest. Nothing outside this list is used.
const TONES = ["#171717", "#2E241E", "#48382F", "#6B5547", "#8C7A6B", "#A47C52", "#C9B9A3", "#DCCFBC", "#E9DFD0"];

const CATEGORIES = [
  "villa",
  "renovation",
  "residential",
  "hospitality",
  "yacht-marine",
  "commercial",
  "kids-rooms",
  "bespoke-furniture",
  "textiles",
  "art",
];

// A small deterministic generator, so a given panel always comes out the same.
function rng(seed) {
  let s = seed * 2654435761 % 2147483647;
  return () => {
    s = (s * 48271) % 2147483647;
    return s / 2147483647;
  };
}

const pick = (r, list) => list[Math.floor(r() * list.length)];

function panel(index) {
  const r = rng(index + 7);

  // Ground and ceiling tones: one light, one dark, always some distance apart
  // in the palette so the panel has a real range.
  const lo = Math.floor(r() * 3);                 // 0..2  dark end
  const hi = 5 + Math.floor(r() * 4);             // 5..8  light end
  const floor = TONES[lo];
  const air = TONES[hi];
  const mid = TONES[Math.floor((lo + hi) / 2)];
  const warm = "#A47C52";

  // Where the light falls, and where the horizon sits.
  const lightX = 14 + Math.round(r() * 72);
  const lightY = 10 + Math.round(r() * 45);
  const horizon = 52 + Math.round(r() * 24);
  const tilt = -12 + Math.round(r() * 24);

  // One upright mass, suggesting a wall return or a tall piece of furniture.
  const massX = r() < 0.5 ? 4 + Math.round(r() * 22) : 62 + Math.round(r() * 30);
  const massW = 10 + Math.round(r() * 16);
  const massTone = pick(r, [TONES[lo + 1] || mid, mid, TONES[hi - 2] || mid]);

  return Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 100 75">
       <defs>
         <linearGradient id="air" x1="0" y1="0" x2="0" y2="1">
           <stop offset="0%" stop-color="${air}"/>
           <stop offset="100%" stop-color="${mid}"/>
         </linearGradient>
         <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1">
           <stop offset="0%" stop-color="${mid}"/>
           <stop offset="100%" stop-color="${floor}"/>
         </linearGradient>
         <radialGradient id="light" cx="${lightX}%" cy="${lightY}%" r="62%">
           <stop offset="0%" stop-color="${TONES[8]}" stop-opacity="0.85"/>
           <stop offset="55%" stop-color="${TONES[7]}" stop-opacity="0.28"/>
           <stop offset="100%" stop-color="${TONES[7]}" stop-opacity="0"/>
         </radialGradient>
         <linearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
           <stop offset="0%" stop-color="${floor}" stop-opacity="0"/>
           <stop offset="100%" stop-color="${floor}" stop-opacity="0.55"/>
         </linearGradient>
       </defs>

       <rect width="100" height="75" fill="url(#air)"/>
       <path d="M0 ${horizon * 0.75} L100 ${(horizon + tilt) * 0.75} L100 75 L0 75 Z" fill="url(#ground)"/>
       <rect x="${massX}" y="0" width="${massW}" height="${(horizon + tilt / 2) * 0.75}" fill="${massTone}" opacity="0.5"/>
       <rect width="100" height="75" fill="url(#light)"/>
       <rect width="100" height="75" fill="url(#fade)"/>
       <rect x="0" y="${(horizon * 0.75).toFixed(2)}" width="100" height="0.22" fill="${warm}" opacity="0.5"/>
     </svg>`,
  );
}

async function main() {
  await fs.mkdir(OUT, { recursive: true });
  let n = 0;
  for (const category of CATEGORIES) {
    for (let i = 1; i <= PER_CATEGORY; i++) {
      const name = `${category}-${String(i).padStart(2, "0")}.webp`;
      await sharp(panel(n)).webp({ quality: 84 }).toFile(path.join(OUT, name));
      n++;
    }
  }
  console.log(`${n} placeholder panels written to ${OUT}`);
  console.log("Now run: node tools/make-thumbs.mjs && node tools/make-pages.mjs");
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
