import { useEffect, type ReactNode } from "react";
import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ThreeBackground from "./components/ThreeBackground";
import { useReducedMotion } from "./hooks/useReducedMotion";
import Home from "./pages/Home";
import About from "./pages/About";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Tracker from "./pages/Tracker";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function PageTransition({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, y: reduced ? 0 : 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: reduced ? 0 : -6 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const scrollTo = (id: string) => {
    if (location.pathname === "/") {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 100);
    }
  };
  return (
    <header className="sticky top-0 z-30 border-b border-[#E9DEF8] bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-[64px] max-w-[1280px] items-center justify-between px-4 md:px-6">
        <Link to="/" className="flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-[#111827] text-white font-extrabold">E</div>
          <div className="leading-none">
            <div className="text-sm font-extrabold tracking-tight">Elsewhere</div>
            <div className="text-[11px] font-bold tracking-widest text-[#8A8EA6]">RECLAIM YOUR HOURS</div>
          </div>
        </Link>
        <nav className="flex items-center gap-1">
          <button onClick={() => scrollTo("hero")} className="rounded-full px-3.5 py-1.5 text-xs font-extrabold hover:bg-white text-[#8A8EA6] hover:text-[#1A1E2E]">Home</button>
          <button onClick={() => scrollTo("about")} className="hidden rounded-full px-3.5 py-1.5 text-xs font-extrabold hover:bg-white text-[#8A8EA6] hover:text-[#1A1E2E] sm:inline-flex">About</button>
          <button onClick={() => scrollTo("blog")} className="hidden rounded-full px-3.5 py-1.5 text-xs font-extrabold hover:bg-white text-[#8A8EA6] hover:text-[#1A1E2E] sm:inline-flex">Blog</button>
          <button onClick={() => scrollTo("tracker")} className="rounded-full bg-[#111827] px-3.5 py-1.5 text-xs font-extrabold text-white">Tracker</button>
        </nav>
      </div>
    </header>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="relative grain min-h-screen bg-[#F2F3F8] text-[#1A1E2E] flex flex-col">
        <ThreeBackground />
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<PageTransition><Home /></PageTransition>} />
            <Route path="/about" element={<PageTransition><About /></PageTransition>} />
            <Route path="/blog" element={<PageTransition><Blog /></PageTransition>} />
            <Route path="/blog/:slug" element={<PageTransition><BlogPost /></PageTransition>} />
            <Route path="/tracker" element={<PageTransition><Tracker /></PageTransition>} />
            <Route path="*" element={<div className="p-10 text-center font-bold">404 - Not found</div>} />
          </Routes>
        </main>
        <footer className="w-full bg-white/60 px-4 py-10 text-center backdrop-blur md:px-6">
          <div className="mx-auto max-w-[1280px]">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#E9DEF8] bg-[#D9CFFD]/30 px-3 py-1 text-xs font-bold text-[#1A1E2E]">
            <span className="h-2 w-2 rounded-full bg-[#C9B6FF] animate-pulse" /> Weekend build
          </div>
          <p className="mx-auto mt-3 max-w-[62ch] text-[13px] font-semibold leading-relaxed text-[#1A1E2E]">
            I started with why: I wanted an honest mirror for my week — without another creepy app, signup, or server watching me. So I vibe-coded Elsewhere: paste your numbers, see where your hours went, keep the PNG.
          </p>
          <p className="mt-2 text-[13px] font-semibold leading-relaxed text-[#1A1E2E]">
            Built by an Asian developer who loves solving problems with vibe coding — <a href="https://x.com/siddqamar_ai" target="_blank" rel="noopener noreferrer" className="font-extrabold underline decoration-[#C9B6FF] decoration-2 underline-offset-4 hover:text-[#6B5DD3]">@siddqamar_ai</a>
          </p>
          <p className="mt-2 text-[13px] font-extrabold text-[#1A1E2E]">
            Questions or feedback? Contact the builder on X — <a href="https://x.com/siddqamar_ai" target="_blank" rel="noopener noreferrer" className="underline decoration-[#C9B6FF] decoration-2 underline-offset-4 hover:text-[#6B5DD3]">@siddqamar_ai</a>
          </p>
          <p className="mx-auto mt-2 max-w-[56ch] text-xs leading-relaxed text-[#8A8EA6]">Free to use · No data saved · 100% client-side. Your PNG with date is your record.</p>
          <p className="mt-3 text-xs font-bold tracking-widest text-[#8A8EA6]">{new Date().getFullYear()} ELSEWHERE</p>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}
