import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Round company badge for the experience list (the same pattern as Dillion's
 * portfolio: logo in a white circle beside each role). Lumora AI uses its own
 * orange ✱ mark from lumorai.ca; other companies use their real logo files in
 * public/assets/logos, falling back to an initial if the file isn't there yet.
 */
export default function CompanyLogo({ name, logo, className }: { name: string; logo?: string; className?: string }) {
  const [failed, setFailed] = useState(false);
  const base = cn("flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[color:var(--border)] bg-white shadow-sm", className);

  if (name === "Lumora AI") {
    return (
      <span className={base} aria-hidden>
        <span className="text-[26px] leading-none text-[#ff5a1f]" style={{ fontFamily: "'Inter Tight Variable', sans-serif" }}>✱</span>
      </span>
    );
  }
  if (logo && !failed) {
    return (
      <span className={base} aria-hidden>
        <img src={logo} alt="" className="size-full object-contain p-1.5" onError={() => setFailed(true)} />
      </span>
    );
  }
  return (
    <span className={cn(base, "text-sm font-semibold text-foreground/70")} aria-hidden>
      {name.split(" ").map((w) => w[0]).join("").slice(0, 3)}
    </span>
  );
}
