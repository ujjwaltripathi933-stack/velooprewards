import { createFileRoute } from "@tanstack/react-router";
import { MiningBanner } from "@/components/MiningBanner";
import { BadgeSystem } from "@/components/BadgeSystem";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VELOOP Rewards — Mining Banner & 10-Level Badge System" },
      {
        name: "description",
        content:
          "Premium dark-theme mining banner and a 10-tier achievement badge system for VELOOP Rewards: Bronze to Legend, locked and unlocked states, transparent SVG assets.",
      },
      { property: "og:title", content: "VELOOP Rewards — Mining Banner & Badge System" },
      {
        property: "og:description",
        content:
          "Gamified fintech design system: animated mining banner plus 10 collectible achievement badges from Bronze to Legend.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function SectionHeading({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: string;
  copy: string;
}) {
  return (
    <div className="mb-6 max-w-2xl">
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">{eyebrow}</p>
      <h2 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">{title}</h2>
      <p className="mt-2 text-sm text-muted-foreground">{copy}</p>
    </div>
  );
}

function Index() {
  return (
    <main className="mx-auto w-full max-w-[1400px] px-4 py-10 sm:px-6 lg:px-10 lg:py-14">
      <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <svg viewBox="0 0 40 40" width="38" height="38" aria-hidden="true">
            <path
              d="M8 8 L20 34 L32 8"
              fill="none"
              stroke="url(#lg)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <defs>
              <linearGradient id="lg" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#fff3c9" />
                <stop offset="100%" stopColor="#e0a52f" />
              </linearGradient>
            </defs>
          </svg>
          <div>
            <p className="font-display text-sm font-extrabold tracking-[0.24em]">VELOOP</p>
            <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Rewards</p>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">
          Task 11 · Mining Banner &amp; 10-Level Achievement Badges
        </p>
      </header>

      <section aria-labelledby="banner-heading">
        <h2 id="banner-heading" className="sr-only">
          Mining banner
        </h2>
        <MiningBanner />
      </section>

      <section className="mt-14" aria-labelledby="badges-heading">
        <SectionHeading
          eyebrow="Part B"
          title="Achievement badge system"
          copy="Ten tiers built on one geometry — hex crest, gem plate, VE emblem and level ribbon — with ornamentation, gemstones, crown and wings scaling toward Legend. Hover for details, click any badge for the unlock concept."
        />
        <h2 id="badges-heading" className="sr-only">
          Badges
        </h2>
        <BadgeSystem />
      </section>

      <footer className="mt-14 border-t border-border pt-6 text-xs text-muted-foreground">
        All VE values, progress and requirements shown are demo values for design purposes only.
      </footer>
    </main>
  );
}
