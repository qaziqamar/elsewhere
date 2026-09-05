# Theme Implementation Plan — Pastel Cute (from 3-screen ref)

> Skills installed project-level: `.opencode/skills/impeccable` + `.opencode/skills/design-taste-frontend` (also .agents/.claude). DESIGN.md updated with full tokens.

## Goal
Swap dark obsidian shell → light pastel cute system (lavender/sky/blush/mint/butter) with cartoon mascots and bouncy animations, keep PNG export + header/footer polish.

## Mapping current → pastel
| Area | Before (dark) | After (pastel) |
|------|---------------|----------------|
| bg | #080C18 + glass | #F2F3F8 app bg, white cards, tinted pastel borders (#E9E7F5) |
| header | dark sticky #080C18/70 | white/80 backdrop-blur + lavender badge, border #E9DEF8 |
| hero CTA | white + violet-cyan gradient | lavender #C9B6FF pill (ink text) + black arrow circle per card |
| ThreeBackground | dark gradient + violet glow | light pastel radial glows (lavender top, sky right, mint bottom) + subtle grid, mascots floating |
| AppInputList cards | dark #0F172A/60 + white/6 border | white + tinted pastel border (lavender/sky/blush per category) + soft shadow 0 8px 24px rgba(26,30,46,0.06) |
| AnalyticsCharts | dark glass | white cards, pastel tooltips, donut gap + pastel cell colors, bar sky, ratio lavender→mint, impact blush |
| ExportCard | dark gradient | white receipt + pastel header bar, dotted dividers, monospace ink |
| GuideModal | dark #0F172A | white + lavender header, pastel tip, centered flex (already fixed) |

## Steps (commit as one feat)
1. **Tokens** — update `src/index.css` + `tailwind.config.js` with new CSS vars, font (Nunito/Plus Jakarta rounded), radius 20, animations (float, blink, count-up)
2. **Layout** — `ThreeBackground` → light pastel glows; `App.tsx` header light + add proper footer with `@siddamar_ai` (built by curious vibe coder — professional: centered, small, X link)
3. **Components** — restyle `AppInputList`, `AnalyticsCharts`, `ExportCard` to white/pastel cards, add cute mascots component, update colors to DESIGN.md
4. **Motion** — add Framer staggered reveals, mascots float, chart draw, number counters, hover lift, per Taste/Impeccable (VARIANCE 7 MOTION 7 DENSITY 3)
5. **Verify** — `npm run build` + `git commit` feat(theme): pastel cute

## Mascots (new)
- `src/components/CuteMascot.tsx` — 3 SVG variants: StarSpike (blue, like middle screen waving), Wavy (pink, like blush card), CloudPuff (mint) — thick #1A1E2E stroke, dot eyes, blush.

## Footer spec
`Built with curiosity by a vibe coder — @siddamar_ai` — centered, 13px, muted #8A8EA6, X link `https://x.com/siddamar_ai`, top border #E9E7F5, 32px pad, subtle lavender dot.

## Skills usage
- Taste: brief inference “weekly tracker for 18-35, playful cute, pastel” → dials V7/M7/D3 already in DESIGN.md
- Impeccable: shape → craft → polish, detector `npx .opencode/skills/impeccable/scripts/bin/windows-x64/impeccable.exe detect src/` (or npx impeccable detect)
