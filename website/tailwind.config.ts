import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: "#F7F1E3",
          dark: "#EDE4D0",
          soft: "#FEFCF5",
        },
        forest: {
          DEFAULT: "#1B4D3E",
          deep: "#0F3328",
          light: "#2F5D3A",
        },
        gold: {
          DEFAULT: "#C9A227",
          deep: "#A6851A",
        },
        ink: {
          DEFAULT: "#2C2416",
          muted: "#5C5346",
        },
        chili: "#8B1E1E",
        garam: "#5C3A1E",
        allinone: "#B8860B",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        devanagari: ["var(--font-devanagari)", "Noto Sans Devanagari", "sans-serif"],
      },
      maxWidth: {
        site: "72rem",
      },
      boxShadow: {
        pouch: "0 20px 50px -20px rgba(15, 51, 40, 0.35)",
        soft: "0 10px 40px -15px rgba(44, 36, 22, 0.15)",
      },
    },
  },
  plugins: [],
} satisfies Config;
