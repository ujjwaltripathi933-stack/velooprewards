/**
 * Mythic guardian beasts for the badge tiers — stylised silhouettes that charge
 * in from both sides behind the crest (a clash of wild power) and occasionally
 * lunge forward in front of it.
 */

export type BeastKind = "bull" | "ram" | "wolf" | "tiger" | "griffin" | "dragon" | "phoenix";

/** which beast guards which tier level (1-10) */
export const BEAST_BY_LEVEL: Record<number, BeastKind> = {
  1: "bull",
  2: "ram",
  3: "wolf",
  4: "tiger",
  5: "bull",
  6: "griffin",
  7: "griffin",
  8: "dragon",
  9: "dragon",
  10: "phoenix",
};

/** silhouettes drawn in a 100 x 60 box, facing right */
function Shape({ kind }: { kind: BeastKind }) {
  switch (kind) {
    case "bull":
    case "tiger":
      return (
        <g>
          <ellipse cx="56" cy="28" rx="23" ry="12" />
          <path d="M38 18 Q56 8 72 20 L70 30 L38 30 Z" />
          <path d="M34 20 L16 24 L10 36 L20 41 L34 37 Z" />
          <path d="M18 23 Q6 12 1 15 Q11 19 15 28 Z" />
          <path d="M30 17 Q24 6 18 6 Q26 12 28 20 Z" />
          <path d="M78 20 Q90 24 88 46 L83 46 Q85 30 75 26 Z" />
          <rect x="38" y="36" width="6" height="21" rx="2" />
          <rect x="50" y="37" width="6" height="20" rx="2" />
          <rect x="64" y="36" width="6" height="21" rx="2" />
          <rect x="74" y="37" width="6" height="20" rx="2" />
          {kind === "tiger" && <path d="M40 12 L46 4 L52 12 Z" />}
        </g>
      );
    case "ram":
      return (
        <g>
          <ellipse cx="58" cy="28" rx="22" ry="12" />
          <path d="M36 20 L18 24 L12 35 L22 40 L36 36 Z" />
          <path d="M20 22 Q4 18 6 32 Q10 22 20 28 Z" />
          <path d="M22 20 Q10 10 4 16 Q14 18 19 26 Z" />
          <path d="M78 20 Q88 24 86 42 L81 42 Q84 30 74 26 Z" />
          <rect x="40" y="36" width="6" height="21" rx="2" />
          <rect x="52" y="37" width="6" height="20" rx="2" />
          <rect x="66" y="36" width="6" height="21" rx="2" />
          <rect x="75" y="37" width="6" height="20" rx="2" />
        </g>
      );
    case "wolf":
      return (
        <g>
          <ellipse cx="58" cy="30" rx="24" ry="10" />
          <path d="M36 24 L16 28 L8 36 L20 41 L36 38 Z" />
          <path d="M22 26 L18 14 L28 22 Z" />
          <path d="M32 24 L30 12 L38 22 Z" />
          <path d="M80 24 Q96 22 98 40 Q88 30 76 30 Z" />
          <rect x="40" y="37" width="5" height="20" rx="2" />
          <rect x="50" y="38" width="5" height="19" rx="2" />
          <rect x="66" y="37" width="5" height="20" rx="2" />
          <rect x="75" y="38" width="5" height="19" rx="2" />
        </g>
      );
    case "griffin":
      return (
        <g>
          <ellipse cx="58" cy="32" rx="22" ry="11" />
          <path d="M38 26 L22 26 L12 34 L22 41 L38 38 Z" />
          <path d="M14 30 L2 26 L14 36 Z" />
          <path d="M46 24 Q30 2 12 6 Q34 12 44 30 Z" />
          <path d="M56 24 Q52 0 76 -2 Q60 10 62 28 Z" />
          <path d="M78 28 Q94 26 96 46 Q86 32 74 34 Z" />
          <rect x="44" y="40" width="6" height="18" rx="2" />
          <rect x="66" y="40" width="6" height="18" rx="2" />
        </g>
      );
    case "dragon":
      return (
        <g>
          <ellipse cx="56" cy="34" rx="22" ry="10" />
          <path d="M38 30 Q22 30 20 18 Q18 8 28 6 Q22 14 30 20 L42 26 Z" />
          <path d="M26 8 L14 2 L24 14 Z" />
          <path d="M50 26 Q40 -4 74 -6 Q52 8 58 30 Z" />
          <path d="M60 26 Q66 0 96 8 Q68 12 68 30 Z" />
          <path d="M76 30 Q98 28 92 54 Q90 36 72 36 Z" />
          <path d="M42 42 L48 58 L52 44 Z" />
          <path d="M62 42 L68 58 L72 44 Z" />
        </g>
      );
    case "phoenix":
      return (
        <g>
          <ellipse cx="52" cy="34" rx="16" ry="12" />
          <path d="M44 26 Q40 12 50 6 Q48 16 54 24 Z" />
          <path d="M48 8 L38 2 L50 14 Z" />
          <path d="M42 26 Q20 -4 2 6 Q28 10 40 32 Z" />
          <path d="M62 26 Q84 -4 100 8 Q74 10 64 32 Z" />
          <path d="M60 40 Q84 46 96 34 Q78 52 58 48 Z" />
          <path d="M56 44 Q70 58 86 56 Q64 62 52 50 Z" />
        </g>
      );
  }
}

export function BadgeBeast({
  kind,
  color,
  flip = false,
  className,
  style,
  opacity = 0.55,
}: {
  kind: BeastKind;
  color: string;
  flip?: boolean;
  className?: string;
  style?: React.CSSProperties;
  opacity?: number;
}) {
  return (
    <svg
      viewBox="-4 -8 108 72"
      aria-hidden="true"
      className={className}
      style={style}
      preserveAspectRatio="xMidYMid meet"
    >
      <g
        fill={color}
        opacity={opacity}
        transform={flip ? "translate(100,0) scale(-1,1)" : undefined}
      >
        <Shape kind={kind} />
      </g>
    </svg>
  );
}
