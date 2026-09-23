import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

/**
 * Self-playing, no-video-needed "preview" for a project card — a small abstract
 * scene per project, built from SVG/CSS and looped with GSAP. Stands in for a real
 * screen-recording/screenshot until one exists; swap for <video>/<img> later.
 */
export function ProjectVisual({ variant, className }: { variant: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current!;
      if (variant === "content-engine") {
        const nodes = gsap.utils.toArray<HTMLElement>(".pv-node", el);
        const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.6 });
        tl.set(nodes, { opacity: 0.25 })
          .set(".pv-flow-dot", { offsetDistance: "0%", opacity: 0 });
        nodes.forEach((n, i) => tl.to(n, { opacity: 1, duration: 0.3 }, i * 0.5));
        tl.to(".pv-flow-dot", { opacity: 1, duration: 0.1 }, 0)
          .to(".pv-flow-dot", { offsetDistance: "100%", duration: nodes.length * 0.5, ease: "none" }, 0)
          .to(nodes, { opacity: 0.25, duration: 0.4 }, nodes.length * 0.5 + 0.3);
      } else if (variant === "pitch-vision") {
        gsap.to(".pv-player", {
          x: (i) => gsap.utils.random(-40, 40, 1),
          y: (i) => gsap.utils.random(-20, 20, 1),
          duration: 1.6,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          stagger: { each: 0.15, from: "random" },
        });
        gsap.fromTo(".pv-scan", { x: "-10%" }, { x: "110%", duration: 2.4, repeat: -1, ease: "power1.inOut" });
      } else if (variant === "lead-engine") {
        const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.5 });
        gsap.set(".pv-lead", { opacity: 0, x: -10 });
        [".pv-lead-1", ".pv-lead-2", ".pv-lead-3"].forEach((sel, i) => {
          tl.to(sel, { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" }, i * 0.5)
            .to(`${sel} .pv-score`, { scaleX: 1, duration: 0.5 }, i * 0.5 + 0.15);
        });
        tl.to(".pv-lead", { opacity: 0.35, duration: 0.4 }, "+=0.8");
      } else if (variant === "surface-inspection") {
        gsap.fromTo(".pv-sweep", { left: "-8%" }, { left: "104%", duration: 2.6, ease: "power1.inOut", repeat: -1, repeatDelay: 0.4 });
        const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.6 });
        gsap.set(".pv-conf", { scaleX: 0 });
        gsap.set(".pv-tag", { opacity: 0, y: 4 });
        [0, 1, 2].forEach((i) => {
          tl.to(`.pv-tag-${i}`, { opacity: 1, y: 0, duration: 0.3 }, i * 0.8 + 0.4)
            .to(`.pv-tag-${i} .pv-conf`, { scaleX: 1, duration: 0.6, ease: "power2.out" }, i * 0.8 + 0.5);
        });
        tl.to(".pv-tag", { opacity: 0, duration: 0.4 }, "+=1.2").set(".pv-conf", { scaleX: 0 });
      } else if (variant === "pcb") {
        const boxes = gsap.utils.toArray<HTMLElement>(".pv-box", el);
        const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.8 });
        tl.set(boxes, { opacity: 0, scale: 1.25 });
        boxes.forEach((b, i) => tl.to(b, { opacity: 1, scale: 1, duration: 0.25, ease: "back.out(2)" }, i * 0.28));
        tl.to(boxes, { opacity: 0, duration: 0.4 }, "+=1.4");
      } else if (variant === "predictive-maintenance") {
        gsap.utils.toArray<HTMLElement>(".pv-bar").forEach((b, i) => {
          gsap.fromTo(
            b,
            { scaleY: 0.2 },
            { scaleY: () => gsap.utils.random(0.4, 1), duration: 1, repeat: -1, yoyo: true, ease: "sine.inOut", delay: i * 0.12 },
          );
        });
      }
    },
    { scope: ref, dependencies: [variant] },
  );

  return (
    <div ref={ref} className={cn("relative w-full overflow-hidden", className)}>
      {variant === "content-engine" && (
        <svg viewBox="0 0 320 180" className="size-full">
          <defs>
            <path id="pv-path" d="M40,90 C90,30 130,150 160,90 S230,30 280,90" fill="none" />
          </defs>
          <path d="M40,90 C90,30 130,150 160,90 S230,30 280,90" stroke="currentColor" strokeOpacity="0.15" strokeWidth="2" fill="none" />
          {[40, 106, 173, 240, 280].map((cx, i) => (
            <g key={i} className="pv-node" transform={`translate(${cx},${i % 2 === 0 ? 90 : i === 1 ? 30 : 90}) `}>
              <circle r="14" fill="currentColor" />
            </g>
          ))}
          <circle className="pv-flow-dot" r="5" fill="var(--primary)" style={{ offsetPath: "path('M40,90 C90,30 130,150 160,90 S230,30 280,90')" }} />
        </svg>
      )}

      {variant === "pitch-vision" && (
        <div className="relative size-full">
          <div className="absolute inset-4 rounded-lg border border-current/15" />
          <div className="absolute inset-x-4 top-1/2 h-px bg-current/10" />
          {[
            [60, 40], [110, 90], [170, 50], [220, 110], [90, 130], [200, 70], [140, 140],
          ].map(([x, y], i) => (
            <span key={i} className={cn("pv-player absolute size-2.5 rounded-full", i % 2 ? "bg-primary" : "bg-current/50")} style={{ left: `${(x / 320) * 100}%`, top: `${(y / 180) * 100}%` }} />
          ))}
          <div className="pv-scan absolute inset-y-4 w-8 bg-gradient-to-r from-transparent via-primary/25 to-transparent" />
        </div>
      )}

      {variant === "lead-engine" && (
        <div className="flex size-full flex-col justify-center gap-2.5 px-5">
          {[1, 2, 3].map((n) => (
            <div key={n} className={cn(`pv-lead pv-lead-${n}`, "flex items-center gap-2")}>
              <span className="size-6 shrink-0 rounded-full bg-current/15" />
              <span className="h-1.5 w-16 rounded-full bg-current/15" />
              <span className="ml-auto h-1.5 w-10 origin-left scale-x-0 rounded-full bg-primary pv-score" />
            </div>
          ))}
        </div>
      )}

      {variant === "surface-inspection" && (
        <div className="relative flex size-full items-center justify-center gap-3 px-5">
          {[
            { label: "crack", glyph: <path d="M8,38 L22,30 L28,36 L40,22 L52,26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /> },
            { label: "missing screw", glyph: <><circle cx="30" cy="30" r="9" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" /><circle cx="12" cy="12" r="3" fill="currentColor" opacity=".35" /><circle cx="48" cy="48" r="3" fill="currentColor" opacity=".35" /></> },
            { label: "paint", glyph: <path d="M14,34 C10,22 24,14 32,20 C42,12 52,24 46,34 C50,44 34,50 28,44 C18,50 10,42 14,34 Z" fill="currentColor" opacity=".25" /> },
          ].map((t, i) => (
            <div key={i} className="relative flex aspect-square h-[62%] max-h-44 flex-col overflow-hidden rounded-md border border-current/15 bg-current/[0.04]">
              <svg viewBox="0 0 60 60" className="size-full p-2">{t.glyph}</svg>
              <div className={`pv-tag pv-tag-${i} absolute inset-x-1.5 bottom-1.5 rounded bg-foreground/85 px-1.5 py-1 text-[9px] leading-none text-background`}>
                {t.label}
                <span className="pv-conf mt-1 block h-0.5 origin-left rounded-full bg-primary" />
              </div>
            </div>
          ))}
          <div className="pv-sweep absolute inset-y-3 w-6 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        </div>
      )}

      {variant === "pcb" && (
        <div className="relative flex size-full items-center justify-center p-4">
          <div className="relative h-full max-h-60 w-full max-w-md rounded-lg border border-current/20 bg-current/[0.05]">
            {[
              [8, 14, 22, 30, "IC"], [36, 12, 14, 20, "cap"], [56, 16, 30, 22, "header"],
              [10, 58, 16, 26, "res"], [34, 52, 26, 30, "IC"], [66, 56, 22, 26, "usb"],
            ].map(([x, y, w, h, lbl], i) => (
              <div key={i}>
                <span className="absolute rounded-sm bg-current/25" style={{ left: `${x}%`, top: `${y}%`, width: `${w}%`, height: `${h}%` }} />
                <span className="pv-box absolute rounded-sm border-2 border-primary" style={{ left: `${(x as number) - 2}%`, top: `${(y as number) - 4}%`, width: `${(w as number) + 4}%`, height: `${(h as number) + 8}%` }}>
                  <span className="absolute -top-4 left-0 rounded-sm bg-primary px-1 text-[9px] leading-4 text-primary-foreground">{lbl}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {variant === "predictive-maintenance" && (
        <div className="flex size-full items-end justify-center gap-2 px-6 pb-6">
          {Array.from({ length: 9 }).map((_, i) => (
            <span key={i} className="pv-bar w-4 origin-bottom rounded-t-sm bg-primary/70" style={{ height: "70%" }} />
          ))}
        </div>
      )}
    </div>
  );
}
