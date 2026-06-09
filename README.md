# Lost Ark Tools

A small static hub that collects shotgun175's Lost Ark utilities in one place, so
they are no longer four unlinked repositories. One hand-written page, no framework,
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

## How to add a tool card

1. Open `index.html` and find the comment block labelled `CARD TEMPLATE`
   (just after the last live card).
2. Copy the entire commented `<article class="card"> ... </article>` block and
   paste it into the `.card-grid` as a real (uncommented) card.
3. Edit these fields:
   - `data-kind` — one of `optimizer`, `overlay`, `automation`. This drives the
     card's accent colour and the filter buttons.
   - `data-platform` / `data-region` — free text shown as the 2nd and 3rd pills.
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

This site needs no workflow - it is plain static files.

1. Push the default branch to `github.com/shotgun175/shotgun175.github.io`.
2. In the repository: **Settings -> Pages -> Build and deployment**.
3. Set **Source** to **Deploy from a branch**, branch = your default branch,
   folder = **/ (root)**.
4. Save. The site publishes at https://shotgun175.github.io/.

`.nojekyll` is included so Pages serves every file untouched.

## Follow-on: embed the hub badge in each tool

Once the hub URL is live, link each tool back to it using
`snippets/hub-badge.html`. These edits happen in the individual tool repos
(not in this one):

- **ArkGrid Optimizer** - paste the badge into the footer of `src/App.svelte`.
- **Raid Mech Announcer** - add it to the About / Help view or the settings
  footer.
- **Dark Rotation Manager** - add it to the About / Help view or the settings
  footer.
- **Bible Roster Updater** (CLI, no UI) - add a "Part of Lost Ark Tools"
  link to its `README.md` instead of the HTML badge:

  ```markdown
  Part of [Lost Ark Tools](https://shotgun175.github.io/) - see all tools.
  ```

The badge is self-contained (scoped class names, its own colours, system-font
fallbacks), so it drops cleanly into either Svelte app without clashing with
existing styles.

## Notes

- Fonts (Cinzel, Spectral, IBM Plex Mono) load from Google Fonts with system
  fallbacks, so the page stays legible if that request fails.
- No backend, no analytics, no tracking.
- This is a fan project and is not affiliated with Smilegate RPG or Amazon Games.
