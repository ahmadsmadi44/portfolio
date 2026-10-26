import { useEffect, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import { ArrowUpRight, FileText, Play, X } from "lucide-react";
import { FaAmazon } from "react-icons/fa6";
import { GithubIcon } from "@/components/site/BrandIcons";
import Reveal from "@/components/site/Reveal";
import { HACKATHONS } from "@/data/content";
import { cn } from "@/lib/utils";

/**
 * Hackathons & research sprints, as a timeline that mirrors the experience
 * list above it. No case-study pages: each entry carries small link chips
 * (repo, report, film). Film chips open the clip in an in-page player.
 */
const F = {
  display: { fontFamily: "'Fraunces V', Georgia, serif" } as CSSProperties,
  meta: { fontFamily: "'JetBrains Mono V', ui-monospace, monospace" } as CSSProperties,
};

type Hack = (typeof HACKATHONS)[number];
type Link = Hack["links"][number];
type Video = { label: string; href: string; poster?: string };

/** Apart Research's asterisk mark (from apartresearch.com). */
function ApartMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="currentColor" aria-hidden>
      <path d="M39.21 35.39L38.42 3.62L61.58 3.62L60.79 35.39L89.86 21.53L100 40.8L66.69 54.73L92.3 83.02L73.31 96.38L50 65.58L26.69 96.38L7.7 83.02L33.31 54.73L0 40.8L10.14 21.53z" />
    </svg>
  );
}

function Mark({ mark }: { mark: Hack["mark"] }) {
  return (
    <span className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[color:var(--border)] bg-white shadow-sm" aria-hidden>
      {mark === "amazon" ? <FaAmazon className="size-6 text-[#17140f]" /> : <ApartMark className="size-6 text-[#255642]" />}
    </span>
  );
}

const chip = "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] transition-colors";

function LinkChip({ l, onPlay }: { l: Link; onPlay: (v: Video) => void }) {
  if (l.kind === "video") {
    return (
      <button type="button" onClick={() => onPlay({ label: l.label, href: l.href, poster: "poster" in l ? l.poster : undefined })}
        className={cn(chip, "bg-foreground text-background hover:bg-primary")} style={F.meta}>
        <Play className="size-3 fill-current" /> {l.label}
        {"length" in l && <span className="opacity-60">{l.length}</span>}
      </button>
    );
  }
  const Icon = l.kind === "github" ? GithubIcon : l.kind === "doc" ? FileText : ArrowUpRight;
  return (
    <a href={l.href} target="_blank" rel="noreferrer"
      className={cn(chip, "border border-[color:var(--border)] bg-white/50 text-foreground hover:border-primary hover:text-primary")} style={F.meta}>
      <Icon className="size-3" /> {l.label}
    </a>
  );
}

function Player({ v, onClose }: { v: Video; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  return createPortal(
    <div role="dialog" aria-modal aria-label={v.label} onClick={onClose}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-[#17140f]/80 p-4 backdrop-blur-sm" data-lenis-prevent>
      <div className="relative w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
        <video src={v.href} poster={v.poster} controls autoPlay playsInline className="aspect-video w-full rounded-md bg-black shadow-2xl" />
        <button type="button" onClick={onClose} aria-label="Close video"
          className="absolute -top-11 right-0 rounded-full bg-white/90 p-2 text-[#17140f] hover:bg-white">
          <X className="size-4" />
        </button>
      </div>
    </div>,
    document.body,
  );
}

export function HackathonsSection() {
  const [playing, setPlaying] = useState<Video | null>(null);
  return (
    <section id="hackathons" className="px-6 pb-16 md:px-16">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <p className="mb-7 flex items-center gap-3 text-[11px] uppercase tracking-[0.18em] text-muted-foreground" style={F.meta}>
            <span className="h-px w-8 bg-[color:var(--border)]" /> Hackathons &amp; research sprints
          </p>
        </Reveal>
        <ol className="flex flex-col gap-8">
          {HACKATHONS.map((h, i) => (
            <Reveal as="li" key={h.id} delay={i * 0.06} className="flex gap-4">
              <Mark mark={h.mark} />
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-xl leading-tight tracking-tight md:text-2xl" style={F.display}>{h.event}</p>
                    <p className="text-sm text-muted-foreground">
                      <span className="text-foreground">{h.project}</span> · {h.org} · {h.detail}
                    </p>
                  </div>
                  <p className="shrink-0 pt-1 text-right text-[11px] uppercase tracking-[0.16em] text-muted-foreground" style={F.meta}>{h.dates}</p>
                </div>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">{h.blurb}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {h.links.map((l) => <LinkChip key={l.label} l={l} onPlay={setPlaying} />)}
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
      {playing && <Player v={playing} onClose={() => setPlaying(null)} />}
    </section>
  );
}
