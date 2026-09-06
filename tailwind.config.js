/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Nunito","Plus Jakarta Sans","system-ui","sans-serif"],
        display: ["Plus Jakarta Sans","Nunito","system-ui","sans-serif"],
        mono: ["JetBrains Mono","monospace"],
      },
      colors: {
        ink: "#111827",
        lavender: "#C9B6FF",
        "lavender-light": "#D9CFFD",
        sky: "#A6D8F0",
        blush: "#FFB6C5",
        mint: "#B8E8D8",
        butter: "#FFE9A8",
      },
      borderRadius: { '2xl': '16px', '3xl': '20px' },
      boxShadow: {
        cute: "0 8px 24px rgba(26,30,46,0.06)",
        "cute-hover": "0 12px 32px rgba(26,30,46,0.09)",
        glow: "0 0 40px rgba(201,182,255,0.25)",
      },
      animation: { float: "float 3s ease-in-out infinite", pop: "pop 0.5s ease-out" },
      keyframes: {
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-8px)" } },
        pop: { "0%": { transform: "scale(0.96)", opacity: "0" }, "100%": { transform: "scale(1)", opacity: "1" } },
      },
    },
  },
  plugins: [],
}
