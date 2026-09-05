import { BrowserRouter, Routes, Route, NavLink, Link } from "react-router-dom";
import ThreeBackground from "./components/ThreeBackground";
import Home from "./pages/Home";
import About from "./pages/About";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Tracker from "./pages/Tracker";

function Header() {
  const linkCls = ({ isActive }: { isActive: boolean }) =>
    `rounded-full px-3.5 py-1.5 text-xs font-extrabold transition ${isActive ? "bg-[#111827] text-white" : "text-[#8A8EA6] hover:text-[#1A1E2E] hover:bg-white"}`;
  return (
    <header className="sticky top-0 z-30 border-b border-[#E9DEF8] bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-[64px] max-w-[1280px] items-center justify-between px-4 md:px-6">
        <Link to="/" className="flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-[#111827] text-white font-extrabold">S</div>
          <div className="leading-none">
            <div className="text-sm font-extrabold tracking-tight">Scrolless</div>
            <div className="text-[11px] font-bold tracking-widest text-[#8A8EA6]">RECLAIM YOUR HOURS</div>
          </div>
        </Link>
        <nav className="flex items-center gap-1">
          <NavLink to="/" className={linkCls}>Home</NavLink>
          <NavLink to="/about" className={linkCls}>About</NavLink>
          <NavLink to="/blog" className={linkCls}>Blog</NavLink>
          <NavLink to="/tracker" className={linkCls}>Tracker</NavLink>
        </nav>
      </div>
    </header>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="relative grain min-h-screen bg-[#F2F3F8] text-[#1A1E2E] flex flex-col">
        <ThreeBackground />
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/tracker" element={<Tracker />} />
            <Route path="*" element={<div className="p-10 text-center font-bold">404 - Not found</div>} />
          </Routes>
        </main>
        <footer className="mx-auto mt-8 w-full max-w-[1280px] border-t border-[#E9E7F5] bg-white/60 px-4 py-8 text-center backdrop-blur md:px-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#E9DEF8] bg-[#D9CFFD]/30 px-3 py-1 text-xs font-bold text-[#1A1E2E]">
            <span className="h-2 w-2 rounded-full bg-[#C9B6FF] animate-pulse" /> Weekend build
          </div>
          <p className="mt-3 text-[13px] font-semibold leading-relaxed text-[#1A1E2E]">
            Weekend-built by an Asian developer who loves solving problems with vibe coding - <a href="https://x.com/siddamar_ai" target="_blank" rel="noopener noreferrer" className="font-extrabold underline decoration-[#C9B6FF] decoration-2 underline-offset-4 hover:text-[#6B5DD3]">@siddamar_ai</a>
          </p>
          <p className="mx-auto mt-1 max-w-[56ch] text-xs leading-relaxed text-[#8A8EA6]">Free to use · No data saved · Pastel system · 100% client-side. Your PNG with date is your record.</p>
          <p className="mt-3 text-[11px] font-bold tracking-widest text-[#C4C7D8]">{new Date().getFullYear()} SCROLLESS</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}
