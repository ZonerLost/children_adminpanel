/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          purple: "#A855F7",
          purpleSoft: "#C4A0FF",
          accent: "#FF7A3C",
        },
        surface: {
          dark: "#190928", // ⬅️ updated
          darkElevated: "#170634", // you can tweak later if you want
          light: "#FFFFFF",
          lightMuted: "#F5F5FA",
        },
      },
      borderRadius: {
        pill: "999px",
      },
    },
  },
  plugins: [],
};
