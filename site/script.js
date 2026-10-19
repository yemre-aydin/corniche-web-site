gsap.registerPlugin(ScrollTrigger);

const DEG = Math.PI / 180;
const PERSPECTIVE = 1600;
const ITEM_COUNT = 136;
const TURNS = 1;
const TILT = 58;
const ROT_Y = 86;
const RING_SCALE = 0.88;
const PARALLAX = 4;
const HOVER_OUT = 16, HOVER_Z = 12, HOVER_SCALE = 1.02, HOVER_DURATION = 0.32;
const MOBILE_MQ = "(max-width: 768px)";
const MOBILE_SELECTED_OUT = 8, MOBILE_SELECTED_Z = 2, MOBILE_SELECTED_SCALE = 1.005;
const MOBILE_TRANSITION = 0.25, MOBILE_FOCUS_ANGLE = -35, MOBILE_DRAG_SPEED = 0.35;
const CATEGORY_DIM = 0.28;   // how far an unselected category recedes

/* ── Showcase ring (desktop) ────────────────────────────────────────────────
   Cards sit around a shallow ellipse and all face the viewer, which is what the
   drawing shows: the far cards and the near ones both show their faces, which
   no outward- or inward-facing ring can do. Depth comes from z, scale and
   opacity rather than from turning the cards away. Each card is gently curved
   for real — a row of narrow segments wrapped on a cylinder, each carrying its
   own slice of the photograph.

   These numbers are a considered first pass, not measured against the drawing;
   expect one tuning round once they can be seen. */
const SHOW_CARD_W = 230, SHOW_CARD_H = 160;
const SHOW_SEGMENTS = 8;
const SHOW_CURVE_R = 620;     // cylinder the card is wrapped on
const SHOW_DEPTH = 330;       // how far back the far side of the ring sits
const SHOW_TURN = 22;         // degrees a card turns at the ring's sides
const SHOW_LABEL_GAP = 30;
const SHOW_HOVER_LIFT = 14, SHOW_HOVER_SCALE = 1.05, SHOW_HOVER_DUR = 0.38;

let level = "categories";     // or "projects"
let openCategory = null;
let showRx = 640, showRy = 190;
const showItems = [];
let showHovered = null;

/* ── Content and language ───────────────────────────────────────────────────
   Every project lives in projects.json, so content can be edited without
   touching the engine below. Each ring card uses the small copy from
   public/thumb/; the previews use the full-size photo from public/. Titles and
   category labels carry both languages. The defaults here are only a safety net
   for when projects.json cannot be read. */
const CONTENT_URL = "projects.json";
const IMAGE_DIR = "public/";
const THUMB_DIR = "public/thumb/";
const LANG_KEY = "corniche-lang";

// Interface wording. Content wording lives in projects.json.
const STRINGS = {
  tr: {
    "ui.loading": "Arşiv yükleniyor",
    "ui.filter": "Projeleri filtrele",
    "ui.grid": "Izgara görünümü",
    "ui.ring": "Halka görünümü",
    "ui.allCategories": "Tüm kategoriler",
    "ui.viewProject": "Projeyi incele",
    "ui.selectedWorks": "Seçili İşler",
    "ui.tagline": "[Firma tanıtım cümlesi]",
    "nav.projects": "Projeler",
    "nav.about": "Hakkımızda",
    "nav.services": "Hizmetlerimiz",
    "nav.showroom": "Showroom",
    "nav.contact": "İletişim",
  },
  en: {
    "ui.loading": "Loading archive",
    "ui.filter": "Filter projects",
    "ui.grid": "Grid view",
    "ui.ring": "Ring view",
    "ui.allCategories": "All categories",
    "ui.viewProject": "View project",
    "ui.selectedWorks": "Selected Works",
    "ui.tagline": "[Studio description]",
    "nav.projects": "Projects",
    "nav.about": "About Us",
    "nav.services": "Our Services",
    "nav.showroom": "Showroom",
    "nav.contact": "Contact",
  },
};

const DEFAULT_CONTENT = {
  categories: [
    { id:"hospitality", label:{ tr:"Hospitality",       en:"Hospitality" } },
    { id:"residential", label:{ tr:"Residential",       en:"Residential" } },
    { id:"villa",       label:{ tr:"Villa",             en:"Villa" } },
    { id:"renovation",  label:{ tr:"Renovation",        en:"Renovation" } },
    { id:"commercial",  label:{ tr:"Commercial Spaces", en:"Commercial Spaces" } },
  ],
  projects: [
    { image:"image-10.webp", category:"hospitality", title:{ tr:"[Otel Projesi 01]", en:"[Hotel Project 01]" } },
    { image:"image-11.webp", category:"hospitality", title:{ tr:"[Otel Projesi 02]", en:"[Hotel Project 02]" } },
    { image:"image-8.webp",  category:"hospitality", title:{ tr:"[Otel Projesi 03]", en:"[Hotel Project 03]" } },
    { image:"image-9.webp",  category:"residential", title:{ tr:"[Konut Projesi 01]", en:"[Residential Project 01]" } },
    { image:"image-7.webp",  category:"residential", title:{ tr:"[Konut Projesi 02]", en:"[Residential Project 02]" } },
    { image:"image-1.webp",  category:"residential", title:{ tr:"[Konut Projesi 03]", en:"[Residential Project 03]" } },
    { image:"14.webp",       category:"villa",       title:{ tr:"[Villa Projesi 01]", en:"[Villa Project 01]" } },
    { image:"image-5.webp",  category:"villa",       title:{ tr:"[Villa Projesi 02]", en:"[Villa Project 02]" } },
    { image:"13.webp",       category:"renovation",  title:{ tr:"[Yenileme Projesi 01]", en:"[Renovation Project 01]" } },
    { image:"image-6.webp",  category:"renovation",  title:{ tr:"[Yenileme Projesi 02]", en:"[Renovation Project 02]" } },
    { image:"image-2.webp",  category:"commercial",  title:{ tr:"[Ticari Mekan 01]", en:"[Commercial Space 01]" } },
    { image:"image-12.webp", category:"commercial",  title:{ tr:"[Ticari Mekan 02]", en:"[Commercial Space 02]" } },
    { image:"image-15.webp", category:"commercial",  title:{ tr:"[Ticari Mekan 03]", en:"[Commercial Space 03]" } },
    { image:"image-4.webp",  category:"commercial",  title:{ tr:"[Ticari Mekan 04]", en:"[Commercial Space 04]" } },
    { image:"image-3.webp",  category:"commercial",  title:{ tr:"[Ticari Mekan 05]", en:"[Commercial Space 05]" } },
  ],
};

