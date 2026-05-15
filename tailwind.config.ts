import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "accent-1": "#FAFAFA",
        "accent-2": "#EAEAEA",
        "accent-7": "#333",
        success: "#0070f3",
        cyan: "#79FFE1",
        // Morandi + Watercolor Wash palette — monochromatic sage/teal
        morandi: {
          // Base surface & backgrounds
          canvas: "#F5F3F0",
          paper: "#EAE7E3",
          // Card surfaces
          card: "#F0EEEB",
          "card-hover": "#E8E5E1",
          "card-border": "#DCD8D3",
          // Text
          ink: "#3D3A38",
          "ink-light": "#7A7673",
          "ink-muted": "#A09D9A",
          // Accent — muted sage-teal (Morandi green)
          sage: "#8B9F93",
          "sage-deep": "#6B8276",
          "sage-light": "#B0C0B5",
          "sage-wash": "#C5D3CA",
          // Accent — muted warm
          clay: "#C2A896",
          "clay-light": "#D4C2B4",
        },
      },
      spacing: {
        28: "7rem",
      },
      letterSpacing: {
        tighter: "-.04em",
      },
      fontSize: {
        "5xl": "2.5rem",
        "6xl": "2.75rem",
        "7xl": "4.5rem",
        "8xl": "6.25rem",
      },
      boxShadow: {
        sm: "0 5px 10px rgba(0, 0, 0, 0.12)",
        md: "0 8px 30px rgba(0, 0, 0, 0.12)",
        // Layered card shadows for approachable luxury
        card: "0 1px 3px rgba(61, 58, 56, 0.06), 0 6px 20px rgba(61, 58, 56, 0.04)",
        "card-hover":
          "0 2px 6px rgba(61, 58, 56, 0.08), 0 12px 32px rgba(61, 58, 56, 0.06)",
        glass:
          "0 1px 2px rgba(255,255,255,0.3) inset, 0 4px 16px rgba(61,58,56,0.06)",
      },
      borderRadius: {
        gentle: "1rem",
        soft: "1.25rem",
      },
      fontFamily: {
        display: ["Inter", "sans-serif"],
        body: ["Inter", "sans-serif"],
        warm: [
          "Georgia",
          "Cambria",
          '"Times New Roman"',
          "Times",
          "serif",
        ],
      },
    },
  },
  plugins: [],
};
export default config;
