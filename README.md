# Lost Ark Tools

A small static hub that collects shotgun175's Lost Ark utilities in one place, so
they are no longer six unlinked repositories. One hand-written page, no framework,
no build step, no required JavaScript.

**Live site:** https://shotgun175.github.io/

This repository is the GitHub Pages root for the `shotgun175` account
(`shotgun175.github.io`), so its default branch is served directly at the URL above.

## What is in here

| File | Purpose |
| --- | --- |
| `index.html` | The hub page: masthead, three timeline banks of tool tiles, footer. |
| `styles.css` | The design system (palette, type, run-mode lamps, responsive layout, focus + reduced-motion). |
| `enhance.js` | Optional scroll-reveal enhancement. The page works fully without it. |
| `fonts/` | Self-hosted latin woff2 subsets of the three typefaces, declared via `@font-face` in `styles.css`. |
| `assets/favicon-32.png` | 32x32 tab icon (the compass brand mark). |
| `assets/icon-192.png` | 192x192 icon for high-density screens and Android; also the masthead mark. |
| `assets/og-image.png` | 1200x630 social preview image. |
| `apple-touch-icon.png` | 180x180 home-screen icon. |
| `assets/og-image.html` | Editable source used to render `assets/og-image.png`. |
| `assets/brand-icon-master.png` | 512x512 master of the compass brand icon; every icon size is exported from it. |
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
| Lost Ark Checklist | In-browser web app | https://loa-checklist.web.app/ |

## How to add a tool

1. Open `index.html` and find the comment block labelled `TILE TEMPLATE`
   (just after the last live tile, inside the third bank).
2. Copy the entire commented `<li class="tile"> ... </li>` block and paste it,
   uncommented, into the `.bank__list` of whichever timeline bank the tool belongs
   to: `01 Prep & planning` (before the raid), `02 In-raid overlays` (during the
   pull), or `03 Spending & economy` (between raids).
3. Edit these fields:
   - `data-mode`: one of `open` (runs in the browser), `download` (Windows build),
     or `setup` (clone and configure). This drives the lamp colour, the spec
     accent, and the CTA colour, and it is taught once in the masthead legend.
   - The lamp `<svg>`: the tool's own glyph. The colour already encodes the run
     mode, so the glyph just says which tool it is.
   - The `<h3 class="tile__name">` title, the spec line (`MODE · PLATFORM ·
     REGION`), the one-line blurb, and the CTA `href` + verb (`Open tool` /
     `Download` / `View on GitHub`).
   - Optional: a labelled `.tile__flag` (`Status`, `Needs`, ...) for a wind-down
     notice or a hard prerequisite; add `tile__flag--caution` for the orange
     treatment.
   - Optional: a `.source` link beside the CTA, for browser apps whose repo is not
     obvious from the CTA.
   - Keep `data-reveal` on the `<li>` so the scroll-reveal enhancement animates it
     in (it stays visible with JavaScript off).
4. Adding a brand-new `data-mode`? Add a matching `--accent` rule in `styles.css`
   (search for `data-mode`) and a `<li>` entry in the `.legend` list in
   `index.html`. The link-check CI validates every tile's `data-mode` against
   the legend, so a typo'd mode fails the next run instead of silently wearing
   the wrong lamp colour.
5. If the tool changes the hub's headline roster: update the three head meta
   descriptions in `index.html` (`description`, `og:description`,
   `twitter:description`) that name the tools, then update the lede in
   `assets/og-image.html` and re-export `assets/og-image.png` (recipe below), so
   social shares do not contradict the page.

That is the whole process, no build, no install. Serve the folder (see below) to
preview.

## Local preview

No tooling required. Serve the folder:

```sh
python -m http.server 8000
# then open http://localhost:8000
```

Double-clicking `index.html` works for a quick look, but some browsers
restrict font loading from `file://`, so serve the folder for a faithful
preview.

## Regenerating the icons

The brand mark is a compass rose, rendered art rather than vector, so every
icon is a PNG exported from `assets/brand-icon-master.png`. If the master
changes, re-export the set from the repo root (needs Pillow):

```sh
python - <<'PY'
import base64, io
from PIL import Image, ImageChops, ImageDraw

def rounded(img, radius=0.22):
    w, h = img.size
    big = Image.new("L", (w * 4, h * 4))
    ImageDraw.Draw(big).rounded_rectangle((0, 0, w * 4 - 1, h * 4 - 1), radius=w * 4 * radius, fill=255)
    out = img.convert("RGBA")
    out.putalpha(ImageChops.darker(out.getchannel("A"), big.resize((w, h), Image.LANCZOS)))
    return out

m = Image.open("assets/brand-icon-master.png").convert("RGB")
rounded(m.resize((32, 32), Image.LANCZOS)).save("assets/favicon-32.png", optimize=True)
rounded(m.resize((192, 192), Image.LANCZOS)).save("assets/icon-192.png", optimize=True)
m.resize((180, 180), Image.LANCZOS).save("apple-touch-icon.png", optimize=True)  # iOS rounds it
buf = io.BytesIO(); rounded(m.resize((52, 52), Image.LANCZOS)).save(buf, "PNG", optimize=True)
print("data:image/png;base64," + base64.b64encode(buf.getvalue()).decode())
PY
```