let LANG = "tr";
let CATEGORIES = DEFAULT_CONTENT.categories;
let PROJECTS = DEFAULT_CONTENT.projects;
let activeCategory = null;

// The first image is the cover the ring and the grid show; the whole list is
// the detail page's gallery.
const coverOf = (p) => (p.images && p.images.length ? p.images[0] : p.image);
const thumbOf = (p) => THUMB_DIR + coverOf(p);
const fullOf = (p) => IMAGE_DIR + coverOf(p);
const pageOf = (p) => (p.slug ? `proje/${p.slug}.html` : "");
const t = (key) => (STRINGS[LANG] && STRINGS[LANG][key]) || STRINGS.tr[key] || key;
const titleOf = (p) => (p.title && (p.title[LANG] || p.title.tr || p.title.en)) || "";
const projectsIn = (id) => (id ? PROJECTS.filter((p) => p.category === id) : PROJECTS.slice());

// Category names are English terms, and the page's language is Turkish, where
// uppercasing "i" gives "İ" — so VILLA would come out VİLLA. Uppercase them by
// English rules explicitly rather than leaving it to the page's locale.
const upper = (s) => String(s || "").toLocaleUpperCase("en-US");

function categoryLabel(id) {
  const cat = CATEGORIES.find((c) => c.id === id);
  if (!cat) return id || "";
  return cat.label[LANG] || cat.label.tr || cat.label.en || id;
}

