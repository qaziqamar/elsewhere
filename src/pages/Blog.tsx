import { Link } from "react-router-dom";
import { posts } from "../blog/posts";
import { Clock, ArrowRight } from "lucide-react";

export default function Blog() {
  return (
    <div className="bg-[#BFE6F7]/25">
      <div className="mx-auto max-w-[1080px] px-4 md:px-6 py-12 md:py-16">
      <div className="mx-auto max-w-[680px] text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#E9DEF8] bg-[#D9CFFD] px-3 py-1 text-xs font-extrabold">Blog</div>
        <h1 className="mt-3 font-display text-[30px] font-extrabold tracking-tight text-balance md:text-[40px]">Time, focus, and small wins.</h1>
        <p className="mt-2 text-sm font-semibold text-[#475069]">Short reads on making hours visible and reclaiming them. Markdown local, no CMS.</p>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {posts.map((p) => (
          <Link key={p.slug} to={`/blog/${p.slug}`} className="group rounded-[20px] border border-[#E9DEF8] bg-white p-5 shadow-cute hover:shadow-cute-hover hover:-translate-y-px transition text-left">
            <div className="flex items-center gap-2 text-xs font-extrabold">
              <span className="rounded-full bg-[#F2F3F8] border border-[#E9E7F5] px-2.5 py-1 text-[#1A1E2E]">{p.tag}</span>
              <span className="inline-flex items-center gap-1 text-[#8A8EA6]"><Clock size={12} /> {p.read} · {p.date}</span>
              <span className="ml-auto grid h-9 w-9 place-items-center rounded-full bg-[#111827] text-white opacity-100 transition md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100"><ArrowRight size={14} /></span>
            </div>
            <div className="mt-3 text-[17px] font-extrabold leading-tight text-[#1A1E2E]">{p.title}</div>
            <div className="mt-1 text-sm font-semibold leading-relaxed text-[#8A8EA6]">{p.excerpt}</div>
            <div className="mt-3 text-xs font-extrabold text-[#6B5DD3]">Read →</div>
          </Link>
        ))}
      </div>

      <div className="mt-8 rounded-[20px] border border-[#E9DEF8] bg-[#D9CFFD]/20 p-5 text-center">
        <div className="text-sm font-extrabold">Want to track now?</div>
        <Link to="/tracker" className="mt-3 inline-flex rounded-full bg-[#C9B6FF] px-5 py-2.5 text-sm font-extrabold text-[#111827] hover:bg-[#B8A6F0]">Open tracker</Link>
      </div>
      </div>
    </div>
  );
}
