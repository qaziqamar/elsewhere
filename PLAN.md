# Plan — Weekly Screen Time / Doomscroll Tracker

> Source spec: `idea.md:1` — React + TypeScript premium dashboard with PNG export.
> Design skills locked: `Impeccable` (23 commands, detector) + `Taste Skill` `design-taste-frontend v2`.
> Saved: 2026-09-05 — resumable after shutdown via git commits + this file.

## 0) How this will work — System Overview

**Goal:** Help user input weekly hours/minutes per app, visualize breakdown, surface "time wasted" impact, and download a PNG of the result for future reference.

**Flow:**
1. Land on `Dashboard` — punchy hero ("How much of your life did you scroll away this week?") + CTA + `GuideModal` trigger.
2. User edits time in `AppInputList` — 9 defaults (YouTube, Netflix, X, LinkedIn, Meta, Telegram, WhatsApp, Instagram, Snapchat) pre-populated as `AppEntry[]`, sliders/number inputs sync to central state, `Add Custom App` appends new entry with validation.
3. `AnalyticsCharts` reacts live — donut (share per app), bar (comparison), "Productive vs Doomscrolling" ratio meter (arc gauge), totals and trend.
4. `ImpactMetric` translates `totalMins` into relatable equivalents (books ≈ 5h/book, language ≈ 60h basic, sleep, workout, etc.).
5. `Export PNG` captures the result card/dashboard via `html-to-image` (or `html2canvas`) → `screen-time-week-YYYY-MM-DD.png` download.
6. `ThreeBackground` renders subtle low-poly particle/mesh field behind content, mouse-parallax at 0.2 intensity, capped at 30fps on mobile, respects `prefers-reduced-motion`.

**State & Persistence:**
```ts
type AppCategory = 'doomscroll' | 'productive' | 'neutral';
type AppEntry = { id: string; name: string; hours: number; minutes: number; category: AppCategory; color: string; icon: string };
```
- Defaults mapped to categories: `productive: LinkedIn`; `doomscroll: YouTube, X, Meta, Instagram, Snapchat, Netflix, Telegram, WhatsApp` (neutral fallback for custom → user-selectable toggle).
- Central state in `src/store/useScreenTimeStore.ts` (Zustand or Context + useReducer) — `apps`, `totalMins`, `doomMins`, `prodMins`, derived selectors.
- Persist to `localStorage` key `screentime:v1` — hydrate on mount, debounce 300ms.
- Validation: `0 <= hours <= 168`, `0 <= minutes <= 59`, clamped; name non-empty, unique.

**Tech Stack (strict):**
- React 18 + TypeScript `strict` + Vite
- Tailwind CSS v4 (`@tailwindcss/postcss`) + CSS variables for tokens + custom CSS for grain/glow
- Framer Motion for page transitions, staggered list, card hover, number counters
- Three.js + `@react-three/fiber` + `@react-three/drei` for `ThreeBackground` (fallback to CSS gradient if WebGL missing)
- Recharts (preferred for React composability) — Donut, Bar, Radial meter
- `html-to-image` for PNG export (lighter, SVG foreignObject, avoids html2canvas CORS issues) — fallback to `html2canvas` if needed
- `lucide-react` or `phosphor` icons (Taste bans emojis), `Google Fonts: Plus Jakarta Sans + JetBrains Mono` (avoid Inter per Taste/Impeccable anti-pattern)

**Design System (dark-mode-first):**
- Background: `obsidian #0A0F1C / slate-900`, surface `slate-800/50` glass
- Accents: electric violet `oklch(0.65 0.25 290)`, neon cyan `oklch(0.85 0.15 200)`, sunset orange `oklch(0.7 0.2 40)` for warnings
- Typography: `Plus Jakarta Sans` display 700-800, body 400-500, mono for stats — `clamp()` fluid scale
- Motion: one orchestrated load (stagger 40ms), spring `0.45s ease-out`, `prefers-reduced-motion` respected — matches Taste `VARIANCE 7 / MOTION 6 / DENSITY 4` for dashboard (balanced, not gallery-airy nor cockpit-dense)
- Tokens defined in `src/styles/tokens.css` as CSS variables, consumed by Tailwind — Impeccable `DESIGN.md` will document them.

**Design Skills Integration:**
- Run `npx impeccable install` → `/impeccable teach` (or `/impeccable init`) to generate `PRODUCT.md` + `DESIGN.md` (Google Stitch format) — brief: "SRE-style calm but provocative copy, dark slate base, violet/cyan/orange warnings, no purple gradients, no nested cards, no Inter".
- Run `npx skills add https://github.com/Leonxlnx/taste-skill --skill "design-taste-frontend"` → Taste v2 reads brief, outputs Design Read line, enforces 3 dials and anti-slop bans.
- Workflow per feature: `shape` → `craft` → `audit` → `polish` → `live` for variant iteration. Detector runs in hooks/CI (`npx impeccable detect src/`).

**Components (from spec + needed):**
```
src/
  components/
    Dashboard.tsx          # orchestration, layout, PNG export target ref
    AppInputList.tsx       # list + sliders/inputs + Add Custom App
    AppRow.tsx             # single app row (icon, name, slider, inputs, category toggle, delete)
    AnalyticsCharts.tsx    # wrapper for 3 charts
    ChartDonut.tsx
    ChartBar.tsx
    RatioMeter.tsx         # productive vs doomscroll arc
    ImpactMetric.tsx       # "You could have read 3 books"
    GuideModal.tsx         # iOS/Android steps, Framer dialog
    ThreeBackground.tsx    # canvas fixed behind
    ExportCard.tsx         # isolated exportable result card (for PNG)
    ui/ Button, Card, Slider, Input, Modal, Badge
  store/useScreenTimeStore.ts
  hooks/useMediaQuery.ts, useLocalStorage.ts
  lib/exportPng.ts         # html-to-image wrapper
  lib/impact.ts            # hours -> equivalents
  styles/tokens.css
  App.tsx, main.tsx
```

