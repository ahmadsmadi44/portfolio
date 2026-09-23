import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { SplitText } from "gsap/SplitText";
import { TextPlugin } from "gsap/TextPlugin";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { Flip } from "gsap/Flip";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(
  useGSAP,
  ScrollTrigger,
  ScrollToPlugin,
  SplitText,
  TextPlugin,
  ScrambleTextPlugin,
  Draggable,
  InertiaPlugin,
  Flip,
  DrawSVGPlugin,
  MotionPathPlugin,
);

export {
  gsap,
  useGSAP,
  ScrollTrigger,
  SplitText,
  Draggable,
  Flip,
  MotionPathPlugin,
};

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Smooth-scroll to an in-page anchor. */
export function scrollToId(id: string) {
  const el = document.querySelector(id);
  if (!el) return;
  gsap.to(window, {
    duration: 1.2,
    ease: "power3.inOut",
    scrollTo: { y: el, offsetY: 72 },
  });
}
