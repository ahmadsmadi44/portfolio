import { useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Play, Plus } from "lucide-react";
import { ProjectVisual } from "@/components/site/ProjectVisual";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { useLenis } from "@/lib/useLenis";
import { NAME, PROJECTS } from "@/data/content";
import { PROJECT_DETAILS } from "@/data/projectDetails";
import { TECH_ICONS } from "@/data/techIcons";
import { cn } from "@/lib/utils";
import type { GlassVariant } from "./GlassLayout";

/**
 * Case-study page, same look as the home page it came from (fonts, palette,
 * backdrop, glass). Visual-first: big preview, three numbers, the pipeline,
 * the stack, then the next project. Almost no paragraphs. When the site
 * supplies `renderEmbed`, a project's full interactive demo (ported from the
 * old portfolio) takes the place of the preview and pipeline sections.
 */
export default function ProjectPage({ v, projectId, homeHref, hrefFor, renderEmbed }: {
  v: GlassVariant;
  projectId: string;
  homeHref: string;
  hrefFor: (id: string) => string;
  renderEmbed?: (kind: NonNullable<(typeof PROJECT_DETAILS)[string]["embed"]>) => ReactNode;
}) {
  useLenis();
  const root = useRef<HTMLDivElement>(null);
  const idx = Math.max(0, PROJECTS.findIndex((p) => p.id === projectId));
  const p = PROJECTS[idx];
  const d = PROJECT_DETAILS[p.id];
  const next = PROJECTS[(idx + 1) % PROJECTS.length];
  const [videoFailed, setVideoFailed] = useState(false);
  const embed = d.embed && renderEmbed ? renderEmbed(d.embed) : null;

  useLayoutEffect(() => { window.scrollTo(0, 0); }, [projectId]);

  useGSAP(
    () => {
      gsap.from(".pp-in", { opacity: 0, y: 28, duration: 0.9, stagger: 0.07, ease: "power3.out" });
      gsap.fromTo(".pp-dot", { left: "0%" }, { left: "100%", duration: 3.2, ease: "none", repeat: -1 });
      ScrollTrigger.batch(".pp-reveal", {
        start: "top 92%",
        onEnter: (els) => gsap.fromTo(els, { y: 30, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.06, duration: 0.7, ease: "power3.out" }),
      });
    },
    { scope: root, dependencies: [projectId] },
  );

  const style = { ...v.vars, fontFamily: v.fontBody } as CSSProperties;
  const display = { fontFamily: v.fontDisplay } as CSSProperties;
  const meta = { fontFamily: v.fontMeta } as CSSProperties;
  const words = p.title.split(" ");
  const head = words.slice(0, -1).join(" ");
  const tail = words[words.length - 1];

  return (
    <div ref={root} className="demo-root relative" style={style}>
      <div className="pointer-events-none fixed inset-0 z-0" aria-hidden><v.Backdrop /></div>
      {v.Overlay && <div className="pointer-events-none fixed inset-0 z-[1]" aria-hidden><v.Overlay /></div>}

      <div className="relative z-10 mx-auto max-w-5xl px-6 pb-28 md:px-0">
        {/* top row */}
        <div className="pp-in flex items-center justify-between pt-8 text-[11px] uppercase tracking-[0.2em] text-muted-foreground" style={meta}>
          <a href={homeHref} className="inline-flex items-center gap-2 transition-colors hover:text-primary">
            <ArrowLeft className="size-3.5" /> All work
          </a>
          <span>{String(idx + 1).padStart(2, "0")} / {String(PROJECTS.length).padStart(2, "0")}</span>
        </div>

        {/* title */}
        <header className="pt-14 md:pt-20">
          <p className="pp-in text-[11px] uppercase tracking-[0.2em] text-muted-foreground" style={meta}>{p.dates} · {p.status}</p>
          <h1 className="pp-in mt-4 text-[clamp(3rem,10vw,7.5rem)] font-[340] leading-[0.9] tracking-[-0.045em]" style={display}>
            {head} <em className="font-[300] text-primary">{tail}.</em>
          </h1>
          <p className="pp-in mt-5 max-w-2xl text-lg text-muted-foreground">{d.lede}</p>
          {d.links.length > 0 && (
            <div className="pp-in mt-7 flex flex-wrap gap-2">
              {d.links.map((l, i) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-transform hover:-translate-y-0.5",
                    i === 0 ? "bg-primary text-primary-foreground" : cn("text-foreground", v.surface),
                  )}
                >
                  {l.label} <ArrowUpRight className="size-4" />
                </a>
              ))}
            </div>
          )}
        </header>

        {/* hero media (skipped when a full demo is embedded below) */}
        {!embed && <div className={cn("pp-in relative mt-12 overflow-hidden", v.radius, v.surface)}>
          {d.image ? (
            <img src={d.image.src} alt={d.image.alt} className="block max-h-[560px] w-full bg-white/40 object-contain" />
          ) : d.video && !videoFailed ? (
            <video className="block aspect-video w-full bg-black/5 object-cover" controls preload="metadata" playsInline poster={d.video.poster} src={d.video.src} onError={() => setVideoFailed(true)} />
          ) : (
            <>
              <div className="text-foreground/70">
                <ProjectVisual variant={p.visual} className="h-[260px] md:h-[440px]" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="flex size-16 items-center justify-center rounded-full bg-foreground/90 text-background shadow-2xl transition-transform hover:scale-105">
                  <Play className="ml-1 size-6 fill-current" />
                </span>
              </div>
              <span className="absolute bottom-3 left-4 text-[10px] uppercase tracking-[0.2em] text-muted-foreground" style={meta}>Demo video · placeholder</span>
            </>
          )}
        </div>}

        {/* looping screen recording */}
        {d.preview && (
          <div className={cn("mt-12 overflow-hidden border border-[color:var(--border)] bg-black/5 shadow-[0_24px_60px_-30px_rgba(23,20,15,0.35)]", v.radius)}>
            <video className="block aspect-video w-full object-cover" poster={d.preview.poster} autoPlay muted loop playsInline preload="metadata" aria-label={`${p.title} screen recording`}>
              <source src={d.preview.src.replace(/\.mp4$/, ".webm")} type="video/webm" />
              <source src={d.preview.src} type="video/mp4" />
            </video>
          </div>
        )}

        {/* numbers */}
        <section className="mt-6 grid gap-3 sm:[grid-template-columns:repeat(var(--n),minmax(0,1fr))]" style={{ "--n": d.stats.length } as CSSProperties}>
          {d.stats.map(([n, label]) => (
            <div key={label} className={cn("pp-reveal p-6 opacity-0", v.radius, v.surface)}>
              <p className="text-5xl font-[340] tracking-[-0.04em] text-primary md:text-6xl" style={display}>{n}</p>
              <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground" style={meta}>{label}</p>
            </div>
          ))}
        </section>

        {/* the ported interactive demo */}
        {embed && (
          <div className="legacy mt-16" style={{ width: "min(1192px, calc(100vw - 32px))", marginLeft: "calc(50% - min(596px, 50vw - 16px))" }}>{embed}</div>
        )}

        {/* pipeline */}
        {!embed && d.steps.length > 0 && <section className="mt-20">
          <h2 className="pp-reveal text-3xl font-[340] tracking-[-0.03em] opacity-0 md:text-4xl" style={display}>
            How it <em className="font-[300] text-primary">works.</em>
          </h2>
          <div className="relative mt-8">
            <div className="absolute inset-x-6 top-[27px] hidden h-px bg-[color:var(--border)] md:block">
              <span className="pp-dot absolute -top-[3px] size-[7px] -translate-x-1/2 rounded-full bg-primary shadow-[0_0_12px_var(--primary)]" />
            </div>
            <ol className="grid grid-cols-2 gap-3 md:[grid-template-columns:repeat(var(--n),minmax(0,1fr))] md:gap-4" style={{ "--n": d.steps.length } as CSSProperties}>
              {d.steps.map(([name, tool], i) => (
                <li
                  key={name}
                  className={cn("pp-reveal relative p-4 opacity-0", v.radius, v.surface)}
                >
                  <span className="flex size-7 items-center justify-center rounded-full bg-foreground text-[10px] font-semibold text-background" style={meta}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-4 text-xl tracking-tight" style={display}>{name}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{tool}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>}

        {/* highlights */}
        {!embed && d.highlights && (
          <section className="mt-20">
            <h2 className="pp-reveal text-3xl font-[340] tracking-[-0.03em] opacity-0 md:text-4xl" style={display}>
              Worth a <em className="font-[300] text-primary">look.</em>
            </h2>
            <div className="mt-6 grid gap-3 md:grid-cols-3">
              {d.highlights.map(([t, line], i) => (
                <div key={t} className={cn("pp-reveal p-5 opacity-0", v.radius, v.surface)}>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-primary" style={meta}>{String(i + 1).padStart(2, "0")}</p>
                  <p className="mt-3 text-xl tracking-tight" style={display}>{t}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{line}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* stack */}
        <section className="mt-20">
          <h2 className="pp-reveal text-3xl font-[340] tracking-[-0.03em] opacity-0 md:text-4xl" style={display}>
            Built <em className="font-[300] text-primary">with.</em>
          </h2>
          <div className="mt-6 flex flex-wrap gap-2">
            {d.stack.map((t) => {
              const Icon = TECH_ICONS[t];
              return (
                <span key={t} className={cn("pp-reveal flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm font-medium opacity-0", v.chipSurface ?? v.surface)}>
                  {Icon && <Icon className="size-4 shrink-0 text-primary" />}
                  {t}
                </span>
              );
            })}
          </div>
        </section>

        {/* full write-up, tucked away */}
        {d.writeup && (
          <details className={cn("pp-reveal group/wu mt-16 opacity-0", v.radius, v.surface)}>
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 [&::-webkit-details-marker]:hidden">
              <span className="text-xl tracking-tight" style={display}>Read the write-up</span>
              <Plus className="size-5 text-primary transition-transform duration-300 group-open/wu:rotate-45" />
            </summary>
            <div className="grid gap-6 border-t border-[color:var(--border)] p-5 md:grid-cols-3">
              {([["The problem", d.writeup.problem], ["How I built it", d.writeup.approach], ["Honest limits", d.writeup.limits]] as const).map(([h, body]) => (
                <div key={h}>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground" style={meta}>{h}</p>
                  <p className="mt-2 text-sm leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
            {d.evidence && (
              <div className="border-t border-[color:var(--border)] p-5">
                <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground" style={meta}>What to inspect</p>
                <ul className="mt-3 grid gap-2 md:grid-cols-3">
                  {d.evidence.map((e) => (
                    <li key={e} className="flex gap-2 text-sm leading-relaxed"><Check className="mt-1 size-4 shrink-0 text-primary" />{e}</li>
                  ))}
                </ul>
              </div>
            )}
            {d.sourceNote && <p className="border-t border-[color:var(--border)] px-5 py-4 text-xs text-muted-foreground">{d.sourceNote}</p>}
          </details>
        )}

        {/* next project */}
        <a href={hrefFor(next.id)} className="pp-reveal group mt-24 block border-t border-[color:var(--border)] pt-8 opacity-0">
          <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground" style={meta}>Next project</p>
          <div className="mt-3 flex items-center justify-between gap-4">
            <span className="text-[clamp(2.2rem,6vw,4.5rem)] font-[340] leading-none tracking-[-0.04em] transition-colors group-hover:text-primary" style={display}>
              {next.title}
            </span>
            <ArrowRight className="size-8 shrink-0 text-primary transition-transform group-hover:translate-x-2" />
          </div>
        </a>

        <footer className="pt-16 text-center text-xs text-muted-foreground" style={meta}>© {new Date().getFullYear()} {NAME}</footer>
      </div>
    </div>
  );
}
