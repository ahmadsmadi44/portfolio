import { useEffect, useRef, useState } from "react";
import { Asterisk, Sparkles } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import { EDUCATION, LOCATION, ROLE } from "@/data/content";
import type { GlassVariant } from "./GlassLayout";
import { BlobBackdrop, CursorOrb, Grain, ShaderBackdrop, SpotlightGrid, Stars } from "./backdrops";

const F = {
  space: "'Space Grotesk V', ui-sans-serif, system-ui, sans-serif",
  mono: "'JetBrains Mono V', ui-monospace, monospace",
  fraunces: "'Fraunces V', Georgia, serif",
  unbounded: "'Unbounded V', ui-sans-serif, sans-serif",
  bricolage: "'Bricolage Grotesque V', ui-sans-serif, sans-serif",
  manrope: "'Manrope V', ui-sans-serif, sans-serif",
  sora: "'Sora V', ui-sans-serif, sans-serif",
  inter: "'Inter Tight Variable', ui-sans-serif, sans-serif",
};

const year = new Date().getFullYear();

function useTorontoTime() {
  const fmt = () =>
    new Intl.DateTimeFormat("en-CA", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "America/Toronto", timeZoneName: "short" }).format(new Date());
  const [t, setT] = useState(fmt);
  useEffect(() => {
    const id = setInterval(() => setT(fmt()), 15000);
    return () => clearInterval(id);
  }, []);
  return t;
}

/* =====================================================================
 * 1. MIDNIGHT — dark water-shader, Space Grotesk + JetBrains Mono,
 *    terminal eyebrow, live local clock, icon tiles.
 * ===================================================================== */
function MidnightHero() {
  const time = useTorontoTime();
  return (
    <section className="px-6 pb-12 pt-20 md:px-16 md:pt-28">
      <div className="mx-auto max-w-5xl">
        <p className="g-hero-in text-xs text-primary" style={{ fontFamily: F.mono }}>
          {"> "}ai_solutions_engineer<span className="animate-pulse">_</span>
        </p>
        <h1 className="g-hero-in mt-4 max-w-3xl text-[clamp(2.4rem,6vw,4.6rem)] font-semibold leading-[1.02] tracking-[-0.035em]" style={{ fontFamily: F.space }}>
          Hi, I'm Ahmad.
          <br />
          Here's what I've <span className="bg-gradient-to-r from-[#67e8f9] via-[#a78bfa] to-[#f0abfc] bg-clip-text text-transparent">shipped.</span>
        </h1>
        <div className="g-hero-in mt-6 flex items-center gap-3 text-xs text-muted-foreground" style={{ fontFamily: F.mono }}>
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-primary" />
          </span>
          {LOCATION} · {time}
        </div>
      </div>
    </section>
  );
}

export const MIDNIGHT: GlassVariant = {
  id: "c2",
  name: "Midnight",
  vars: {
    "--background": "#060816",
    "--foreground": "#e8ecff",
    "--muted-foreground": "#8a93b8",
    "--primary": "#67e8f9",
    "--primary-foreground": "#041018",
    "--border": "rgba(255,255,255,0.09)",
  },
  fontBody: F.space,
  fontDisplay: F.space,
  fontMeta: F.mono,
  Backdrop: () => (
    <ShaderBackdrop type="waterPlane" color1="#1e1b4b" color2="#0e7490" color3="#312e81" uStrength={1.8} uDensity={1.3} uSpeed={0.15} brightness={0.9} cPolarAngle={80} cDistance={3} rotationZ={40} />
  ),
  Overlay: () => (
    <>
      <div className="absolute inset-0 bg-[#060816]/35" />
      <Stars />
      <Grain opacity={0.14} />
    </>
  ),
  Hero: MidnightHero,
  ContactHeadline: () => (
    <h2 className="text-3xl font-semibold tracking-[-0.03em] md:text-5xl" style={{ fontFamily: F.space }}>
      Let's build something <span className="bg-gradient-to-r from-[#67e8f9] via-[#a78bfa] to-[#f0abfc] bg-clip-text text-transparent">real.</span>
    </h2>
  ),
  surface: "border border-white/10 bg-white/[0.045] backdrop-blur-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_20px_60px_-20px_rgba(0,0,0,0.7)]",
  radius: "rounded-[22px]",
  badge: "rounded-full border border-primary/40 bg-primary/10 text-primary backdrop-blur",
  button: "rounded-full bg-primary text-primary-foreground",
  cards: "below",
  skills: "tiles",
  work: "rows",
  hover: "glow",
};

