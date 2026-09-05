import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Download, HelpCircle, RotateCcw, Sparkles, ArrowRight } from "lucide-react";
import AppInputList from "./AppInputList";
import AnalyticsCharts from "./AnalyticsCharts";
import GuideModal from "./GuideModal";
import ExportCard from "./ExportCard";
import { exportNodeToPng } from "../lib/exportPng";
import { useScreenTimeStore } from "../store/useScreenTimeStore";
import { StarSpike, CloudPuff } from "./CuteMascot";

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
    <div className="relative mx-auto max-w-[1280px] px-4 pb-6 pt-6 md:px-6 md:pt-8">
      <div className="mx-auto max-w-[720px] text-center">
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#E9DEF8] bg-[#D9CFFD] px-3 py-1.5 text-xs font-extrabold text-[#1A1E2E]">
            <Sparkles size={14} className="text-[#1A1E2E]" /> Tracker · No signup · Free to use
          </div>
          <h1 className="mt-4 text-[30px] font-extrabold leading-[0.95] tracking-tight md:text-[44px]">
            How much of your life did you scroll away this week?
          </h1>
          <p className="mx-auto mt-3 max-w-[60ch] text-[15px] leading-relaxed text-[#8A8EA6]">
            Paste your iOS Screen Time or Android Digital Wellbeing numbers. See the real breakdown, feel the impact, and download a PNG to keep tracking. We do not save your data - download the PNG to keep it; it includes the current date.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-2.5">
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
      </div>
      <div className="absolute right-6 top-24 hidden lg:block"><StarSpike className="h-[72px] w-[72px] rotate-6" /></div>
      <div className="absolute left-6 top-36 hidden lg:block"><CloudPuff className="h-[56px] w-[76px]" /></div>

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
