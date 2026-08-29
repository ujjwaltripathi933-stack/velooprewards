import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Cpu, Gauge, Pickaxe, Wallet } from "lucide-react";
import miningScene from "@/assets/mining-scene.png";

const COINS = [
  { left: "12%", delay: "0s", drift: "26px", size: 22 },
  { left: "26%", delay: "0.8s", drift: "-18px", size: 16 },
  { left: "38%", delay: "1.6s", drift: "34px", size: 26 },
  { left: "52%", delay: "0.4s", drift: "-24px", size: 18 },
  { left: "66%", delay: "2.2s", drift: "20px", size: 22 },
  { left: "80%", delay: "1.2s", drift: "-30px", size: 14 },
];

function VeCoin({ size = 20 }: { size?: number }) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} aria-hidden="true">
      <defs>
        <radialGradient id="vc" cx="0.35" cy="0.3" r="0.85">
          <stop offset="0%" stopColor="#fff3c4" />
          <stop offset="55%" stopColor="#e8bd5c" />
          <stop offset="100%" stopColor="#8a5f16" />
        </radialGradient>
      </defs>
      <circle cx="16" cy="16" r="15" fill="url(#vc)" />
      <circle cx="16" cy="16" r="11.5" fill="none" stroke="#8a5f16" strokeWidth="1.2" opacity="0.6" />
      <path d="M10 11 L16 23 L22 11" fill="none" stroke="#6b4610" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  );
}

export function MiningBanner() {
  const [mining, setMining] = useState(false);
  const [progress, setProgress] = useState(62);
  const [earned, setEarned] = useState(125);

  useEffect(() => {
    if (!mining) return;
    const t = setInterval(() => {
      setProgress((p) => (p >= 100 ? 100 : p + 0.6));
      setEarned((v) => v + 1);
    }, 400);
    return () => clearInterval(t);
  }, [mining]);

  const remaining = useMemo(() => {
    const secs = Math.round(((100 - progress) / 100) * 3600);
    const m = String(Math.floor(secs / 60)).padStart(2, "0");
    const s = String(secs % 60).padStart(2, "0");
    return `${m}:${s}`;
  }, [progress]);

  return (
    <section
      aria-label="Mine and earn VEs"
      className="group banner-surface relative isolate min-h-[330px] max-h-[520px] w-full overflow-hidden rounded-3xl border border-border shadow-banner sm:min-h-[380px] sm:max-h-[540px] lg:min-h-[410px] lg:max-h-[450px]"
    >
      <div className="pointer-events-none absolute inset-0 grid-veil opacity-60" />

      {/* rising coins */}
      <div className="pointer-events-none absolute inset-0">
        {COINS.map((c) => (
          <span
            key={c.left}
            className="absolute bottom-6 animate-rise-coin"
            style={{
              left: c.left,
              animationDelay: c.delay,
              ["--drift" as string]: c.drift,
              animationDuration: mining ? "2.4s" : "4.2s",
            }}
          >
            <VeCoin size={c.size} />
          </span>
        ))}
      </div>

      <div className="relative grid h-full gap-5 p-5 sm:p-7 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-6 lg:p-9">
        {/* copy + controls */}
        <div className="max-w-xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-gold">
            <Cpu className="h-3.5 w-3.5" />
            {mining ? "Mining active · Level 04 Platinum" : "Mining station ready"}
          </span>

          <h1 className="mt-3.5 font-display text-[1.7rem] font-extrabold leading-[1.1] tracking-[-0.02em] sm:text-[2rem] lg:text-[2.3rem]">
            Mine &amp; Earn.<br />
            <span className="text-gradient-gold">Rise Through Every Tier.</span>
          </h1>
          <p className="mt-2.5 max-w-md text-[13px] leading-relaxed text-muted-foreground">
            Fire up a session and your rig mines VEs straight into the VELOOP wallet — every
            streak pushes you closer to the next legendary badge.
          </p>

          {/* progress */}
          <div className="mt-4 rounded-2xl border border-border/70 bg-navy-deep/60 p-3.5 backdrop-blur-sm">
            <div className="flex items-baseline justify-between text-xs uppercase tracking-[0.14em] text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Gauge className="h-3.5 w-3.5 text-sky-soft" /> Mining progress
              </span>
              <span className="font-semibold text-silver">{Math.round(progress)}%</span>
            </div>
            <div className="mt-2.5 h-2.5 w-full overflow-hidden rounded-full bg-secondary">
              <div
                className="relative h-full rounded-full bg-gradient-to-r from-sky-soft via-gold to-champagne transition-[width] duration-500"
                style={{ width: `${progress}%` }}
              >
                <span className="absolute inset-0 overflow-hidden rounded-full">
                  <span className="absolute inset-y-0 w-1/3 animate-sheen bg-white/35" />
                </span>
              </div>
            </div>
            <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
              <span>{remaining} remaining in this session</span>
              <span className="inline-flex items-center gap-1.5 text-champagne">
                <Wallet className="h-3.5 w-3.5" /> Auto-credited
              </span>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setMining((m) => !m)}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-champagne via-gold to-gold-soft px-5 py-3 font-display text-[13px] font-extrabold uppercase tracking-[0.12em] text-primary-foreground shadow-gold transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <Pickaxe className="h-4 w-4" />
              {mining ? "Mining in progress" : "Start mining now"}
              <ArrowRight className="h-4 w-4" />
            </button>

            <div className="rounded-xl border border-border/70 bg-card/60 px-4 py-2.5">
              <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                VEs mined
              </p>
              <p className="flex items-center gap-1.5 font-display text-xl font-extrabold text-gold tabular-nums">
                <VeCoin size={16} /> {earned} VEs
              </p>
            </div>
          </div>
        </div>

        {/* illustration */}
        <div className="relative hidden h-full min-h-[260px] items-center justify-center sm:flex">
          <div className="pointer-events-none absolute h-56 w-56 rounded-full bg-violet-muted/25 blur-3xl animate-pulse-soft lg:h-72 lg:w-72" />
          <div
            className="pointer-events-none absolute h-64 w-64 rounded-full border border-gold/20 animate-spin-slow lg:h-80 lg:w-80"
            style={{ borderStyle: "dashed" }}
          />
          <img
            src={miningScene}
            width={1024}
            height={1024}
            alt="A VELOOP miner operating a futuristic mining rig as gold VE coins stream into a wallet"
            className="relative z-10 max-h-[290px] lg:max-h-[330px] w-auto animate-float-soft object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
      </div>
    </section>
  );
}
