import { Check, Lock } from "lucide-react";
import { BADGE_TIERS } from "@/lib/badges";
import { VeloopBadge } from "@/components/VeloopBadge";

/**
 * Tier legend — a legible reference table for all ten VELOOP tiers,
 * styled in the same legendary dark-and-gold language as the badges.
 */
export function TierLegend() {
  return (
    <div className="surface-card overflow-hidden">
      <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-border/70 bg-navy-deep/40 px-5 py-4">
        <h3 className="font-display text-sm font-bold uppercase tracking-[0.16em] text-foreground">
          Tier legend
        </h3>
        <p className="text-xs text-muted-foreground">
          Level 01 Bronze → Level 10 Legend · rarity and unlock rule per tier
        </p>
      </div>

      <ul className="divide-y divide-border/60">
        {BADGE_TIERS.map((tier) => {
          const locked = !tier.unlocked;
          return (
            <li
              key={tier.level}
              className="group grid grid-cols-[auto_1fr] items-center gap-4 px-4 py-4 transition-colors hover:bg-secondary/40 sm:grid-cols-[auto_1.1fr_1.4fr_auto] sm:px-5"
            >
              <div className="flex items-center gap-3">
                <span className="font-display text-[11px] font-bold tracking-[0.18em] text-muted-foreground">
                  {String(tier.level).padStart(2, "0")}
                </span>
                <VeloopBadge tier={tier} locked={locked} size={52} hideLevel />
              </div>

              <div>
                <p className="font-display text-sm font-bold text-foreground">
                  {tier.name}
                  <span
                    className="ml-2 align-middle text-[10px] font-semibold uppercase tracking-[0.14em]"
                    style={{ color: locked ? undefined : tier.glow }}
                  >
                    {tier.rarity}
                  </span>
                </p>
                <p className="text-xs text-muted-foreground">{tier.title}</p>
              </div>

              <p className="col-span-2 text-xs leading-snug text-foreground/75 sm:col-span-1">
                {tier.requirement}
              </p>

              <span
                className={`col-span-2 inline-flex w-fit items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] sm:col-span-1 ${
                  locked
                    ? "border-border bg-secondary/60 text-muted-foreground"
                    : "border-gold/30 bg-gold/10 text-gold"
                }`}
              >
                {locked ? <Lock className="h-3 w-3" /> : <Check className="h-3 w-3" />}
                {locked ? "Locked" : "Unlocked"}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
