import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from "framer-motion";
import { ArrowRight, Clock3, BookOpen, Timer, Sparkles } from "lucide-react";
import { posts } from "../blog/posts";
import Tracker from "./Tracker";
import Hero3D from "../components/Hero3D";
import { useRef, useEffect, useCallback, useState } from "react";
import { toCanvas } from "html-to-image";
import { useReducedMotion } from "../hooks/useReducedMotion";

type Particle = { ox: number; oy: number; r: number; g: number; b: number; a: number; vx: number; vy: number; sz: number };

export default function Home() {
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  const heroRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const reduced = useReducedMotion();
  const [ready, setReady] = useState(false);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 82, damping: 24, mass: 0.34 });
  // whole hero: parallax + dissolve together as requested
  const heroOpacity = useTransform(smooth, [0, 0.32, 0.78], [1, 1, 0]);
  const overlayOpacity = useTransform(smooth, [0, 0.08, 0.48], [0, 1, 1]);
  const heroY = useTransform(smooth, [0, 1], [0, -42]);
  const heroScale = useTransform(smooth, [0, 1], [1, 0.965]);
  const heroRotate = useTransform(smooth, [0, 1], [0, 0.5]);

  const build = useCallback(async () => {
    if (reduced || !heroRef.current || !overlayRef.current) return;
    const node = heroRef.current;
    let w = 0, h = 0, data: Uint8ClampedArray | null = null;
    try {
      const snap = await toCanvas(node, {
        pixelRatio: Math.min(1, window.devicePixelRatio || 1),
        backgroundColor: "#F2F3F8",
        cacheBust: true,
        filter: (n: any) => !(n instanceof HTMLElement && n.dataset.pixelOverlay === "true"),
      } as any);
      w = snap.width; h = snap.height;
      const ctx = snap.getContext("2d", { willReadFrequently: true });
      if (ctx) data = ctx.getImageData(0, 0, w, h).data;
    } catch (e) {
      console.warn("snapshot failed, using fallback", e);
    }
    // fallback size from bounding rect if snapshot failed
    if (!w || !h) {
      const rect = node.getBoundingClientRect();
      w = Math.round(rect.width * (window.devicePixelRatio || 1));
      h = Math.round(rect.height * (window.devicePixelRatio || 1));
      if (w < 100) w = 1280; if (h < 100) h = 640;
    }
    const particles: Particle[] = [];
    const cx = w / 2, cy = h / 2;
    const step = 10; // hundreds of squares across whole hero

    if (data && data.length) {
      for (let y = 0; y < h; y += step) {
        for (let x = 0; x < w; x += step) {
          const i = (y * w + x) * 4;
          const r = data[i], g = data[i + 1], b = data[i + 2], a = data[i + 3];
          if (a < 10) continue;
          const isBg = r > 237 && g > 238 && b > 243 && Math.abs(r - 242) < 11 && Math.abs(g - 243) < 11;
          if (isBg) continue;
          if (r > 251 && g > 251 && b > 251) continue;
          const dx = x - cx, dy = y - cy;
          const dist = Math.hypot(dx, dy) || 1;
          const ang = Math.atan2(dy, dx);
          const speed = 44 + Math.random() * 150 + dist * 0.09;
          const ang2 = ang + (Math.random() - 0.5) * 0.9;
          const vx = Math.cos(ang2) * speed + (Math.random() - 0.5) * 16;
          const vy = Math.sin(ang2) * speed + (Math.random() - 0.5) * 16 - Math.random() * 8;
          particles.push({ ox: x, oy: y, r, g, b, a: a / 255, vx, vy, sz: step * 0.92 });
        }
      }
    }
    // fallback: if snapshot gave too few particles (fonts blocked), generate palette squares
    if (particles.length < 80) {
      particles.length = 0;
      const palette: [number, number, number][] = [
        [201, 182, 255], [217, 207, 253], [191, 230, 247], [255, 215, 222],
        [26, 30, 46], [138, 142, 166], [255, 233, 168], [26, 107, 255], [255, 255, 255],
      ];
      const cols = Math.ceil(w / step), rows = Math.ceil(h / step);
      for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) {
        if (Math.random() < 0.32) continue; // sparsity ~68% fill
        const ox = x * step + step / 2, oy = y * step + step / 2;
        const [r, g, b] = palette[Math.floor(Math.random() * palette.length)];
        const dx = ox - cx, dy = oy - cy;
        const ang = Math.atan2(dy, dx);
        const vx = Math.cos(ang) * (60 + Math.random() * 120);
        const vy = Math.sin(ang) * (60 + Math.random() * 120);
        particles.push({ ox, oy, r, g, b, a: 1, vx, vy, sz: step * 0.9 });
      }
    }

    particlesRef.current = particles;
    const out = overlayRef.current;
    out.width = w; out.height = h;
    out.style.width = "100%"; out.style.height = "100%";
    setReady(true);
    requestAnimationFrame(() => draw(0));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  const draw = useCallback((v: number) => {
    const canvas = overlayRef.current;
    if (!canvas || !particlesRef.current.length) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const p = Math.min(1, Math.max(0, v));
    const e = 1 - Math.pow(1 - p, 2.15);
    const fade = 1 - Math.pow(p, 1.18);
    if (fade < 0.01 && p > 0.95) { ctx.clearRect(0, 0, canvas.width, canvas.height); return; }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const pt of particlesRef.current) {
      const x = pt.ox + pt.vx * e;
      const y = pt.oy + pt.vy * e;
      const alpha = pt.a * fade;
      if (alpha < 0.02) continue;
      const sz = pt.sz * (1 + e * 0.04);
      ctx.globalAlpha = alpha;
      ctx.fillStyle = `rgb(${pt.r},${pt.g},${pt.b})`;
      ctx.fillRect(x - sz / 2, y - sz / 2, sz, sz);
    }
    ctx.globalAlpha = 1;
  }, []);

  useEffect(() => {
    if (reduced) return;
    let t1: number, t2: number;
    const start = () => {
      t1 = window.setTimeout(() => build(), 700);
      t2 = window.setTimeout(() => { if (!particlesRef.current.length) build(); }, 2000);
    };
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
    const onResize = () => { particlesRef.current = []; setReady(false); build(); };
    window.addEventListener("resize", onResize);
    return () => { window.clearTimeout(t1); window.clearTimeout(t2); window.removeEventListener("resize", onResize); };
  }, [build, reduced]);

  useMotionValueEvent(smooth, "change", (v) => { if (!reduced && ready) draw(v); });

  return (
    <div>
      {/* HERO — whole section divides into hundreds of small squares on scroll */}
      <section
        ref={heroRef}
        id="hero"
        className="relative mx-auto max-w-[1280px] px-4 py-10 md:px-6 md:py-14 scroll-mt-16 overflow-visible"
      >
        {/* pixel overlay — covers entire hero (text + mascot + 3 cards) */}
        <motion.div
          data-pixel-overlay="true"
          style={reduced ? { opacity: 0 } : { opacity: overlayOpacity } as any}
          className="pointer-events-none absolute inset-0 z-20"
          aria-hidden
        >
          <canvas ref={overlayRef} className="absolute inset-0 h-full w-full" />
        </motion.div>

        <motion.div style={reduced ? {} : { opacity: heroOpacity, y: heroY, scale: heroScale, rotate: heroRotate } as any} className="relative will-change-transform">
          <div className="grid items-center gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="lg:order-2">
              <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <div className="inline-flex items-center gap-2 rounded-full border border-[#E9DEF8] bg-[#D9CFFD] px-3 py-1.5 text-xs font-extrabold text-[#1A1E2E]">
                  <Sparkles size={14} /> Free to use - No signup - No data saved
                </div>
                <h1 className="mt-5 font-display text-[32px] font-extrabold leading-[1.02] tracking-tight text-balance md:text-[52px]">
                  Your week wasn't lived.<br />It was <span className="rounded-xl bg-[#D9CFFD] px-2">scrolled.</span>
                </h1>
                <p className="mt-4 max-w-[58ch] text-[16px] leading-relaxed font-semibold text-[#475069]">
                  Paste your Screen Time numbers, see the real cost in books, workouts and nights, and download a dated PNG to keep yourself honest. We do not save your data - your PNG is your record.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <button onClick={() => scrollTo("tracker")} className="inline-flex items-center gap-2 rounded-full bg-[#C9B6FF] px-6 py-3 text-sm font-extrabold text-[#111827] shadow-cute hover:bg-[#B8A6F0] hover:-translate-y-px transition">
                    Start tracking <ArrowRight size={16} />
                  </button>
                  <button onClick={() => scrollTo("about")} className="inline-flex items-center gap-2 rounded-full border border-[#E9E7F5] bg-white px-6 py-3 text-sm font-bold shadow-cute hover:bg-[#F2F3F8] transition">
                    How it works
                  </button>
                  <button onClick={() => scrollTo("blog")} className="inline-flex items-center gap-2 rounded-full border border-[#E9E7F5] bg-white px-6 py-3 text-sm font-bold shadow-cute hover:bg-[#F2F3F8] transition">
                    <BookOpen size={16} /> Read about time
                  </button>
                </div>
                <p className="mt-4 text-xs font-semibold text-[#8A8EA6]">Reclaim your hours - one check at a time.</p>
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.15 }} className="flex justify-start lg:order-1">
              <Hero3D />
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="mx-auto mt-10 grid max-w-[900px] grid-cols-1 gap-4 md:grid-cols-3">
            {[
              { icon: Clock3, title: "Track honestly", desc: "9 apps + custom, hours and minutes, doom vs productive.", bg: "bg-[#FFD7DE] border-[#FFD7DE]" },
              { icon: Timer, title: "See the cost", desc: "Donut, bars, ratio and impact in books and nights.", bg: "bg-[#D9CFFD] border-[#E9DEF8]" },
              { icon: BookOpen, title: "Keep the PNG", desc: "Dated 2x export - your data stays on device.", bg: "bg-[#BFE6F7] border-[#C8E6F2]" },
            ].map((f) => (
              <div key={f.title} className={`rounded-[20px] border p-5 shadow-cute text-left ${f.bg}`}>
                <f.icon size={20} className="text-[#1A1E2E]" />
                <div className="mt-3 text-sm font-extrabold text-[#1A1E2E]">{f.title}</div>
                <div className="mt-1 text-sm font-semibold leading-relaxed text-[#1A1E2E]/70">{f.desc}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ABOUT — mint wash signals page change (no hairline dividers) */}
      <section id="about" className="scroll-mt-16 bg-[#D6F0E6]/30">
        <div className="mx-auto max-w-[880px] w-full px-4 md:px-6 py-12 md:py-16">
          <div className="rounded-[20px] border border-[#E9DEF8] bg-white p-6 md:p-8 shadow-cute">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#E9DEF8] bg-[#D9CFFD]/40 px-3 py-1 text-xs font-extrabold">About</div>
            <h2 className="mt-4 font-display text-[28px] font-extrabold leading-tight text-balance md:text-[36px]">We built a simple mirror for your week.</h2>
            <p className="mt-3 max-w-[65ch] text-[15px] leading-relaxed font-semibold text-[#475069]">
              Elsewhere started as a weekend build to answer one honest question: where did my hours go? Paste Screen Time or Digital Wellbeing numbers, see breakdowns, feel the impact, and download a dated PNG. No account, no data saved on our servers.
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {[
                { title: "How it works", desc: "Add hours per app, tag doom vs productive, watch charts update live." },
                { title: "Privacy", desc: "100% client-side. LocalStorage only. Your PNG is your record." },
                { title: "Why", desc: "30 minutes a day is 182 hours a year - a skill, 36 books, or better sleep." },
              ].map((c) => (
                <div key={c.title} className="rounded-2xl border border-[#E9E7F5] bg-[#F2F3F8] p-4">
                  <div className="text-sm font-extrabold">{c.title}</div>
                  <div className="mt-1 text-sm font-semibold leading-relaxed text-[#8A8EA6]">{c.desc}</div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex gap-3">
              <button onClick={() => scrollTo("tracker")} className="rounded-full bg-[#C9B6FF] px-5 py-2.5 text-sm font-extrabold text-[#111827] hover:bg-[#B8A6F0]">Try the tracker</button>
              <button onClick={() => scrollTo("blog")} className="rounded-full border border-[#E9E7F5] bg-white px-5 py-2.5 text-sm font-bold hover:bg-[#F2F3F8]">Read about time</button>
            </div>
          </div>
        </div>
      </section>

      {/* BLOG — sky wash signals page change (no hairline dividers) */}
      <section id="blog" className="scroll-mt-16 bg-[#BFE6F7]/25">
        <div className="mx-auto max-w-[1080px] w-full px-4 md:px-6 py-12 md:py-16">
          <div className="mx-auto max-w-[680px] text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#E9DEF8] bg-[#D9CFFD] px-3 py-1 text-xs font-extrabold">Blog</div>
            <h2 className="mt-3 font-display text-[28px] font-extrabold text-balance md:text-[36px]">Time, focus, and small wins.</h2>
            <p className="mt-2 text-sm font-semibold text-[#475069]">Short reads on making hours visible. Scroll or click to read, then keep tracking.</p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {posts.map((p) => (
              <Link key={p.slug} to={`/blog/${p.slug}`} className="group rounded-[20px] border border-[#E9DEF8] bg-white p-5 shadow-cute hover:shadow-cute-hover hover:-translate-y-px transition text-left">
                <div className="flex items-center gap-2 text-xs font-extrabold">
                  <span className="rounded-full bg-[#F2F3F8] border border-[#E9E7F5] px-2.5 py-1 text-[#1A1E2E]">{p.tag}</span>
                  <span className="text-[#8A8EA6]">{p.read} · {p.date}</span>
                </div>
                <div className="mt-3 text-[16px] font-extrabold leading-tight text-[#1A1E2E]">{p.title}</div>
                <div className="mt-1 text-sm font-semibold leading-relaxed text-[#8A8EA6]">{p.excerpt}</div>
                <div className="mt-3 text-xs font-extrabold text-[#6B5DD3]">Read →</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* TRACKER — white wash signals page change (no hairline dividers) */}
      <section id="tracker" className="scroll-mt-16 bg-white/60 backdrop-blur-sm">
        <Tracker />
        <div className="pb-6 text-center">
          <button onClick={() => scrollTo("hero")} className="inline-flex items-center gap-1 rounded-full border border-[#E9E7F5] bg-white px-4 py-2 text-xs font-bold hover:bg-[#F2F3F8]">
            Back to top ↑
          </button>
        </div>
      </section>
    </div>
  );
}
