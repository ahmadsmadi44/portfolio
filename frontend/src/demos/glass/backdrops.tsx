import { useEffect, useRef } from "react";
import { ShaderGradient, ShaderGradientCanvas } from "@shadergradient/react";
import { gsap, useGSAP } from "@/lib/gsap";

/* ---------- WebGL shader backdrop (ShaderGradient) ---------- */
export function ShaderBackdrop(props: Record<string, unknown>) {
  const base = {
    control: "props", type: "plane", animate: "on", uTime: 0, uSpeed: 0.2, uStrength: 3, uDensity: 1.4,
    uFrequency: 0, uAmplitude: 0, positionX: 0, positionY: 0, positionZ: 0,
    rotationX: 0, rotationY: 0, rotationZ: 0,
    reflection: 0.1, wireframe: false, shader: "defaults", lightType: "3d", brightness: 1.2, grain: "off",
    cAzimuthAngle: 180, cPolarAngle: 90, cDistance: 3.6, cameraZoom: 1,
    range: "disabled", rangeStart: 0, rangeEnd: 40,
  };
  const p = { ...base, ...props } as any;
  return (
    <ShaderGradientCanvas style={{ position: "absolute", inset: 0 }} pixelDensity={1} fov={45}>
      <ShaderGradient {...p} />
    </ShaderGradientCanvas>
  );
}

/* ---------- Drifting blurred blobs (pure CSS + GSAP, no WebGL) ---------- */
export function BlobBackdrop({ colors, blur = 90, opacity = 0.75, size = 46 }: { colors: string[]; blur?: number; opacity?: number; size?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>(".blob", ref.current).forEach((b) => {
        const drift = () =>
          gsap.to(b, {
            xPercent: gsap.utils.random(-60, 60),
            yPercent: gsap.utils.random(-50, 50),
            scale: gsap.utils.random(0.8, 1.3),
            duration: gsap.utils.random(7, 12),
            ease: "sine.inOut",
            onComplete: drift,
          });
        drift();
      });
    },
    { scope: ref },
  );
  const spots = [[10, 5], [60, 0], [70, 45], [5, 55], [40, 70]];
  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden" style={{ background: "var(--background)" }}>
      {colors.map((c, i) => (
        <div
          key={i}
          className="blob absolute rounded-full"
          style={{
            left: `${spots[i % spots.length][0]}%`,
            top: `${spots[i % spots.length][1]}%`,
            width: `${size}vmax`,
            height: `${size}vmax`,
            background: c,
            filter: `blur(${blur}px)`,
            opacity,
          }}
        />
      ))}
    </div>
  );
}

/* ---------- Overlays ---------- */
const noise =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";

export function Grain({ opacity = 0.12, blend = "overlay" }: { opacity?: number; blend?: string }) {
  return <div className="absolute inset-0" style={{ backgroundImage: noise, opacity, mixBlendMode: blend as any }} />;
}

export function Stars() {
  return (
    <div
      className="absolute inset-0 opacity-60"
      style={{
        backgroundImage:
          "radial-gradient(1px 1px at 20px 30px, #fff, transparent), radial-gradient(1px 1px at 120px 80px, #cfe, transparent), radial-gradient(1.5px 1.5px at 200px 150px, #fff, transparent), radial-gradient(1px 1px at 60px 190px, #bdf, transparent), radial-gradient(1px 1px at 260px 40px, #fff, transparent)",
        backgroundSize: "300px 220px",
      }}
    />
  );
}

/** Blueprint grid that brightens under the cursor. */
export function SpotlightGrid({ line = "rgba(15,23,32,0.07)", hot = "rgba(13,148,136,0.35)", cell = 56 }: { line?: string; hot?: string; cell?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current!;
    const on = (e: PointerEvent) => {
      el.style.setProperty("--gx", `${e.clientX}px`);
      el.style.setProperty("--gy", `${e.clientY}px`);
    };
    window.addEventListener("pointermove", on);
    return () => window.removeEventListener("pointermove", on);
  }, []);
  const grid = (c: string) => `linear-gradient(${c} 1px, transparent 1px), linear-gradient(90deg, ${c} 1px, transparent 1px)`;
  return (
    <div ref={ref} className="absolute inset-0">
      <div className="absolute inset-0" style={{ backgroundImage: grid(line), backgroundSize: `${cell}px ${cell}px` }} />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: grid(hot),
          backgroundSize: `${cell}px ${cell}px`,
          WebkitMaskImage: "radial-gradient(260px circle at var(--gx,-500px) var(--gy,-500px), #000, transparent 70%)",
          maskImage: "radial-gradient(260px circle at var(--gx,-500px) var(--gy,-500px), #000, transparent 70%)",
        }}
      />
    </div>
  );
}

/** Soft colored orb that trails the cursor. */
export function CursorOrb({ color, size = 380 }: { color: string; size?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current!;
    const x = gsap.quickTo(el, "x", { duration: 0.9, ease: "power3" });
    const y = gsap.quickTo(el, "y", { duration: 0.9, ease: "power3" });
    const on = (e: PointerEvent) => { x(e.clientX - size / 2); y(e.clientY - size / 2); };
    window.addEventListener("pointermove", on);
    return () => window.removeEventListener("pointermove", on);
  }, [size]);
  return (
    <div
      ref={ref}
      className="absolute left-0 top-0 rounded-full"
      style={{ width: size, height: size, background: color, filter: "blur(70px)", opacity: 0.55, transform: "translate(-999px,-999px)" }}
    />
  );
}
