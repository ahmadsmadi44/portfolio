import { useRef, useState } from "react";
import { ArrowUpRight, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/site/BrandIcons";
import { ShaderGradient, ShaderGradientCanvas } from "@shadergradient/react";
import Magnetic from "@/components/site/Magnetic";
import { ProjectVisual } from "@/components/site/ProjectVisual";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { useLenis } from "@/lib/useLenis";
import { CONTACT, EDUCATION, NAME, PROJECTS, ROLE, SKILLS, WORK } from "@/data/content";
import { SKILL_ICONS } from "@/data/skillIcons";
import { PALETTES } from "@/data/palettes";
import { cn } from "@/lib/utils";

const glass = "border border-white/60 bg-white/45 backdrop-blur-xl shadow-[0_8px_40px_-12px_rgba(120,50,0,0.25)]";
const glow = "radial-gradient(220px circle at var(--mx,-300px) var(--my,-300px), color-mix(in srgb, var(--primary) 30%, transparent), transparent 70%)";

/**
 * DEMO C — "Glass", gallery-first: a one-line intro over the aurora backdrop,
 * then the project visuals immediately, glass tiles, minimal copy throughout.
 */
export default function PortfolioC() {
  useLenis();
  const root = useRef<HTMLDivElement>(null);
  const [paletteIdx, setPaletteIdx] = useState(0);
  const palette = PALETTES[paletteIdx];

  useGSAP(
    () => {
      gsap.from(".c-hero-in", { opacity: 0, y: 16, duration: 0.8, stagger: 0.08, ease: "power3.out" });
      gsap.utils.toArray<HTMLElement>(".c-tilt").forEach((el) => {
        el.addEventListener("pointermove", (e) => {
          const r = el.getBoundingClientRect();
          el.style.setProperty("--mx", `${e.clientX - r.left}px`);
          el.style.setProperty("--my", `${e.clientY - r.top}px`);
        });
      });
      ScrollTrigger.batch(".c-reveal", {
        start: "top 92%",
        onEnter: (els) => gsap.fromTo(els, { y: 30, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.06, duration: 0.7, ease: "power3.out" }),
      });
    },
    { scope: root },
  );

  return (
    <div
      ref={root}
      className="theme-c demo-root relative"
      style={{ "--primary": palette.primary } as React.CSSProperties}
    >
      <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
        <ShaderGradientCanvas style={{ position: "absolute", inset: 0 }} pixelDensity={1} fov={45}>
          <ShaderGradient
            control="props" type="plane" animate="on" uTime={0} uSpeed={0.2} uStrength={3} uDensity={1.4}
            uFrequency={0} uAmplitude={0} positionX={0} positionY={0} positionZ={0}
            rotationX={0} rotationY={0} rotationZ={0}
            color1={palette.color1} color2={palette.color2} color3={palette.color3}
            reflection={0.1} wireframe={false} shader="defaults" lightType="3d" brightness={1.5} grain="off"
            cAzimuthAngle={180} cPolarAngle={90} cDistance={3.6} cameraZoom={1}
            range="disabled" rangeStart={0} rangeEnd={40}
          />
        </ShaderGradientCanvas>
      </div>

      {/* palette picker — small swatch row, replaces the old name/contact nav */}
      <div className="fixed right-3 top-3 z-40">
        <div className={cn("flex items-center gap-1.5 rounded-full px-2.5 py-2", glass)}>
          {PALETTES.map((p, i) => (
            <button
              key={p.name}
              type="button"
              aria-label={`${p.name} gradient`}
              title={p.name}
              onClick={() => setPaletteIdx(i)}
              className={cn(
                "size-5 shrink-0 rounded-full transition-transform",
                i === paletteIdx ? "scale-110 ring-2 ring-offset-1 ring-offset-white/40" : "scale-90 opacity-70 hover:opacity-100",
              )}
              style={{ background: p.swatch, "--tw-ring-color": p.swatch } as React.CSSProperties}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10">
        {/* one-line intro */}
        <section className="px-6 pb-10 pt-16 text-center md:px-16 md:pt-20">
          <p className="c-hero-in text-sm font-medium uppercase tracking-[0.2em] transition-colors" style={{ color: palette.eyebrow }}>{ROLE}</p>
          <h1 className="c-hero-in mx-auto mt-3 max-w-2xl text-[clamp(1.9rem,5vw,3.2rem)] font-semibold leading-[1.1] tracking-tight">
            Hi, I'm {NAME.split(" ")[0]}. Here's what I've <span className="serif-i text-primary">shipped.</span>
          </h1>
        </section>

        {/* projects — gallery, right up front */}
        <section id="projects" className="px-6 pb-16 md:px-16" style={{ perspective: 1200 }}>
          <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-2">
            {PROJECTS.map((p) => (
              <a
                key={p.id}
                href={p.href}
                target="_blank"
                rel="noreferrer"
                className={cn("c-tilt c-reveal group relative flex flex-col overflow-hidden rounded-[28px] opacity-0", glass)}
                style={{ backgroundImage: glow }}
              >
                <div className="relative border-b border-white/40 text-foreground/70">
                  <ProjectVisual variant={p.visual} className="h-44" />
                  <span className="absolute right-3 top-3 rounded-full bg-foreground px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-background">{p.status}</span>
                </div>
                <div className="flex items-center justify-between gap-3 p-5">
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight">{p.title}</h3>
                    <p className="text-sm text-muted-foreground">{p.description}</p>
                  </div>
                  <ArrowUpRight className="size-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* skills — brand logos, tinted to the active gradient */}
        <section className="px-6 pb-16 md:px-16">
          <div className="mx-auto flex max-w-5xl flex-wrap justify-center gap-2">
            {SKILLS.map((s) => {
              const Icon = SKILL_ICONS[s];
              return (
                <span key={s} className={cn("c-reveal flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm font-medium opacity-0", glass)}>
                  {Icon && <Icon className="size-4 shrink-0 transition-colors" style={{ color: palette.primary }} />}
                  {s}
                </span>
              );
            })}
          </div>
        </section>

        {/* work, compact */}
        <section id="work" className="px-6 pb-16 md:px-16">
          <div className={cn("mx-auto flex max-w-3xl flex-col divide-y divide-white/40 overflow-hidden rounded-2xl", glass)}>
            {WORK.map((w) => (
              <a key={w.company} href={w.href} target="_blank" rel="noreferrer" className="c-reveal flex items-center justify-between gap-3 px-5 py-4 opacity-0 hover:bg-white/30">
                <span className="text-sm"><span className="font-semibold">{w.company}</span> <span className="text-foreground/60">· {w.title}</span></span>
                <span className="shrink-0 text-xs tabular-nums text-foreground/60">{w.start} – {w.end}</span>
              </a>
            ))}
            <div className="c-reveal flex items-center justify-between gap-3 px-5 py-4 opacity-0">
              <span className="text-sm"><span className="font-semibold">{EDUCATION[0].school}</span> <span className="text-foreground/60">· {EDUCATION[0].degree}</span></span>
              <span className="shrink-0 text-xs tabular-nums text-foreground/60">{EDUCATION[0].start} – {EDUCATION[0].end}</span>
            </div>
          </div>
        </section>

        {/* contact */}
        <section className="px-3 pb-3">
          <div className={cn("mx-auto flex flex-col items-center justify-center gap-6 rounded-[40px] px-6 py-16 text-center", glass)}>
            <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">Let's build <span className="serif-i text-primary">something real.</span></h2>
            <Magnetic>
              <a href={`mailto:${CONTACT.email}`} className="inline-flex items-center gap-2 rounded-full bg-foreground px-8 py-4 text-base font-semibold text-background shadow-2xl">
                {CONTACT.email} <ArrowUpRight className="size-4" />
              </a>
            </Magnetic>
            <div className="flex items-center gap-2">
              <a href={CONTACT.github} target="_blank" rel="noreferrer" className="rounded-full p-2.5 text-foreground/60 hover:text-foreground"><GithubIcon className="size-4" /></a>
              <a href={CONTACT.linkedin} target="_blank" rel="noreferrer" className="rounded-full p-2.5 text-foreground/60 hover:text-foreground"><LinkedinIcon className="size-4" /></a>
              <a href={`mailto:${CONTACT.email}`} className="rounded-full p-2.5 text-foreground/60 hover:text-foreground"><Mail className="size-4" /></a>
            </div>
          </div>
          <footer className="px-6 py-6 text-center text-xs text-foreground/50">© {new Date().getFullYear()} {NAME}</footer>
        </section>
      </div>
    </div>
  );
}
