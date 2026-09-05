import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Clock3 } from "lucide-react";
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
    <div className="rounded-[24px] border border-white/10 bg-white/[0.04] backdrop-blur-xl overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-5 py-4 md:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-black"><Clock3 size={18} /></div>
          <div>
            <div className="text-sm font-bold leading-none">Your week</div>
            <div className="text-xs text-slate-400">{apps.length} apps · {formatHM(total)} total</div>
          </div>
        </div>
        <div className="flex rounded-full bg-black/30 p-1 text-xs">
          {(["all", "doom", "prod"] as const).map((k) => (
            <button
              key={k}
              onClick={() => setFilter(k)}
              className={`rounded-full px-3.5 py-1.5 font-semibold capitalize transition ${filter === k ? "bg-white text-black" : "text-slate-400 hover:text-white"}`}
            >
              {k === "all" ? "All" : k === "doom" ? "Doomscroll" : "Productive"}
            </button>
          ))}
        </div>
      </div>

      <div className="px-3 py-3 md:px-4 space-y-2 max-h-[520px] overflow-auto">
        <AnimatePresence initial={false}>
          {filtered.map((app) => {
            const mins = totalMinutes(app);
            const sliderH = app.hours + app.minutes / 60;
            return (
              <motion.div
                key={app.id}
                layout
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="group flex flex-col gap-3 rounded-2xl border border-white/[0.06] bg-[#0F172A]/60 px-4 py-4 hover:border-violet-500/25 hover:bg-[#0F172A] transition"
              >
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-xl grid place-items-center text-sm font-bold text-white shadow" style={{ background: app.color === "#fff" ? "#111" : app.color, color: app.color === "#FFFC00" ? "#111" : "#fff", border: app.color === "#fff" ? "1px solid rgba(255,255,255,0.2)" : "none" }}>
                    {app.name.slice(0, 1).toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-semibold truncate">{app.name}</div>
                    <div className="flex gap-1 mt-1">
                      {(["doomscroll", "productive", "neutral"] as const).map((c) => (
                        <button
                          key={c}
                          onClick={() => setCategory(app.id, c)}
                          className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide border transition ${app.category === c ? (c === "doomscroll" ? "bg-orange-500 text-white border-orange-500" : c === "productive" ? "bg-emerald-500 text-white border-emerald-500" : "bg-white text-black border-white") : "border-white/10 text-slate-400 hover:text-white"}`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-mono font-bold">{formatHM(mins)}</div>
                    <div className="text-[11px] text-slate-500">{mins} min</div>
                  </div>
                  {!["yt","netflix","x","linkedin","meta","telegram","whatsapp","instagram","snapchat"].includes(app.id) && (
                    <button onClick={() => remove(app.id)} aria-label={`Remove ${app.name}`} className="rounded-full p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-500/10 opacity-0 group-hover:opacity-100 transition">
                      <Trash2 size={16} />
                    </button>
                  )}
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
                    <label className="flex items-center gap-1 rounded-xl border border-white/10 bg-black/20 px-2.5 py-1.5">
                      <span className="text-[11px] font-bold text-slate-400">H</span>
                      <input
                        type="number"
                        min={0}
                        max={168}
                        value={app.hours}
                        onChange={(e) => setTime(app.id, parseInt(e.target.value || "0", 10), app.minutes)}
                        className="w-12 bg-transparent text-sm font-mono font-semibold outline-none"
                      />
                    </label>
                    <label className="flex items-center gap-1 rounded-xl border border-white/10 bg-black/20 px-2.5 py-1.5">
                      <span className="text-[11px] font-bold text-slate-400">M</span>
                      <input
                        type="number"
                        min={0}
                        max={59}
                        value={app.minutes}
                        onChange={(e) => setTime(app.id, app.hours, parseInt(e.target.value || "0", 10))}
                        className="w-12 bg-transparent text-sm font-mono font-semibold outline-none"
                      />
                    </label>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <div className="border-t border-white/10 p-4 bg-black/20">
        <div className="flex gap-2">
          <input
            value={customName}
            onChange={(e) => setCustomName(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && customName.trim()) { addCustom(customName); setCustomName(""); } }}
            placeholder="Add custom app (e.g., Reddit)"
            className="flex-1 rounded-full border border-white/10 bg-[#0F172A] px-4 py-2.5 text-sm outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 placeholder:text-slate-500"
          />
          <button
            onClick={() => { if (customName.trim()) { addCustom(customName); setCustomName(""); } }}
            disabled={!customName.trim()}
            className="inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-black hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            <Plus size={16} /> Add
          </button>
        </div>
      </div>
    </div>
  );
}
