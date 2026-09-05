import { forwardRef } from "react";
import { useScreenTimeStore } from "../store/useScreenTimeStore";
import { formatHM, totalMinutes } from "../lib/appData";
import { impactEquivalents } from "../lib/impact";

const ExportCard = forwardRef<HTMLDivElement>(function ExportCard(_, ref) {
  const apps = useScreenTimeStore((s) => s.apps);
  const data = apps.filter((a) => totalMinutes(a) > 0).sort((a, b) => totalMinutes(b) - totalMinutes(a));
  const total = apps.reduce((s, a) => s + totalMinutes(a), 0);
  const doom = apps.filter((a) => a.category === "doomscroll").reduce((s, a) => s + totalMinutes(a), 0);
  const prod = apps.filter((a) => a.category === "productive").reduce((s, a) => s + totalMinutes(a), 0);
  const impact = impactEquivalents(doom);
  const date = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });

  return (
    <div ref={ref} className="rounded-[24px] border border-white/10 bg-gradient-to-br from-[#0F172A] to-[#080C18] p-6 md:p-8 text-white">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/15 px-3 py-1 text-xs font-bold tracking-widest text-violet-200">SCROLLESS — WEEKLY REPORT</div>
          <h3 className="mt-3 text-2xl font-extrabold leading-none">How much did you scroll away?</h3>
          <p className="mt-1 text-sm text-slate-400">{date} · {apps.length} apps tracked</p>
        </div>
        <div className="text-right">
          <div className="text-xs uppercase tracking-widest text-slate-400">Total</div>
          <div className="text-2xl font-mono font-extrabold">{formatHM(total)}</div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3 text-center">
        <div className="rounded-2xl bg-white/5 border border-white/10 p-4"><div className="text-xs uppercase tracking-widest text-slate-400">Doomscroll</div><div className="mt-1 text-lg font-mono font-bold text-orange-300">{formatHM(doom)}</div></div>
        <div className="rounded-2xl bg-white/5 border border-white/10 p-4"><div className="text-xs uppercase tracking-widest text-slate-400">Productive</div><div className="mt-1 text-lg font-mono font-bold text-emerald-300">{formatHM(prod)}</div></div>
        <div className="rounded-2xl bg-white/5 border border-white/10 p-4"><div className="text-xs uppercase tracking-widest text-slate-400">Neutral</div><div className="mt-1 text-lg font-mono font-bold">{formatHM(total - doom - prod)}</div></div>
      </div>

      <div className="mt-6">
        <div className="text-xs font-bold uppercase tracking-widest text-slate-400">Top apps</div>
        <div className="mt-2 grid gap-2">
          {data.slice(0, 5).map((a) => (
            <div key={a.id} className="flex items-center justify-between rounded-xl bg-white/[0.04] border border-white/5 px-3 py-2.5">
              <span className="text-sm font-semibold">{a.name}</span>
              <span className="font-mono text-sm font-bold">{formatHM(totalMinutes(a))}</span>
            </div>
          ))}
          {data.length === 0 && <div className="text-sm text-slate-500">No time logged yet.</div>}
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-violet-500/20 bg-violet-500/10 p-4">
        <div className="text-xs font-bold uppercase tracking-widest text-violet-200">Impact</div>
        <div className="mt-1 text-sm font-semibold leading-relaxed">{impact.primary}</div>
        <div className="mt-2 text-xs text-slate-400">{impact.hours}h · {impact.books} books · {impact.workouts} workouts · {impact.sleepNights} nights</div>
      </div>

      <div className="mt-6 flex items-center justify-between text-[11px] text-slate-500 border-t border-white/10 pt-4">
        <span>scrolless.app — Reclaim your hours</span>
        <span>Generated {date}</span>
      </div>
    </div>
  );
});
export default ExportCard;
