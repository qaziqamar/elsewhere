import { motion, AnimatePresence } from "framer-motion";
import { X, Smartphone, Apple } from "lucide-react";

export default function GuideModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ type: "spring", damping: 24, stiffness: 260 }}
            role="dialog"
            aria-modal="true"
            className="fixed left-1/2 top-1/2 z-50 w-[92vw] max-w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-[20px] border border-white/10 bg-[#0F172A] p-6 shadow-2xl md:p-8"
          >
            <button
              onClick={onClose}
              aria-label="Close guide"
              className="absolute right-4 top-4 rounded-full bg-white/10 p-2 hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            >
              <X size={16} />
            </button>
            <h3 className="text-xl font-bold">How to find your weekly screen time</h3>
            <p className="mt-1 text-sm text-slate-400">30-second check — then paste numbers below.</p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                <div className="flex items-center gap-2 text-sm font-semibold"><Apple size={18} /> iOS — Screen Time</div>
                <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-sm leading-relaxed text-slate-300">
                  <li>Open <span className="font-semibold text-white">Settings</span></li>
                  <li>Tap <span className="font-semibold text-white">Screen Time</span></li>
                  <li>Tap <span className="font-semibold text-white">See All Activity</span> → switch to <span className="font-semibold text-white">Week</span></li>
                  <li>Note hours per app (tap app name for weekly total)</li>
                </ol>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                <div className="flex items-center gap-2 text-sm font-semibold"><Smartphone size={18} /> Android — Digital Wellbeing</div>
                <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-sm leading-relaxed text-slate-300">
                  <li>Open <span className="font-semibold text-white">Settings</span></li>
                  <li>Tap <span className="font-semibold text-white">Digital Wellbeing & parental controls</span></li>
                  <li>Tap the chart → <span className="font-semibold text-white">Weekly</span> view</li>
                  <li>Note hours per app</li>
                </ol>
              </div>
            </div>

            <div className="mt-5 rounded-xl bg-gradient-to-r from-violet-600/20 to-cyan-500/20 px-4 py-3 text-sm text-slate-300 border border-violet-500/20">
              Tip: exclude calls, maps and music — focus on doomscroll apps for the honest number.
            </div>
            <button onClick={onClose} className="mt-6 w-full rounded-full bg-white py-3 font-semibold text-black hover:bg-slate-100 transition">
              Got it — let me track
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
