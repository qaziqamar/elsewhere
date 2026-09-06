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
          <img src="/logo.png" alt="Elsewhere logo" className="h-9 w-9 rounded-xl object-cover" />
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

function Footer() {
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
    <footer className="w-full bg-white/60 px-4 py-8 backdrop-blur md:px-6">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <nav aria-label="Footer" className="flex flex-col items-start gap-0.5">
          <button onClick={() => scrollTo("hero")} className="rounded-md px-1 py-1 text-[13px] font-bold text-[#5F647E] decoration-[#C9B6FF] decoration-2 underline-offset-4 transition hover:text-[#1A1E2E] hover:underline focus-visible:outline-2 focus-visible:outline-[#6B5DD3]">Home</button>
          <button onClick={() => scrollTo("about")} className="rounded-md px-1 py-1 text-[13px] font-bold text-[#5F647E] decoration-[#C9B6FF] decoration-2 underline-offset-4 transition hover:text-[#1A1E2E] hover:underline focus-visible:outline-2 focus-visible:outline-[#6B5DD3]">About</button>
          <button onClick={() => scrollTo("blog")} className="rounded-md px-1 py-1 text-[13px] font-bold text-[#5F647E] decoration-[#C9B6FF] decoration-2 underline-offset-4 transition hover:text-[#1A1E2E] hover:underline focus-visible:outline-2 focus-visible:outline-[#6B5DD3]">Blog</button>
        </nav>
        <p className="max-w-[62ch] text-[13px] font-medium leading-[1.7] text-[#475069] [text-wrap:pretty] sm:max-w-[38ch] sm:text-right">
          Built by an Asian developer who loves solving problems with vibe coding. Questions or feedback? Contact the builder on X — <a href="https://x.com/siddqamar_ai" target="_blank" rel="noopener noreferrer" className="font-extrabold text-[#1A1E2E] underline decoration-[#C9B6FF] decoration-2 underline-offset-4 transition hover:text-[#6B5DD3]">@siddqamar_ai</a>
        </p>
      </div>
    </footer>
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
        <Footer />
      </div>
    </BrowserRouter>
  );
}