async function loadContent() {
  let data = DEFAULT_CONTENT;
  try {
    const res = await fetch(CONTENT_URL, { cache: "no-cache" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    data = await res.json();
  } catch (err) {
    console.warn(`Could not read ${CONTENT_URL}, falling back to built-in content:`, err.message);
  }
  const cats = (data.categories || []).filter((c) => c && c.id && c.label);
  const projs = (data.projects || []).filter((p) => p && p.title && ((p.images && p.images.length) || p.image));
  CATEGORIES = cats.length ? cats : DEFAULT_CONTENT.categories;
  PROJECTS = projs.length ? projs : DEFAULT_CONTENT.projects;
  // The ring opens on the first category listed, which is Villa.
  activeCategory = CATEGORIES.length ? CATEGORIES[0].id : null;
}

const INC = 360 / ITEM_COUNT;
let radius = 470, yOffset = 0, ringRot = 0, introOffset = 0, introPlaying = false;
const items = [];
let activeCard = null;
const isMobile = window.matchMedia(MOBILE_MQ).matches;
let mobileSelectedCard = null, mobileCurrentRotation = 0, mobileTargetRotation = 0;

const scene = document.querySelector(".scene");
const gallery = document.getElementById("gallery");
const center = document.getElementById("center");
const previewImg = document.querySelector("#previewImg img");
const previewCat = document.getElementById("previewCat");
const previewTitle = document.getElementById("previewTitle");
const labelsWrap = document.getElementById("labels");
const mpImg = document.querySelector("#mpImg img");
const mpCat = document.getElementById("mpCat");
const mpTitle = document.getElementById("mpTitle");
const mpView = document.getElementById("mpView");
const mobilePreview = document.getElementById("mobilePreview");
const ringHitbox = document.getElementById("ringHitbox");
const catRow = document.getElementById("catRow");
const gridView = document.getElementById("gridView");
const gridInner = document.getElementById("gridInner");
const viewToggle = document.getElementById("viewToggle");
const viewToggleLabel = document.getElementById("viewToggleLabel");
const ringLine = document.getElementById("ringLine");
const ringBack = document.getElementById("ringBack");
const ringBackLabel = document.getElementById("ringBackLabel");
const ringBackWhere = document.getElementById("ringBackWhere");
let booted = false;

let view = "ring";
let scrollRotation = null;   // the ScrollTrigger that turns the ring
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// The showcase ring is laid out directly rather than orbited, so on a desktop
// the gallery is simply the middle of the screen and carries no tilt.
function computeGeometry() {
  if (!isMobile) {
    showGeometry();
    gsap.set(gallery, { x: 0, y: 0 });
    return;
  }
  const vw = window.innerWidth, vh = window.innerHeight;
  radius = vw * 0.74;
  const localY = radius * Math.cos(TILT * DEG);
  const depthZ = radius * Math.sin(TILT * DEG);
  yOffset = localY * (PERSPECTIVE / (PERSPECTIVE - depthZ));
  if (isMobile) {
    const pr = mobilePreview.getBoundingClientRect();
    const archiveTop = (pr.bottom > 0 ? pr.bottom : vh * 0.46) + 26;
    const ringCenterX = vw * 0.98;
    gsap.set(gallery, { x: ringCenterX - vw / 2, y: archiveTop - vh / 2 });
    if (ringHitbox) ringHitbox.style.top = Math.round(archiveTop - 12) + "px";
  } else {
    gsap.set(gallery, { x: 0, y: -yOffset });
  }
}

function angleOf(card) { return card.index * INC - 90 + ringRot + introOffset; }
function depthOpacity(rotZdeg) { const back = Math.cos(rotZdeg * DEG); return 1 - (back + 1) * 0.25; }

// A card's opacity combines how far round the ring it sits with whether its
// category is the selected one. Unselected categories recede rather than
// disappear, so the whole archive stays readable at a glance.
function cardOpacity(card, rotZ) {
  const depth = depthOpacity(rotZ === undefined ? angleOf(card) : rotZ);
  const inFocus = !activeCategory || card.project.category === activeCategory;
  return depth * (inFocus ? 1 : CATEGORY_DIM);
}

function updateRing() {
  for (const card of items) {
    const rotZ = angleOf(card);
    card.depth = depthOpacity(rotZ);
    gsap.set(card.el, { rotationZ: rotZ });
    gsap.set(card.cardEl, { opacity: cardOpacity(card, rotZ) });
  }
}

// The pool holds whole projects rather than bare filenames, so a card's photo
// and the title it shows always belong to the same project.
//
// Cards are grouped: each category takes one contiguous arc of the ring, in the
// order projects.json lists them, sized by how many projects it holds. Nothing
// is shuffled — the grouping is the point, so a visitor can see a category as a
// run of its own work rather than scattered through the whole archive.
function buildPool() {
  const groups = CATEGORIES
    .map((cat) => projectsIn(cat.id))
    .filter((list) => list.length);
  if (!groups.length) {
    return Array.from({ length: ITEM_COUNT }, (_, i) => PROJECTS[i % Math.max(1, PROJECTS.length)]);
  }

  // Largest-remainder apportionment, so the arcs add up to ITEM_COUNT exactly.
  // Plain rounding overshoots and the trim then clips the last category's arc.
  const total = groups.reduce((n, list) => n + list.length, 0);
  const exact = groups.map((list) => (list.length / total) * ITEM_COUNT);
  const shares = exact.map((x) => Math.max(1, Math.floor(x)));
  const byRemainder = exact
    .map((x, i) => ({ rest: x - Math.floor(x), i }))
    .sort((a, b) => b.rest - a.rest);
  let left = ITEM_COUNT - shares.reduce((a, b) => a + b, 0);
  for (let k = 0; left > 0 && byRemainder.length; k++, left--) shares[byRemainder[k % byRemainder.length].i]++;

  const pool = [];
  groups.forEach((list, i) => {
    for (let j = 0; j < shares[i]; j++) pool.push(list[j % list.length]);
  });
  pool.length = Math.min(pool.length, ITEM_COUNT);
  while (pool.length < ITEM_COUNT) pool.push(pool[pool.length - 1]);
  return pool;
}

function dressCard(card, project) {
  card.project = project;
  card.thumb = thumbOf(project);
  card.full = fullOf(project);
  const img = card.cardEl.firstElementChild;
  if (img && img.getAttribute("src") !== card.thumb) img.setAttribute("src", card.thumb);
}

function buildGallery() {
  const pool = buildPool();
  const frag = document.createDocumentFragment();
  for (let i = 0; i < ITEM_COUNT; i++) {
    const el = document.createElement("div"); el.className = "item";
    const cardEl = document.createElement("div"); cardEl.className = "item-card";
    const img = document.createElement("img"); img.alt = "";
    // A photo uploaded before the thumbnail job has run has no small copy yet;
    // fall back to the full size so the card still shows the right image. If the
    // full size fails too the handler stops, since src then already matches.
    img.addEventListener("error", () => {
      const card = el._card;
      if (card && card.full && !img.src.endsWith(card.full)) img.src = card.full;
    });
    cardEl.appendChild(img); el.appendChild(cardEl); frag.appendChild(el);
    const card = { el, cardEl, index: i, project: pool[i], thumb: "", full: "", hovered: false, depth: 1 };
    el._card = card; items.push(card);
    dressCard(card, pool[i]);
  }
  gallery.appendChild(frag);
}

// Selecting a category never rebuilds the ring. Every category stays on it;
// the chosen one comes forward and the rest recede.
function applyCategory(id) {
  activeCategory = id;
  renderCatRow();
  if (isMobile) {
    turnRingTo(id);
    mobileSelectedCard = null;
  } else {
    buildLabels();
    setActive(null);
  }
  updateRing();
}

// On mobile the ring also turns so the chosen category's arc reaches the focus
// angle, taking the shorter way round. The drag loop eases into the new target.
function turnRingTo(id) {
  const mine = items.filter((c) => c.project.category === id);
  if (!mine.length) return;
  const middle = mine[Math.floor(mine.length / 2)];
  const target = MOBILE_FOCUS_ANGLE + 90 - middle.index * INC;
  const delta = (((target - mobileTargetRotation + 180) % 360) + 360) % 360 - 180;
  mobileTargetRotation += delta;
}

function renderCatRow() {
  if (!catRow) return;
  catRow.textContent = "";
  for (const cat of CATEGORIES) {
    const on = cat.id === activeCategory;
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = on ? "cat-btn is-active" : "cat-btn";
    btn.textContent = categoryLabel(cat.id);
    btn.setAttribute("role", "tab");
    btn.setAttribute("aria-selected", String(on));
    btn.addEventListener("click", () => {
      if (cat.id === activeCategory) return;
      applyCategory(cat.id);
      btn.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
    });
    catRow.appendChild(btn);
  }
}

function setupItems() {
  for (const card of items) {
    gsap.set(card.el, { xPercent: -50, yPercent: -50, transformOrigin: `50% ${radius}px`, rotationZ: angleOf(card) });
    gsap.set(card.cardEl, { rotationY: ROT_Y, x: 0, y: 0, z: 0, scale: 1, opacity: cardOpacity(card) });
  }
}

function onPointerMove(e) {
  if (isMobile) return;
  const target = document.elementFromPoint(e.clientX, e.clientY);
  const hit = target && target.closest(".item");
  setActive(hit ? hit._card : null);
}
function setActive(card) {
  if (card === activeCard) return;
  const prev = activeCard; activeCard = card;
  if (prev) restoreCard(prev);
  if (card) { pullOut(card); setPreview(card); } else { center.classList.remove("show-project"); }
}

function pullOut(card, opts) {
  const out = opts ? opts.out : HOVER_OUT, fwd = opts ? opts.z : HOVER_Z;
  const scl = opts ? opts.scale : HOVER_SCALE, dur = opts ? opts.duration : HOVER_DURATION;
  card.cardEl.classList.add("is-active");
  const Cx = window.innerWidth / 2, Cy = window.innerHeight / 2;
  const rect = card.el.getBoundingClientRect();
  const px = rect.left + rect.width / 2, py = rect.top + rect.height / 2;
  const len = Math.hypot(px - Cx, py - Cy) || 1;
  const dxs = ((px - Cx) / len) * out, dys = ((py - Cy) / len) * out;
  const T = TILT * DEG;
  const gx = dxs, gy = dys * Math.cos(T) + fwd * Math.sin(T), gz = -dys * Math.sin(T) + fwd * Math.cos(T);
  const phi = angleOf(card) * DEG, cosP = Math.cos(phi), sinP = Math.sin(phi);
  gsap.to(card.cardEl, { x: gx * cosP + gy * sinP, y: -gx * sinP + gy * cosP, z: gz,
    scale: scl, duration: dur, ease: "power3.out", overwrite: true });
}
function restoreCard(card, duration) {
  card.cardEl.classList.remove("is-active");
  gsap.to(card.cardEl, { x: 0, y: 0, z: 0, scale: 1, duration: duration || HOVER_DURATION, ease: "power2.out", overwrite: true });
}
function setPreview(card) {
  previewImg.src = card.full; previewCat.textContent = categoryLabel(card.project.category); previewTitle.textContent = titleOf(card.project);
  center.classList.add("show-project");
  gsap.fromTo(previewImg, { opacity: 0.35 }, { opacity: 1, duration: 0.5 });
}

const MOBILE_OPTS = { out: MOBILE_SELECTED_OUT, z: MOBILE_SELECTED_Z, scale: MOBILE_SELECTED_SCALE, duration: MOBILE_TRANSITION };
function nearestMobileCard() {
  let idx = Math.round((MOBILE_FOCUS_ANGLE + 90 - ringRot) / INC);
  idx = ((idx % ITEM_COUNT) + ITEM_COUNT) % ITEM_COUNT; return items[idx];
}
function updateMobileSelection() {
  if (introPlaying) return;
  const card = nearestMobileCard();
  if (card === mobileSelectedCard) return;
  if (mobileSelectedCard) restoreCard(mobileSelectedCard, MOBILE_TRANSITION);
  mobileSelectedCard = card; pullOut(card, MOBILE_OPTS); updateMobilePreview(card);
}
function updateMobilePreview(card) {
  mpCat.textContent = categoryLabel(card.project.category); mpTitle.textContent = titleOf(card.project); mpImg.src = card.full;
  // The existing "view project" link is the way into a project on a phone: the
  // ring itself sits under the drag layer, so a tap there would fight the drag.
  if (mpView) mpView.href = pageOf(card.project) || "#";
  gsap.fromTo(mpImg, { opacity: 0.3 }, { opacity: 1, duration: MOBILE_TRANSITION, overwrite: true });
}

let mobileDragging = false, mobileVelocity = 0;
function mobileTick() {
  // Nothing to turn while the grid is on screen, but keep the loop alive so
  // switching back needs no restart.
  if (view !== "grid") {
    if (!mobileDragging) { mobileTargetRotation += mobileVelocity; mobileVelocity *= 0.92; if (Math.abs(mobileVelocity) < 0.01) mobileVelocity = 0; }
    mobileCurrentRotation += (mobileTargetRotation - mobileCurrentRotation) * 0.16;
    ringRot = mobileCurrentRotation; updateRing(); updateMobileSelection();
  }
  requestAnimationFrame(mobileTick);
}
function initMobile() {
  mobileCurrentRotation = mobileTargetRotation = ringRot;
  let lastX = 0, lastY = 0;
  ringHitbox.addEventListener("pointerdown", (e) => {
    mobileDragging = true; mobileVelocity = 0; lastX = e.clientX; lastY = e.clientY;
    try { ringHitbox.setPointerCapture(e.pointerId); } catch (_) {}
  });
  ringHitbox.addEventListener("pointermove", (e) => {
    if (!mobileDragging) return; e.preventDefault();
    const dx = e.clientX - lastX, dy = e.clientY - lastY; lastX = e.clientX; lastY = e.clientY;
    const delta = dx * MOBILE_DRAG_SPEED + dy * 0.12; mobileTargetRotation += delta; mobileVelocity = delta;
  });
  const endDrag = (e) => { if (!mobileDragging) return; mobileDragging = false;
    try { if (ringHitbox.hasPointerCapture(e.pointerId)) ringHitbox.releasePointerCapture(e.pointerId); } catch (_) {} };
  ringHitbox.addEventListener("pointerup", endDrag);
  ringHitbox.addEventListener("pointercancel", endDrag);
  ringHitbox.addEventListener("wheel", (e) => { e.preventDefault(); mobileTargetRotation += e.deltaY * 0.18; }, { passive: false });
  updateMobileSelection();
  requestAnimationFrame(mobileTick);
}

// What the ring is showing: the ten categories, or the projects inside one.
function showEntries() {
  if (level === "projects" && openCategory) {
    return projectsIn(openCategory).map((p) => ({
      id: p.slug,
      image: fullOf(p),
      tr: (p.title && (p.title.tr || p.title.en)) || p.slug,
      en: (p.title && (p.title.en || p.title.tr)) || p.slug,
      href: pageOf(p),
    }));
  }
  return CATEGORIES.map((cat) => {
    const first = projectsIn(cat.id)[0];
    return {
      id: cat.id,
      image: first ? fullOf(first) : "",
      tr: cat.label.tr || cat.label.en || cat.id,
      en: cat.label.en || cat.label.tr || cat.id,
      category: cat.id,
    };
  });
}

function showGeometry() {
  const vw = window.innerWidth, vh = window.innerHeight;
  showRx = Math.min(vw * 0.39, 700);
  showRy = Math.min(vh * 0.205, 210);
  if (ringLine) {
    ringLine.style.width = `${showRx * 2}px`;
    ringLine.style.height = `${showRy * 2}px`;
  }
  buildArcTable();
}

/* Stepping round the ellipse by equal angles does not give equal gaps: on a
   flat ellipse the points crowd together at the two ends, which is what piled
   the cards up at the sides. So step by distance travelled instead. This walks
   the ellipse once to measure it, and angleAtArc then answers "which angle is
   this far round?". */
const ARC_STEPS = 1440;
let arcTable = null;
let arcTotal = 0;
let arcTop = 0;        // how far round the top of the ellipse sits

function buildArcTable() {
  arcTable = new Float64Array(ARC_STEPS + 1);
  let prevX = showRx, prevY = 0, total = 0;
  for (let s = 1; s <= ARC_STEPS; s++) {
    const a = (s / ARC_STEPS) * Math.PI * 2;
    const x = Math.cos(a) * showRx, y = Math.sin(a) * showRy;
    total += Math.hypot(x - prevX, y - prevY);
    arcTable[s] = total;
    prevX = x; prevY = y;
  }
  arcTotal = total;
  // Where the first card starts. Shifting the angle by a quarter turn instead
  // would move every card to a different part of the curve and undo the even
  // spacing, because an ellipse is not a circle.
  arcTop = arcTable[Math.round((270 / 360) * ARC_STEPS)] / arcTotal;
}

function angleAtArc(t) {
  if (!arcTable || !arcTotal) return t * 360;
  const want = ((((t % 1) + 1) % 1)) * arcTotal;
  let lo = 0, hi = ARC_STEPS;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (arcTable[mid] < want) lo = mid + 1;
    else hi = mid;
  }
  return (lo / ARC_STEPS) * 360;
}

function buildShowcase() {
  for (const card of showItems) card.el.remove();
  showItems.length = 0;

  const segW = SHOW_CARD_W / SHOW_SEGMENTS;
  const step = (segW / SHOW_CURVE_R) * (180 / Math.PI);
  const frag = document.createDocumentFragment();

  for (const entry of showEntries()) {
    const el = document.createElement("div");
    el.className = "show-item";
    el.style.width = `${SHOW_CARD_W}px`;
    el.style.height = `${SHOW_CARD_H}px`;

    const cardEl = document.createElement("div");
    cardEl.className = "show-card";

    const face = document.createElement("div");
    face.className = "show-face";
    face.style.transform = `translateZ(${-SHOW_CURVE_R}px)`;
    for (let s = 0; s < SHOW_SEGMENTS; s++) {
      const seg = document.createElement("div");
      seg.className = "show-seg";
      seg.style.width = `${segW + 1}px`;
      seg.style.marginLeft = `${-(segW + 1) / 2}px`;
      seg.style.left = "50%";
      seg.style.backgroundImage = `url("${entry.image}")`;
      seg.style.backgroundSize = `${SHOW_CARD_W}px 100%`;
      seg.style.backgroundPosition = `${-s * segW}px 0`;
      const angle = (s - (SHOW_SEGMENTS - 1) / 2) * step;
      seg.style.transform = `rotateY(${angle}deg) translateZ(${SHOW_CURVE_R}px)`;
      face.appendChild(seg);
    }

    const reflect = document.createElement("div");
    reflect.className = "show-reflect";
    reflect.style.backgroundImage = `url("${entry.image}")`;

    cardEl.append(face, reflect);

    const label = document.createElement("div");
    label.className = "show-label";
    label.textContent = upper(LANG === "en" ? entry.en : entry.tr);

    el.append(cardEl, label);
    frag.appendChild(el);

    const card = { el, cardEl, label, entry };
    el._show = card;
    showItems.push(card);
  }

  gallery.appendChild(frag);
  placeShowcase();
}

function placeShowcase() {
  const n = showItems.length || 1;
  showItems.forEach((card, i) => {
    const angle = angleAtArc(arcTop + i / n + (ringRot + introOffset) / 360);
    const rad = angle * DEG;
    const sin = Math.sin(rad), cos = Math.cos(rad);
    const z = sin * SHOW_DEPTH;              // top of the ellipse sits furthest back
    const near = (sin + 1) / 2;              // 0 far, 1 near
    const lifted = card === showHovered;

    gsap.set(card.el, {
      xPercent: -50, yPercent: -50,
      x: cos * showRx,
      y: sin * showRy - (lifted ? SHOW_HOVER_LIFT : 0),
      z,
      opacity: 0.42 + near * 0.58,
    });
    gsap.set(card.cardEl, {
      rotationY: cos * SHOW_TURN,
      scale: (0.74 + near * 0.34) * (lifted ? SHOW_HOVER_SCALE : 1),
    });
    // The name sits on the outer side of the ring: above the cards along the
    // top, below the ones along the bottom, the way the drawing has it.
    card.label.style.top = sin < 0
      ? `${-SHOW_LABEL_GAP}px`
      : `${SHOW_CARD_H + SHOW_LABEL_GAP - 14}px`;
  });
}

function refreshShowLabels() {
  for (const card of showItems) {
    card.label.textContent = upper(LANG === "en" ? card.entry.en : card.entry.tr);
  }
}

function updateBackControl() {
  if (!ringBack) return;
  const open = level === "projects";
  ringBack.hidden = !open;
  if (ringBackLabel) ringBackLabel.textContent = t("ui.allCategories");
  if (ringBackWhere) ringBackWhere.textContent = open ? categoryLabel(openCategory) : "";
}

function setShowLevel(next, categoryId) {
  level = next;
  openCategory = next === "projects" ? categoryId : null;
  ringRot = 0;
  buildShowcase();
  updateBackControl();
  const hash = next === "projects" ? `#${categoryId}` : "";
  if (window.location.hash !== hash) {
    history.pushState({ level: next, category: categoryId || null }, "", hash || window.location.pathname);
  }
}

function initShowcase() {
  showGeometry();
  buildShowcase();
  updateBackControl();

  scene.addEventListener("pointermove", (e) => {
    const under = document.elementFromPoint(e.clientX, e.clientY);
    const hit = under && under.closest(".show-item");
    const card = hit ? hit._show : null;
    if (card === showHovered) return;
    showHovered = card;
    placeShowcase();
    if (card) setShowPreview(card);
    else center.classList.remove("show-project");
  });
  scene.addEventListener("pointerleave", () => {
    if (!showHovered) return;
    showHovered = null;
    placeShowcase();
    center.classList.remove("show-project");
  });

  scene.addEventListener("click", (e) => {
    const under = document.elementFromPoint(e.clientX, e.clientY);
    const hit = under && under.closest(".show-item");
    if (!hit || !hit._show) return;
    const { entry } = hit._show;
    if (entry.href) window.location.href = entry.href;
    else if (entry.category) setShowLevel("projects", entry.category);
  });

  if (ringBack) ringBack.addEventListener("click", () => setShowLevel("categories"));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && level === "projects") setShowLevel("categories");
  });
  window.addEventListener("popstate", () => {
    const id = window.location.hash.replace("#", "");
    const known = CATEGORIES.some((c) => c.id === id);
    level = known ? "projects" : "categories";
    openCategory = known ? id : null;
    ringRot = 0;
    buildShowcase();
    updateBackControl();
  });
}

