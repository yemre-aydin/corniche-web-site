# 3dstudiodemo

A scroll-driven 3D circular project archive for a fictional architecture studio, **STUDIO®**. 136 thin
landscape image cards are turned edge-on and revolved around a tilted 3D ring, forming a hollow
elliptical archive. One codebase, two fully-built experiences switched at 768px.

The site lives in [studio-3d-archive/](studio-3d-archive/).

## Stack

Plain static site — three files, no build step, no framework.

| File | Role |
| --- | --- |
| `studio-3d-archive/index.html` | Markup |
| `studio-3d-archive/styles.css` | All styling, including the 768px mobile layout |
| `studio-3d-archive/projects.json` | **The content list** — each project's photo, title and category. The only file content edits touch. |
| `studio-3d-archive/script.js` | The ring engine: geometry, hover/selection, loader, intro |
| `studio-3d-archive/public/` | Full-size photos, used by the two previews |
| `studio-3d-archive/public/thumb/` | 240×180 copies, used by the 136 ring cards. Generated automatically — see below. |

The only remote dependency is GSAP 3.12.5 + ScrollTrigger from cdnjs. Images are local; there are no
web fonts (system font stack only).

`studio-3d-archive/PROMPT.txt` is the full specification the implementation was built from — constants,
geometry, behaviour and the three reproduction failures to avoid. Read it before changing any value.

## Running it locally

Any static server works. From `studio-3d-archive/`:

```bash
python3 -m http.server 5179
```

Then open <http://localhost:5179>. If you have Node instead of Python, `npx serve -l 5179` does the same.

## Adding or changing projects

Everything the archive shows comes from `studio-3d-archive/projects.json`. Adding a project means
uploading a photo and adding one line; no other file changes.

1. Put the photo in `studio-3d-archive/public/`. Use a filename with no spaces.
2. Add an entry to the `projects` list:

```json
{ "image": "corniche-residence.webp", "title": "Corniche Residence", "category": "Residential" }
```

To **replace** a photo, upload the new file under the same name, or change the `image` value to the new
filename. To **remove** a project, delete its entry; the photo itself can stay or go.

The `categories` list controls the labels around the ring. A category with an explicit `count` keeps that
number; leave `count` out and it is counted from the projects instead, so it cannot go stale.

You never create the small ring copies by hand. The `Ring thumbnails` workflow regenerates them whenever a
photo is added or replaced and commits the result, and it warns if a photo is missing from the content list
or listed without a file. Until it has run, a new photo's card falls back to the full-size file, so the site
is never broken in the meantime. Run it manually from the Actions tab if needed.

## How it works

- **Geometry.** Each card is two nested elements. The outer `.item` is a stable 78×60 hitbox carrying the
  orbit via a far `transform-origin` (`50% {radius}px`), so changing only its `rotationZ` revolves it
  around the ring. The inner `.item-card` is held edge-on at `rotationY: 86deg` forever and is the only
  element that animates on hover — `x/y/z/scale` only, never its rotation.
- **Desktop.** Page scroll drives one `ScrollTrigger` that maps progress to a full 360° turn. Hovering a
  card pulls it gently outward along the screen-space radial and swaps the centre block to that project.
  A 13px black dot follows the cursor and replaces the native one.
- **Mobile (≤768px).** The same ring is repositioned into a cropped arc entering from the lower-right,
  under a top preview block. A full-width drag hitbox rotates it with inertia; the card nearest a fixed
  focus angle becomes the selected project.
- **Load.** A typography-only loader waits for a 1400ms floor and the small ring copies only — roughly
  8KB a photo rather than 220KB — then paints the complete ring while still hidden before revealing it and
  spinning it one full turn into place. The full-size photos are fetched three at a time afterwards, so the
  first hover has its preview ready and the archive can grow without the first paint growing with it.
  Metered and 2G connections skip that prefetch and load each preview on demand.
- **Content.** `projects.json` is read before the gallery is built, which is what keeps a card's photo and
  its title on the same project. If the file cannot be read the engine falls back to a built-in copy of the
  list, so the ring always renders.

## Notes

- The images in `public/` are placeholders for the demo. Swap them for licensed or owned photography
  before putting this anywhere public.
- STUDIO®, the project titles and the category counts are all fictional.
