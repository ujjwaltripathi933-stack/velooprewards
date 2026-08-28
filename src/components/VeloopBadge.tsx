import { Lock } from "lucide-react";
import type { BadgeTier } from "@/lib/badges";
import { BADGE_ART } from "@/lib/badgeArt";
import { BadgeBeast, BEAST_BY_LEVEL } from "@/components/BadgeBeast";


type Props = {
  tier: BadgeTier;
  size?: number;
  locked?: boolean;
  className?: string;
  /** hide the level chip (e.g. inside compact usage previews) */
  hideLevel?: boolean;
  eager?: boolean;
};

const RARITY_RANK: Record<BadgeTier["rarity"], number> = {
  Common: 0,
  Uncommon: 1,
  Rare: 2,
  Epic: 3,
  Mythic: 4,
  Legendary: 5,
};

const SPARKLE_SPOTS = [
  { top: "8%", left: "16%", scale: 1, delay: "0s" },
  { top: "14%", left: "80%", scale: 0.8, delay: "0.9s" },
  { top: "68%", left: "10%", scale: 0.7, delay: "1.6s" },
  { top: "76%", left: "84%", scale: 0.9, delay: "2.1s" },
  { top: "40%", left: "50%", scale: 0.6, delay: "1.2s" },
];

function Sparkle({ color, size }: { color: string; size: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
      <path
        d="M12 0 L14.2 9.8 L24 12 L14.2 14.2 L12 24 L9.8 14.2 L0 12 L9.8 9.8 Z"
        fill={color}
      />
    </svg>
  );
}

