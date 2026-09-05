import { useReducedMotion } from "../hooks/useReducedMotion";

export default function ThreeBackground() {
  const reduced = useReducedMotion();
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#F2F3F8]" aria-hidden>
      <div className="absolute -top-32 -left-32 h-[520px] w-[620px] rounded-full bg-[#D9CFFD]/35 blur-[60px]" />
      <div className="absolute top-10 right-0 h-[420px] w-[520px] rounded-full bg-[#BFE6F7]/30 blur-[50px]" />
      <div className="absolute bottom-0 right-20 h-[300px] w-[600px] rounded-full bg-[#D6F0E6]/30 blur-[50px]" />
      <div className="absolute inset-0 opacity-[0.035]" style={{ backgroundImage: "linear-gradient(#1A1E2E 1px, transparent 1px), linear-gradient(90deg, #1A1E2E 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
      {!reduced && <div className="absolute top-20 left-1/2 h-[180px] w-[380px] -translate-x-1/2 rounded-full bg-white/40 blur-[40px] pointer-events-none" />}
    </div>
  );
}
