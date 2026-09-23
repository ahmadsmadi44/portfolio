import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

/**
 * Infinite marquee whose speed + direction react to scroll velocity (ScrollTrigger),
 * with a subtle skew on fast scroll.
 */
export default function Marquee({
  items,
  className,
  itemClassName,
  speed = 60,
  reverse = false,
}: {
  items: React.ReactNode[];
  className?: string;
  itemClassName?: string;
  speed?: number;
  reverse?: boolean;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const t = track.current!;
      const half = t.scrollWidth / 2;
      
      const tween = gsap.fromTo(
        t,
        { x: reverse ? -half : 0 },
        { x: reverse ? 0 : -half, duration: half / speed, ease: "none", repeat: -1 },
      );
      const skew = gsap.quickTo(wrap.current!, "skewX", { duration: 0.4, ease: "power3" });
      ScrollTrigger.create({
        trigger: wrap.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const v = self.getVelocity();
          gsap.to(tween, { timeScale: 1 + Math.min(Math.abs(v) / 300, 6), duration: 0.2, overwrite: true });
          gsap.to(tween, { timeScale: 1, duration: 1, delay: 0.2 });
          skew(gsap.utils.clamp(-5, 5, v / -400));
        },
      });
    },
    { scope: wrap },
  );

  const row = [...items, ...items];
  return (
    <div ref={wrap} className={cn("overflow-hidden whitespace-nowrap", className)}>
      <div ref={track} className="flex w-max items-center will-change-transform">
        {row.map((it, i) => (
          <div key={i} className={cn("flex shrink-0 items-center", itemClassName)}>{it}</div>
        ))}
      </div>
    </div>
  );
}
