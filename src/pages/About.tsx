import { Link } from "react-router-dom";
import { Shield, Clock, Heart } from "lucide-react";

export default function About() {
  return (
    <div className="mx-auto max-w-[880px] px-4 py-10 md:px-6">
      <div className="rounded-[20px] border border-[#E9DEF8] bg-white p-6 md:p-8 shadow-cute">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#E9DEF8] bg-[#D9CFFD]/40 px-3 py-1 text-xs font-extrabold">About Scrolless</div>
        <h1 className="mt-4 text-[30px] font-extrabold leading-tight md:text-[38px]">We built a simple mirror for your week.</h1>
        <p className="mt-3 max-w-[65ch] text-[15px] leading-relaxed font-semibold text-[#8A8EA6]">
          Scrolless started as a weekend build to answer one honest question: where did my hours go? Paste Screen Time or Digital Wellbeing numbers, see breakdowns, feel the impact, and download a dated PNG. No account, no data saved on our servers - your export is your record.
        </p>

        <div id="how" className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            { icon: Clock, title: "How it works", desc: "Add hours per app with sliders or H/M inputs, tag doom vs productive, watch charts update live." },
            { icon: Shield, title: "Privacy", desc: "100% client-side. LocalStorage only on your device. We do not save data - download PNG to keep tracking." },
            { icon: Heart, title: "Why", desc: "Small reclaims compound. 30 minutes a day is 182 hours a year - a skill, 36 books, or better sleep." },
          ].map((c) => (
            <div key={c.title} className="rounded-2xl border border-[#E9E7F5] bg-[#F2F3F8] p-4">
              <c.icon size={18} className="text-[#1A1E2E]" />
              <div className="mt-2 text-sm font-extrabold">{c.title}</div>
              <div className="mt-1 text-sm font-semibold leading-relaxed text-[#8A8EA6]">{c.desc}</div>
            </div>
          ))}
        </div>

        <div id="steps" className="mt-8 rounded-2xl border border-[#E9DEF8] bg-[#D9CFFD]/20 p-5">
          <div className="text-sm font-extrabold">Find your weekly numbers</div>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm font-semibold leading-relaxed text-[#1A1E2E]/80">
            <li>iOS: Settings - Screen Time - See All Activity - Week. Tap an app for weekly total.</li>
            <li>Android: Settings - Digital Wellbeing - chart - Weekly view.</li>
            <li>Paste weekly totals, tag apps, download PNG with current date.</li>
          </ol>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/tracker" className="rounded-full bg-[#C9B6FF] px-5 py-2.5 text-sm font-extrabold text-[#111827] hover:bg-[#B8A6F0]">Try the tracker</Link>
          <Link to="/blog" className="rounded-full border border-[#E9E7F5] bg-white px-5 py-2.5 text-sm font-bold hover:bg-[#F2F3F8]">Read about time</Link>
        </div>
      </div>
    </div>
  );
}
