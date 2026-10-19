// Generate neutral placeholder tiles for the ring.
//
// These stand in until Corniche's own photographs arrive. They are flat tonal
// panels drawn only from the brand palette — no new hues, no third-party
// imagery — so the ring reads correctly while carrying nothing that belongs to
// anyone else.
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
const PER_CATEGORY = 3;
const OUT = path.resolve("site/public");

// The brand palette, darkest to lightest. Nothing outside this list is used.
const TONES = ["#171717", "#48382F", "#6B5547", "#8C7A6B", "#A47C52", "#C9B9A3", "#DCCFBC", "#E9DFD0"];

const CATEGORIES = [
  "villa",
  "residential",
  "hospitality",
  "yacht-marine",
  "commercial",
  "kids-rooms",
  "bespoke-furniture",
  "textiles",
  "art",
  "renovation",
];

// Walk the palette so neighbouring tiles differ but the whole set stays in key.
function tonesFor(index) {
  const a = TONES[index % TONES.length];
  const b = TONES[(index * 3 + 4) % TONES.length];
  return a === b ? [a, TONES[(index + 5) % TONES.length]] : [a, b];
}

function panel(index) {
  const [from, to] = tonesFor(index);
  const angle = index % 2 ? 90 : 20;
  return Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}">
       <defs>
         <linearGradient id="g" gradientTransform="rotate(${angle})">
           <stop offset="0%" stop-color="${from}"/>
           <stop offset="100%" stop-color="${to}"/>
         </linearGradient>
       </defs>
       <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#g)"/>
       <rect x="0" y="${HEIGHT - 10}" width="${WIDTH}" height="10" fill="#A47C52" opacity="0.5"/>
     </svg>`,
  );
}

async function main() {
  await fs.mkdir(OUT, { recursive: true });
  let n = 0;
  let made = 0;
  for (const category of CATEGORIES) {
    for (let i = 1; i <= PER_CATEGORY; i++) {
      const name = `${category}-${String(i).padStart(2, "0")}.webp`;
      await sharp(panel(n)).webp({ quality: 82 }).toFile(path.join(OUT, name));
      made++;
      n++;
    }
  }
  console.log(`${made} placeholder panels written to ${OUT}`);
  console.log("Now run: node tools/make-thumbs.mjs");
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
