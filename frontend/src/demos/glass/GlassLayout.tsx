import { useRef, type CSSProperties, type FC } from "react";
import { ArrowUpRight, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/site/BrandIcons";
import Magnetic from "@/components/site/Magnetic";
import Marquee from "@/components/site/Marquee";
import { ProjectVisual } from "@/components/site/ProjectVisual";
import CompanyLogo from "@/components/site/CompanyLogo";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { useLenis } from "@/lib/useLenis";
import { CONTACT, EDUCATION, NAME, PROJECTS, SKILLS, WORK } from "@/data/content";
import { SKILL_ICONS } from "@/data/skillIcons";
import { cn } from "@/lib/utils";

/**
 * Shared "Glass" layout: intro → project gallery → skill logos → work → contact.
 * Every variant plugs in its own fonts, colors, backdrop, hero, card/skill/work
 * treatments and hover behaviour, so the structure stays the same while the
 * look changes completely.
 */
export type GlassVariant = {
  id: string;
  name: string;
  /** CSS custom properties: --background, --foreground, --muted-foreground, --primary, --primary-foreground, --border */
  vars: Record<string, string>;
  fontBody: string;
  fontDisplay: string;
  fontMeta: string;
  Backdrop: FC;
  Overlay?: FC;
  Hero: FC;
  ContactHeadline: FC;
  /** glass surface classes (border/bg/blur/shadow) */
  surface: string;
  radius: string;
  badge: string;
  button: string;
  cards: "below" | "overlay" | "indexed";
  skills: "chips" | "tiles" | "marquee" | "inline";
  work: "rows" | "timeline";
  hover: "glow" | "tilt" | "lift";
  /** extra classes for project titles */
  titleClass?: string;
  /** when set, project cards open an in-site case-study page instead of the external link */
  projectHref?: (id: string) => string;
  /** optional surface override for skill chips */
  chipSurface?: string;
  /** show each project's real cover image (when it has one) instead of the animated preview */
  useCovers?: boolean;
  /** extra home sections rendered after work, before contact (e.g. About) */
  Extras?: FC;
  /** skill chips gently bob (chips mode) */
  floaty?: boolean;
};

const glowBg =
  "radial-gradient(240px circle at var(--mx,-300px) var(--my,-300px), color-mix(in srgb, var(--primary) 30%, transparent), transparent 70%)";

export default function GlassLayout({ v }: { v: GlassVariant }) {
  useLenis();
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".g-hero-in", { opacity: 0, y: 24, duration: 0.9, stagger: 0.08, ease: "power3.out" });

      gsap.utils.toArray<HTMLElement>(".g-card").forEach((el) => {
        const rx = v.hover === "tilt" ? gsap.quickTo(el, "rotationX", { duration: 0.5, ease: "power3" }) : null;
        const ry = v.hover === "tilt" ? gsap.quickTo(el, "rotationY", { duration: 0.5, ease: "power3" }) : null;
        el.addEventListener("pointermove", (e) => {
          const r = el.getBoundingClientRect();
          el.style.setProperty("--mx", `${e.clientX - r.left}px`);
          el.style.setProperty("--my", `${e.clientY - r.top}px`);
          ry?.(((e.clientX - r.left) / r.width - 0.5) * 10);
          rx?.(-((e.clientY - r.top) / r.height - 0.5) * 10);
        });
        el.addEventListener("pointerleave", () => { rx?.(0); ry?.(0); });
      });

      if (v.floaty) {
        gsap.utils.toArray<HTMLElement>(".g-float").forEach((el) => {
          gsap.to(el, { y: gsap.utils.random(-6, 6), duration: gsap.utils.random(1.8, 3), repeat: -1, yoyo: true, ease: "sine.inOut", delay: gsap.utils.random(0, 1.5) });
        });
      }

      ScrollTrigger.batch(".g-reveal", {
        start: "top 92%",
        onEnter: (els) => gsap.fromTo(els, { y: 30, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.05, duration: 0.7, ease: "power3.out" }),
      });
    },
    { scope: root, dependencies: [v.id] },
  );

  const style = { ...v.vars, fontFamily: v.fontBody } as CSSProperties;
  const display = { fontFamily: v.fontDisplay } as CSSProperties;
  const meta = { fontFamily: v.fontMeta } as CSSProperties;

  return (
    <div ref={root} className="demo-root relative" style={style}>
      <div className="pointer-events-none fixed inset-0 z-0" aria-hidden><v.Backdrop /></div>
      {v.Overlay && <div className="pointer-events-none fixed inset-0 z-[1]" aria-hidden><v.Overlay /></div>}

      <div className="relative z-10">
        <v.Hero />

        {/* projects */}
        <section id="projects" className="px-6 pb-16 md:px-16" style={{ perspective: 1200 }}>
          <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-2">
            {PROJECTS.map((p, i) => (
              <a
                key={p.id}
                href={v.projectHref ? v.projectHref(p.id) : p.href}
                target={v.projectHref ? undefined : "_blank"}
                rel="noreferrer"
                className={cn(
                  "g-card g-reveal group relative flex flex-col overflow-hidden opacity-0 will-change-transform",
                  v.radius, v.surface,
                  v.hover === "lift" && "transition-transform duration-300 hover:-translate-y-1.5",
                )}
                style={{ backgroundImage: v.hover === "glow" || v.hover === "tilt" ? glowBg : undefined, transformStyle: "preserve-3d" }}
              >
                <div className={cn("relative text-foreground/70", v.cards !== "overlay" && "border-b border-[color:var(--border)]")}>
                  {v.useCovers && p.coverVideo ? (
                    <video poster={p.cover || undefined} autoPlay muted loop playsInline preload="metadata" aria-hidden className={cn("w-full object-cover", v.cards === "overlay" ? "h-64" : "h-44")}>
                      <source src={p.coverVideo.replace(/\.mp4$/, ".webm")} type="video/webm" />
                      <source src={p.coverVideo} type="video/mp4" />
                    </video>
                  ) : v.useCovers && p.cover ? (
                    <img src={p.cover} alt="" loading="lazy" className={cn("w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]", v.cards === "overlay" ? "h-64" : "h-44")} />
                  ) : (
                    <ProjectVisual variant={p.visual} className={v.cards === "overlay" ? "h-64" : "h-44"} />
                  )}
                  <span className={cn("absolute right-3 top-3 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide", v.badge)} style={meta}>{p.status}</span>
                  {v.cards === "overlay" && (
                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-[color:var(--background)] via-[color:var(--background)]/70 to-transparent p-5 pt-16">
                      <div>
                        <h3 className={cn("text-xl font-semibold tracking-tight text-foreground", v.titleClass)} style={display}>{p.title}</h3>
                        <p className="text-sm text-muted-foreground">{p.description}</p>
                      </div>
                      <ArrowUpRight className="size-5 shrink-0 text-primary transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </div>
                  )}
                </div>

                {v.cards !== "overlay" && (
                  <div className="flex items-center justify-between gap-3 p-5">
                    <div>
                      {v.cards === "indexed" && (
                        <p className="mb-2 flex gap-3 text-[11px] uppercase tracking-[0.18em] text-muted-foreground" style={meta}>
                          <span>{String(i + 1).padStart(2, "0")} / {String(PROJECTS.length).padStart(2, "0")}</span>
                          <span className="text-muted-foreground/60">·</span>
                          <span>{p.dates}</span>
                        </p>
                      )}
                      <h3 className={cn("text-lg font-semibold tracking-tight", v.titleClass)} style={display}>{p.title}</h3>
                      <p className="text-sm text-muted-foreground">{p.description}</p>
                    </div>
                    <ArrowUpRight className="size-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                )}
              </a>
            ))}
          </div>
        </section>

        {/* skills */}
        <section className="px-6 pb-16 md:px-16">
          {v.skills === "chips" && (
            <div className="mx-auto flex max-w-5xl flex-wrap justify-center gap-2">
              {SKILLS.map((s) => {
                const Icon = SKILL_ICONS[s];
                return (
                  <span key={s} className="g-reveal opacity-0">
                    <span className={cn("g-float flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm font-medium", v.chipSurface ?? v.surface)}>
                      {Icon && <Icon className="size-4 shrink-0 text-primary" />}
                      {s}
                    </span>
                  </span>
                );
              })}
            </div>
          )}

          {v.skills === "tiles" && (
            <div className="mx-auto grid max-w-5xl grid-cols-4 gap-2 sm:grid-cols-8">
              {SKILLS.map((s) => {
                const Icon = SKILL_ICONS[s];
                return (
                  <div key={s} title={s} className={cn("g-reveal group flex aspect-square flex-col items-center justify-center gap-2 p-2 opacity-0 transition-colors", v.radius === "rounded-none" ? "rounded-none" : "rounded-2xl", v.surface)}>
                    {Icon && <Icon className="size-7 text-primary transition-transform duration-300 group-hover:scale-110" />}
                    <span className="line-clamp-1 text-center text-[10px] leading-tight text-muted-foreground" style={meta}>{s.split(" / ")[0]}</span>
                  </div>
                );
              })}
            </div>
          )}

          {v.skills === "marquee" && (
            <div className="-mx-6 flex flex-col gap-3 md:-mx-16">
              {[SKILLS.slice(0, 8), SKILLS.slice(8)].map((row, r) => (
                <Marquee
                  key={r}
                  reverse={r === 1}
                  speed={50}
                  items={row.map((s) => {
                    const Icon = SKILL_ICONS[s];
                    return (
                      <span key={s} className="mx-2 flex items-center gap-3 border border-[color:var(--border)] bg-black/30 px-5 py-3 text-base font-semibold uppercase tracking-wide backdrop-blur-md" style={display}>
                        {Icon && <Icon className="size-6 text-primary" />}
                        {s}
                      </span>
                    );
                  })}
                />
              ))}
            </div>
          )}

          {v.skills === "inline" && (
            <p className="g-reveal mx-auto max-w-5xl text-2xl leading-[1.6] tracking-tight opacity-0 md:text-[2rem]" style={display}>
              {SKILLS.map((s, i) => {
                const Icon = SKILL_ICONS[s];
                return (
                  <span key={s} className="whitespace-nowrap">
                    {Icon && <Icon className="mr-2 inline size-[0.8em] -translate-y-[0.08em] text-primary" />}
                    {s}
                    {i < SKILLS.length - 1 && <span className="mx-3 text-muted-foreground/50">/</span>}
                  </span>
                );
              })}
            </p>
          )}
        </section>

        {/* work */}
        <section id="work" className="px-6 pb-16 md:px-16">
          {v.work === "rows" ? (
            <div className={cn("mx-auto flex max-w-3xl flex-col divide-y divide-[color:var(--border)] overflow-hidden", v.radius === "rounded-none" ? "rounded-none" : "rounded-2xl", v.surface)}>
              {WORK.map((w) => (
                <a key={w.company} href={w.href} target="_blank" rel="noreferrer" className="g-reveal flex items-center justify-between gap-3 px-5 py-4 opacity-0 transition-colors hover:bg-[color:var(--primary)]/10">
                  <span className="text-sm"><span className="font-semibold">{w.company}</span> <span className="text-muted-foreground">· {w.title}</span></span>
                  <span className="shrink-0 text-xs tabular-nums text-muted-foreground" style={meta}>{w.start} – {w.end}</span>
                </a>
              ))}
              <div className="g-reveal flex items-center justify-between gap-3 px-5 py-4 opacity-0">
                <span className="text-sm"><span className="font-semibold">{EDUCATION[0].school}</span> <span className="text-muted-foreground">· {EDUCATION[0].degree}</span></span>
                <span className="shrink-0 text-xs tabular-nums text-muted-foreground" style={meta}>{EDUCATION[0].start} – {EDUCATION[0].end}</span>
              </div>
            </div>
          ) : (
            <ol className="mx-auto flex max-w-3xl flex-col gap-7">
              {[...WORK.map((w) => ({ k: w.company, a: w.company, b: w.title, d: `${w.start} – ${w.end}`, href: w.href as string | undefined, logo: w.logo as string | undefined })),
                { k: "edu", a: EDUCATION[0].school, b: EDUCATION[0].degree, d: `${EDUCATION[0].start} – ${EDUCATION[0].end}`, href: EDUCATION[0].href as string | undefined, logo: EDUCATION[0].logo as string | undefined }].map((row) => (
                <li key={row.k} className="g-reveal flex items-center gap-4 opacity-0">
                  <CompanyLogo name={row.a} logo={row.logo} />
                  <div className="min-w-0 flex-1">
                    <a href={row.href} target={row.href ? "_blank" : undefined} rel="noreferrer" className="block text-xl leading-tight tracking-tight hover:text-primary md:text-2xl" style={display}>{row.a}</a>
                    <p className="text-sm text-muted-foreground">{row.b}</p>
                  </div>
                  <p className="shrink-0 text-right text-[11px] uppercase tracking-[0.16em] text-muted-foreground" style={meta}>{row.d}</p>
                </li>
              ))}
            </ol>
          )}
        </section>

        {v.Extras && <v.Extras />}

        {/* contact */}
        <section className="px-3 pb-24">
          <div className={cn("mx-auto flex flex-col items-center justify-center gap-6 px-6 py-16 text-center", v.radius === "rounded-none" ? "rounded-none" : "rounded-[40px]", v.surface)}>
            <v.ContactHeadline />
            <Magnetic>
              <a href={`mailto:${CONTACT.email}`} className={cn("inline-flex items-center gap-2 px-8 py-4 text-base font-semibold shadow-2xl", v.button)}>
                {CONTACT.email} <ArrowUpRight className="size-4" />
              </a>
            </Magnetic>
            <div className="flex items-center gap-2">
              <a href={CONTACT.github} target="_blank" rel="noreferrer" className="rounded-full p-2.5 text-muted-foreground hover:text-primary"><GithubIcon className="size-4" /></a>
              <a href={CONTACT.linkedin} target="_blank" rel="noreferrer" className="rounded-full p-2.5 text-muted-foreground hover:text-primary"><LinkedinIcon className="size-4" /></a>
              <a href={`mailto:${CONTACT.email}`} className="rounded-full p-2.5 text-muted-foreground hover:text-primary"><Mail className="size-4" /></a>
            </div>
          </div>
          <footer className="px-6 py-6 text-center text-xs text-muted-foreground" style={meta}>© {new Date().getFullYear()} {NAME}</footer>
        </section>
      </div>
    </div>
  );
}
