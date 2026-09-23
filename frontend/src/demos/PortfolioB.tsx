import { useRef } from "react";
import { ArrowUpRight, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/site/BrandIcons";
import Magnetic from "@/components/site/Magnetic";
import { ProjectVisual } from "@/components/site/ProjectVisual";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { useLenis } from "@/lib/useLenis";
import { CONTACT, EDUCATION, NAME, PROJECTS, ROLE, SKILLS, WORK } from "@/data/content";
import { cn } from "@/lib/utils";

const glow = "radial-gradient(240px circle at var(--mx,-300px) var(--my,-300px), rgba(255,90,31,.22), transparent 70%)";

/**
 * DEMO B — "Bold", gallery-first: a short punchy line instead of a hero, then
 * straight into a big bento grid of self-playing project previews. Cream + orange.
 */
export default function PortfolioB() {
  useLenis();
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>(".b-tilt").forEach((el) => {
        const rx = gsap.quickTo(el, "rotationX", { duration: 0.5, ease: "power3" });
        const ry = gsap.quickTo(el, "rotationY", { duration: 0.5, ease: "power3" });
        el.addEventListener("pointermove", (e) => {
          const r = el.getBoundingClientRect();
          ry(((e.clientX - r.left) / r.width - 0.5) * 8);
          rx(-((e.clientY - r.top) / r.height - 0.5) * 8);
          el.style.setProperty("--mx", `${e.clientX - r.left}px`);
          el.style.setProperty("--my", `${e.clientY - r.top}px`);
        });
        el.addEventListener("pointerleave", () => { rx(0); ry(0); });
      });
      ScrollTrigger.batch(".b-reveal", {
        start: "top 92%",
        onEnter: (els) => gsap.fromTo(els, { y: 30, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.06, duration: 0.7, ease: "power3.out" }),
      });
      gsap.from(".b-hero-word", { yPercent: 110, stagger: 0.05, duration: 0.9, ease: "power4.out", delay: 0.1 });
    },
    { scope: root },
  );

  return (
    <div ref={root} className="theme-a demo-root">
      {/* nav */}
      <div className="sticky top-0 z-40 flex items-center justify-between px-6 py-4 md:px-16">
        <span className="text-sm font-semibold tracking-tight">{NAME}</span>
        <Magnetic>
          <a href={`mailto:${CONTACT.email}`} className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-xs font-semibold text-background">
            Get in touch <ArrowUpRight className="size-3.5" />
          </a>
        </Magnetic>
      </div>

      {/* one-line hero */}
      <section className="overflow-hidden px-6 pb-8 pt-6 md:px-16">
        <h1 className="max-w-3xl text-[clamp(2rem,5.5vw,3.75rem)] font-semibold leading-[1.05] tracking-tight">
          <span className="inline-block overflow-hidden"><span className="b-hero-word inline-block">Ahmad builds</span></span>{" "}
          <span className="inline-block overflow-hidden"><span className="serif-i text-primary b-hero-word inline-block">AI that ships.</span></span>
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">{ROLE} · formerly aerospace.</p>
      </section>

      {/* projects — bento, visuals first */}
      <section id="projects" className="px-6 pb-16 md:px-16" style={{ perspective: 1200 }}>
        <div className="grid gap-4 md:grid-cols-6">
          {PROJECTS.map((p, i) => (
            <a
              key={p.id}
              href={p.href}
              target="_blank"
              rel="noreferrer"
              className={cn(
                "b-tilt b-reveal group relative flex flex-col overflow-hidden rounded-[28px] border border-border bg-white/70 opacity-0 will-change-transform",
                i === 0 || i === 1 ? "md:col-span-4" : "md:col-span-3",
              )}
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="relative border-b border-border text-foreground/70" style={{ backgroundImage: glow }}>
                <ProjectVisual variant={p.visual} className="h-48" />
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

      {/* skills, one row */}
      <section className="px-6 pb-16 md:px-16">
        <div className="b-reveal flex flex-wrap gap-2 opacity-0">
          {SKILLS.map((s) => (
            <span key={s} className="rounded-full border border-border bg-white/70 px-3.5 py-1.5 text-sm font-medium">{s}</span>
          ))}
        </div>
      </section>

      {/* work, compact rows */}
      <section id="work" className="px-6 pb-16 md:px-16">
        <div className="flex flex-col divide-y divide-border rounded-2xl border border-border bg-white/50">
          {WORK.map((w) => (
            <a key={w.company} href={w.href} target="_blank" rel="noreferrer" className="b-reveal group flex items-center justify-between gap-3 px-5 py-4 opacity-0 hover:bg-white/60">
              <span className="text-sm"><span className="font-semibold">{w.company}</span> <span className="text-muted-foreground">· {w.title}</span></span>
              <span className="shrink-0 text-xs tabular-nums text-muted-foreground">{w.start} – {w.end}</span>
            </a>
          ))}
          <div className="b-reveal flex items-center justify-between gap-3 px-5 py-4 opacity-0">
            <span className="text-sm"><span className="font-semibold">{EDUCATION[0].school}</span> <span className="text-muted-foreground">· {EDUCATION[0].degree}</span></span>
            <span className="shrink-0 text-xs tabular-nums text-muted-foreground">{EDUCATION[0].start} – {EDUCATION[0].end}</span>
          </div>
        </div>
      </section>

      {/* contact */}
      <section id="contact" className="px-3 pb-3">
        <div className="mx-auto flex flex-col items-center justify-center gap-6 rounded-[40px] border border-border bg-white/70 px-6 py-16 text-center">
          <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">Let's build <span className="serif-i text-primary">something real.</span></h2>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Magnetic>
              <a href={`mailto:${CONTACT.email}`} className="inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-sm font-semibold text-background shadow-xl">
                {CONTACT.email} <ArrowUpRight className="size-4" />
              </a>
            </Magnetic>
            <a href={CONTACT.github} target="_blank" rel="noreferrer" className="rounded-full border border-border p-3"><GithubIcon className="size-4" /></a>
            <a href={CONTACT.linkedin} target="_blank" rel="noreferrer" className="rounded-full border border-border p-3"><LinkedinIcon className="size-4" /></a>
            <a href={`mailto:${CONTACT.email}`} className="rounded-full border border-border p-3"><Mail className="size-4" /></a>
          </div>
        </div>
        <footer className="px-6 py-6 text-center text-xs text-muted-foreground/70">© {new Date().getFullYear()} {NAME}</footer>
      </section>
    </div>
  );
}
