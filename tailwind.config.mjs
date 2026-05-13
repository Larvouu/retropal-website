// @ts-check
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        paper: "#DFF9FB",
        "paper-tint": "#C8EFF2",
        "paper-deep": "#B0E5EA",
        ink: "#1E1A3B",
        "ink-soft": "#4A4470",
        "ink-faint": "#7A748C",
        rule: "#9DBFC7",
        accent: "#7625C4",
        "accent-dk": "#51188A",
        "gb-green": "#9BBC0F",
        "gb-green-dk": "#0F380F",
        "alert-red": "#D9412B",
        "gold-pro": "#E8B842",
        "gold-pro-dk": "#966D14",
      },
      fontFamily: {
        display: ["VT323", "ui-monospace", "monospace"],
        body: ["Newsreader", "Georgia", "serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
      fontSize: {
        "display-hero": ["clamp(3.5rem, 8vw + 1rem, 7rem)", { lineHeight: "0.95" }],
        "display-h1": ["clamp(2.25rem, 4vw + 0.5rem, 3.5rem)", { lineHeight: "1" }],
        "display-h2": ["clamp(1.75rem, 2.5vw + 0.5rem, 2.5rem)", { lineHeight: "1.05" }],
        lead: ["1.375rem", { lineHeight: "1.55" }],
      },
      letterSpacing: {
        ultra: "0.2em",
      },
      maxWidth: {
        prose: "68ch",
        page: "76rem",
      },
    },
  },
  plugins: [],
};