/* =====================================================================
 * 2. EDITORIAL — warm paper, drifting ink-blue blobs, Fraunces display,
 *    magazine masthead, numbered project cards, inline skill sentence.
 * ===================================================================== */
function EditorialHero() {
  return (
    <section className="px-6 pb-14 pt-20 md:px-16 md:pt-28">
      <div className="mx-auto max-w-5xl">
        <h1 className="g-hero-in text-[clamp(3.2rem,11vw,8.5rem)] font-[340] leading-[0.88] tracking-[-0.045em]" style={{ fontFamily: F.fraunces }}>
          Things I've <em className="font-[300] text-primary">built.</em>
        </h1>
      </div>
    </section>
  );
}

export const EDITORIAL: GlassVariant = {
  id: "c3",
  name: "Editorial",
  vars: {
    "--background": "#f3efe7",
    "--foreground": "#17140f",
    "--muted-foreground": "#6e665a",
    "--primary": "#2440ff",
    "--primary-foreground": "#ffffff",
    "--border": "rgba(23,20,15,0.14)",
  },
  fontBody: F.inter,
  fontDisplay: F.fraunces,
  fontMeta: F.mono,
  Backdrop: () => <BlobBackdrop colors={["#b9c4ff", "#ffd9c2", "#c9e7ff"]} blur={110} opacity={0.6} size={40} />,
  Overlay: () => <Grain opacity={0.22} blend="multiply" />,
  Hero: EditorialHero,
  ContactHeadline: () => (
    <h2 className="text-5xl font-[340] tracking-[-0.04em] md:text-7xl" style={{ fontFamily: F.fraunces }}>
      Say <em className="font-[300] text-primary">hello.</em>
    </h2>
  ),
  surface: "border border-black/10 bg-white/45 backdrop-blur-md",
  radius: "rounded-md",
  badge: "rounded-sm bg-foreground text-background",
  button: "rounded-full bg-primary text-primary-foreground",
  cards: "indexed",
  skills: "chips",
  chipSurface: "border border-white/60 bg-white/45 backdrop-blur-xl shadow-[0_8px_40px_-12px_rgba(20,30,90,0.18)]",
  work: "timeline",
  hover: "lift",
  titleClass: "text-2xl !font-normal",
};

/* =====================================================================
 * 3. ACID — black + lime shader streaks, Unbounded all-caps, square
 *    corners, rotating stamp, full-bleed overlay cards, 3D tilt, marquee.
 * ===================================================================== */
function SpinBadge({ text }: { text: string }) {
  const ref = useRef<SVGSVGElement>(null);
  useGSAP(() => { gsap.to(ref.current, { rotate: 360, duration: 14, ease: "none", repeat: -1, transformOrigin: "50% 50%" }); });
  return (
    <div className="g-hero-in relative hidden size-40 shrink-0 md:block">
      <svg ref={ref} viewBox="0 0 200 200" className="size-full">
        <defs><path id="spin-circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" /></defs>
        <text fill="currentColor" style={{ fontFamily: F.mono, fontSize: 13, letterSpacing: 3 }}>
          <textPath href="#spin-circle">{text}</textPath>
        </text>
      </svg>
      <Asterisk className="absolute left-1/2 top-1/2 size-10 -translate-x-1/2 -translate-y-1/2 text-primary" />
    </div>
  );
}