**Responsive & A11y:**
- Mobile-first: single column <768, two-col dashboard >=1024, charts stack then 2-col grid
- Keyboard focus visible, `aria-label` on sliders, `role=dialog` on modal, contrast AA (cyan on slate tested)
- Perf: Three.js capped DPR 1.5, `frameloop="demand"` with mouse, Recharts `ResponsiveContainer`

**PNG Export Detail (user req: "danwload the png of reasult"):**
- Target `ref` is `ExportCard` (summary + donut + impact) — user clicks "Download PNG" → `toPng(node, { cacheBust: true, pixelRatio: 2, backgroundColor: '#0A0F1C' })` → anchor download.
- Filename: `screen-time-${ISOWeek}.png`
- Error handling: toast if export fails, fallback message.

## 1) Commit / Phase Plan — Anti-Bloat & Resumable

Each commit is isolated, small context, can resume after shutdown via `git log --oneline` + `PLAN.md`.

### COMMIT A — Scaffold & Design Foundation
**Branch:** `main` (or `feat/scaffold`)
**Scope:**
- `npm create vite@latest -- --template react-ts`
- Install: `tailwindcss @tailwindcss/postcss`, `framer-motion`, `three @react-three/fiber @react-three/drei`, `recharts`, `html-to-image`, `zustand`, `lucide-react`
- Configure `tailwind.config.ts`, `postcss.config.js`, `tsconfig.json strict`, `src/styles/tokens.css`
- Create `DESIGN.md` + `PRODUCT.md` via skills (`/impeccable init` + Taste Design Read)
- Add `ThreeBackground.tsx` stub + `App.tsx` shell + layout grid
**Exit:** `npm run dev` renders dark premium shell with ThreeBackground behind, no data yet.
**Files:** `package.json`, `vite.config.ts`, `src/styles/*`, `DESIGN.md`, `PRODUCT.md`, `src/components/ThreeBackground.tsx`

### COMMIT B — State & Input List
**Scope:**
- `store/useScreenTimeStore.ts` + `lib/impact.ts` + hooks
- `AppInputList.tsx` + `AppRow.tsx` + Slider/Input UI + `Add Custom App` modal
- 9 defaults seeded, hours/minutes inputs (slider 0-24h + number 0-59m), category toggle, delete for custom, localStorage persist
- Punchy copy hero + number counter micro-interaction (Framer)
**Exit:** User can input times, add/remove custom apps, totals update live, persists reload.
**Files:** `src/store/*`, `src/components/App*`, `src/components/ui/*`

### COMMIT C — Visualizations & Dashboard
**Scope:**
- `AnalyticsCharts.tsx` + `ChartDonut.tsx` + `ChartBar.tsx` + `RatioMeter.tsx`
- `ImpactMetric.tsx` (books/language/sleep equivalents, glowing border on warning threshold >20h doomscroll)
- `Dashboard.tsx` orchestration, stitches B + C, responsive grid, staggered reveals
- `GuideModal.tsx` (iOS: Settings>Screen Time, Android: Settings>Digital Wellbeing)
**Exit:** Full dashboard live with interactive charts reacting to inputs, modal opens/closes, mobile looks native.
**Files:** `src/components/Analytics*`, `Chart*`, `RatioMeter.tsx`, `ImpactMetric.tsx`, `GuideModal.tsx`, `Dashboard.tsx`

### COMMIT D — Export, Polish & Ship
**Scope:**
- `ExportCard.tsx` + `lib/exportPng.ts` + "Download PNG" button with loading/toast
- ThreeBackground mouse polish, motion guardrails (`prefers-reduced-motion`), a11y audit, perf caps
- Run `/impeccable audit` + `/impeccable polish` + Taste pre-flight, `npx impeccable detect src/`, fix slop (no Inter, no purple gradient, no nested cards, no bounce easing)
- README + deploy hint (Vercel/Netlify)
**Exit:** User can download PNG of result, Lighthouse a11y/perf pass, polished premium feel, ready to ship.
**Files:** `src/components/ExportCard.tsx`, `lib/exportPng.ts`, polish diffs, `README.md`

**Resume Protocol (if shutdown):**
1. `git log --oneline -10` → see last COMMIT letter completed
2. Open `PLAN.md` → find next COMMIT scope
3. `git status` → continue from that COMMIT's file list — each commit is self-contained, no need to reload prior context.

## 2) Risks & Mitigations
- Three.js perf on mobile → DPR cap, demand frameloop, CSS fallback
- PNG export CORS/clipping → `html-to-image` with inline styles, test on Chrome/Safari, fallback toast
- Recharts hydration on SSR (if any) → `ResponsiveContainer` width 100%, no SSR
- Taste vs Impeccable token drift → single `tokens.css` source, both skills read `DESIGN.md`

## 3) Verification Checklist (before mark done)
- [ ] `npm run build` passes, `tsc --noEmit` strict
- [ ] Charts render with 0, 1, many apps
- [ ] Custom app add/delete + validation
- [ ] PNG downloads at 2x, background correct
- [ ] Modal keyboard + focus trap
- [ ] Mobile (375), tablet (768), desktop (1280) screenshots
- [ ] `npx impeccable detect src/` → 0 findings
- [ ] `prefers-reduced-motion` disables Three/motion

---
Next: init git + commit this plan as COMMIT 0 per split strategy.