// The centre block doubles as the preview while a card is hovered.
function setShowPreview(card) {
  previewImg.src = card.entry.image;
  previewCat.textContent = level === "projects" ? upper(categoryLabel(openCategory)) : "";
  previewTitle.textContent = LANG === "en" ? card.entry.en : card.entry.tr;
  center.classList.add("show-project");
  gsap.fromTo(previewImg, { opacity: 0.35 }, { opacity: 1, duration: 0.45 });
}

function initParallax() {
  window.addEventListener("mousemove", (e) => {
    const px = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
    const py = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
    // The showcase gallery carries no tilt of its own, so parallax leans from flat.
    gsap.to(gallery, { rotationX: py * PARALLAX, rotationY: -px * PARALLAX, duration: 1, ease: "power2.out", overwrite: "auto" });
  });
}

function initCursor() {
  if (!window.matchMedia("(pointer: fine) and (hover: hover)").matches) return;
  const cursor = document.getElementById("cursor");
  gsap.set(cursor, { xPercent: -50, yPercent: -50, scale: 1 });
  const xTo = gsap.quickTo(cursor, "x", { duration: 0.2, ease: "power3.out" });
  const yTo = gsap.quickTo(cursor, "y", { duration: 0.2, ease: "power3.out" });
  window.addEventListener("pointermove", (e) => { xTo(e.clientX); yTo(e.clientY); });   // <-- dot FOLLOWS the mouse
  document.addEventListener("mouseleave", () => cursor.classList.add("is-hidden"));
  document.addEventListener("mouseenter", () => cursor.classList.remove("is-hidden"));
  const setScale = (s) => gsap.to(cursor, { scale: s, duration: 0.3, ease: "power3.out", overwrite: "auto" });
  scene.addEventListener("pointerenter", () => setScale(1.25));
  scene.addEventListener("pointerleave", () => setScale(1));
  document.querySelectorAll(".menu-list a, .corner, .menu-toggle, .lang-btn").forEach((el) => {
    el.addEventListener("pointerenter", () => setScale(0.6));
    el.addEventListener("pointerleave", () => setScale(1));
  });
}

