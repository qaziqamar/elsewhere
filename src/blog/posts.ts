export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  read: string;
  tag: string;
  content: string;
}

export const posts: Post[] = [
  {
    slug: "time-is-not-lost-found",
    title: "Time is not lost, it is spent",
    excerpt: "Two hours a day is 30 days a year. See the math that makes scroll time visible.",
    date: "2026-09-01",
    read: "4 min",
    tag: "Time",
    content: `
Every hour you scroll is an hour you chose. Not stolen, spent.

If you scroll 2 hours daily, that is 14 hours a week. In a month, 60 hours. In a year, 730 hours - that is 30 full days awake.

This is not guilt. It is accounting. Track a week honestly, then decide what one hour reclaimed daily buys you: a book a week, 3 workouts, 8 extra nights of sleep a month.

Small reclaims compound. Start with one app, 30 minutes less. The PNG is your receipt - dated today, yours to keep. We do not save your data; you do.
`,
  },
  {
    slug: "the-passive-trap",
    title: "The passive trap: why we open without reason",
    excerpt: "Boredom, stress, and infinite scroll form a loop. Break it with one pause.",
    date: "2026-08-24",
    read: "3 min",
    tag: "Focus",
    content: `
You open to check one thing and surface 20 minutes later. That is not willpower failing. It is a loop: trigger -> swipe -> tiny reward -> again.

The fix is not blocking everything. It is adding a pause. Before you enter a feed, ask: what am I here for? If you cannot answer in 5 seconds, close it and do the hard thing for 2 minutes.

Use the tracker to find your vulnerable hours. Most people scroll hardest 9pm to midnight and right after waking. Plug those windows first.
`,
  },
  {
    slug: "how-to-read-screen-time-right",
    title: "How to read Screen Time right",
    excerpt: "Settings > Screen Time > See All Activity > Week. Weekly, not daily, tells the truth.",
    date: "2026-08-18",
    read: "3 min",
    tag: "Guide",
    content: `
Daily view lies. One good day hides a bad week.

On iOS: Settings > Screen Time > See All Activity > Week. Tap an app name for weekly total.
On Android: Settings > Digital Wellbeing > chart > Weekly view.

Write down the weekly total per app, not the daily average. Include YouTube, Instagram, X, TikTok - the apps that auto-play next. Exclude maps, calls, music if you want the honest doomscroll number.

Paste honest numbers. The impact metric will translate them to books, workouts, and nights so it lands.
`,
  },
  {
    slug: "small-wins-compound",
    title: "Small wins compound",
    excerpt: "30 minutes reclaimed daily is 182 hours a year. That is a skill.",
    date: "2026-08-10",
    read: "4 min",
    tag: "Time",
    content: `
You do not need to delete everything. Reclaim 30 minutes a day.

30 minutes x 7 = 3.5 hours a week. Over a year, 182 hours. That is a language beginner course, or 36 books, or 180 workouts.

Pick the app with the biggest bar in your chart. Cap it 30 minutes lower next week. Replace that slot with one thing you avoid - walk, read, build. Mark the streak on your PNG exports; each dated image is a week you kept.

Free, local, no account. Your phone, your hours, your call.
`,
  },
];
