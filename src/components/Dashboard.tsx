import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Download, HelpCircle, RotateCcw, Sparkles, ArrowRight } from "lucide-react";
import AppInputList from "./AppInputList";
import AnalyticsCharts from "./AnalyticsCharts";
import GuideModal from "./GuideModal";
import ExportCard from "./ExportCard";
import { exportNodeToPng } from "../lib/exportPng";
import { useScreenTimeStore } from "../store/useScreenTimeStore";
import { StarSpike, Wavy, CloudPuff } from "./CuteMascot";

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
      alert("Export failed - try again. If charts are empty, add some time first.");
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="mx-auto max-w-[1280px] px-4 pb-6 pt-6 md:px-6 md:pt-8">
      {/* hero - pastel, asymmetric, mascots floating */}
      <div className="grid items-center gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#E9DEF8] bg-[#D9CFFD] px-3 py-1.5 text-xs font-extrabold text-[#1A1E2E]">
            <Sparkles size={14} className="text-[#1A1E2E]" /> Tracker · No signup · Private on device
          </div>
          <h1 className="mt-4 text-[30px] font-extrabold leading-[0.95] tracking-tight md:text-[44px]">
            How much of your <span className="rounded-xl bg-[#D9CFFD] px-2 py-0.5">life</span> did you scroll away this week?
          </h1>
          <p className="mt-3 max-w-[60ch] text-[15px] leading-relaxed text-[#8A8EA6]">
            Paste your iOS Screen Time or Android Digital Wellbeing numbers. See the real breakdown, feel the impact, and download a PNG to hold yourself accountable.
          </p>
          <div className="mt-5 flex flex-wrap gap-2.5">
            <button onClick={() => setGuideOpen(true)} className="inline-flex items-center gap-2 rounded-full border border-[#E9E7F5] bg-white px-4 py-2.5 text-sm font-bold shadow-cute hover:shadow-cute-hover hover:-translate-y-px transition">
              <HelpCircle size={16} /> Where do I find my screen time?
            </button>
            <button onClick={() => reset()} className="inline-flex items-center gap-2 rounded-full bg-white border border-[#E9E7F5] px-4 py-2.5 text-sm font-bold shadow-cute hover:bg-[#F2F3F8] transition">
              <RotateCcw size={16} /> Reset week
            </button>
            <button
              onClick={handleExport}
              disabled={exporting}
              className="inline-flex items-center gap-2 rounded-full bg-[#C9B6FF] px-5 py-2.5 text-sm font-extrabold text-[#111827] shadow-cute hover:bg-[#B8A6F0] hover:-translate-y-px disabled:opacity-50 transition"
            >
              <Download size={16} /> {exporting ? "Exporting..." : "Download PNG"} <ArrowRight size={14} />
            </button>
          </div>
          <p className="mt-3 text-xs font-semibold text-[#8A8EA6]">Reclaim your hours from the digital abyss - one check at a time.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1, type: "spring", damping: 20 }}
          className="relative"
        >
          <div className="relative overflow-hidden rounded-[28px] border border-[#E9DEF8] bg-white p-5 shadow-cute">
            <StarSpike className="absolute -right-2 -top-2 h-[84px] w-[84px] rotate-6 hidden md:block" />
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-[#8A8EA6]">
              <span>Live preview</span><span className="inline-flex items-center gap-1 text-[#6BCB77]"><span className="h-2 w-2 rounded-full bg-[#6BCB77] animate-pulse" /> Private</span>
            </div>
            <div className="mt-4 space-y-3">
              <div className="flex items-center gap-3 rounded-2xl border border-[#E9E7F5] bg-[#F2F3F8] p-3">
                <div className="h-10 w-10 rounded-xl bg-[#C9B6FF] grid place-items-center font-extrabold text-[#111827]">S</div>
                <div className="flex-1"><div className="text-sm font-extrabold">Scrolless</div><div className="text-xs font-semibold text-[#8A8EA6]">Weekly accountability report</div></div>
                <Wavy className="h-10 w-10 hidden sm:block" />
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                {[
                  { k: "YouTube", v: "6h 30m", bg: "bg-[#FFD7DE] border-[#FFD7DE]" },
                  { k: "Instagram", v: "4h 10m", bg: "bg-[#D9CFFD] border-[#E9DEF8]" },
                  { k: "LinkedIn", v: "1h 05m", bg: "bg-[#BFE6F7] border-[#C8E6F2]" },
                ].map((s) => (
                  <div key={s.k} className={`rounded-2xl border px-2 py-3 ${s.bg}`}>
                    <div className="text-xs font-bold text-[#1A1E2E]/70">{s.k}</div>
                    <div className="text-sm font-mono font-extrabold text-[#1A1E2E]">{s.v}</div>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-[#111827] px-4 py-3 text-white">
                <span className="text-sm font-bold">Download PNG of result</span>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-extrabold text-[#111827]">PNG 2x →</span>
              </div>
            </div>
          </div>
          <CloudPuff className="absolute -bottom-6 -left-4 h-[66px] w-[90px] hidden md:block" />
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }} className="mt-8 grid gap-6 lg:grid-cols-[420px_1fr]">
        <AppInputList />
        <AnalyticsCharts />
      </motion.div>

      <div className="mt-8">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-sm font-extrabold flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[#C9B6FF]" /> Export preview - this is what your PNG will capture</h3>
          <span className="rounded-full border border-[#E9E7F5] bg-white px-3 py-1 text-xs font-bold text-[#8A8EA6]">2x crisp · pastel · shareable</span>
        </div>
        <div className="mt-3 max-w-[720px]">
          <ExportCard ref={exportRef} />
        </div>
      </div>

      <GuideModal open={guideOpen} onClose={() => setGuideOpen(false)} />
    </div>
  );
}
