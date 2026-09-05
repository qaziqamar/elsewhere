import ThreeBackground from "./components/ThreeBackground";
import Dashboard from "./components/Dashboard";

export default function App() {
  return (
    <div className="relative grain min-h-screen bg-[#F2F3F8] text-[#1A1E2E]">
      <ThreeBackground />
      <header className="sticky top-0 z-30 border-b border-[#E9DEF8] bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex h-[64px] max-w-[1280px] items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-[#111827] text-white font-extrabold tracking-tight shadow">S</div>
            <div className="leading-none">
              <div className="text-sm font-extrabold tracking-tight">Scrolless</div>
              <div className="text-[11px] font-bold tracking-widest text-[#8A8EA6]">RECLAIM YOUR HOURS</div>
            </div>
          </div>
          <nav className="hidden items-center gap-2 md:flex">
            <span className="rounded-full border border-[#E9E7F5] bg-[#F2F3F8] px-3 py-1.5 text-xs font-bold text-[#1A1E2E]">Private · on-device</span>
            <span className="rounded-full bg-[#111827] px-3 py-1.5 text-xs font-bold text-white">Weekly</span>
          </nav>
        </div>
      </header>
      <main>
        <Dashboard />
      </main>
      <footer className="mx-auto mt-8 max-w-[1280px] border-t border-[#E9E7F5] bg-white/60 px-4 py-8 text-center backdrop-blur md:px-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#E9DEF8] bg-[#D9CFFD]/30 px-3 py-1 text-xs font-bold text-[#1A1E2E]">
          <span className="h-2 w-2 rounded-full bg-[#C9B6FF] animate-pulse" /> Soft build
        </div>
        <p className="mt-3 text-[13px] font-semibold leading-relaxed text-[#1A1E2E]">
          Built with curiosity by a vibe coder - <a href="https://x.com/siddamar_ai" target="_blank" rel="noopener noreferrer" className="font-extrabold underline decoration-[#C9B6FF] decoration-2 underline-offset-4 hover:text-[#6B5DD3]"> @siddamar_ai</a>
        </p>
        <p className="mx-auto mt-1 max-w-[56ch] text-xs leading-relaxed text-[#8A8EA6]">Crafted with Impeccable + Taste skills, pastel system and a lot of cartoon love. 100% client-side.</p>
        <p className="mt-3 text-[11px] font-bold tracking-widest text-[#C4C7D8]">{new Date().getFullYear()} SCROLLESS</p>
      </footer>
    </div>
  );
}