// Whichever ring this device is running, redraw it.
const redrawRing = () => (isMobile ? updateRing() : placeShowcase());

function initScroll() {
  scrollRotation = ScrollTrigger.create({ trigger: "body", start: "top top", end: "bottom bottom", scrub: 1.4,
    onUpdate: (self) => { ringRot = self.progress * 360 * TURNS; redrawRing(); } });
}

/* ── Grid view ──────────────────────────────────────────────────────────────
   Every project, grouped under its category, in ordinary scrolling flow. It is
   the way in for anyone who has asked for reduced motion, and the way out for
   anyone who would rather read a list than turn a ring. Images load as they
   come into view, so the length of the archive costs nothing up front. */
function buildGrid() {
  if (!gridInner) return;
  gridInner.textContent = "";
  for (const cat of CATEGORIES) {
    const mine = projectsIn(cat.id);
    if (!mine.length) continue;

    const section = document.createElement("section");
    section.className = "grid-cat";

    const head = document.createElement("div");
    head.className = "grid-cat-head";
    const heading = document.createElement("h2");
    heading.textContent = categoryLabel(cat.id);
    const count = document.createElement("span");
    count.textContent = `(${mine.length})`;
    head.append(heading, count);

    const items = document.createElement("div");
    items.className = "grid-items";
    for (const project of mine) {
      const figure = document.createElement("figure");
      figure.className = "grid-item";
      const link = document.createElement("a");
      link.className = "grid-link";
      link.href = pageOf(project);
      const well = document.createElement("div");
      well.className = "well";
      const img = document.createElement("img");
      img.loading = "lazy";
      img.decoding = "async";
      img.alt = "";
      img.src = fullOf(project);
      img.addEventListener("error", () => {
        const small = thumbOf(project);
        if (!img.src.endsWith(small)) img.src = small;
      }, { once: true });
      well.appendChild(img);

      const caption = document.createElement("figcaption");
      caption.textContent = titleOf(project);
      const label = document.createElement("div");
      label.className = "cat";
      label.textContent = upper(categoryLabel(cat.id));
      caption.appendChild(label);

      link.append(well, caption);
      figure.appendChild(link);
      items.appendChild(figure);
    }

    section.append(head, items);
    gridInner.appendChild(section);
  }
}

