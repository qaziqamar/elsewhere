# Elsewhere — Reclaim Your Hours

Your week wasn't lived. It was scrolled.

**ELI5:** You know how you pick up your phone "for one minute" and suddenly an hour is gone? Elsewhere is an honest mirror for that. You type in how many hours you spent in each app this week (just copy the numbers from your phone's Screen Time screen), and it shows you what those hours actually cost: books you could have read, workouts you skipped, sleep you traded away. Then you download a dated PNG as your receipt and keep yourself honest next week. No signup, no account, no server watching you. Your numbers never leave your browser.

## Why should you care

- **Hours are invisible until you see them.** "7 hours on YouTube" means nothing. "That's a full book cover to cover" stings in the right way.
- **Doomscroll vs. productive, side by side.** Tag each app, then watch the donut chart tell the truth about your ratio.
- **No creepy trade.** Most trackers want your login, your data, your soul. This one stores everything in your own browser (localStorage) and exports a PNG you own.
- **Takes 2 minutes.** Paste numbers, glance at the charts, download the PNG, done. Come back next week and compare.

## Project map

```
Elsewhere/
├── index.html               # tab title, fonts, /logo.png favicon
├── public/
│   ├── logo.png             # cropped brand mark (tab + header)
│   ├── hero-mascot.png/.webp# hero character art
│   └── favicon.svg          # legacy icon (superseded by logo.png)
├── src/
│   ├── main.tsx             # React entry
│   ├── App.tsx              # router, header, footer, page transitions
│   ├── index.css            # Tailwind + fonts + global styles
│   ├── pages/
│   │   ├── Home.tsx         # hero + about + blog + tracker on one scroll page
│   │   ├── Tracker.tsx      # the actual tracker screen
│   │   ├── About.tsx        # "simple mirror for your week"
│   │   ├── Blog.tsx         # short reads on time and focus
│   │   └── BlogPost.tsx     # single post view
│   ├── components/
│   │   ├── Hero3D.tsx           # hero mascot display
│   │   ├── ThreeBackground.tsx  # ambient background
│   │   ├── AppInputList.tsx     # per-app hours/minutes + category tags
│   │   ├── AnalyticsCharts.tsx  # donut, bars, ratio, impact cards
│   │   ├── ExportCard.tsx       # dated report card (this is what the PNG captures)
│   │   └── GuideModal.tsx       # "where do I find my numbers?" helper
│   ├── store/
│   │   └── useScreenTimeStore.ts# apps + times, persisted to localStorage (key: screentime:v1)
│   ├── lib/
│   │   ├── appData.ts       # default app list, categories, time helpers
│   │   ├── impact.ts        # minutes → books / workouts / nights / movies
│   │   └── exportPng.ts     # DOM → dated PNG download
│   ├── blog/
│   │   └── posts.ts         # local posts, no CMS
│   └── hooks/
│       └── useReducedMotion.ts  # respects prefers-reduced-motion
├── tailwind.config.js
├── vite.config.ts
└── package.json
```

**How the pieces fit:** `AppInputList` collects the numbers → `useScreenTimeStore` holds them (browser only) → `AnalyticsCharts` visualizes them → `impact.ts` translates them into real-life costs → `ExportCard` + `exportPng.ts` turns them into a dated PNG you keep.

**Routes:** `/` (everything on one scrolling page), `/about`, `/blog`, `/blog/:slug`, `/tracker`. The header and footer buttons scroll to sections when you're home, or take you home first and then scroll.

## Setup locally

**You need:** Node.js 18+ and npm.

```bash
# 1. install
npm install

# 2. run it
npm run dev
# open the URL it prints (usually http://localhost:5173)

# 3. check it builds clean (what Vercel will do)
npm run build

# 4. preview the production build (optional)
npm run preview

# 5. lint (optional)
npm run lint
```

**Tech:** React 19 + TypeScript + Vite 8, Tailwind CSS 3, Framer Motion (transitions), Recharts (charts), Zustand (store, persisted locally), html-to-image (PNG export), lucide-react (icons).

**Deploy:** push to GitHub and import into Vercel as a Vite project. Build command is `npm run build`, output is `dist/`. No env vars, no backend, nothing to configure.