/**
 * VELOOP achievement badge — high-fidelity 3D metallic crest artwork on a fully
 * transparent canvas. Unlocked tiers gain a rarity-scaled animation kit:
 * breathing float, pulsing aura, orbiting motes, sparkles, mythic pulse rings
 * and a legendary metal shine sweep. Locked tiers stay dim and still.
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
  const rank = RARITY_RANK[tier.rarity];
  const alive = true;
  /** locked tiers still animate, just as a dim silver-grey preview of the unlock */
  const fx = locked ? 0.3 : 1;
  const fxColor = locked ? "#9aa3b5" : tier.glow;

  const showAura = true;
  const showHalo = rank >= 1;
  const showSparkles = rank >= 2;
  const showOrbit = rank >= 3;
  const showRings = rank >= 4;
  const showShine = rank >= 3 && !locked;

  const sparkleCount = rank >= 5 ? 5 : rank >= 4 ? 4 : rank >= 3 ? 3 : 2;
  const orbitMotes = rank >= 5 ? 4 : rank >= 4 ? 3 : 2;

  const beast = BEAST_BY_LEVEL[tier.level] ?? "bull";
  const beastCycle = `${8.5 - rank * 0.5}s`;
  const beastSize = size * 0.92;
  /** beasts only roam on the large hero/grid crests — small chips stay clean */
  const showBeasts = size >= 96;


  return (
    <div
      className={`relative inline-flex shrink-0 items-center justify-center ${className ?? ""}`}
      style={{ width: size, height: size }}
    >
      {/* tier aura */}
      {showAura && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-full blur-xl animate-badge-aura"
          style={{
            background: `radial-gradient(circle at 50% 52%, ${fxColor}66 0%, ${fxColor}1f 45%, transparent 72%)`,
            animationDuration: `${4.4 - rank * 0.35}s`,
            opacity: fx,
          }}
        />
      )}

      {/* charged energy frame — legendary card border glow */}
      {showBeasts && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-[-6%] rounded-[26%] animate-fx-frame-charge"
          style={{
            border: `${Math.max(1, size * 0.01)}px solid ${fxColor}`,
            boxShadow: `0 0 ${size * 0.12}px ${fxColor}80`,
            opacity: 0.4 * fx,
            animationDuration: `${3.2 - rank * 0.18}s`,
          }}
        />
      )}


      {/* flame crown licking up behind the crest */}
      {showBeasts && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-full"
          style={{
            opacity: locked ? 0.22 : 0.7,
            maskImage: "radial-gradient(circle at 50% 60%, black 45%, transparent 76%)",
            WebkitMaskImage: "radial-gradient(circle at 50% 60%, black 45%, transparent 76%)",
          }}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={`flame-${i}`}
              className="absolute bottom-[-6%] rounded-[50%_50%_45%_45%/70%_70%_30%_30%] animate-fx-flame blur-[7px]"
              style={{
                left: `${24 + i * 22}%`,
                width: size * (0.22 - i * 0.03),
                height: size * (0.5 + i * 0.06),
                background: `linear-gradient(to top, ${fxColor}00 0%, ${fxColor}aa 40%, #fff4d066 85%, transparent 100%)`,
                animationDelay: `${i * -0.45}s`,
                animationDuration: `${1.4 + i * 0.22}s`,
                mixBlendMode: "screen",
              }}
            />
          ))}
        </span>
      )}

      {/* rising embers */}
      {showBeasts &&
        Array.from({ length: rank >= 3 ? 8 : 5 }).map((_, i) => (
          <span
            key={`ember-${i}`}
            aria-hidden
            className="pointer-events-none absolute bottom-0 rounded-full animate-fx-ember"
            style={
              {
                left: `${8 + ((i * 11) % 84)}%`,
                width: Math.max(2, size * (0.022 + (i % 3) * 0.008)),
                height: Math.max(2, size * (0.022 + (i % 3) * 0.008)),
                background: i % 3 === 0 ? "#fff3d4" : fxColor,
                boxShadow: `0 0 ${size * 0.07}px ${fxColor}`,
                opacity: fx,
                animationDelay: `${i * -0.42}s`,
                animationDuration: `${3 + (i % 4) * 0.6}s`,
                "--ember-drift": `${(i % 2 ? 1 : -1) * (8 + i * 2)}px`,
              } as React.CSSProperties
            }
          />
        ))}

      {/* counter-rotating energy ribbons */}
      {showBeasts &&
        [0, 1].map((i) => (
          <span
            key={`ribbon-${i}`}
            aria-hidden
            className="pointer-events-none absolute inset-[-10%] rounded-full animate-fx-ribbon blur-[3px]"
            style={{
              background: `conic-gradient(from ${i * 140}deg, transparent 0deg, ${fxColor}00 60deg, ${fxColor}aa 110deg, #ffffff88 130deg, ${fxColor}00 180deg, transparent 360deg)`,
              maskImage:
                "radial-gradient(circle, transparent 56%, black 64%, black 74%, transparent 80%)",
              WebkitMaskImage:
                "radial-gradient(circle, transparent 56%, black 64%, black 74%, transparent 80%)",
              animationDirection: i ? "reverse" : "normal",
              animationDuration: `${13 - rank}s`,
              opacity: (locked ? 0.35 : 0.75) * 1,
              mixBlendMode: "screen",
            }}
          />
        ))}




      {/* mythic guardian beasts charging in from both flanks, clashing behind the crest */}
      {showBeasts && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-[-20%] overflow-hidden rounded-full"
          style={{
            maskImage: "radial-gradient(circle at 50% 50%, black 55%, transparent 78%)",
            WebkitMaskImage: "radial-gradient(circle at 50% 50%, black 55%, transparent 78%)",
          }}
        >

          <BadgeBeast
            kind={beast}
            color={fxColor}
            opacity={locked ? 0.28 : 0.6}
            className="absolute left-0 top-[38%] -translate-y-1/2 animate-beast-charge-in"
            style={{ width: beastSize, height: beastSize * 0.6, animationDuration: beastCycle }}
          />
          <BadgeBeast
            kind={beast}
            color={fxColor}
            flip
            opacity={locked ? 0.28 : 0.6}
            className="absolute right-0 top-[62%] -translate-y-1/2 animate-beast-charge-out"
            style={{
              width: beastSize,
              height: beastSize * 0.6,
              animationDuration: beastCycle,
              animationDelay: "-0.25s",
            }}
          />
          {/* clash impact flash */}
          <span
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full animate-beast-clash-flash blur-md"
            style={{
              width: size * 0.5,
              height: size * 0.5,
              background: `radial-gradient(circle, #ffffff 0%, ${fxColor}cc 35%, transparent 70%)`,
              animationDuration: beastCycle,
              opacity: fx,
            }}
          />
        </span>
      )}



      {/* mythic pulse rings */}
      {showRings && (
        <>
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-full border animate-badge-ring-pulse"
            style={{ borderColor: `${fxColor}66`, opacity: fx }}
          />
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-full border animate-badge-ring-pulse"
            style={{ borderColor: `${fxColor}40`, animationDelay: "1.5s", opacity: fx }}
          />
        </>
      )}

      {/* rotating conic halo */}
      {showHalo && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-[-6%] rounded-full animate-badge-halo-spin"
          style={{
            opacity: 0.7 * fx,
            background: `conic-gradient(from 0deg, transparent 0deg, ${fxColor}00 140deg, ${fxColor}55 200deg, ${fxColor}00 260deg, transparent 360deg)`,
            maskImage: "radial-gradient(circle, transparent 58%, black 66%, black 78%, transparent 82%)",
            WebkitMaskImage:
              "radial-gradient(circle, transparent 58%, black 66%, black 78%, transparent 82%)",
            animationDuration: `${18 - rank * 1.6}s`,
          }}
        />
      )}

      {/* orbiting motes */}
      {showOrbit &&
        Array.from({ length: orbitMotes }).map((_, i) => (
          <span
            key={`orbit-${i}`}
            aria-hidden
            className="pointer-events-none absolute inset-0 animate-badge-orbit"
            style={{
              animationDuration: `${8 + i * 1.8}s`,
              animationDelay: `${i * -1.4}s`,
              animationDirection: i % 2 ? "reverse" : "normal",
            }}
          >
            <span
              className="absolute left-1/2 top-0 -translate-x-1/2 rounded-full"
              style={{
                width: Math.max(2, size * 0.045),
                height: Math.max(2, size * 0.045),
                background: fxColor,
                boxShadow: `0 0 ${size * 0.09}px ${fxColor}`,
                opacity: fx,
              }}
            />
          </span>
        ))}

      {/* crest artwork */}
      <span
        aria-hidden={false}
        className={`relative h-full w-full ${alive ? "animate-badge-breathe" : ""}`}
        style={alive ? { animationDuration: `${6.5 - rank * 0.45}s` } : undefined}
      >
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

        {/* legendary metal shine sweep */}
        {showShine && (
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 overflow-hidden"
            style={{
              maskImage: `url(${art})`,
              WebkitMaskImage: `url(${art})`,
              maskSize: "contain",
              WebkitMaskSize: "contain",
              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat",
              maskPosition: "center",
              WebkitMaskPosition: "center",
            }}
          >
            <span
              className="absolute inset-y-0 w-1/3 animate-badge-shine bg-white/45 blur-[2px]"
              style={{ animationDuration: `${5 - rank * 0.4}s` }}
            />
          </span>
        )}
      </span>

      {/* sparkles */}
      {showSparkles &&
        SPARKLE_SPOTS.slice(0, sparkleCount).map((s) => (
          <span
            key={s.top + s.left}
            aria-hidden
            className="pointer-events-none absolute animate-badge-sparkle"
            style={{ top: s.top, left: s.left, animationDelay: s.delay, opacity: fx }}
          >
            <Sparkle color={fxColor} size={Math.max(5, size * 0.1 * s.scale)} />
          </span>
        ))}

      {/* shard burst — light fragments blasting outward on the reveal beat */}
      {Array.from({ length: rank >= 3 ? 10 : 6 }).map((_, i) => {
        const total = rank >= 3 ? 10 : 6;
        return (
          <span
            key={`shard-${i}`}
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 animate-fx-shard"
            style={
              {
                width: Math.max(2, size * 0.02),
                height: size * (0.12 + (i % 3) * 0.03),
                borderRadius: "2px",
                background: `linear-gradient(to bottom, #ffffff, ${fxColor}00)`,
                boxShadow: `0 0 ${size * 0.06}px ${fxColor}`,
                opacity: fx,
                animationDuration: `${5.5 - rank * 0.3}s`,
                animationDelay: `${i * -0.08}s`,
                "--shard-angle": `${(360 / total) * i}deg`,
                "--shard-dist": `${size * 0.6}px`,
              } as React.CSSProperties
            }
          />
        );
      })}



      {/* guardian beast lunging out in front of the crest */}
      {!locked && showBeasts && rank >= 2 && (
        <BadgeBeast
          kind={beast}
          color={fxColor}
          opacity={0.75}
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-beast-lunge"
          style={{
            width: size * 1.15,
            height: size * 0.7,
            animationDuration: `${11 - rank}s`,
            filter: `drop-shadow(0 0 ${size * 0.08}px ${fxColor})`,
          }}
        />
      )}


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