The printed data URI is the badge mark: paste it into the `src` of the
`lat-badge__mark` image in `snippets/hub-badge.html`, then refresh the badge
copies in the tool repos (see "Hub badge embeds").

## Regenerating the social image

`assets/og-image.png` is rendered from `assets/og-image.html`. Edit that file, then
re-export deterministically from the repo root (both paths must be absolute;
Chrome ignores relative ones):

```sh
# 1. Render at exactly 1200x630, device scale 1 (git-bash shown; any Chromium works)
"/c/Program Files (x86)/Google/Chrome/Application/chrome.exe" --headless \
  "--screenshot=$(pwd -W)/assets/og-image.png" --window-size=1200,630 \
  --force-device-scale-factor=1 --hide-scrollbars --virtual-time-budget=8000 \
  "file:///$(pwd -W)/assets/og-image.html"

# 2. Compress it in place to a 256-color palette PNG (needs Pillow)
python -c "from PIL import Image; Image.open('assets/og-image.png').convert('RGB').quantize(colors=256, dither=Image.Dither.FLOYDSTEINBERG).save('assets/og-image.png', optimize=True)"
```

Keep the dimensions exact - the `og:image:width` / `og:image:height` meta tags
in `index.html` declare 1200x630 - and keep the result under ~100 KB (the
palette step above takes it from ~210 KB to ~77 KB with no visible loss).

## Deploying (GitHub Pages from a branch)

Deployment needs no workflow - it is plain static files. (The repository does
carry one scheduled workflow, `.github/workflows/link-check.yml`, which checks
the tool links monthly for rot; it never builds or publishes anything.
`.github/dependabot.yml` is not a workflow: Dependabot checks monthly and opens
a PR when the SHA-pinned `actions/checkout` in that workflow falls behind.)

GitHub disables scheduled workflows in a public repo after 60 days with no
repository activity. After a long gap, open **Actions**, select **Link check**,
press **Enable workflow** if the inactivity banner shows, then **Run workflow**
(a disabled workflow refuses manual runs).

1. Push the default branch to `github.com/shotgun175/shotgun175.github.io`.
2. In the repository: **Settings -> Pages -> Build and deployment**.
3. Set **Source** to **Deploy from a branch**, branch = your default branch,
   folder = **/ (root)**.
4. Save. The site publishes at https://shotgun175.github.io/.

`.nojekyll` is included so Pages serves every file untouched.

## Hub badge embeds (status / sync reference)

`snippets/hub-badge.html` is the canonical badge source. All six tools
embed it; when the badge changes, refresh these copies:

| Tool | Where the badge lives |
| --- | --- |
| ArkGrid Optimizer | `src/components/shared/HubBadge.svelte` (rendered by `src/components/Footer/Footer.svelte`) |
| Raid Mech Announcer | `src/lib/components/HubBadge.svelte` (Settings → About) |
| Dark Rotation Manager | bottom-bar link in `modules/gui_app.py` + a `README.md` line |
| Bible Roster Updater | `README.md` line (CLI, no UI) |
| Cash Shop Value | `web/src/lib/components/HubBadge.svelte` (rendered by the `src/routes/+layout.svelte` footer) |
| Lost Ark Checklist | sidebar link above GitHub in `apps/client/src/app/app.component.html` (styles in `app.component.less`) |

Note for the Svelte apps: a raw `<style>`-in-markup paste is not valid Svelte
template content, so all three use a dedicated `HubBadge.svelte` component adapted
from the snippet (each copy carries a "synced from …" origin comment).

## Notes

- Fonts (Cinzel, Spectral, IBM Plex Mono) are self-hosted from `fonts/` via
  `@font-face` in `styles.css`, so first paint never depends on a third-party
  origin and no visitor IP goes to a font CDN. System fallback stacks keep the
  page legible if a file fails. (`assets/og-image.html` still pulls Google
  Fonts; it is only ever rendered manually, never served to visitors.)
- **Changing brand colors: update these 3 files together.** The `:root` token
  block in `styles.css` is the canonical Lost Ark Tools palette; the same hexes
  are hardcoded (no-build constraint) in `assets/og-image.html` and
  `snippets/hub-badge.html`. The badge copies embedded in the tool repos (see
  the table above) carry the same hexes too. The compass brand icon is raster
  art outside the palette; see "Regenerating the icons".
- No backend, no analytics, no tracking.
- This is a fan project and is not affiliated with Smilegate RPG or Amazon Games.
