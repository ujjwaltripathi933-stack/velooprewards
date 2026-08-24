import { Lock } from "lucide-react";
import type { BadgeTier } from "@/lib/badges";

type Props = {
  tier: BadgeTier;
  size?: number;
  locked?: boolean;
  className?: string;
};

/**
 * Parametric VELOOP achievement badge.
 * Single consistent geometry (hex-crest + inner gem plate + VE emblem + level ribbon),
 * with ornamentation, gem count, crown and wings scaling by tier.
 * Renders on a fully transparent canvas so the badge works on any surface.
 */
export function VeloopBadge({ tier, size = 132, locked = false, className }: Props) {
  const id = `b${tier.level}${locked ? "l" : "u"}`;
  const [m1, m2, m3] = tier.metal;
  const [g1, g2, g3] = tier.gem;

  return (
    <svg
      viewBox="0 0 140 168"
      width={size}
      height={(size / 140) * 168}
      role="img"
      aria-label={`${tier.name} badge — level ${tier.level} ${tier.title}${locked ? ", locked" : ", unlocked"}`}
      className={className}
      style={locked ? { filter: "saturate(0.28) brightness(0.78)" } : undefined}
    >
      <defs>
        <linearGradient id={`${id}-metal`} x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0%" stopColor={m1} />
          <stop offset="42%" stopColor={m2} />
          <stop offset="100%" stopColor={m3} />
        </linearGradient>
        <linearGradient id={`${id}-metal2`} x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={m2} />
          <stop offset="60%" stopColor={m1} />
          <stop offset="100%" stopColor={m3} />
        </linearGradient>
        <radialGradient id={`${id}-gem`} cx="0.38" cy="0.28" r="0.85">
          <stop offset="0%" stopColor={g1} />
          <stop offset="48%" stopColor={g2} />
          <stop offset="100%" stopColor={g3} />
        </radialGradient>
        <linearGradient id={`${id}-shine`} x1="0" y1="0" x2="0.7" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="45%" stopColor="#ffffff" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <filter id={`${id}-glow`} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="5" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <clipPath id={`${id}-clip`}>
          <path d="M70 30 L112 52 V102 L70 132 L28 102 V52 Z" />
        </clipPath>
      </defs>

      {/* aura */}
      {!locked && (
        <ellipse cx="70" cy="84" rx="52" ry="54" fill={tier.glow} opacity="0.16" filter={`url(#${id}-glow)`} />
      )}

      {/* wings (legend only) */}
      {tier.wings && (
        <g fill={`url(#${id}-metal2)`} opacity="0.95">
          <path d="M30 66 C12 62 4 74 2 88 C16 84 20 90 30 92 Z" />
          <path d="M32 82 C16 82 8 92 8 104 C20 98 26 102 33 104 Z" />
          <path d="M110 66 C128 62 136 74 138 88 C124 84 120 90 110 92 Z" />
          <path d="M108 82 C124 82 132 92 132 104 C120 98 114 102 107 104 Z" />
        </g>
      )}

      {/* laurel / side ornaments */}
      {tier.ornament >= 2 && (
        <g stroke={m2} strokeWidth="2.4" fill="none" opacity="0.9" strokeLinecap="round">
          <path d="M24 60 C12 74 12 96 24 110" />
          <path d="M116 60 C128 74 128 96 116 110" />
        </g>
      )}
      {tier.ornament >= 3 && (
        <g fill={m1} opacity="0.85">
          <circle cx="19" cy="85" r="3.2" />
          <circle cx="121" cy="85" r="3.2" />
        </g>
      )}

      {/* crown */}
      {tier.crown && (
        <g>
          <path
            d="M46 30 L54 16 L62 26 L70 10 L78 26 L86 16 L94 30 Z"
            fill={`url(#${id}-metal)`}
            stroke={m3}
            strokeWidth="1.2"
          />
          <circle cx="70" cy="9" r="3.4" fill={g2} />
          <circle cx="54" cy="15" r="2.4" fill={g2} />
          <circle cx="86" cy="15" r="2.4" fill={g2} />
        </g>
      )}

      {/* outer crest frame */}
      <path
        d="M70 24 L118 49 V104 L70 138 L22 104 V49 Z"
        fill={`url(#${id}-metal)`}
        stroke={m3}
        strokeWidth="2"
      />
      {/* frame bevel */}
      <path
        d="M70 30 L112 52 V102 L70 132 L28 102 V52 Z"
        fill={`url(#${id}-metal2)`}
        opacity="0.55"
      />
      {/* inner plate */}
      <path d="M70 38 L105 56 V99 L70 125 L35 99 V56 Z" fill={`url(#${id}-gem)`} />
      {tier.ornament >= 1 && (
        <path
          d="M70 44 L100 60 V96 L70 118 L40 96 V60 Z"
          fill="none"
          stroke={m1}
          strokeWidth="1.4"
          opacity="0.7"
        />
      )}
      {tier.ornament >= 4 && (
        <path
          d="M70 50 L95 63 V93 L70 111 L45 93 V63 Z"
          fill="none"
          stroke={m1}
          strokeWidth="0.9"
          opacity="0.45"
          strokeDasharray="3 3"
        />
      )}

      {/* faceted gem highlight */}
      <g clipPath={`url(#${id}-clip)`}>
        <path d="M70 38 L105 56 L70 78 L35 56 Z" fill="#ffffff" opacity="0.12" />
        <path d="M14 40 L60 12 L74 34 L28 62 Z" fill={`url(#${id}-shine)`} />
      </g>

      {/* VE emblem */}
      <g>
        <path
          d="M56 62 L70 96 L84 62"
          fill="none"
          stroke={m1}
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M56 62 L70 96 L84 62"
          fill="none"
          stroke={m3}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.5"
        />
        <circle cx="70" cy="55" r="3" fill={m1} />
      </g>

      {/* rank gems */}
      {Array.from({ length: tier.gems }).map((_, i) => {
        const spread = 11;
        const x = 70 + (i - (tier.gems - 1) / 2) * spread;
        return (
          <g key={i}>
            <path
              d={`M${x} 101 l4 4 -4 4 -4 -4 Z`}
              fill={g1}
              stroke={m3}
              strokeWidth="0.8"
            />
          </g>
        );
      })}

      {/* level ribbon */}
      <g>
        <path
          d="M46 118 H94 L88 133 H52 Z"
          fill={`url(#${id}-metal)`}
          stroke={m3}
          strokeWidth="1.2"
        />
        <text
          x="70"
          y="129.5"
          textAnchor="middle"
          fontSize="11"
          fontWeight="800"
          fontFamily="Sora, sans-serif"
          fill={m3}
        >
          {String(tier.level).padStart(2, "0")}
        </text>
      </g>

      {locked && (
        <g>
          <circle cx="70" cy="84" r="14" fill="#0b0d18" opacity="0.72" stroke="#c9d2e0" strokeWidth="1" strokeOpacity="0.35" />
          <foreignObject x="61" y="75" width="18" height="18">
            <Lock className="h-[18px] w-[18px] text-silver" />
          </foreignObject>
        </g>
      )}
    </svg>
  );
}
