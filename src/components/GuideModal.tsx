import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Smartphone, Apple } from "lucide-react";

export default function GuideModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const prevFocus = useRef<Element | null>(null);

  useEffect(() => {
    if (!open) return;
    prevFocus.current = document.activeElement;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && dialogRef.current) {
        const els = dialogRef.current.querySelectorAll<HTMLElement>('button, [href], input, [tabindex]:not([tabindex="-1"])');
        if (els.length === 0) return;
        const first = els[0];
        const last = els[els.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      (prevFocus.current as HTMLElement | null)?.focus?.();
    };
  }, [open, onClose]);
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6" aria-hidden={!open}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            aria-hidden
          />
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ type: "spring", damping: 24, stiffness: 260 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="guide-title"
            ref={dialogRef}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[640px] max-h-[90dvh] overflow-y-auto rounded-[20px] border border-[#E9DEF8] bg-white p-6 shadow-2xl md:p-8 overscroll-contain"
          >
            <button
              ref={closeRef}
              onClick={onClose}
              aria-label="Close guide"
              className="absolute right-4 top-4 rounded-full bg-[#F2F3F8] border border-[#E9E7F5] p-2 hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#C9B6FF] text-[#1A1E2E]"
            >
              <X size={16} />
            </button>
            <h3 id="guide-title" className="text-xl font-extrabold pr-8 text-[#1A1E2E]">How to find your weekly screen time</h3>
            <p className="mt-1 text-sm font-semibold text-[#8A8EA6]">30-second check - then paste numbers below.</p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-[#E9DEF8] bg-[#D9CFFD]/25 p-5">
                <div className="flex items-center gap-2 text-sm font-extrabold text-[#1A1E2E]"><Apple size={18} /> iOS - Screen Time</div>
                <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-sm leading-relaxed text-[#1A1E2E]/80">
                  <li>Open <span className="font-extrabold text-[#1A1E2E]">Settings</span></li>
                  <li>Tap <span className="font-extrabold text-[#1A1E2E]">Screen Time</span></li>
                  <li>Tap <span className="font-extrabold text-[#1A1E2E]">See All Activity</span> → switch to <span className="font-extrabold text-[#1A1E2E]">Week</span></li>
                  <li>Note hours per app (tap app name for weekly total)</li>
                </ol>
              </div>
              <div className="rounded-2xl border border-[#C8E6F2] bg-[#BFE6F7]/30 p-5">
                <div className="flex items-center gap-2 text-sm font-extrabold text-[#1A1E2E]"><Smartphone size={18} /> Android - Digital Wellbeing</div>
                <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-sm leading-relaxed text-[#1A1E2E]/80">
                  <li>Open <span className="font-extrabold text-[#1A1E2E]">Settings</span></li>
                  <li>Tap <span className="font-extrabold text-[#1A1E2E]">Digital Wellbeing & parental controls</span></li>
                  <li>Tap the chart → <span className="font-extrabold text-[#1A1E2E]">Weekly</span> view</li>
                  <li>Note hours per app</li>
                </ol>
              </div>
            </div>

            <div className="mt-5 rounded-xl bg-[#FFF1B8] border border-[#FFE9A8] px-4 py-3 text-sm font-bold text-[#1A1E2E]">
              Tip: exclude calls, maps and music - focus on doomscroll apps for the honest number.
            </div>
            <button onClick={onClose} className="mt-6 w-full rounded-full bg-[#C9B6FF] py-3 font-extrabold text-[#111827] hover:bg-[#B8A6F0] transition">
              Got it - let me track
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
