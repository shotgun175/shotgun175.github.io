# Lost Ark Tools

A small static hub that collects shotgun175's Lost Ark utilities in one place, so
they are no longer five unlinked repositories. One hand-written page, no framework,
no build step, no required JavaScript.

**Live site:** https://shotgun175.github.io/

This repository is the GitHub Pages root for the `shotgun175` account
(`shotgun175.github.io`), so its default branch is served directly at the URL above.

## What is in here

| File | Purpose |
| --- | --- |
| `index.html` | The hub page: header, a grid of tool cards, footer. |
| `styles.css` | The design system (palette, type, responsive grid, focus + reduced-motion). |
| `enhance.js` | Optional filter-by-type enhancement. The page works fully without it. |
| `favicon.svg` | Site icon (the Ark-Grid lattice mark). |
| `favicon-32.png` | 32x32 raster fallback for browsers/crawlers that ignore SVG icons. |
| `og-image.png` | 1200x630 social preview image. |
| `apple-touch-icon.png` | 180x180 home-screen icon. |
| `assets/og-image.html` | Editable source used to render `og-image.png`. |
| `snippets/hub-badge.html` | A drop-in "Part of Lost Ark Tools" badge for the individual apps. |
| `.nojekyll` | Tells GitHub Pages to serve files as-is (no Jekyll processing). |

## Tools catalogued

| Tool | Type | Link target |
| --- | --- | --- |
| ArkGrid Optimizer | In-browser web app | https://shotgun175.github.io/LostArk-ArkGrid-Optimizer/ |
| Raid Mech Announcer | Windows overlay (Tauri) | Latest GitHub release |
| Dark Rotation Manager | Windows overlay (PyInstaller) | Latest GitHub release |
| Bible Roster Updater | Command-line automation | GitHub repository |
| Cash Shop Value | In-browser web app | https://shotgun175.github.io/LostArk-Cash-Shop-Value/ |

## How to add a tool card

1. Open `index.html` and find the comment block labelled `CARD TEMPLATE`
   (just after the last live card).
2. Copy the entire commented `<article class="card"> ... </article>` block and
   paste it into the `.card-grid` as a real (uncommented) card.
3. Edit these fields:
   - `data-kind` — one of `optimizer`, `overlay`, `automation`, `economy`. This drives the
     card's accent colour and the filter buttons.
   - The 2nd and 3rd pills (platform / region) — plain `<li>` text inside the
     card; nothing renders them from attributes.
   - The `<svg>` icon, the `<h3>` title, the 12-18 word blurb, the three pill
     labels, the link `href`, and the button text
     (`Open tool` / `Download` / `View on GitHub`).
4. Adding a brand-new `data-kind`? Add a matching accent rule in `styles.css`
   (search for `data-kind`) and a `<button>` chip in the `.toolbar` in
   `index.html`.

That is the whole process - no build, no install. Open `index.html` in a browser
to preview.

## Local preview

No tooling required. Either double-click `index.html`, or serve the folder:

```sh
python -m http.server 8000
# then open http://localhost:8000
```

## Regenerating the social image

`og-image.png` is rendered from `assets/og-image.html`. To update it, edit that
file, open it in a browser sized to exactly 1200x630, and export a 1200x630 PNG
(any headless-browser screenshot tool works). Keep the dimensions exact - the
`og:image:width` / `og:image:height` meta tags in `index.html` declare 1200x630.

## Deploying (GitHub Pages from a branch)

Deployment needs no workflow - it is plain static files. (The repository does
carry one scheduled workflow, `.github/workflows/link-check.yml`, which checks
the card links monthly for rot; it never builds or publishes anything.)

1. Push the default branch to `github.com/shotgun175/shotgun175.github.io`.
2. In the repository: **Settings -> Pages -> Build and deployment**.
3. Set **Source** to **Deploy from a branch**, branch = your default branch,
   folder = **/ (root)**.
4. Save. The site publishes at https://shotgun175.github.io/.

`.nojekyll` is included so Pages serves every file untouched.

## Hub badge embeds (status / sync reference)

`snippets/hub-badge.html` is the canonical badge source. All four tools already
embed it; when the badge changes, refresh these copies:

| Tool | Where the badge lives |
| --- | --- |
| ArkGrid Optimizer | `src/lib/HubBadge.svelte` (rendered by `src/components/Footer/Footer.svelte`) |
| Raid Mech Announcer | `src/lib/components/HubBadge.svelte` (Settings → About) |
| Dark Rotation Manager | bottom-bar link in `modules/gui_app.py` + a `README.md` line |
| Bible Roster Updater | `README.md` line (CLI, no UI) |

Note for the Svelte apps: a raw `<style>`-in-markup paste is not valid Svelte
template content, so both use a dedicated `HubBadge.svelte` component adapted
from the snippet (each copy carries a "synced from …" origin comment).

## Notes

- Fonts (Cinzel, Spectral, IBM Plex Mono) load from Google Fonts with system
  fallbacks, so the page stays legible if that request fails.
- **Changing brand colors: update these 4 files together.** The `:root` token
  block in `styles.css` is the canonical Lost Ark Tools palette; the same hexes
  are hardcoded (no-build constraint) in `assets/og-image.html`,
  `snippets/hub-badge.html`, and `favicon.svg`. The badge copies embedded in
  the tool repos (see the table above) carry the same hexes too.
- No backend, no analytics, no tracking.
- This is a fan project and is not affiliated with Smilegate RPG or Amazon Games.
