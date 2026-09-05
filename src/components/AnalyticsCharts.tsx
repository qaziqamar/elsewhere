import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useScreenTimeStore } from "../store/useScreenTimeStore";
import { formatHM, totalMinutes } from "../lib/appData";
import { impactEquivalents } from "../lib/impact";

const COLORS = ["#8B5CF6", "#06B6D4", "#F97316", "#EC4899", "#22C55E", "#EAB308", "#38BDF8", "#F43F5E", "#A78BFA", "#34D399"];

export default function AnalyticsCharts() {
  const apps = useScreenTimeStore((s) => s.apps);
  const data = apps.map((a) => ({ name: a.name, value: totalMinutes(a), color: a.color, cat: a.category })).filter((d) => d.value > 0);
  const doomMins = apps.filter((a) => a.category === "doomscroll").reduce((s, a) => s + totalMinutes(a), 0);
  const prodMins = apps.filter((a) => a.category === "productive").reduce((s, a) => s + totalMinutes(a), 0);
  const neutralMins = apps.filter((a) => a.category === "neutral").reduce((s, a) => s + totalMinutes(a), 0);
  const total = doomMins + prodMins + neutralMins;
  const impact = impactEquivalents(doomMins);

  if (data.length === 0) {
    return (
      <div className="rounded-[24px] border border-dashed border-white/15 bg-white/[0.02] p-10 text-center">
        <div className="mx-auto max-w-sm">
          <div className="text-sm font-semibold text-white">No data yet — move a slider</div>
          <div className="mt-1 text-sm text-slate-400">Add hours for any app and watch the breakdown come alive.</div>
        </div>
      </div>
    );
  }

  const ratio = total === 0 ? 0 : (doomMins / total) * 100;

  return (
    <div className="space-y-4">
      {/* top stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-violet-600/20 to-violet-600/5 p-4">
          <div className="text-[11px] font-bold uppercase tracking-widest text-violet-300">Total</div>
          <div className="mt-1 text-xl font-extrabold font-mono">{formatHM(total)}</div>
          <div className="text-xs text-slate-400">this week</div>
        </div>
        <div className="rounded-2xl border border-orange-500/20 bg-gradient-to-br from-orange-500/15 to-orange-500/5 p-4">
          <div className="text-[11px] font-bold uppercase tracking-widest text-orange-300">Doomscroll</div>
          <div className="mt-1 text-xl font-extrabold font-mono">{formatHM(doomMins)}</div>
          <div className="text-xs text-slate-400">{ratio.toFixed(0)}% of week</div>
        </div>
        <div className="rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/15 to-emerald-500/5 p-4">
          <div className="text-[11px] font-bold uppercase tracking-widest text-emerald-300">Productive</div>
          <div className="mt-1 text-xl font-extrabold font-mono">{formatHM(prodMins)}</div>
          <div className="text-xs text-slate-400">{(100 - ratio).toFixed(0)}% balance</div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-5">
        {/* donut */}
        <div className="lg:col-span-3 rounded-[24px] border border-white/10 bg-white/[0.04] backdrop-blur p-5">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold">Breakdown</h4>
            <span className="text-xs text-slate-400">{data.length} apps</span>
          </div>
          <div className="mt-3 h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={74} outerRadius={108} paddingAngle={3} cornerRadius={8}>
                  {data.map((entry, i) => (
                    <Cell key={entry.name} fill={entry.color === "#fff" ? "#E2E8F0" : entry.color === "#FFFC00" ? "#EAB308" : COLORS[i % COLORS.length]} stroke="rgba(0,0,0,0)" />
                  ))}
                </Pie>
                <Tooltip
                  content={({ active, payload }) => {
                    if (!active || !payload?.[0]) return null;
                    const p = payload[0].payload;
                    return (
                      <div className="rounded-xl border border-white/10 bg-[#0F172A] px-3 py-2 text-xs shadow-xl">
                        <div className="font-semibold text-white">{p.name}</div>
                        <div className="text-slate-300">{formatHM(p.value)} · {p.value} min</div>
                      </div>
                    );
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-2">
            {data.map((d, i) => (
              <span key={d.name} className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/20 px-2.5 py-1 text-xs">
                <span className="h-2 w-2 rounded-full" style={{ background: d.color === "#fff" ? "#E2E8F0" : d.color === "#FFFC00" ? "#EAB308" : COLORS[i % COLORS.length] }} />
                {d.name} <span className="font-mono font-semibold">{formatHM(d.value)}</span>
              </span>
            ))}
          </div>
        </div>

        {/* ratio meter + bar */}
        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
            <h4 className="text-sm font-bold">Productive vs Doomscroll</h4>
            <div className="mt-4">
              <div className="h-3 w-full overflow-hidden rounded-full bg-white/10 flex">
                <div className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400 transition-all" style={{ width: `${Math.max(0, 100 - ratio)}%` }} />
                <div className="h-full bg-gradient-to-r from-violet-500 to-orange-500 transition-all" style={{ width: `${ratio}%` }} />
              </div>
              <div className="mt-2 flex justify-between text-xs">
                <span className="text-emerald-300 font-semibold">{(100 - ratio).toFixed(0)}% productive</span>
                <span className="text-orange-300 font-semibold">{ratio.toFixed(0)}% doom</span>
              </div>
              <div className="mt-3 rounded-xl bg-orange-500/10 border border-orange-500/20 px-3 py-2 text-xs leading-relaxed text-orange-200">
                {ratio > 60 ? "High doomscroll load — time to reclaim." : ratio > 35 ? "Moderate — small cuts compound fast." : "Lean week — keep the streak."}
              </div>
            </div>
            <div className="mt-4 h-[160px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.slice(0, 6)}>
                  <XAxis dataKey="name" tick={{ fill: "#94A3B8", fontSize: 11 }} axisLine={false} tickLine={false} interval={0} />
                  <YAxis tick={{ fill: "#94A3B8", fontSize: 11 }} axisLine={false} tickLine={false} width={40} />
                  <Tooltip
                    cursor={{ fill: "rgba(255,255,255,0.04)" }}
                    content={({ active, payload }) => {
                      if (!active || !payload?.[0]) return null;
                      const p = payload[0].payload;
                      return <div className="rounded-xl border border-white/10 bg-[#0F172A] px-3 py-2 text-xs"><div className="font-semibold text-white">{p.name}</div><div className="text-slate-300">{formatHM(p.value)}</div></div>;
                    }}
                  />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]} fill="#8B5CF6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-[24px] border border-violet-500/20 bg-gradient-to-br from-violet-600/15 via-[#0F172A] to-cyan-500/10 p-5">
            <div className="text-xs font-bold uppercase tracking-widest text-violet-300">Time Wasted Impact</div>
            <div className="mt-2 text-sm font-semibold leading-relaxed text-white">{impact.primary}</div>
            <div className="mt-3 grid grid-cols-3 gap-2 text-center">
              <div className="rounded-xl bg-black/20 px-2 py-3"><div className="text-lg font-mono font-bold text-white">{impact.books}</div><div className="text-[11px] text-slate-400">books</div></div>
              <div className="rounded-xl bg-black/20 px-2 py-3"><div className="text-lg font-mono font-bold text-white">{impact.workouts}</div><div className="text-[11px] text-slate-400">workouts</div></div>
              <div className="rounded-xl bg-black/20 px-2 py-3"><div className="text-lg font-mono font-bold text-white">{impact.sleepNights}</div><div className="text-[11px] text-slate-400">nights sleep</div></div>
            </div>
            <div className="mt-3 text-xs text-slate-400">Based on <span className="font-mono font-semibold text-slate-200">{impact.hours}h</span> doomscroll this week. Small reclaims stack into months.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
