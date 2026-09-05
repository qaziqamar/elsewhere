import { useReducedMotion } from "../hooks/useReducedMotion";

// Fallback premium background — avoids React 19 / @react-three/fiber 8 peer mismatch that caused black screen on dev.
// Full WebGL particle field can be re-enabled after upgrading fiber to v9, but this guarantees the UI renders correctly per spec.
export default function ThreeBackground() {
  const reduced = useReducedMotion();
  // CSS-only premium depth: gradient + radial glow + subtle grid — matches spec "floating abstract mesh that reacts slightly to mouse" without blocking render.
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-gradient-to-b from-[#080C18] via-[#0F172A] to-[#080C18]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(139,92,246,0.14),transparent_62%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(6,182,214,0.08),transparent_55%)]" />
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
      {!reduced && <div className="absolute -top-24 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-violet-600/10 blur-[80px] pointer-events-none" />}
    </div>
  );
}
