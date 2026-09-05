import { useRef, useState } from "react";
import { Download, HelpCircle, RotateCcw, ArrowRight } from "lucide-react";
import AppInputList from "../components/AppInputList";
import AnalyticsCharts from "../components/AnalyticsCharts";
import GuideModal from "../components/GuideModal";
import ExportCard from "../components/ExportCard";
import { exportNodeToPng } from "../lib/exportPng";
import { useScreenTimeStore } from "../store/useScreenTimeStore";

export default function Tracker() {
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
    } catch { alert("Export failed - try again."); } finally { setExporting(false); }
  };
  return (
    <div className="mx-auto max-w-[1280px] px-4 pb-6 pt-6 md:px-6 md:pt-8">
      <div className="mx-auto max-w-[720px] text-center">
        <h1 className="text-[28px] font-extrabold md:text-[40px]">Your weekly tracker</h1>
        <p className="mt-2 text-sm font-semibold text-[#8A8EA6]">Paste numbers, see breakdown, download PNG with current date. We do not save your data.</p>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          <button onClick={() => setGuideOpen(true)} className="inline-flex items-center gap-2 rounded-full border border-[#E9E7F5] bg-white px-4 py-2 text-sm font-bold shadow-cute"><HelpCircle size={14} /> Where to find numbers?</button>
          <button onClick={() => reset()} className="inline-flex items-center gap-2 rounded-full border border-[#E9E7F5] bg-white px-4 py-2 text-sm font-bold shadow-cute"><RotateCcw size={14} /> Reset</button>
          <button onClick={handleExport} disabled={exporting} className="inline-flex items-center gap-2 rounded-full bg-[#C9B6FF] px-4 py-2 text-sm font-extrabold text-[#111827] shadow-cute hover:bg-[#B8A6F0]"><Download size={14} /> {exporting ? "Exporting..." : "Download PNG"} <ArrowRight size={12} /></button>
        </div>
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-[420px_1fr]">
        <AppInputList />
        <AnalyticsCharts />
      </div>
      <div className="mt-8">
        <div className="flex items-center gap-2 text-sm font-extrabold"><span className="h-2 w-2 rounded-full bg-[#C9B6FF]" /> Export preview - this is what your PNG will capture</div>
        <div className="mt-3 max-w-[720px]"><ExportCard ref={exportRef} /></div>
      </div>
      <GuideModal open={guideOpen} onClose={() => setGuideOpen(false)} />
    </div>
  );
}