function updateViewToggleLabel() {
  if (viewToggleLabel) viewToggleLabel.textContent = t(view === "grid" ? "ui.ring" : "ui.grid");
}

function setView(next) {
  view = next;
  const grid = next === "grid";
  document.body.classList.toggle("is-grid", grid);
  if (gridView) gridView.hidden = !grid;
  if (viewToggle) viewToggle.setAttribute("aria-pressed", String(grid));

  if (grid) {
    buildGrid();
    // The ring reads the page's scroll position, so stop it listening while the
    // grid owns the scrolling.
    if (scrollRotation) scrollRotation.disable();
  } else if (scrollRotation) {
    scrollRotation.enable();
  }
  window.scrollTo(0, 0);
  updateViewToggleLabel();
  if (!grid) requestAnimationFrame(onResize);
}

function buildLabels() {
  if (!labelsWrap) return;   // the showcase ring carries its names on the cards
  const cx = window.innerWidth / 2, cy = window.innerHeight / 2;
  const lrx = radius + 245, lry = radius * Math.cos(TILT * DEG) + 160, n = CATEGORIES.length;
  labelsWrap.innerHTML = "";
  CATEGORIES.forEach((cat, i) => {
    const angle = -90 + (360 / n) * i, rad = angle * DEG;
    const x = cx + Math.cos(rad) * lrx, y = cy + Math.sin(rad) * lry;
    const el = document.createElement("div");
    el.className = cat.id === activeCategory ? "label is-active" : "label";
    el.style.left = `${x}px`; el.style.top = `${y}px`;
    const name = document.createElement("span");
    name.className = "ul";
    name.textContent = categoryLabel(cat.id);
    const count = document.createElement("sup");
    count.textContent = `(${projectsIn(cat.id).length})`;
    el.append(name, count);
    labelsWrap.appendChild(el);
  });
}

