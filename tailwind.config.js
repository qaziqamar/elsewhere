/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Plus Jakarta Sans", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      colors: {
        obsidian: "#0A0F1C",
        slate: { 900: "#0F172A", 800: "#1E293B", 700: "#334155" },
        violet: "#8B5CF6",
        cyan: "#06B6D4",
        orange: "#F97316",
      },
      boxShadow: {
        glow: "0 0 40px rgba(139,92,246,0.15)",
        "glow-cyan": "0 0 30px rgba(6,182,214,0.15)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-10px)" } },
      },
    },
  },
  plugins: [],
}
