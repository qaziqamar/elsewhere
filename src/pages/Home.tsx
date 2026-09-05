import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Clock3, BookOpen, Timer, Sparkles } from "lucide-react";
import { StarSpike, CloudPuff } from "../components/CuteMascot";
import { posts } from "../blog/posts";
import Tracker from "./Tracker";

export default function Home() {
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div>
      {/* HERO */}
      <section id="hero" className="relative flex flex-col justify-center mx-auto max-w-[1280px] px-4 py-10 md:px-6 md:py-14 scroll-mt-16">
        <div className="absolute right-6 top-10 hidden lg:block"><StarSpike className="h-[72px] w-[72px] rotate-6" /></div>
        <div className="absolute left-6 top-40 hidden lg:block"><CloudPuff className="h-[56px] w-[76px]" /></div>

        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mx-auto max-w-[820px] text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#E9DEF8] bg-[#D9CFFD] px-3 py-1.5 text-xs font-extrabold text-[#1A1E2E]">
            <Sparkles size={14} /> Free to use - No signup - No data saved
          </div>
          <h1 className="mt-5 text-[32px] font-extrabold leading-[0.95] tracking-tight md:text-[52px]">
            Your week wasn't lived.<br />It was <span className="rounded-xl bg-[#D9CFFD] px-2">scrolled.</span>
          </h1>
          <p className="mx-auto mt-4 max-w-[58ch] text-[16px] leading-relaxed font-semibold text-[#8A8EA6]">
            Paste your Screen Time numbers, see the real cost in books, workouts and nights, and download a dated PNG to keep yourself honest. We do not save your data - your PNG is your record.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
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

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="mx-auto mt-10 grid max-w-[900px] grid-cols-1 gap-4 md:grid-cols-3">
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


      </section>

      {/* ABOUT */}
      <section id="about" className="flex items-center scroll-mt-16 py-6">
        <div className="mx-auto max-w-[880px] w-full px-4 py-10 md:px-6">
          <div className="rounded-[20px] border border-[#E9DEF8] bg-white p-6 md:p-8 shadow-cute">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#E9DEF8] bg-[#D9CFFD]/40 px-3 py-1 text-xs font-extrabold">About Scrolless</div>
            <h2 className="mt-4 text-[28px] font-extrabold leading-tight md:text-[36px]">We built a simple mirror for your week.</h2>
            <p className="mt-3 max-w-[65ch] text-[15px] leading-relaxed font-semibold text-[#8A8EA6]">
              Scrolless started as a weekend build to answer one honest question: where did my hours go? Paste Screen Time or Digital Wellbeing numbers, see breakdowns, feel the impact, and download a dated PNG. No account, no data saved on our servers.
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

      {/* BLOG */}
      <section id="blog" className="flex items-center scroll-mt-16 py-6">
        <div className="mx-auto max-w-[1080px] w-full px-4 py-10 md:px-6">
          <div className="mx-auto max-w-[680px] text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#E9DEF8] bg-[#D9CFFD] px-3 py-1 text-xs font-extrabold">Blog - about time</div>
            <h2 className="mt-3 text-[28px] font-extrabold md:text-[36px]">Time, focus, and small wins.</h2>
            <p className="mt-2 text-sm font-semibold text-[#8A8EA6]">Short reads on making hours visible. Scroll or click to read, then keep tracking.</p>
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

      {/* TRACKER */}
      <section id="tracker" className="scroll-mt-16 py-6">
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