function initLoader() {
  const overlay = document.getElementById("loadingScreen");
  if (!overlay) return;
  const minLoad = new Promise((res) => setTimeout(res, 1400));
  // Only the small ring copies hold up the loader. The full-size photos are
  // warmed in the background once the ring is up, so the archive can grow
  // without the first paint growing with it.
  const needed = isMobile
    ? PROJECTS.map(thumbOf)
    : showEntries().map((e) => e.image).filter(Boolean);
  const imageLoad = Promise.allSettled(needed.map((src) => new Promise((res) => {
    const im = new Image(); im.onload = res; im.onerror = res; im.src = src;
  })));
  Promise.all([minLoad, imageLoad]).then(async () => {
    introOffset = 0; computeGeometry(); redrawRing();
    await new Promise(requestAnimationFrame);
    await new Promise(requestAnimationFrame);
    document.body.classList.add("page-ready");
    overlay.classList.add("is-hidden");
    revealUI();
    // Asked for less movement: no opening spin. The ring is still what opens —
    // the grid stays a choice, on the button.
    if (reducedMotion) {
      introOffset = 0;
      introPlaying = false;
      redrawRing();
    } else {
      runIntro();
    }
    prefetchFullImages();
    gsap.timeline({ onComplete: () => overlay.remove() })
      .to(".loading-inner", { opacity: 0, y: -6, duration: 0.4, ease: "power2.in" })
      .to(overlay, { opacity: 0, duration: 0.6, ease: "power3.out" }, "-=0.1");
  });
}

// Fetch the full-size photos a few at a time after the reveal, so the first
// hover or drag already has its preview. Skipped on metered or slow connections,
// where the previews can load one at a time on demand instead.
function prefetchFullImages() {
  const conn = navigator.connection;
  if (conn && (conn.saveData || /(^|-)2g$/.test(conn.effectiveType || ""))) return;
  const queue = PROJECTS.map(fullOf);
  let inFlight = 0;
  const pump = () => {
    while (inFlight < 3 && queue.length) {
      const im = new Image();
      const done = () => { inFlight--; pump(); };
      inFlight++;
      im.onload = done; im.onerror = done; im.src = queue.shift();
    }
  };
  pump();
}

