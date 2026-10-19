// Generate the small copies the ring cards render from.
//
// The 136 cards are 78x60 CSS pixels, so they do not need the full-size photos
// (1448x1086, ~220KB each) that the previews use. This writes a 240x180 copy of
// every photo in public/ into public/thumb/, which is what the loader waits on.
//
//   npm install --no-save sharp@0.33.5
//   node tools/make-thumbs.mjs
//
// A copy is rebuilt when it is missing or when its photo has changed, tracked by
// the photo's hash in public/thumb/.sources.json, so replacing a photo under the
// same filename is picked up. Copies whose photo is gone are removed.

import { createHash } from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const WIDTH = 240;
const HEIGHT = 180;
const QUALITY = 72;
const EXT = /\.(webp|jpe?g|png)$/i;

const publicDir = path.resolve(process.argv[2] || "site/public");
const thumbDir = path.join(publicDir, "thumb");
const manifestPath = path.join(thumbDir, ".sources.json");

const hash = (buf) => createHash("sha256").update(buf).digest("hex");

async function readManifest() {
  try {
    return JSON.parse(await fs.readFile(manifestPath, "utf8"));
  } catch {
    return {};
  }
}

async function writeThumb(src, dest) {
  // .rotate() with no angle applies the photo's EXIF orientation.
  const pipeline = sharp(src)
    .rotate()
    .resize(WIDTH, HEIGHT, { fit: "cover", position: "centre" });
  const ext = path.extname(dest).toLowerCase();
  if (ext === ".png") pipeline.png({ compressionLevel: 9 });
  else if (ext === ".webp") pipeline.webp({ quality: QUALITY });
  else pipeline.jpeg({ quality: QUALITY, mozjpeg: true });
  await pipeline.toFile(dest);
}

async function main() {
  await fs.mkdir(thumbDir, { recursive: true });

  const photos = (await fs.readdir(publicDir))
    .filter((f) => EXT.test(f))
    .sort();
  if (!photos.length) {
    console.log(`No photos found in ${publicDir}.`);
    return;
  }

  const previous = await readManifest();
  const manifest = {};
  let built = 0;

  for (const name of photos) {
    const src = path.join(publicDir, name);
    const dest = path.join(thumbDir, name);
    const sum = hash(await fs.readFile(src));
    manifest[name] = sum;

    const exists = await fs
      .access(dest)
      .then(() => true)
      .catch(() => false);

    if (exists && previous[name] === sum) continue;

    await writeThumb(src, dest);
    const { size } = await fs.stat(dest);
    console.log(`  ${name} -> thumb/${name} (${(size / 1024).toFixed(1)}KB)`);
    built++;
  }

  // Drop copies whose photo is no longer there.
  let removed = 0;
  for (const name of await fs.readdir(thumbDir)) {
    if (!EXT.test(name) || manifest[name]) continue;
    await fs.rm(path.join(thumbDir, name));
    console.log(`  removed orphan thumb/${name}`);
    removed++;
  }

  await fs.writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
  console.log(
    `${photos.length} photos; ${built} copies built, ${removed} removed, ${photos.length - built} already current.`,
  );
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
