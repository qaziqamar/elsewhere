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
    <div ref={ref} className="rounded-[20px] border border-[#E9DEF8] bg-white p-6 md:p-8 text-[#1A1E2E] shadow-cute">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#C9B6FF] bg-[#D9CFFD] px-3 py-1 text-xs font-extrabold tracking-widest text-[#1A1E2E]">SCROLLESS - WEEKLY REPORT</div>
          <h3 className="mt-3 text-2xl font-extrabold leading-none">How much did you scroll away?</h3>
          <p className="mt-1 text-sm font-bold text-[#8A8EA6]">{date} · {apps.length} apps tracked</p>
        </div>
        <div className="text-right">
          <div className="text-xs font-extrabold uppercase tracking-widest text-[#8A8EA6]">Total</div>
          <div className="text-2xl font-mono font-extrabold">{formatHM(total)}</div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3 text-center">
        <div className="rounded-2xl bg-[#FFD7DE] border border-[#FFD7DE] p-4"><div className="text-xs font-extrabold uppercase tracking-widest text-[#1A1E2E]/60">Doomscroll</div><div className="mt-1 text-lg font-mono font-extrabold">{formatHM(doom)}</div></div>
        <div className="rounded-2xl bg-[#BFE6F7] border border-[#A6D8F0] p-4"><div className="text-xs font-extrabold uppercase tracking-widest text-[#1A1E2E]/60">Productive</div><div className="mt-1 text-lg font-mono font-extrabold">{formatHM(prod)}</div></div>
        <div className="rounded-2xl bg-[#F2F3F8] border border-[#E9E7F5] p-4"><div className="text-xs font-extrabold uppercase tracking-widest text-[#8A8EA6]">Neutral</div><div className="mt-1 text-lg font-mono font-extrabold">{formatHM(total - doom - prod)}</div></div>
      </div>

      <div className="mt-6">
        <div className="text-xs font-extrabold uppercase tracking-widest text-[#8A8EA6]">Top apps</div>
        <div className="mt-2 grid gap-2">
          {data.slice(0, 5).map((a) => (
            <div key={a.id} className="flex items-center justify-between rounded-xl bg-[#F2F3F8] border border-[#E9E7F5] px-3 py-2.5">
              <span className="text-sm font-extrabold">{a.name}</span>
              <span className="font-mono text-sm font-extrabold">{formatHM(totalMinutes(a))}</span>
            </div>
          ))}
          {data.length === 0 && <div className="text-sm font-bold text-[#8A8EA6]">No time logged yet.</div>}
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-[#D9CFFD] bg-[#D9CFFD]/30 p-4">
        <div className="text-xs font-extrabold uppercase tracking-widest text-[#1A1E2E]/60">Impact</div>
        <div className="mt-1 text-sm font-bold leading-relaxed text-[#1A1E2E]">{impact.primary}</div>
        <div className="mt-2 text-xs font-bold text-[#8A8EA6]">{impact.hours}h · {impact.books} books · {impact.workouts} workouts · {impact.sleepNights} nights</div>
      </div>

      <div className="mt-6 flex items-center justify-between text-[11px] font-bold text-[#8A8EA6] border-t border-dashed border-[#E9E7F5] pt-4">
        <span>scrolless.app - Reclaim your hours</span>
        <span>Generated {date}</span>
      </div>
    </div>
  );
});
export default ExportCard;
