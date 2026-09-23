import { ArrowUpRight, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/site/BrandIcons";
import { useLenis } from "@/lib/useLenis";
import Reveal from "@/components/site/Reveal";
import Marquee from "@/components/site/Marquee";
import { ProjectVisual } from "@/components/site/ProjectVisual";
import {
  CONTACT, EDUCATION, INITIALS, NAME, PROJECTS, ROLE, SKILLS, SUBROLE, WORK,
} from "@/data/content";
import { cn } from "@/lib/utils";

/**
 * DEMO A — "Mono", gallery-first: project visuals up top doing the talking,
 * everything else compressed to one-line chips. Dark, quiet, monospace.
 */
export default function PortfolioA() {
  useLenis();

  return (
    <div className="theme-b demo-root min-h-screen font-mono">
      <div className="pointer-events-none fixed inset-x-0 bottom-5 z-40 flex justify-center">
        <nav className="pointer-events-auto flex items-center gap-1 rounded-full border border-border bg-card/90 p-1.5 shadow-[0_0_30px_-8px_rgba(0,0,0,0.6)] backdrop-blur-xl">
          {[["#projects", "Work"], ["#about", "About"]].map(([href, label]) => (
            <a key={href} href={href} className="rounded-full px-4 py-2 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">{label}</a>
          ))}
          <span className="mx-1 h-4 w-px bg-border" />
          <a href={CONTACT.github} target="_blank" rel="noreferrer" className="rounded-full p-2.5 text-muted-foreground hover:bg-accent hover:text-foreground"><GithubIcon className="size-4" /></a>
          <a href={CONTACT.linkedin} target="_blank" rel="noreferrer" className="rounded-full p-2.5 text-muted-foreground hover:bg-accent hover:text-foreground"><LinkedinIcon className="size-4" /></a>
          <a href={`mailto:${CONTACT.email}`} className="rounded-full p-2.5 text-muted-foreground hover:bg-accent hover:text-foreground"><Mail className="size-4" /></a>
        </nav>
      </div>

      <main className="mx-auto flex max-w-4xl flex-col gap-14 px-6 pb-40 pt-16">
        {/* one-line intro */}
        <section className="flex items-center justify-between gap-4">
          <Reveal>
            <p className="text-sm text-foreground">
              <span className="font-semibold">{NAME}</span>
              <span className="text-muted-foreground"> — {ROLE} · {SUBROLE}</span>
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="flex size-9 items-center justify-center rounded-full border border-border bg-secondary text-[10px] font-semibold text-muted-foreground">{INITIALS}</div>
          </Reveal>
        </section>

        {/* projects — the whole point */}
        <section id="projects" className="flex flex-col gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            {PROJECTS.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.04}>
                <a href={p.href} target="_blank" rel="noreferrer" className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-secondary/20 transition-colors hover:bg-secondary/40">
                  <div className="relative border-b border-border bg-background/40 text-foreground/70">
                    <ProjectVisual variant={p.visual} className="h-40" />
                    <span className="absolute right-2 top-2 rounded-full bg-foreground px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-background">{p.status}</span>
                  </div>
                  <div className="flex flex-1 flex-col gap-2 p-4">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-sm font-semibold text-foreground">{p.title}</h3>
                      <ArrowUpRight className="size-3.5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                    </div>
                    <p className="text-xs text-muted-foreground">{p.description}</p>
                    <div className="mt-auto flex flex-wrap gap-1.5 pt-1">
                      {p.tech.map((t) => (
                        <span key={t} className="rounded-full border border-border px-2 py-0.5 text-[10px] text-muted-foreground/80">{t}</span>
                      ))}
                    </div>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </section>

        {/* skills, one line, moving */}
        <Reveal>
          <div className="-mx-6">
            <Marquee
              items={SKILLS.map((s) => (
                <span key={s} className="whitespace-nowrap rounded-full border border-border bg-secondary/40 px-3.5 py-1.5 text-xs text-muted-foreground">{s}</span>
              ))}
              speed={40}
            />
          </div>
        </Reveal>

        {/* work + education, compact chips */}
        <section id="about" className="flex flex-col gap-3">
          {WORK.map((w) => (
            <Reveal key={w.company}>
              <a href={w.href} target="_blank" rel="noreferrer" className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-transparent px-3 py-2.5 -mx-3 transition-colors hover:border-border hover:bg-secondary/30">
                <span className="text-sm"><span className="font-medium text-foreground">{w.company}</span> <span className="text-muted-foreground">· {w.title}</span></span>
                <span className="text-[11px] tabular-nums text-muted-foreground">{w.start}–{w.end}</span>
              </a>
            </Reveal>
          ))}
          <Reveal>
            <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg px-3 py-2.5 -mx-3">
              <span className="text-sm"><span className="font-medium text-foreground">{EDUCATION[0].school}</span> <span className="text-muted-foreground">· {EDUCATION[0].degree}</span></span>
              <span className="text-[11px] tabular-nums text-muted-foreground">{EDUCATION[0].start}–{EDUCATION[0].end}</span>
            </div>
          </Reveal>
        </section>

        {/* contact, one line */}
        <Reveal>
          <a href={`mailto:${CONTACT.email}`} className="flex items-center justify-center gap-2 rounded-full bg-primary py-4 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.01]">
            {CONTACT.email} <ArrowUpRight className="size-4" />
          </a>
        </Reveal>
      </main>
    </div>
  );
}
