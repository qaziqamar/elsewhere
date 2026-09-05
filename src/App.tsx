import ThreeBackground from "./components/ThreeBackground";
import Dashboard from "./components/Dashboard";

export default function App() {
  return (
    <div className="relative grain">
      <ThreeBackground />
      {/* top nav — single line, max 80px, not centered hero */}
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#080C18]/70 backdrop-blur-xl">
        <div className="mx-auto flex h-[64px] max-w-[1280px] items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-white text-black font-extrabold tracking-tight">S</div>
            <div className="leading-none">
              <div className="text-sm font-extrabold tracking-tight">Scrolless</div>
              <div className="text-[11px] font-semibold tracking-widest text-slate-400">RECLAIM YOUR HOURS</div>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2 text-xs font-semibold text-slate-400">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">Private · on-device</span>
            <span className="rounded-full bg-white px-3 py-1.5 text-black">Weekly</span>
          </div>
        </div>
      </header>
      <main>
        <Dashboard />
      </main>
    </div>
  );
}
