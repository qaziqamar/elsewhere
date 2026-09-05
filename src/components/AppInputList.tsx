import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Clock3, ArrowUpRight } from "lucide-react";
import { useScreenTimeStore } from "../store/useScreenTimeStore";
import { formatHM, totalMinutes } from "../lib/appData";

export default function AppInputList() {
  const { apps, setTime, setCategory, addCustom, remove } = useScreenTimeStore();
  const [customName, setCustomName] = useState("");
  const [filter, setFilter] = useState<"all" | "doom" | "prod">("all");

  const filtered = apps.filter((a) => {
    if (filter === "doom") return a.category === "doomscroll";
    if (filter === "prod") return a.category === "productive";
    return true;
  });

  const total = apps.reduce((s, a) => s + totalMinutes(a), 0);

  return (
    <div className="overflow-hidden rounded-[20px] border border-[#E9DEF8] bg-white shadow-cute animate-pop">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E9E7F5] bg-[#D9CFFD]/30 px-5 py-4 md:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#111827] text-white"><Clock3 size={18} /></div>
          <div>
            <div className="text-sm font-extrabold leading-none text-[#1A1E2E]">Your week</div>
            <div className="text-xs font-bold text-[#8A8EA6]">{apps.length} apps · {formatHM(total)} total</div>
          </div>
        </div>
        <div className="flex rounded-full bg-[#F2F3F8] p-1 text-xs border border-[#E9E7F5]">
          {(["all", "doom", "prod"] as const).map((k) => (
            <button
              key={k}
              onClick={() => setFilter(k)}
              className={`rounded-full px-3.5 py-1.5 font-extrabold capitalize transition ${filter === k ? "bg-[#111827] text-white shadow" : "text-[#8A8EA6] hover:text-[#1A1E2E]"}`}
            >
              {k === "all" ? "All" : k === "doom" ? "Doomscroll" : "Productive"}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2.5 px-3 py-3 md:px-4 max-h-[520px] overflow-auto">
        <AnimatePresence initial={false}>
          {filtered.map((app, idx) => {
            const mins = totalMinutes(app);
            const sliderH = app.hours + app.minutes / 60;
            const tint = app.category === "doomscroll" ? "border-[#FFD7DE] bg-[#FFD7DE]/20" : app.category === "productive" ? "border-[#BFE6F7] bg-[#BFE6F7]/20" : "border-[#E9E7F5] bg-[#F2F3F8]";
            return (
              <motion.div
                key={app.id}
                layout
                initial={{ opacity: 0, y: 8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ delay: idx * 0.03, type: "spring", damping: 20, stiffness: 260 }}
                className={`group flex flex-col gap-3 rounded-2xl border bg-white px-4 py-4 shadow-cute hover:shadow-cute-hover hover:-translate-y-px transition ${tint}`}
              >
                <div className="flex items-start gap-3">
                  <div className="h-9 w-9 flex-shrink-0 rounded-xl grid place-items-center text-sm font-extrabold text-white shadow-sm border" style={{ background: app.color === "#fff" ? "#111827" : app.color, color: app.color === "#FFFC00" ? "#111827" : "#fff", borderColor: "rgba(0,0,0,0.08)" }}>
                    {app.name.slice(0, 1).toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-extrabold truncate text-[#1A1E2E] pr-1">{app.name}</div>
                        <div className="mt-1.5 flex flex-wrap gap-1">
                          {(["doomscroll", "productive", "neutral"] as const).map((c) => (
                            <button
                              key={c}
                              onClick={() => setCategory(app.id, c)}
                              className={`rounded-full px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide border transition whitespace-nowrap ${app.category === c ? (c === "doomscroll" ? "bg-[#FFB6C5] text-[#111827] border-[#FFB6C5]" : c === "productive" ? "bg-[#A6D8F0] text-[#111827] border-[#A6D8F0]" : "bg-[#111827] text-white border-[#111827]") : "border-[#E9E7F5] text-[#8A8EA6] hover:text-[#1A1E2E] hover:border-[#C9B6FF]"}`}
                            >
                              {c}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0 ml-2">
                        <div className="text-sm font-mono font-extrabold text-[#1A1E2E] whitespace-nowrap">{formatHM(mins)}</div>
                        <div className="text-[11px] font-bold text-[#8A8EA6] whitespace-nowrap">{mins} min</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-shrink-0 items-center gap-1 pt-0.5">
                    {!["yt","netflix","x","linkedin","meta","telegram","whatsapp","instagram","snapchat"].includes(app.id) && (
                      <button onClick={() => remove(app.id)} aria-label={`Remove ${app.name}`} className="rounded-full p-1.5 text-[#8A8EA6] hover:text-red-500 hover:bg-red-500/10 transition">
                        <Trash2 size={16} />
                      </button>
                    )}
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-[#111827] text-white flex-shrink-0"><ArrowUpRight size={14} /></span>
                  </div>
                </div>

                <div className="grid gap-3 md:grid-cols-[1fr_auto] items-center">
                  <input
                    type="range"
                    min={0}
                    max={40}
                    step={0.25}
                    value={sliderH}
                    onChange={(e) => {
                      const v = parseFloat(e.target.value);
                      const h = Math.floor(v);
                      const m = Math.round((v - h) * 60);
                      setTime(app.id, h, m);
                    }}
                    aria-label={`${app.name} hours`}
                    className="w-full"
                  />
                  <div className="flex items-center gap-2">
                    <label className="flex items-center gap-1 rounded-xl border border-[#E9E7F5] bg-[#F2F3F8] px-2.5 py-1.5">
                      <span className="text-[11px] font-extrabold text-[#8A8EA6]">H</span>
                      <input
                        type="number"
                        min={0}
                        max={168}
                        value={app.hours}
                        onChange={(e) => setTime(app.id, parseInt(e.target.value || "0", 10), app.minutes)}
                        className="w-12 bg-transparent text-sm font-mono font-extrabold outline-none text-[#1A1E2E]"
                      />
                    </label>
                    <label className="flex items-center gap-1 rounded-xl border border-[#E9E7F5] bg-[#F2F3F8] px-2.5 py-1.5">
                      <span className="text-[11px] font-extrabold text-[#8A8EA6]">M</span>
                      <input
                        type="number"
                        min={0}
                        max={59}
                        value={app.minutes}
                        onChange={(e) => setTime(app.id, app.hours, parseInt(e.target.value || "0", 10))}
                        className="w-12 bg-transparent text-sm font-mono font-extrabold outline-none text-[#1A1E2E]"
                      />
                    </label>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <div className="border-t border-[#E9E7F5] p-4 bg-[#F2F3F8]/60">
        <div className="flex gap-2">
          <input
            value={customName}
            onChange={(e) => setCustomName(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && customName.trim()) { addCustom(customName); setCustomName(""); } }}
            placeholder="Add custom app (e.g., Reddit)"
            className="flex-1 rounded-full border border-[#E9E7F5] bg-white px-4 py-2.5 text-sm outline-none focus:border-[#C9B6FF] focus:ring-2 focus:ring-[#C9B6FF]/30 placeholder:text-[#8A8EA6] font-semibold"
          />
          <button
            onClick={() => { if (customName.trim()) { addCustom(customName); setCustomName(""); } }}
            disabled={!customName.trim()}
            className="inline-flex items-center gap-1.5 rounded-full bg-[#111827] px-5 py-2.5 text-sm font-extrabold text-white hover:bg-black disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            <Plus size={16} /> Add
          </button>
        </div>
      </div>
    </div>
  );
}
