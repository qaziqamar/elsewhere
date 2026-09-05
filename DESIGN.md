# DESIGN — Scrolless (Google Stitch spec) — Cute Cartoon Pastel Theme (from ref 2026-09-05)

> Source ref: 3-screen pastel phone UI (Control Your Scroll, Daily check-in, Set Anti-Doom). Locked for all future commits. Combines reference palette + our dark premium shell via soft cute overlay.

## Tokens — Pastel Cute Palette (extracted from image)
- Base neutrals: app bg `#F2F3F8` (cool off-white), card `#FFFFFF`, border `#E9E7F5` / `#E6ECF5`, text `#1A1E2E` (soft ink), muted `#8A8EA6`, sub `#C4C7D8`
- Primary pastel system (no pure neon):
  - Lavender (hero, activate): `#D9CFFD` / `#C9B6FF` (lavender-300/400) — used for header, primary CTA, wavy mascot bg
  - Sky (goal, app monitoring): `#BFE6F7` / `#A6D8F0` — calm focus, daily check-in
  - Blush (anti-doom): `#FFD7DE` / `#FFB6C5` — warm nudge, timers
  - Mint (night streak, success): `#D6F0E6` / `#B8E8D8` — overnight block, detox
  - Butter (chart accent): `#FFF1B8` / `#FFE9A8` — secondary highlight, graph fill
  - Peach (warning soft): `#FFDCC6` — gentle caution, not orange alarm
- Accents for CTAs (dark on pastel for AA):
  - Ink pill button: `#111827` (near-black) on lavender/blush — ensures 8:1 contrast
  - Cyan ink: `#0F172A` text on sky
- Dark mode fallback (when user prefers dark): map pastels to desaturated surfaces — bg `#080C18`, card `rgba(255,255,255,0.04)` + 1px `rgba(201,182,255,0.15)` pastel border, text `#E2E8F0` — keep pastel glows as outer blur, not flat fill
- Radius: 20px outer phone, 16px cards, 14px chips, 999 pill buttons — extra round = cute
- Spacing: 4,8,12,16,20,24 scale; card padding 16-20, generous airy density (Taste DENSITY 3)
- Font: Round geometric sans — `Plus Jakarta Sans 600/700/800` for headings (keep), or `Nunito / Baloo 2` rounded alternative for extra cute; `JetBrains Mono 600` for timers (5 min, 1h13); body 14-15px, line 140%

## Color Usage Rules (from ref)
- One pastel per card — never two strong pastels in same card; lavender hero, sky action, blush timer, mint streak. Keeps scannable, avoids rainbow slop.
- Dark pill CTA (`→` arrow) on every pastel card for consistent affordance — 36px black circle with white arrow
- Soft illustration tint matches card pastel (lavender mascot on lavender, pink monster on blush) — monochrome cute, not multicolor chaos
- Borders are tinted pastel (lavender card → #E9DEF8 border, sky → #C8E6F2) not gray — feels crafted
- Chart: mint/blush gradient fill under line, gridlines `#EEF0F7`, axis `#8A8EA6` — airy, not harsh

## Components — Cute Cartoon System
- Card: white bg + 1px tinted pastel border + 16px radius + subtle shadow `0 8px 24px rgba(26,30,46,0.06)` + hover lift 2px + soft pastel inner glow — no glass, no nested cards
- Button primary: full-width pill `Activate` — lavender `#C9B6FF` bg + `#111827` text + 999 radius, hover `#B8A6F0`, active press scale 0.98 — also ink circle arrow variant for card actions
- Chip/Stat: 2-col `Usage 5 min / Block 5 min` — rounded 14px, pastel outline (lavender vs sky) + black dot icon, small monospaced value
- Slider/Progress: dotted track `| | |` with filled lavender pill + blue dot handle — playful, not technical
- Modal: white + pastel header, same radius 20, centered flex (already fixed), slide-up spring
- Mascot: 3 cute monsters — spiky blue star (main), pink wavy eye (anti-doom), cloud puff (overnight) — bubbly outline, dot eyes, blush cheeks, thick 2px stroke `#1A1E2E`

## Motion — Cool Cute Animation (to attract)
- Load: stagger 60ms, spring `damping 18 / stiffness 280` — bouncy but not elastic, cute pop
- Mascot: gentle float 3s ease-in-out, eye blink 4s, wavy bounce on hover — prefers-reduced-motion → still
- Card: hover lift `y:-4px + shadow` 0.25s, arrow rotate 12deg on hover
- Progress/Chart: line draw 1.2s ease-out, fill fade 0.6s, number count-up 0.8s spring
- Interaction: pill button scale 0.97 on press, dot pulse 1.5s for active timers
- All motion transform+opacity only, 200-450ms, no bounce/elastic extremes

## Illustration — Cartoon Cute Direction
- Style: thick rounded outline, flat pastel fills, minimal detail, kawaii eyes (2 dots + highlight), tiny blush, stub limbs — like ref monsters; keep geometric, avoid detailed gradients
- Palette locked to tokens above — mascot uses card pastel + ink outline only
- Placement: hero top-right absolute (like lavender monster waving), empty states, success, onboarding — one mascot per major section, 80-120px
- No photoreal, no 3D, no AI purple mesh — handmade cute

## Layout
- Max-w 1280, phone preview 390px cards on desktop side-by-side, 24px gutters, centered header/footer (already planned), mobile single column with pill CTAs full-width
- Density airy (Taste DENSITY 3) — generous whitespace, not cockpit

## Rules (Impeccable + Taste — carry forward)
- Keep Plus Jakarta / Nunito rounded — never Inter/Roboto default
- No gray on pastel, no pure black/white flat, no cards-in-cards, no 3-equal-card rows, no bounce/elastic
- One pastel system per view, one radius system (20/16/999), one motion system above
- Taste dials for this theme: VARIANCE 7 / MOTION 7 / DENSITY 3 (playful but airy)
