# Deploying retropal.fr

The site is built locally and committed. Final deploy needs your authentication
to GitHub and Cloudflare, so the remaining steps are user-driven.

Total time: about 20 minutes.

---

## Step 1 — Push to GitHub

### 1a. Create the repo on GitHub

Go to <https://github.com/new>:

- **Repository name**: `retropal-website`
- **Visibility**: public is fine (it's a marketing site, no secrets). Private also works.
- **Do NOT** initialize with a README, .gitignore, or license — the local repo already has them.

Click "Create repository".

### 1b. Push from local

From `/home/antoine/Projets/retropal-website`, run the commands GitHub shows you, which boil down to:

```bash
cd ~/Projets/retropal-website
git remote add origin git@github.com:<your-username>/retropal-website.git
git push -u origin main
```

If you prefer HTTPS instead of SSH, swap the URL for the `https://...` form GitHub provides.

If `gh` CLI is set up:
```bash
cd ~/Projets/retropal-website
gh repo create retropal-website --public --source=. --remote=origin --push
```

---

## Step 2 — Connect Cloudflare Pages

1. Log in to <https://dash.cloudflare.com>.
2. Sidebar: **Workers & Pages** → **Create application** → **Pages** tab → **Connect to Git**.
3. Authorize Cloudflare to read your GitHub account if you haven't already (one-time consent screen). You can scope it to just the `retropal-website` repo.
4. Pick the `retropal-website` repo.
5. **Set up builds and deployments** screen:
   - **Production branch**: `main`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Root directory**: leave blank
   - **Environment variables**:
     - Add `NODE_VERSION` = `20.11.0` (Cloudflare's build environment doesn't have to match your local Node, and Astro builds faster on Node 20)
6. Click **Save and Deploy**. First build takes ~1-2 min.
7. Site lives at `https://retropal-website.pages.dev` once green.

---

## Step 3 — Bind the custom domain

In the Pages project you just created:

1. **Custom domains** tab → **Set up a custom domain**.
2. Enter `retropal.fr`. Cloudflare detects it's on the same account and auto-creates a CNAME at the apex (using CNAME flattening). Click **Activate**.
3. Repeat for `www.retropal.fr` (optional but recommended for redundancy and old-school muscle memory).
4. SSL provisions in 30 seconds to 2 minutes. The site goes live at `https://retropal.fr` once green.

---

## Step 4 — Fill in your legal info (before App Store submission)

Open `src/pages/mentions-legales.astro` and `src/pages/en/legal.astro`. Replace placeholders:

```
[NOM_LEGAL]   → your full legal name as registered (e.g. "Antoine [Last Name]")
[SIRET]       → your 14-digit SIRET number
[ADRESSE]     → street address (e.g. "12 rue de l'Exemple")
[CODE_POSTAL] → 5-digit postal code
[VILLE]       → city (e.g. "Paris")
```

For the **English** legal page, use:
```
[LEGAL_NAME]  → same legal name
[SIRET]       → same SIRET
[ADDRESS]     → street address
[POSTAL_CODE] → postal code
[CITY]        → city
```

Also open `src/pages/confidentialite.astro` line 18 (the "responsable du traitement" paragraph)
and `src/pages/en/privacy.astro` line 18 to replace `[VILLE]` / `[CITY]` similarly.

Commit and push: Cloudflare auto-rebuilds on every push to `main`.

---

## Step 5 — Flip the launch state when the app goes live

In `src/i18n/ui.ts`, find:

```ts
export const LAUNCH_STATE: LaunchState = "coming-soon";
export const APP_STORE_URL: string | null = null;
```

Change to:

```ts
export const LAUNCH_STATE: LaunchState = "live";
export const APP_STORE_URL: string | null = "https://apps.apple.com/.../id..........";
```

Commit, push, auto-deploy. The App Store badge across the site now links to the live page.

---

## Step 6 — Verify (after every deploy)

After Cloudflare deploys, check:

| URL | Should |
|---|---|
| `https://retropal.fr/` | 200, FR landing |
| `https://retropal.fr/en` | 200, EN landing |
| `https://retropal.fr/confidentialite` | 200, Privacy FR |
| `https://retropal.fr/en/privacy` | 200, Privacy EN |
| `https://retropal.fr/conditions` | 200, Terms FR |
| `https://retropal.fr/en/terms` | 200, Terms EN |
| `https://retropal.fr/mentions-legales` | 200, Legal FR |
| `https://retropal.fr/en/legal` | 200, Legal EN |
| `https://retropal.fr/support` | 200, Support FR |
| `https://retropal.fr/en/support` | 200, Support EN |

Click the **language switch** in the header on any page: it should jump to the equivalent
page in the other locale, not back to home.

These four URLs go into **App Store Connect** later:

- Privacy Policy URL: `https://retropal.fr/confidentialite` (or `/en/privacy` for English store fronts)
- Support URL: `https://retropal.fr/support`
- Marketing URL: `https://retropal.fr`

---

## Notes & future improvements

- The favicon is a custom inline SVG at `public/favicon.svg`. Refresh hard if you don't see it.
- The OG image is currently the app icon (`public/og-image.png`). A designed 1200×630 social card is a v1.1 polish.
- The Apple App Store badge is a styled "Coming soon" pill until you flip `LAUNCH_STATE` to `"live"`. When live, you should also replace the simple pill with Apple's official SVG (download from <https://developer.apple.com/app-store/marketing/guidelines/>) for full brand compliance.
- No analytics installed (consistent with the "no tracking" brand stance). If you want anonymous metrics later, see TODO-1 in the parent project's `TODOS.md` (TelemetryDeck recommendation).

---

## Local development quick reference

```bash
cd ~/Projets/retropal-website
npm install          # one-time
npm run dev          # localhost:4321 with hot reload
npm run build        # production build to dist/
npm run preview      # preview the dist/ output
npm run check        # type-check all .astro files
```
