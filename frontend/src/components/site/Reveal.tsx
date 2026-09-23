import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

/** Blur + fade + rise reveal on scroll, in the spirit of MagicUI's BlurFade. */
export default function Reveal({
  children,
  delay = 0,
  y = 10,
  className,
  as: As = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: any;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      gsap.fromTo(
        ref.current,
        { opacity: 0, y, filter: "blur(6px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.7,
          delay,
          ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 92%" },
        },
      );
    },
    { scope: ref },
  );
  const Comp = As as any;
  return (
    <Comp ref={ref} className={className}>
      {children}
    </Comp>
  );
}
