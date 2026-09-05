import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Download, HelpCircle, RotateCcw, Sparkles } from "lucide-react";
import AppInputList from "./AppInputList";
import AnalyticsCharts from "./AnalyticsCharts";
import GuideModal from "./GuideModal";
import ExportCard from "./ExportCard";
import { exportNodeToPng } from "../lib/exportPng";
import { useScreenTimeStore } from "../store/useScreenTimeStore";

export default function Dashboard() {
  const [guideOpen, setGuideOpen] = useState(false);
  const [exporting, setExporting] = useState(false);
  const exportRef = useRef<HTMLDivElement>(null);
  const reset = useScreenTimeStore((s) => s.reset);

  const handleExport = async () => {
    if (!exportRef.current) return;
    setExporting(true);
    try {
      const week = new Date().toISOString().slice(0, 10);
      await exportNodeToPng(exportRef.current, `scrolless-week-${week}.png`);
    } catch (e) {
      console.error(e);
      alert("Export failed — try again. If charts are empty, add some time first.");
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="mx-auto max-w-[1280px] px-4 pb-10 pt-6 md:px-6 md:pt-8">
      {/* hero — left-aligned split, not centered (Taste anti-center) */}
      <div className="grid items-center gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: "easeOut" }}>
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1 text-xs font-bold text-violet-200">
            <Sparkles size={14} /> Premium tracker · No signup · Private on device
          </div>
          <h1 className="mt-4 text-[30px] font-extrabold leading-[0.95] tracking-tight md:text-[44px]">
            How much of your <span className="bg-gradient-to-r from-violet-400 via-cyan-300 to-orange-400 bg-clip-text text-transparent">life</span> did you scroll away this week?
          </h1>
          <p className="mt-3 max-w-[60ch] text-[15px] leading-relaxed text-slate-400">
            Paste your iOS Screen Time or Android Digital Wellbeing numbers. See the real breakdown, feel the impact, and download a PNG to hold yourself accountable.
          </p>
          <div className="mt-5 flex flex-wrap gap-2.5">
            <button onClick={() => setGuideOpen(true)} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-semibold backdrop-blur hover:bg-white/10 transition">
              <HelpCircle size={16} /> Where do I find my screen time?
            </button>
            <button onClick={() => reset()} className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-bold text-black hover:bg-slate-100 transition">
              <RotateCcw size={16} /> Reset week
            </button>
            <button
              onClick={handleExport}
              disabled={exporting}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 px-5 py-2.5 text-sm font-bold text-white shadow-glow hover:opacity-95 disabled:opacity-50 transition"
            >
              <Download size={16} /> {exporting ? "Exporting..." : "Download PNG"}
            </button>
          </div>
          <p className="mt-3 text-xs text-slate-500">Reclaim your hours from the digital abyss — one week at a time.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="relative"
        >
          {/* subtle visual — not a centered hero card */}
          <div className="rounded-[28px] border border-white/10 bg-gradient-to-br from-violet-600/20 via-[#0F172A] to-cyan-500/15 p-5 shadow-2xl backdrop-blur">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-slate-400">
              <span>Live preview</span><span className="text-emerald-300">● Private</span>
            </div>
            <div className="mt-4 space-y-3">
              <div className="flex items-center gap-3 rounded-2xl bg-black/25 border border-white/10 p-3">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-violet-500 to-orange-400 grid place-items-center font-bold">S</div>
                <div className="flex-1"><div className="text-sm font-bold">Scrolless</div><div className="text-xs text-slate-400">Weekly accountability report</div></div>
                <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                {[
                  { k: "YouTube", v: "6h 30m" },
                  { k: "Instagram", v: "4h 10m" },
                  { k: "LinkedIn", v: "1h 05m" },
                ].map((s) => (
                  <div key={s.k} className="rounded-xl bg-white/5 border border-white/10 px-2 py-3">
                    <div className="text-xs text-slate-400">{s.k}</div>
                    <div className="text-sm font-mono font-bold">{s.v}</div>
                  </div>
                ))}
              </div>
              <div className="rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 p-[1px]">
                <div className="rounded-xl bg-[#0F172A] px-4 py-3 flex items-center justify-between">
                  <span className="text-sm font-semibold">Download PNG of result</span>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-black">PNG 2x</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }} className="mt-8 grid gap-6 lg:grid-cols-[420px_1fr]">
        <AppInputList />
        <AnalyticsCharts />
      </motion.div>

      <div className="mt-6">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold">Export preview — this is what your PNG will look like</h3>
          <span className="text-xs text-slate-500">2x crisp · dark bg · shareable</span>
        </div>
        <div className="mt-3 max-w-[720px]">
          <ExportCard ref={exportRef} />
        </div>
      </div>

      <GuideModal open={guideOpen} onClose={() => setGuideOpen(false)} />

      <footer className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-slate-500">
        Built with React + TypeScript · Tailwind · Framer Motion · Recharts · Three.js — Scrolless
      </footer>
    </div>
  );
}
