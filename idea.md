# Role and Objective
You are an elite Frontend Architect and UI/UX Designer. Build a fully responsive, highly polished web application using **TypeScript** and **React.js** designed to help users track, visualize, and reflect on their weekly screen time—specifically highlighting time wasted on doomscrolling and unproductive platforms. 

The application must look exceptionally premium, modern, and high-converting (avoiding any generic "vibe-coded" look) with smooth micro-interactions, attractive typography, punchy copywriting, and delightful animations.

---

# Core Features & Functionality

## 1. Onboarding & Interactive Dashboard
* **Punchy Copywriting:** Use engaging, slightly provocative language (e.g., *"How much of your life did you scroll away this week?"*, *"Reclaim your hours from the digital abyss"*).
* **Phone Tracking Guide Modal/Banner:** Include an easy-to-read, quick-reference guide instructing users how to check their weekly screen time on iOS (Settings > Screen Time) and Android (Settings > Digital Wellbeing).

## 2. Dynamic Time Input & Custom Apps
* **Pre-populated Popular Platforms:** Default entries for YouTube, Netflix, X (Twitter), LinkedIn, Meta (Facebook), Telegram, WhatsApp, Instagram, and Snapchat.
* **Manual Entry:** Users can input hours/minutes spent per week on each platform using sleek sliders or number inputs.
* **Custom App Addition:** An "Add Custom App" button allowing users to input any other app/website name and its corresponding time.

## 3. Visualizations & Analytics
* **Interactive Charts:** Display data using libraries like Chart.js or Recharts (e.g., a breakdown donut/pie chart, bar comparison, and a "Productive vs. Doomscrolling" ratio meter).
* **The "Time Wasted" Impact Metric:** Automatically calculate and translate hours lost into relatable real-world equivalents (e.g., *"You could have read 3 books or learned a new language with this time!"*).

---

# Tech Stack & Requirements

* **Framework:** React.js (with functional components and hooks) typed strictly with TypeScript.
* **Styling:** Tailwind CSS for layout, combined with custom CSS for advanced styling.
* **Animations:** * Framer Motion (or smooth CSS transitions) for layout animations, page transitions, card hover effects, and staggered list reveals.
    * **Three.js:** Implement a subtle, high-performance 3D background or interactive canvas element (e.g., a floating abstract particle field or geometric mesh that reacts slightly to mouse movement) to elevate the visual aesthetic without hurting performance.
* **Responsiveness:** Mobile-first approach. Must look and feel like a native app on smartphones while scaling gracefully into a gorgeous dashboard on laptops and tablets.

---

# Design System Guidelines (Creative Freedom Allowed)
* **Color Palette:** Dark-mode-first aesthetic preferred for a modern, sleek tech vibe (deep slates/obsidian backgrounds paired with vibrant accent gradients like electric violet, neon cyan, or sunset orange to flag "warning/doomscrolling" metrics).
* **Typography:** Clean, geometric sans-serif (e.g., Inter or Plus Jakarta Sans via Google Fonts) with high contrast and bold weights for headers.
* **Micro-interactions:** Satisfying hover states, scale-ups on clickable cards, glowing borders, and smooth number-increment counters when data updates.

Deliver clean, modular, and well-commented TypeScript code split logically into components (`Dashboard`, `AppInputList`, `AnalyticsCharts`, `ThreeBackground`, `GuideModal`).