import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Clock3, BookOpen, Timer, Sparkles } from "lucide-react";
import { StarSpike, CloudPuff } from "../components/CuteMascot";

export default function Home() {
  return (
    <div className="relative mx-auto max-w-[1280px] px-4 pb-6 pt-8 md:px-6 md:pt-12">
      <div className="absolute right-6 top-10 hidden lg:block"><StarSpike className="h-[72px] w-[72px] rotate-6" /></div>
      <div className="absolute left-6 top-40 hidden lg:block"><CloudPuff className="h-[56px] w-[76px]" /></div>

      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mx-auto max-w-[820px] text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#E9DEF8] bg-[#D9CFFD] px-3 py-1.5 text-xs font-extrabold text-[#1A1E2E]">
          <Sparkles size={14} /> Free to use · No signup · No data saved
        </div>
        <h1 className="mt-5 text-[32px] font-extrabold leading-[0.95] tracking-tight md:text-[52px]">
          Your week wasn&apos;t lived.<br />It was <span className="rounded-xl bg-[#D9CFFD] px-2">scrolled.</span>
        </h1>
        <p className="mx-auto mt-4 max-w-[58ch] text-[16px] leading-relaxed font-semibold text-[#8A8EA6]">
          Paste your Screen Time numbers, see the real cost in books, workouts and nights, and download a dated PNG to keep yourself honest. We do not save your data - your PNG is your record.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link to="/tracker" className="inline-flex items-center gap-2 rounded-full bg-[#C9B6FF] px-6 py-3 text-sm font-extrabold text-[#111827] shadow-cute hover:bg-[#B8A6F0] hover:-translate-y-px transition">
            Start tracking <ArrowRight size={16} />
          </Link>
          <Link to="/about" className="inline-flex items-center gap-2 rounded-full border border-[#E9E7F5] bg-white px-6 py-3 text-sm font-bold shadow-cute hover:bg-[#F2F3F8] transition">
            How it works
          </Link>
          <Link to="/blog" className="inline-flex items-center gap-2 rounded-full border border-[#E9E7F5] bg-white px-6 py-3 text-sm font-bold shadow-cute hover:bg-[#F2F3F8] transition">
            <BookOpen size={16} /> Read about time
          </Link>
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

      <div className="mx-auto mt-10 max-w-[900px] rounded-[20px] border border-[#E9DEF8] bg-white p-6 shadow-cute">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-sm font-extrabold text-[#1A1E2E]">Ready to see your week?</div>
            <div className="text-sm font-semibold text-[#8A8EA6]">No account, no tracking. Just paste and see.</div>
          </div>
          <Link to="/tracker" className="inline-flex items-center gap-2 rounded-full bg-[#111827] px-5 py-2.5 text-sm font-extrabold text-white hover:bg-black transition">
            Open tracker <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
