import { useState } from "react";
import { Bell, Check, Lock, PartyPopper, Sparkles, X } from "lucide-react";
import { BADGE_TIERS, type BadgeTier } from "@/lib/badges";
import { VeloopBadge } from "@/components/VeloopBadge";

function RarityChip({ tier }: { tier: BadgeTier }) {
  return (
    <span className="rounded-full border border-border bg-secondary/70 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
      {tier.rarity}
    </span>
  );
}

function BadgeCard({ tier, onSelect }: { tier: BadgeTier; onSelect: (t: BadgeTier) => void }) {
  const locked = !tier.unlocked;
  return (
    <button
      type="button"
      onClick={() => onSelect(tier)}
      className="group/badge surface-card relative flex flex-col items-center gap-3 p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <span className="absolute left-3 top-3 font-display text-[11px] font-bold tracking-[0.18em] text-muted-foreground">
        {String(tier.level).padStart(2, "0")}
      </span>
      <span className="absolute right-3 top-3">
        {locked ? (
          <Lock className="h-3.5 w-3.5 text-muted-foreground" />
        ) : (
          <Check className="h-3.5 w-3.5 text-gold" />
        )}
      </span>

      <VeloopBadge
        tier={tier}
        locked={locked}
        size={116}
        className="transition-transform duration-300 group-hover/badge:scale-[1.06]"
      />

      <div>
        <p className="font-display text-sm font-bold text-foreground">{tier.name}</p>
        <p className="text-xs text-muted-foreground">{tier.title}</p>
      </div>
      <RarityChip tier={tier} />

      {/* hover tooltip */}
      <span className="pointer-events-none absolute inset-x-2 bottom-2 z-20 translate-y-2 rounded-xl border border-border bg-popover/95 p-3 text-left opacity-0 shadow-banner backdrop-blur transition-all duration-200 group-hover/badge:translate-y-0 group-hover/badge:opacity-100">
        <span className="block font-display text-xs font-bold text-foreground">
          {tier.name} · Level {String(tier.level).padStart(2, "0")}
        </span>
        <span className="mt-0.5 block text-[11px] text-muted-foreground">
          Status: {locked ? "Locked" : "Unlocked"}
        </span>
        <span className="mt-1 block text-[11px] leading-snug text-muted-foreground">
          {tier.requirement}
        </span>
      </span>
    </button>
  );
}

function UnlockModal({ tier, onClose }: { tier: BadgeTier; onClose: () => void }) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${tier.name} achievement details`}
      className="fixed inset-0 z-50 flex items-center justify-center bg-navy-deep/80 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="surface-card relative w-full max-w-sm overflow-hidden p-8 text-center shadow-banner"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
        <div className="pointer-events-none absolute inset-x-0 -top-16 mx-auto h-40 w-40 rounded-full bg-gold/20 blur-3xl" />
        <p className="relative inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-gold">
          <PartyPopper className="h-3.5 w-3.5" />
          {tier.unlocked ? "Achievement unlocked" : "Next to unlock"}
        </p>
        <div className="relative mt-5 flex justify-center">
          <VeloopBadge tier={tier} locked={!tier.unlocked} size={168} className="animate-float-soft" />
        </div>
        <h3 className="mt-4 font-display text-2xl font-extrabold text-gradient-gold">{tier.name}</h3>
        <p className="text-sm text-muted-foreground">
          {tier.title} · Level {String(tier.level).padStart(2, "0")} · {tier.rarity}
        </p>
        <p className="mt-3 text-sm text-foreground/80">{tier.requirement}</p>
        <button
          type="button"
          onClick={onClose}
          className="mt-6 w-full rounded-xl bg-gradient-to-r from-champagne via-gold to-gold-soft px-4 py-3 text-sm font-bold text-primary-foreground shadow-gold transition-transform hover:-translate-y-0.5"
        >
          {tier.unlocked ? "Share achievement" : "Keep mining"}
        </button>
      </div>
    </div>
  );
}

export function BadgeSystem() {
  const [selected, setSelected] = useState<BadgeTier | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {BADGE_TIERS.map((tier) => (
          <BadgeCard key={tier.level} tier={tier} onSelect={setSelected} />
        ))}
      </div>

      {/* progression rail */}
      <div className="surface-card mt-8 overflow-x-auto p-6">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-display text-sm font-bold uppercase tracking-[0.16em] text-muted-foreground">
            Progression
          </h3>
          <p className="text-xs text-muted-foreground">Bronze → Legend · rarity rises with each tier</p>
        </div>
        <div className="mt-5 flex min-w-max items-end gap-2 pr-4">
          {BADGE_TIERS.map((tier, i) => (
            <div key={tier.level} className="flex items-end gap-2">
              <div className="flex w-[86px] flex-col items-center gap-1.5">
                <VeloopBadge tier={tier} locked={!tier.unlocked} size={60 + i * 4} />
                <span className="font-display text-[11px] font-bold text-foreground">{tier.name}</span>
                <span className="text-[10px] text-muted-foreground">
                  {tier.unlocked ? "Unlocked" : "Locked"}
                </span>
              </div>
              {i < BADGE_TIERS.length - 1 && (
                <span className="mb-10 h-px w-5 bg-gradient-to-r from-border to-gold/50" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* usage previews */}
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="surface-card p-5">
          <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            Profile header
          </p>
          <div className="mt-4 flex items-center gap-4">
            <VeloopBadge tier={BADGE_TIERS[3]!} size={72} />
            <div>
              <p className="font-display text-sm font-bold">Ankita Rawat</p>
              <p className="text-xs text-muted-foreground">Platinum · Elite Earner</p>
              <div className="mt-2 h-1.5 w-32 overflow-hidden rounded-full bg-secondary">
                <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-sky-soft to-gold" />
              </div>
            </div>
          </div>
        </div>

        <div className="surface-card p-5">
          <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            Achievement shelf
          </p>
          <div className="mt-4 flex items-center gap-1">
            {BADGE_TIERS.slice(0, 6).map((t) => (
              <VeloopBadge key={t.level} tier={t} locked={!t.unlocked} size={46} />
            ))}
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            4 of 10 unlocked · Diamond is 12 sessions away
          </p>
        </div>

        <div className="surface-card flex items-center gap-3 p-5">
          <VeloopBadge tier={BADGE_TIERS[9]!} size={64} />
          <div>
            <p className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.16em] text-gold">
              <Bell className="h-3 w-3" /> Notification
            </p>
            <p className="mt-1 font-display text-sm font-bold">Legend tier revealed</p>
            <p className="text-xs text-muted-foreground">
              The final badge is now visible in your journey.
            </p>
          </div>
        </div>
      </div>

      <p className="mt-6 inline-flex items-center gap-2 text-xs text-muted-foreground">
        <Sparkles className="h-3.5 w-3.5 text-gold" />
        Every badge renders on a transparent canvas as inline SVG — usable on dark or light
        surfaces, cards, modals and notifications.
      </p>

      {selected && <UnlockModal tier={selected} onClose={() => setSelected(null)} />}
    </>
  );
}
