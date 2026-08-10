import { marqueeClaims } from "@/lib/motion";

export function Marquee() {
  const items = [...marqueeClaims, ...marqueeClaims];

  return (
    <div
      className="relative overflow-hidden border-y border-forest/10 bg-forest py-3 text-cream sm:py-3.5"
      role="presentation"
      aria-hidden="true"
    >
      <div className="marquee-track gap-0">
        {items.map((claim, i) => (
          <span
            key={`${claim}-${i}`}
            className="flex shrink-0 items-center gap-4 px-4 text-xs font-semibold uppercase tracking-[0.16em] sm:gap-6 sm:px-6 sm:text-sm md:text-base"
          >
            <span className="text-gold">✦</span>
            {claim}
          </span>
        ))}
      </div>
    </div>
  );
}
