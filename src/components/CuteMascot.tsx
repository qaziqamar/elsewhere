// Cute cartoon mascots — thick outline, pastel fills, kawaii eyes
export function StarSpike({ className = "" }: { className?: string }) {
  return (
    <div className={`animate-float ${className}`} aria-hidden>
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <path d="M50 8 L62 30 L86 32 L68 48 L73 74 L50 60 L27 74 L32 48 L14 32 L38 30 Z" fill="#C9B6FF" stroke="#111827" strokeWidth="3" strokeLinejoin="round" />
        <circle cx="42" cy="44" r="7" fill="#111827" /><circle cx="58" cy="44" r="7" fill="#111827" />
        <circle cx="44" cy="42" r="2.5" fill="#fff" /><circle cx="60" cy="42" r="2.5" fill="#fff" />
        <ellipse cx="42" cy="54" rx="4" ry="2.5" fill="#FFB6C5" opacity="0.7" /><ellipse cx="58" cy="54" rx="4" ry="2.5" fill="#FFB6C5" opacity="0.7" />
        <path d="M45 58 Q50 62 55 58" stroke="#111827" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M28 22 L22 12 M72 22 L78 12 M50 6 L50 0" stroke="#111827" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    </div>
  );
}
export function Wavy({ className = "" }: { className?: string }) {
  return (
    <div className={`animate-float ${className}`} style={{ animationDelay: "0.4s" }} aria-hidden>
      <svg viewBox="0 0 100 80" className="w-full h-full">
        <path d="M20 40 Q10 20 30 15 Q40 28 50 15 Q60 28 70 15 Q90 20 80 40 Q90 60 70 65 Q60 52 50 65 Q40 52 30 65 Q10 60 20 40" fill="#FFD7DE" stroke="#111827" strokeWidth="3" strokeLinejoin="round" />
        <circle cx="38" cy="38" r="6" fill="#111827" /><circle cx="62" cy="38" r="6" fill="#111827" />
        <circle cx="40" cy="36" r="2" fill="#fff" /><circle cx="64" cy="36" r="2" fill="#fff" />
        <path d="M45 50 Q50 54 55 50" stroke="#111827" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M50 12 L50 6 M30 18 L26 10 M70 18 L74 10" stroke="#111827" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
  );
}
export function CloudPuff({ className = "" }: { className?: string }) {
  return (
    <div className={`animate-float ${className}`} style={{ animationDelay: "0.8s" }} aria-hidden>
      <svg viewBox="0 0 100 60" className="w-full h-full">
        <path d="M18 38 Q8 28 18 18 Q28 8 44 14 Q54 6 68 14 Q84 12 88 26 Q96 34 88 42 Q78 52 58 48 Q48 52 32 46 Q14 44 18 38" fill="#D6F0E6" stroke="#111827" strokeWidth="3" strokeLinejoin="round" />
        <circle cx="38" cy="32" r="5" fill="#111827" /><circle cx="62" cy="32" r="5" fill="#111827" />
        <circle cx="39.5" cy="30.5" r="1.6" fill="#fff" /><circle cx="63.5" cy="30.5" r="1.6" fill="#fff" />
        <path d="M46 40 Q50 43 54 40" stroke="#111827" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      </svg>
    </div>
  );
}
