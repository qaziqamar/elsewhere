# DESIGN — Scrolless (Google Stitch spec)

## Tokens
- bg: #080C18 (obsidian), surface: rgba(30,41,59,0.6) glass, border: rgba(255,255,255,0.08)
- primary: oklch(0.65 0.24 290) violet #8B5CF6, secondary oklch(0.82 0.14 200) cyan #06B6D4, warning oklch(0.70 0.19 40) orange #F97316, doom: violet->orange gradient, productive: cyan->emerald
- text: #E2E8F0, muted: #94A3B8, on-dark pure white avoided (use #F1F5F9)
- radius: 16px cards, 12px inputs, 999 pill
- spacing: 4,8,12,16,24,32 scale
- font: Plus Jakarta Sans 400/600/700/800 display, JetBrains Mono 400/600 for numbers

## Components
- Button primary: violet solid, shadow glow, hover scale 1.02, focus ring cyan
- Card: glass + border + backdrop-blur 16, hover glow, no nested cards
- Input/Range: dark surface, white thumb with violet halo, focus cyan ring
- Chart: donut with gap, bar with rounded top, radial meter 180deg, tooltip dark glass
- Modal: centered, backdrop blur, slide-up spring

## Motion
- Page load stagger 40ms, spring 0.45 ease-out, hover scale 1.02, no bounce/elastic, transform+opacity only, reduced-motion respected.
- ThreeBackground: particle field 120 points, lerp mouse 0.02, frameloop demand, DPR 1.5 max, disabled if WebGL fail.

## Layout
- Max-w 1280, 24px gutters, hero left-aligned split (text 55% / visual 45% on desktop), no centered hero, asymmetric, generous whitespace OR controlled density DENSITY 4.
- Mobile: single column, sticky export CTA, bottom sheet for Guide.

## Rules (Impeccable + Taste)
- No Inter/Roboto default, no gray on colored bg, no pure black/white, no cards-in-cards, no identical card grids, no bounce, no AI beige.
- One accent system per page (violet dominant, cyan secondary, orange warning), one radius system.
