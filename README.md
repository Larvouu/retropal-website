# retropal-website

Marketing site for [Retro Pal](https://retropal.fr), a GBA / Game Boy / GBC / Nintendo DS emulator for iPhone.

## Stack

- Astro 5 (static site generator)
- Tailwind CSS 4
- Self-hosted fonts (VT323, Newsreader, JetBrains Mono via @fontsource)
- Deployed via Cloudflare Pages

## Local development

```bash
npm install
npm run dev          # localhost:4321
npm run build        # outputs to dist/
npm run preview      # preview production build
```

## i18n

- French at root (`/`)
- English at `/en/*`

Locale routing is configured in `astro.config.mjs` with `prefixDefaultLocale: false`.

## Design

Editorial-retro aesthetic. Cream paper background, Game Boy LCD green accent, VT323 display font paired with Newsreader serif body. Inspired by early-2000s gaming magazines, executed with modern web craftsmanship.

Design tokens live in `src/styles/global.css` as CSS variables.

## Pages

- `/` Landing
- `/support` Support + FAQ
- `/confidentialite` Privacy Policy (FR) / `/en/privacy` (EN)
- `/conditions` Terms of Service (FR) / `/en/terms` (EN)
- `/mentions-legales` Legal mentions, required by French LCEN (FR) / `/en/legal` (EN)

## Deploy

Auto-deploys to Cloudflare Pages on push to `main`. Custom domain bound: `retropal.fr` + `www.retropal.fr`.
