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

  // Read sizes first so landscape can lead.
  const read = [];
  for (const name of files) {
    const src = path.join(dir, name);
    const meta = await sharp(src).metadata();
    // EXIF orientation 5-8 means the stored image is rotated a quarter turn.
    const turned = meta.orientation >= 5 && meta.orientation <= 8;
    const width = turned ? meta.height : meta.width;
    const height = turned ? meta.width : meta.height;
    read.push({ src, name, width, height, landscape: width >= height });
  }
  read.sort((a, b) => Number(b.landscape) - Number(a.landscape));

  await fs.mkdir(OUT, { recursive: true });
  const written = [];
  for (let i = 0; i < read.length; i++) {
    const item = read[i];
    const out = `${SLUG}-${String(i + 1).padStart(2, "0")}.webp`;
    await sharp(item.src)
      .rotate()                                   // apply EXIF orientation
      .resize({ width: MAX_W, withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(path.join(OUT, out));
    const { size } = await fs.stat(path.join(OUT, out));
    written.push(out);
    console.log(
      `  ${item.name}\n    -> ${out}  ${item.width}x${item.height}` +
        `  ${item.landscape ? "landscape" : "PORTRAIT"}  ${(size / 1024).toFixed(0)}KB`,
    );
  }

  console.log(`\n"images": ${JSON.stringify(written)}`);
  if (!read[0].landscape) {
    console.log("\nNote: no landscape photograph here, so the cover will be cropped to its middle.");
  }
  console.log("Now run: node tools/make-thumbs.mjs && node tools/make-pages.mjs");
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
