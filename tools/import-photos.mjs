// Bring a folder of a project's photographs into the site.
//
//   npm install --no-save sharp@0.33.5
//   node tools/import-photos.mjs "images/kemer prive" kemer-prive
//
// Converts everything in the folder to webp in site/public/, named <slug>-01,
// <slug>-02 and so on, and prints the "images" list to paste into
// projects.json. Landscape photographs are ordered first, because the first
// image is the cover and the ring's cards are landscape — a portrait cover gets
// cropped to its middle.
//
// Nothing is deleted: the folder it reads from is left as it was.

import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SOURCE = process.argv[2];
const SLUG = process.argv[3];
const OUT = path.resolve("site/public");
const MAX_W = 2400;      // beyond this adds weight without adding detail here
const QUALITY = 86;

if (!SOURCE || !SLUG) {
  console.error('Usage: node tools/import-photos.mjs "<source folder>" <slug>');
  process.exit(1);
}

const isImage = (f) => /\.(jpe?g|png|webp|tiff?|heic)$/i.test(f);

async function main() {
  const dir = path.resolve(SOURCE);
  const files = (await fs.readdir(dir)).filter(isImage).sort();
  if (!files.length) {
    console.error(`No images found in ${dir}`);
    process.exit(1);
  }

  // Prepare everything first, so orientation is read from the finished image
  // rather than the original — trimming can change which way round it is.
  const prepared = [];
  for (const name of files) {
    const src = path.join(dir, name);
    const before = await sharp(src).metadata();
    let pipeline = sharp(src).rotate();           // apply EXIF orientation
    // Photographs lifted from a video arrive letterboxed. A uniform border is
    // never part of the picture, so it goes; otherwise it shows as a black edge
    // on the card.
    try {
      pipeline = pipeline.trim({ threshold: 12 });
    } catch {
      /* older sharp without trim options: keep the border rather than fail */
    }
    const buf = await pipeline
      .resize({ width: MAX_W, withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toBuffer();
    const after = await sharp(buf).metadata();
    prepared.push({
      name,
      buf,
      before,
      width: after.width,
      height: after.height,
      landscape: after.width >= after.height,
    });
  }
  prepared.sort((a, b) => Number(b.landscape) - Number(a.landscape));

  await fs.mkdir(OUT, { recursive: true });
  const written = [];
  for (let i = 0; i < prepared.length; i++) {
    const item = prepared[i];
    const out = `${SLUG}-${String(i + 1).padStart(2, "0")}.webp`;
    await fs.writeFile(path.join(OUT, out), item.buf);
    written.push(out);
    const turned = item.before.orientation >= 5 && item.before.orientation <= 8;
    const ow = turned ? item.before.height : item.before.width;
    const oh = turned ? item.before.width : item.before.height;
    const trimmed = ow !== item.width || oh !== item.height;
    console.log(
      `  ${item.name}\n    -> ${out}  ${ow}x${oh}` +
        (trimmed ? ` trimmed to ${item.width}x${item.height}` : "") +
        `  ${item.landscape ? "landscape" : "PORTRAIT"}  ${(item.buf.length / 1024).toFixed(0)}KB`,
    );
  }

  console.log(`\n"images": ${JSON.stringify(written)}`);
  if (!prepared[0].landscape) {
    console.log("\nNote: no landscape photograph here, so the cover will be cropped to its middle.");
  }
  console.log("Now run: node tools/make-thumbs.mjs && node tools/make-pages.mjs");
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
