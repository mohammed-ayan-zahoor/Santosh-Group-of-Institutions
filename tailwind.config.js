/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        page: "#FFFFFF",
        cream: "#FFFFFF",
        tint: "#EFF4F8",
        taupe: "#DAE3EA",
        charcoal: "#14283D",
        navy: "#14283D",
        muted: "#6C7783",
        forest: "#14283D",
        gold: "#14283D",
        terracotta: "#14283D",
        maroon: "#80182A",
      },
      fontFamily: {
        serif: ["var(--font-inter)", "Inter", "-apple-system", "sans-serif"],
        sans: ["var(--font-inter)", "Inter", "-apple-system", "sans-serif"],
      },
      boxShadow: {
        none: "none",
      },
      borderRadius: {
        button: "8px",
        card: "4px",
      },
      maxWidth: {
        "7xl": "92rem", // 1472px - expanded from 1280px for widescreen layout
        "8xl": "96rem",
      },
    },
  },
  plugins: [],
};
