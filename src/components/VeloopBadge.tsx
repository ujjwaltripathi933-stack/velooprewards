import { Lock } from "lucide-react";
import type { BadgeTier } from "@/lib/badges";
import { BADGE_ART } from "@/lib/badgeArt";

type Props = {
  tier: BadgeTier;
  size?: number;
  locked?: boolean;
  className?: string;
  /** hide the level chip (e.g. inside compact usage previews) */
  hideLevel?: boolean;
  eager?: boolean;
};

/**
 * VELOOP achievement badge — high-fidelity 3D metallic crest artwork on a fully
 * transparent canvas, so the badge drops onto any surface. Locked tiers are
 * desaturated with a lock seal; unlocked tiers carry a tier-coloured aura.
 */
export function VeloopBadge({
  tier,
  size = 132,
  locked = false,
  className,
  hideLevel = false,
  eager = false,
}: Props) {
  const art = BADGE_ART[tier.level];

  return (
    <div
      className={`relative inline-flex shrink-0 items-center justify-center ${className ?? ""}`}
      style={{ width: size, height: size }}
    >
      {/* tier aura */}
      {!locked && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-full blur-xl"
          style={{
            background: `radial-gradient(circle at 50% 52%, ${tier.glow}66 0%, ${tier.glow}1f 45%, transparent 72%)`,
          }}
        />
      )}

      <img
        src={art}
        alt={`${tier.name} badge — level ${tier.level}, ${tier.title}${locked ? " (locked)" : " (unlocked)"}`}
        width={816}
        height={816}
        loading={eager ? "eager" : "lazy"}
        className="relative h-full w-full object-contain"
        style={{
          filter: locked
            ? "saturate(0.16) brightness(0.62) contrast(0.95)"
            : `drop-shadow(0 8px 18px ${tier.glow}55)`,
        }}
      />

      {/* locked seal */}
      {locked && (
        <span
          aria-hidden
          className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-[#0b0d18]/75 backdrop-blur-[1px]"
          style={{ width: size * 0.26, height: size * 0.26 }}
        >
          <Lock style={{ width: size * 0.13, height: size * 0.13 }} className="text-white/70" />
        </span>
      )}

      {/* level chip */}
      {!hideLevel && (
        <span
          aria-hidden
          className="absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-full border px-2 py-[2px] font-display text-[10px] font-extrabold leading-none tracking-widest"
          style={{
            borderColor: locked ? "rgba(255,255,255,0.12)" : `${tier.glow}80`,
            background: locked ? "rgba(11,13,24,0.9)" : `linear-gradient(180deg, ${tier.metal[1]}, ${tier.metal[2]})`,
            color: locked ? "rgba(255,255,255,0.45)" : "#12141f",
            boxShadow: locked ? "none" : `0 4px 12px ${tier.glow}40`,
          }}
        >
          LV {String(tier.level).padStart(2, "0")}
        </span>
      )}
    </div>
  );
}
