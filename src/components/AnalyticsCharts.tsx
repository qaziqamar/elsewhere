import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
import { useScreenTimeStore } from "../store/useScreenTimeStore";
import { formatHM, totalMinutes } from "../lib/appData";
import { impactEquivalents } from "../lib/impact";

const COLORS = ["#C9B6FF", "#A6D8F0", "#FFB6C5", "#B8E8D8", "#FFE9A8", "#D9CFFD", "#BFE6F7", "#FFD7DE"];

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
      <div className="rounded-[20px] border border-dashed border-[#E9DEF8] bg-white p-10 text-center shadow-cute">
        <div className="mx-auto max-w-sm">
          <div className="text-sm font-extrabold text-[#1A1E2E]">No data yet — move a slider ✨</div>
          <div className="mt-1 text-sm font-semibold text-[#8A8EA6]">Add hours for any app and watch the cute breakdown come alive.</div>
        </div>
      </div>
    );
  }

  const ratio = total === 0 ? 0 : (doomMins / total) * 100;

  return (
    <div className="space-y-4">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-3 gap-3">
        <div className="rounded-2xl border border-[#E9E7F5] bg-white p-4 shadow-cute">
          <div className="text-[11px] font-extrabold uppercase tracking-widest text-[#8A8EA6]">Total</div>
          <div className="mt-1 text-xl font-extrabold font-mono text-[#1A1E2E]">{formatHM(total)}</div>
          <div className="text-xs font-bold text-[#8A8EA6]">this week</div>
        </div>
        <div className="rounded-2xl border border-[#FFD7DE] bg-[#FFD7DE]/40 p-4">
          <div className="text-[11px] font-extrabold uppercase tracking-widest text-[#1A1E2E]/70">Doomscroll</div>
          <div className="mt-1 text-xl font-extrabold font-mono text-[#1A1E2E]">{formatHM(doomMins)}</div>
          <div className="text-xs font-bold text-[#1A1E2E]/60">{ratio.toFixed(0)}% of week</div>
        </div>
        <div className="rounded-2xl border border-[#BFE6F7] bg-[#BFE6F7]/40 p-4">
          <div className="text-[11px] font-extrabold uppercase tracking-widest text-[#1A1E2E]/70">Productive</div>
          <div className="mt-1 text-xl font-extrabold font-mono text-[#1A1E2E]">{formatHM(prodMins)}</div>
          <div className="text-xs font-bold text-[#1A1E2E]/60">{(100 - ratio).toFixed(0)}% balance</div>
        </div>
      </motion.div>

      <div className="grid gap-4 lg:grid-cols-5">
        <div className="lg:col-span-3 rounded-[20px] border border-[#E9DEF8] bg-white p-5 shadow-cute">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-extrabold text-[#1A1E2E]">Breakdown</h4>
            <span className="rounded-full bg-[#F2F3F8] border border-[#E9E7F5] px-2.5 py-1 text-xs font-bold text-[#8A8EA6]">{data.length} apps</span>
          </div>
          <div className="mt-3 h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={74} outerRadius={108} paddingAngle={3} cornerRadius={8}>
                  {data.map((entry, i) => (
                    <Cell key={entry.name} fill={COLORS[i % COLORS.length]} stroke="#fff" strokeWidth={2} />
                  ))}
                </Pie>
                <Tooltip
                  content={({ active, payload }) => {
                    if (!active || !payload?.[0]) return null;
                    const p = payload[0].payload;
                    return (
                      <div className="rounded-xl border border-[#E9DEF8] bg-white px-3 py-2 text-xs shadow-cute">
                        <div className="font-extrabold text-[#1A1E2E]">{p.name}</div>
                        <div className="font-semibold text-[#8A8EA6]">{formatHM(p.value)} · {p.value} min</div>
                      </div>
                    );
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-2">
            {data.map((d, i) => (
              <span key={d.name} className="inline-flex items-center gap-1.5 rounded-full border border-[#E9E7F5] bg-[#F2F3F8] px-2.5 py-1 text-xs font-bold text-[#1A1E2E]">
                <span className="h-2 w-2 rounded-full" style={{ background: COLORS[i % COLORS.length] }} />
                {d.name} <span className="font-mono font-extrabold">{formatHM(d.value)}</span>
              </span>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-[20px] border border-[#E9DEF8] bg-white p-5 shadow-cute">
            <h4 className="text-sm font-extrabold text-[#1A1E2E]">Productive vs Doomscroll</h4>
            <div className="mt-4">
              <div className="h-3 w-full overflow-hidden rounded-full bg-[#F2F3F8] border border-[#E9E7F5] flex">
                <div className="h-full bg-[#A6D8F0] transition-all" style={{ width: `${Math.max(0, 100 - ratio)}%` }} />
                <div className="h-full bg-[#C9B6FF] transition-all" style={{ width: `${ratio}%` }} />
              </div>
              <div className="mt-2 flex justify-between text-xs font-extrabold">
                <span className="text-[#1A1E2E]/70">{(100 - ratio).toFixed(0)}% productive</span>
                <span className="text-[#1A1E2E]/70">{ratio.toFixed(0)}% doom</span>
              </div>
              <div className="mt-3 rounded-xl bg-[#FFD7DE]/40 border border-[#FFD7DE] px-3 py-2 text-xs font-bold leading-relaxed text-[#1A1E2E]">
                {ratio > 60 ? "High doomscroll — time to reclaim with a cute break!" : ratio > 35 ? "Moderate — small cuts compound fast." : "Lean week — keep the streak!"}
              </div>
            </div>
            <div className="mt-4 h-[160px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.slice(0, 6)}>
                  <XAxis dataKey="name" tick={{ fill: "#8A8EA6", fontSize: 11, fontWeight: 700 }} axisLine={false} tickLine={false} interval={0} />
                  <YAxis tick={{ fill: "#8A8EA6", fontSize: 11 }} axisLine={false} tickLine={false} width={40} />
                  <Tooltip
                    cursor={{ fill: "rgba(201,182,255,0.12)" }}
                    content={({ active, payload }) => {
                      if (!active || !payload?.[0]) return null;
                      const p = payload[0].payload;
                      return <div className="rounded-xl border border-[#E9DEF8] bg-white px-3 py-2 text-xs shadow-cute"><div className="font-extrabold text-[#1A1E2E]">{p.name}</div><div className="font-bold text-[#8A8EA6]">{formatHM(p.value)}</div></div>;
                    }}
                  />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]} fill="#C9B6FF" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-[20px] border border-[#D9CFFD] bg-[#D9CFFD]/30 p-5">
            <div className="text-xs font-extrabold uppercase tracking-widest text-[#1A1E2E]/60">Time Wasted Impact</div>
            <div className="mt-2 text-sm font-bold leading-relaxed text-[#1A1E2E]">{impact.primary}</div>
            <div className="mt-3 grid grid-cols-3 gap-2 text-center">
              <div className="rounded-xl bg-white border border-[#E9DEF8] px-2 py-3 shadow-sm"><div className="text-lg font-mono font-extrabold text-[#1A1E2E]">{impact.books}</div><div className="text-[11px] font-bold text-[#8A8EA6]">books</div></div>
              <div className="rounded-xl bg-white border border-[#E9DEF8] px-2 py-3 shadow-sm"><div className="text-lg font-mono font-extrabold text-[#1A1E2E]">{impact.workouts}</div><div className="text-[11px] font-bold text-[#8A8EA6]">workouts</div></div>
              <div className="rounded-xl bg-white border border-[#E9DEF8] px-2 py-3 shadow-sm"><div className="text-lg font-mono font-extrabold text-[#1A1E2E]">{impact.sleepNights}</div><div className="text-[11px] font-bold text-[#8A8EA6]">nights</div></div>
            </div>
            <div className="mt-3 text-xs font-semibold text-[#8A8EA6]">Based on <span className="font-mono font-extrabold text-[#1A1E2E]">{impact.hours}h</span> doomscroll. Small cute reclaims stack.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
