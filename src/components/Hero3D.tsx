// Hero - left-aligned, original orientation, gentle bounce (no flip)
import { motion } from "framer-motion";

export default function Hero3D() {
  return (
    <div className="relative flex w-full max-w-[560px] items-center justify-start overflow-visible mr-auto">
      {/* soft glows - now on left */}
      <div className="pointer-events-none absolute left-[6%] top-1/2 h-[360px] w-[360px] -translate-y-1/2 rounded-full bg-[#D9CFFD]/22 blur-[54px] sm:h-[420px] sm:w-[420px] sm:left-[4%]" aria-hidden />
      <div className="pointer-events-none absolute left-[2%] top-[62%] h-[220px] w-[360px] rounded-full bg-[#BFE6F7]/16 blur-[40px] sm:h-[260px] sm:w-[520px]" aria-hidden />

      <motion.div
        initial={{ opacity: 0, y: 14, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full"
      >
        {/* bounce wrapper - restored, no flip */}
        <div className="animate-float mr-auto w-fit origin-center will-change-transform">
          <picture>
            <source srcSet="/hero-mascot.webp" type="image/webp" />
            <img
              src="/hero-mascot.png"
              alt="Chubby mascot in grey beanie doomscrolling on a blue bean bag"
              width={776}
              height={723}
              loading="eager"
              decoding="async"
              draggable={false}
              className="relative z-10 mr-auto ml-0 h-auto w-[78vw] max-w-[320px] object-contain object-left drop-shadow-[0_18px_36px_rgba(26,107,255,0.16)] drop-shadow-[0_6px_12px_rgba(26,30,46,0.08)] select-none sm:w-[62vw] sm:max-w-[420px] md:max-w-[460px] lg:w-full lg:max-w-[520px]"
              style={{ background: "transparent" }}
            />
          </picture>
        </div>
        {/* grounded shadow - left */}
        <div className="pointer-events-none absolute bottom-[2%] left-[8%] h-[14px] w-[52%] rounded-full bg-[#1A1E2E]/10 blur-[12px] sm:h-[20px] sm:w-[58%] sm:blur-[14px] sm:left-[6%] lg:left-[4%] lg:w-[62%]" aria-hidden />
      </motion.div>
    </div>
  );
}
