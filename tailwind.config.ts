import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#1E251F",
        moss: "#15803D",
        forest: "#2D5A27",
        olive: "#3B592D",
        leaf: "#7CA832",
        gold: "#E8A324",
        cream: "#FAF8F5",
        sand: "#F5F2EB",
        surface: "#FCFBF9",
        line: "#E2E8DF",
        mint: "#0D9488",
        cloud: "#ffffff",
        ice: "#F0F4EF",
      },
      fontFamily: {
        sans: ["var(--font-manrope)", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