function runIntro() {
  introPlaying = true; introOffset = -360; redrawRing();
  gsap.to({ v: -360 }, { v: 0, duration: 1.6, ease: "power3.out",
    onUpdate() { introOffset = this.targets()[0].v; redrawRing(); },
    onComplete() { introOffset = 0; introPlaying = false; redrawRing(); } });
}

function revealUI() {
  const slideUi = [
    document.querySelector(".site-header"),
    document.querySelector(".topright"),
    ...document.querySelectorAll(".corner"),
  ];
  if (isMobile && mobilePreview) slideUi.push(mobilePreview);
  if (isMobile && catRow) slideUi.push(catRow);
  gsap.fromTo(slideUi.filter(Boolean), { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.06 });
  if (!isMobile) {
    gsap.fromTo(center, { opacity: 0 }, { opacity: 1, duration: 0.9, ease: "power3.out" });
    gsap.fromTo(".show-label", { opacity: 0 }, { opacity: 1, duration: 0.8, ease: "power2.out", stagger: 0.05, delay: 0.15 });
  }
}

/* ── Language ───────────────────────────────────────────────────────────────
   Every piece of interface text carries a data-i18n key; content text comes
   from projects.json, which holds both languages. The choice is remembered per
   visitor, and the page still reads correctly if that store is unavailable. */
function applyLang(next) {
  LANG = next;
  document.documentElement.lang = next;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = t(el.getAttribute("data-i18n"));
  });
  // Menu entries carry both languages at once, the chosen one leading.
  const other = next === "tr" ? "en" : "tr";
  document.querySelectorAll("[data-i18n-pair]").forEach((el) => {
    const key = el.getAttribute("data-i18n-pair");
    const lead = el.querySelector(".mi-a");
    const under = el.querySelector(".mi-b");
    if (lead) lead.textContent = t(key);
    if (under) under.textContent = (STRINGS[other] && STRINGS[other][key]) || "";
  });
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    const on = btn.dataset.lang === next;
    btn.classList.toggle("is-active", on);
    btn.setAttribute("aria-pressed", String(on));
  });
  try { localStorage.setItem(LANG_KEY, next); } catch (_) {}
  updateViewToggleLabel();
  if (!booted) return;   // still starting up; init() draws the rest
  if (view === "grid") buildGrid();
  if (isMobile) {
    renderCatRow();
    if (mobileSelectedCard) updateMobilePreview(mobileSelectedCard);
  } else {
    refreshShowLabels();
    updateBackControl();
  }
}

/* ── Menu ───────────────────────────────────────────────────────────────────
   The entries are not on the page until the button is pressed. While the panel
   is open the scrim swallows wheel and touch, because scrolling is what turns
   the ring and the ring should hold still behind the menu. */
function initMenu() {
  const toggle = document.getElementById("menuToggle");
  const panel = document.getElementById("menuPanel");
  const scrim = document.getElementById("menuScrim");
  const close = document.getElementById("menuClose");
  if (!toggle || !panel || !scrim) return;

  const isOpen = () => panel.classList.contains("is-open");
  const setOpen = (open) => {
    panel.classList.toggle("is-open", open);
    scrim.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    if (open) (close || panel).focus();
    else toggle.focus();
  };

  toggle.addEventListener("click", () => setOpen(!isOpen()));
  if (close) close.addEventListener("click", () => setOpen(false));
  scrim.addEventListener("click", () => setOpen(false));
  scrim.addEventListener("wheel", (e) => e.preventDefault(), { passive: false });
  scrim.addEventListener("touchmove", (e) => e.preventDefault(), { passive: false });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isOpen()) setOpen(false);
  });

  // Hold the tab ring inside the panel while it is open.
  panel.addEventListener("keydown", (e) => {
    if (e.key !== "Tab") return;
    const stops = panel.querySelectorAll("a[href], button");
    if (!stops.length) return;
    const first = stops[0], last = stops[stops.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });

  panel.querySelectorAll(".menu-list a").forEach((link) => {
    link.addEventListener("click", () => setOpen(false));
  });
}

function initLang() {
  let saved = null;
  try { saved = localStorage.getItem(LANG_KEY); } catch (_) {}
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.dataset.lang !== LANG) applyLang(btn.dataset.lang);
    });
  });
  applyLang(saved === "en" ? "en" : "tr");
}

function onResize() {
  computeGeometry();
  if (isMobile) { setupItems(); updateRing(); return; }
  placeShowcase();
  ScrollTrigger.refresh();
}

async function init() {
  await loadContent();
  initMenu();
  initLang();
  if (viewToggle) {
    viewToggle.addEventListener("click", () => setView(view === "grid" ? "ring" : "grid"));
  }
  // An address that names a category opens straight into it.
  const fromHash = window.location.hash.replace("#", "");
  if (!isMobile && CATEGORIES.some((c) => c.id === fromHash)) {
    level = "projects";
    openCategory = fromHash;
  }

  initLoader();
  computeGeometry();

  if (isMobile) {
    buildGallery();
    setupItems();
    updateRing();
    renderCatRow();
    gsap.set(gallery, { rotationX: TILT });
    initMobile();
  } else {
    // Names ride with the showcase cards, so the old label ellipse goes.
    if (labelsWrap) labelsWrap.remove();
    initShowcase();
    initParallax();
    initScroll();
    initCursor();
  }

  booted = true;
  applyLang(LANG);   // the ring exists now, so its names can catch up

  requestAnimationFrame(onResize);
  setTimeout(onResize, 300);
  window.addEventListener("load", onResize);
  let rt;
  window.addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(onResize, 150); });
  window.matchMedia(MOBILE_MQ).addEventListener("change", () => location.reload());
}

window.addEventListener("DOMContentLoaded", init);
