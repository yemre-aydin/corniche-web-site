# Corniche web site

The project archive for **Corniche İstanbul**. 136 thin landscape cards are turned edge-on and revolved
around a tilted 3D ring, forming a hollow elliptical archive. One codebase, two fully-built experiences
switched at 768px. Turkish and English, Turkish by default.

The site lives in [site/](site/).

> **Work in progress.** Every project title is a bracketed placeholder and the photographs are stand-ins,
> not Corniche's. The wordmark sits in a dashed box to mark where the real logo goes. All pages carry
> `noindex` so the draft stays out of search results while it carries a real company's name — remove that
> when the site goes live. A `robots.txt` would not help on a GitHub project site, since crawlers only read
> one at the domain root.

## Stack

Plain static site — no build step, no framework.

| File | Role |
| --- | --- |
| `site/index.html` | The archive page |
| `site/styles.css` | All styling, including the 768px mobile layout |
| `site/projects.json` | **The content list** — each project's photo, title (both languages) and category. The only file content edits touch. |
| `site/script.js` | The ring engine: geometry, hover/selection, filtering, language, loader, intro |
| `site/public/` | Full-size photos, used by the two previews |
| `site/public/thumb/` | 240×180 copies, used by the 136 ring cards. Generated automatically — see below. |
| `site/kvkk.html`, `site/cerez-politikasi.html` | Legal pages. **Placeholders, not in force** — see below. |
| `site/legal.css` | Styling for those two pages only |

The only remote dependency is GSAP 3.12.5 + ScrollTrigger from cdnjs. Images are local; there are no
web fonts (system font stack only).

`site/PROMPT.txt` is the specification the ring was originally built from — constants, geometry and
behaviour. The geometry values still hold; the palette, wording and content model have since moved on.

## Running it locally

Any static server works. From `site/`:

```bash
python3 -m http.server 5179
```

Then open <http://localhost:5179>. If you have Node instead of Python, `npx serve -l 5179` does the same.

## Adding or changing projects

Everything the archive shows comes from `site/projects.json`. Adding a project means uploading a photo
and adding one line; no other file changes.

1. Put the photo in `site/public/`. Use a filename with no spaces.
2. Add an entry to the `projects` list, where `category` is an `id` from the `categories` list:

```json
{
  "image": "corniche-residence.webp",
  "category": "residential",
  "title": { "tr": "Corniche Residence", "en": "Corniche Residence" }
}
```

To **replace** a photo, upload the new file under the same name, or change the `image` value to the new
filename. To **remove** a project, delete its entry; the photo itself can stay or go.

The `categories` list drives both the mobile category strip and the labels around the desktop ring, in
the order given. The first one is what the page opens on. Counts are not stored — each label counts its
own projects, so it cannot go stale.

You never create the small ring copies by hand. The `Ring thumbnails` workflow regenerates them whenever a
photo is added or replaced and commits the result, and it warns if a photo is missing from the content list
or listed without a file. Until it has run, a new photo's card falls back to the full-size file, so the site
is never broken in the meantime. Run it manually from the Actions tab if needed, or locally with:

```bash
npm install --no-save sharp@0.33.5
node tools/make-thumbs.mjs
```

That script is the same one the workflow runs. It rebuilds a copy only when the photo is missing one or has
changed, so running it twice does nothing the second time.

## Language

Turkish and English, remembered per visitor in `localStorage` and falling back to Turkish. Interface
wording lives in the `STRINGS` table at the top of `script.js`; content wording lives in `projects.json`,
where every title and category label carries a `tr` and an `en`. Adding a string means putting it in both
tables and marking the element with `data-i18n="its.key"`.

The toggle sits in the header, which is desktop-only — the mobile header is the wordmark and the menu
button, as designed. Mobile visitors cannot switch language until the menu panel is built.

## Legal pages

`kvkk.html` and `cerez-politikasi.html` are **placeholders and are not in force.** Both carry a visible
draft banner and neither is linked from the site's navigation. They describe what the site actually does
today: no forms, no analytics, and no cookies beyond the language preference in `localStorage`. Bracketed
fields — company name, address, e-mail, hosting provider — are for Corniche to fill in, and the text needs
a lawyer's review before it goes live.

When Meta Pixel and GA4 are added, both pages have to be rewritten and a consent banner added. The cookie
policy already lists what that will involve.

## How it works

- **Geometry.** Each card is two nested elements. The outer `.item` is a stable 78×60 hitbox carrying the
  orbit via a far `transform-origin` (`50% {radius}px`), so changing only its `rotationZ` revolves it
  around the ring. The inner `.item-card` is held edge-on at `rotationY: 86deg` forever and is the only
  element that animates on hover — `x/y/z/scale` only, never its rotation.
- **Desktop.** Page scroll drives one `ScrollTrigger` that maps progress to a full 360° turn. Hovering a
  card pulls it gently outward along the screen-space radial and swaps the centre block to that project.
  A 13px dot follows the cursor and replaces the native one.
- **Mobile (≤768px).** The same ring is repositioned into a cropped arc entering from the lower-right,
  under the category strip and a featured project block. A full-width drag hitbox rotates it with inertia;
  the card nearest a fixed focus angle becomes the featured project.
- **Filtering.** The category strip picks which projects fill the ring. Switching re-dresses the existing
  136 cards from a reshuffled pool instead of rebuilding them, so the ring keeps its rotation and nothing
  is laid out again. With few projects in a category the ring repeats the same photos; that thins out as
  real projects arrive.
- **Load.** A typography-only loader waits for a 1400ms floor and the small ring copies only — roughly
  6KB a photo rather than 220KB — then paints the complete ring while still hidden before revealing it and
  spinning it one full turn into place. The full-size photos are fetched three at a time afterwards, so the
  first hover has its preview ready and the archive can grow without the first paint growing with it.
  Metered and 2G connections skip that prefetch and load each preview on demand.
- **Content.** `projects.json` is read before the gallery is built, which is what keeps a card's photo and
  its title on the same project. If the file cannot be read the engine falls back to a built-in copy of the
  list, so the ring always renders.

## Still to come

- Real photographs and project names, replacing every placeholder.
- The menu pages: Corniche, Hizmetlerimiz, Collection, Showroom, İletişim — and the mobile menu panel the
  hamburger needs. The header links are inert for now.
- The footer: contact details, social links, legal links, TR/EN.
- Meta Pixel and GA4, with the consent banner they require.
- "Projeleri filtrele" and "Izgara görünümü" are inert. On mobile the category strip already filters;
  a grid view is not built.