function AcidHero() {
  return (
    <section className="px-6 pb-12 pt-16 md:px-16 md:pt-24">
      <div className="mx-auto flex max-w-5xl items-end justify-between gap-6">
        <div>
          <p className="g-hero-in text-xs uppercase tracking-[0.3em] text-primary" style={{ fontFamily: F.mono }}>Selected work — {year}</p>
          <h1 className="g-hero-in mt-4 text-[clamp(3rem,10vw,7.5rem)] font-black uppercase leading-[0.88] tracking-[-0.02em]" style={{ fontFamily: F.unbounded }}>
            Built
            <br />
            <span className="text-primary">&amp; shipped.</span>
          </h1>
        </div>
        <SpinBadge text="AI SOLUTIONS ENGINEER ✺ AEROSPACE ENGINEER ✺ " />
      </div>
    </section>
  );
}

export const ACID: GlassVariant = {
  id: "c4",
  name: "Acid",
  vars: {
    "--background": "#0b0b0b",
    "--foreground": "#f1f1ec",
    "--muted-foreground": "#94948c",
    "--primary": "#c6ff00",
    "--primary-foreground": "#0b0b0b",
    "--border": "rgba(255,255,255,0.14)",
  },
  fontBody: F.manrope,
  fontDisplay: F.unbounded,
  fontMeta: F.mono,
  Backdrop: () => (
    <ShaderBackdrop type="plane" color1="#9bd400" color2="#0d0d0d" color3="#161616" uStrength={4.4} uDensity={1.1} uSpeed={0.25} brightness={1} rotationZ={-30} />
  ),
  Overlay: () => (
    <>
      <div className="absolute inset-0 bg-black/45" />
      <Grain opacity={0.25} />
    </>
  ),
  Hero: AcidHero,
  ContactHeadline: () => (
    <h2 className="text-4xl font-black uppercase tracking-[-0.02em] md:text-7xl" style={{ fontFamily: F.unbounded }}>
      Let's <span className="text-primary">talk.</span>
    </h2>
  ),
  surface: "border border-white/15 bg-black/45 backdrop-blur-xl",
  radius: "rounded-none",
  badge: "bg-primary text-[#0b0b0b]",
  button: "rounded-none bg-primary text-primary-foreground uppercase tracking-wide",
  cards: "overlay",
  skills: "marquee",
  work: "rows",
  hover: "tilt",
  titleClass: "uppercase !text-lg md:!text-xl font-bold",
};

/* =====================================================================
 * 4. HOLO — iridescent pastel blobs, cursor-following prism orb,
 *    Bricolage Grotesque, shimmering holographic text, floating chips.
 * ===================================================================== */
function HoloHero() {
  return (
    <section className="px-6 pb-12 pt-20 text-center md:px-16 md:pt-28">
      <span className="g-hero-in inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/50 px-4 py-1.5 text-xs font-medium text-foreground/80 backdrop-blur-xl">
        <Sparkles className="size-3.5 text-primary" /> {ROLE}
      </span>
      <h1 className="g-hero-in mx-auto mt-6 max-w-3xl text-[clamp(2.6rem,7vw,5.2rem)] font-bold leading-[0.98] tracking-[-0.04em]" style={{ fontFamily: F.bricolage }}>
        Hi, I'm Ahmad.
        <br />
        I build <span className="holo-text">AI that ships.</span>
      </h1>
    </section>
  );
}

export const HOLO: GlassVariant = {
  id: "c5",
  name: "Holo",
  vars: {
    "--background": "#f6f4ff",
    "--foreground": "#1d1633",
    "--muted-foreground": "#6b6385",
    "--primary": "#8b5cf6",
    "--primary-foreground": "#ffffff",
    "--border": "rgba(255,255,255,0.75)",
  },
  fontBody: F.bricolage,
  fontDisplay: F.bricolage,
  fontMeta: F.bricolage,
  Backdrop: () => <BlobBackdrop colors={["#ff9ad5", "#8ec5ff", "#a7f3d0", "#c4b5fd", "#fde68a"]} blur={80} opacity={0.7} size={42} />,
  Overlay: () => (
    <>
      <CursorOrb color="conic-gradient(from 0deg,#ff9ad5,#8ec5ff,#a7f3d0,#c4b5fd,#ff9ad5)" />
      <Grain opacity={0.08} />
    </>
  ),
  Hero: HoloHero,
  ContactHeadline: () => (
    <h2 className="text-4xl font-bold tracking-[-0.04em] md:text-6xl" style={{ fontFamily: F.bricolage }}>
      Got an idea? <span className="holo-text">Let's build it.</span>
    </h2>
  ),
  surface: "border border-white/70 bg-white/35 backdrop-blur-2xl shadow-[0_10px_50px_-15px_rgba(80,40,160,0.25),inset_0_1px_0_rgba(255,255,255,0.9)]",
  radius: "rounded-[36px]",
  badge: "rounded-full bg-white/75 text-foreground backdrop-blur ring-1 ring-white",
  button: "rounded-full bg-foreground text-background",
  cards: "below",
  skills: "chips",
  floaty: true,
  work: "rows",
  hover: "tilt",
  titleClass: "text-xl font-bold",
};

