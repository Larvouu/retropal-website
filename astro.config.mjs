// @ts-check
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: "https://retropal.fr",
  trailingSlash: "never",
  build: {
    format: "file",
  },
  i18n: {
    defaultLocale: "fr",
    locales: ["fr", "en"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    tailwind({
      // We provide our own base styles in src/styles/global.css
      applyBaseStyles: false,
    }),
  ],
  vite: {
    server: {
      // Allow access via Cloudflare quick tunnels for remote preview
      // (Vite blocks unknown hosts by default for SSRF protection).
      allowedHosts: [".trycloudflare.com", ".pages.dev"],
    },
  },
});
