// Generate one detail page per project, from site/projects.json.
//
//   node tools/make-pages.mjs
//
// Each project gets its own address at site/proje/<slug>.html. Pages are written
// with both languages already in the markup, so detail.js only has to choose
// which one shows — nothing is fetched and nothing waits. Pages whose project
// has gone are deleted, so the folder never drifts from the content list.
//
// The site itself stays buildless: this runs here or in CI, like the thumbnails.

import fs from "node:fs/promises";
import path from "node:path";

const SITE = path.resolve("site");
const OUT = path.join(SITE, "proje");

const esc = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const titleIn = (p, lang) => (p.title && (p.title[lang] || p.title.tr || p.title.en)) || p.slug;

function labelIn(categories, id, lang) {
  const cat = categories.find((c) => c.id === id);
  if (!cat) return id || "";
  return cat.label[lang] || cat.label.tr || cat.label.en || id;
}

function page({ project, categories, prev, next, draft }) {
  const trTitle = titleIn(project, "tr");
  const enTitle = titleIn(project, "en");
  const trCat = labelIn(categories, project.category, "tr");
  const enCat = labelIn(categories, project.category, "en");

  const gallery = (project.images || [])
    .map((file, i) => {
      const loading = i === 0 ? "" : ' loading="lazy" decoding="async"';
      return `        <figure>
          <div class="well"><img src="../public/${esc(file)}" alt=""${loading} /></div>
        </figure>`;
    })
    .join("\n");

  const step = (target, key, before) => {
    if (!target) return "<span></span>";
    const mark = (lang) =>
      before ? `← ${titleIn(target, lang)}` : `${titleIn(target, lang)} →`;
    return `<a href="${esc(target.slug)}.html" data-tr="${esc(mark("tr"))}" data-en="${esc(
      mark("en"),
    )}" aria-label="${esc(STEP_LABEL[key])}">${esc(mark("tr"))}</a>`;
  };

  const draftBlock = draft
    ? `
      <div class="dp-draft">
        <strong>Yer tutucu içerik</strong>
        Bu sayfadaki başlık ve görseller geçicidir. Görseller marka paletinden üretilmiş
        düz panellerdir, Corniche'in fotoğrafları değildir. Gerçek proje adları ve
        fotoğrafları geldiğinde değişecektir.
      </div>`
    : "";

  return `<!DOCTYPE html>
<html lang="tr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <!-- Draft, shared privately. Remove before the site goes live. -->
    <meta name="robots" content="noindex, nofollow" />
    <title>${esc(trTitle)} — Corniche İstanbul</title>
    <link rel="stylesheet" href="../detail.css" />
  </head>
  <body>
    <header class="dp-bar gutter">
      <a class="dp-back" href="../index.html"><i class="arrow">←</i><span data-i18n="back">Arşive dön</span></a>
      <div class="lang">
        <button type="button" class="lang-btn is-active" data-lang="tr">TR</button>
        <span class="sep">/</span>
        <button type="button" class="lang-btn" data-lang="en">EN</button>
      </div>
    </header>

    <main class="dp gutter">
      <p class="dp-cat" data-tr="${esc(trCat)}" data-en="${esc(enCat)}">${esc(trCat)}</p>
      <h1 class="dp-title" data-tr="${esc(trTitle)}" data-en="${esc(enTitle)}">${esc(trTitle)}</h1>
${draftBlock}
      <div class="dp-gallery">
${gallery}
      </div>

      <nav class="dp-nav">
        ${step(prev, "prev", true)}
        ${step(next, "next", false)}
      </nav>
    </main>

    <script src="../detail.js"></script>
  </body>
</html>
`;
}

const STEP_LABEL = { prev: "Önceki proje", next: "Sonraki proje" };

async function main() {
  const raw = await fs.readFile(path.join(SITE, "projects.json"), "utf8");
  const data = JSON.parse(raw);
  const categories = data.categories || [];
  const projects = (data.projects || []).filter((p) => p && p.slug && p.title);
  const draft = Boolean(data._placeholder);

  await fs.mkdir(OUT, { recursive: true });

  const wanted = new Set();
  let written = 0;

  for (const cat of categories) {
    const mine = projects.filter((p) => p.category === cat.id);
    for (let i = 0; i < mine.length; i++) {
      const project = mine[i];
      const file = `${project.slug}.html`;
      wanted.add(file);
      const html = page({
        project,
        categories,
        prev: mine[i - 1] || null,
        next: mine[i + 1] || null,
        draft,
      });
      const dest = path.join(OUT, file);
      const before = await fs.readFile(dest, "utf8").catch(() => null);
      if (before !== html) {
        await fs.writeFile(dest, html);
        written++;
      }
    }
  }

  let removed = 0;
  for (const name of await fs.readdir(OUT).catch(() => [])) {
    if (!name.endsWith(".html") || wanted.has(name)) continue;
    await fs.rm(path.join(OUT, name));
    removed++;
  }

  console.log(
    `${wanted.size} project pages; ${written} written, ${removed} removed, ${wanted.size - written} already current.`,
  );
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