/* =====================================================================
 * 5. NORDIC — icy water-shader, blueprint grid lit by the cursor,
 *    Sora + Manrope, spec-sheet hero, teal accents, lifted tiles.
 * ===================================================================== */
function NordicHero() {
  const specs = [
    ["Role", ROLE],
    ["Based", LOCATION],
    ["Background", `${EDUCATION[0].degree.replace("B.Eng, ", "B.Eng ")}`],
  ];
  return (
    <section className="px-6 pb-12 pt-20 md:px-16 md:pt-28">
      <div className="mx-auto max-w-5xl">
        <h1 className="g-hero-in max-w-3xl text-[clamp(2.3rem,5.5vw,4.2rem)] font-medium leading-[1.05] tracking-[-0.04em]" style={{ fontFamily: F.sora }}>
          Hi, I'm Ahmad<span className="text-primary">.</span> Here's what I've shipped<span className="text-primary">.</span>
        </h1>
        <dl className="g-hero-in mt-8 grid max-w-3xl grid-cols-1 gap-px overflow-hidden rounded-xl border border-[color:var(--border)] bg-[color:var(--border)] sm:grid-cols-3">
          {specs.map(([k, val]) => (
            <div key={k} className="bg-white/70 px-4 py-3 backdrop-blur">
              <dt className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground" style={{ fontFamily: F.mono }}>{k}</dt>
              <dd className="mt-1 text-sm font-medium">{val}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export const NORDIC: GlassVariant = {
  id: "c6",
  name: "Nordic",
  vars: {
    "--background": "#eef2f5",
    "--foreground": "#0f1720",
    "--muted-foreground": "#5a6776",
    "--primary": "#0d9488",
    "--primary-foreground": "#ffffff",
    "--border": "rgba(15,23,32,0.1)",
  },
  fontBody: F.manrope,
  fontDisplay: F.sora,
  fontMeta: F.mono,
  Backdrop: () => (
    <ShaderBackdrop type="waterPlane" color1="#bfe3e6" color2="#f3f7fa" color3="#8ecfd0" uStrength={1.4} uDensity={1.2} uSpeed={0.12} brightness={1.3} cPolarAngle={80} cDistance={3} rotationZ={50} />
  ),
  Overlay: () => (
    <>
      <div className="absolute inset-0 bg-[#eef2f5]/40" />
      <SpotlightGrid />
    </>
  ),
  Hero: NordicHero,
  ContactHeadline: () => (
    <h2 className="text-3xl font-medium tracking-[-0.04em] md:text-5xl" style={{ fontFamily: F.sora }}>
      Let's work together<span className="text-primary">.</span>
    </h2>
  ),
  surface: "border border-slate-900/10 bg-white/60 backdrop-blur-xl shadow-[0_1px_2px_rgba(15,23,32,0.04),0_12px_40px_-20px_rgba(15,23,32,0.25)]",
  radius: "rounded-xl",
  badge: "rounded-md border border-slate-900/10 bg-white/85 text-foreground",
  button: "rounded-lg bg-foreground text-background",
  cards: "below",
  skills: "tiles",
  work: "rows",
  hover: "glow",
  titleClass: "font-semibold",
};

export const GLASS_VARIANTS = [MIDNIGHT, EDITORIAL, ACID, HOLO, NORDIC];
