import { cn } from "@/lib/utils";

export const DEMOS = [
  { id: "a", label: "A", name: "Mono" },
  { id: "b", label: "B", name: "Bold" },
  { id: "c", label: "C", name: "Glass" },
] as const;

export const GLASS_DEMOS = [
  { id: "c", name: "Original" },
  { id: "c2", name: "Midnight" },
  { id: "c3", name: "Editorial" },
  { id: "c4", name: "Acid" },
  { id: "c5", name: "Holo" },
  { id: "c6", name: "Nordic" },
] as const;

export type DemoId = "a" | "b" | (typeof GLASS_DEMOS)[number]["id"];
export const DEMO_IDS: string[] = ["a", "b", ...GLASS_DEMOS.map((d) => d.id)];

/** Floating pill to flip between portfolio directions (and Glass variants). Not part of the real site. */
export default function DemoSwitcher({ current, onChange }: { current: DemoId; onChange: (d: DemoId) => void }) {
  const inGlass = current.startsWith("c");
  return (
    <div className="fixed bottom-4 left-1/2 z-[100] flex w-max max-w-[calc(100vw-24px)] -translate-x-1/2 flex-col items-center gap-2">
      {inGlass && (
        <div className="no-scrollbar flex max-w-full items-center gap-1 overflow-x-auto rounded-full border border-white/15 bg-black/80 p-1 text-white shadow-2xl backdrop-blur-xl">
          {GLASS_DEMOS.map((d, i) => (
            <button
              key={d.id}
              onClick={() => onChange(d.id)}
              className={cn(
                "shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                current === d.id ? "bg-white text-black" : "text-white/70 hover:bg-white/10 hover:text-white",
              )}
            >
              <span className="mr-1 opacity-50">{i + 1}</span>
              {d.name}
            </button>
          ))}
        </div>
      )}
      <div className="flex items-center gap-1 rounded-full border border-white/15 bg-black/80 p-1.5 text-white shadow-2xl backdrop-blur-xl" style={{ fontFamily: "'Inter Tight Variable', sans-serif" }}>
        <span className="px-3 text-[11px] font-medium uppercase tracking-[0.18em] text-white/50">Demo</span>
        {DEMOS.map((d) => {
          const active = d.id === "c" ? inGlass : current === d.id;
          return (
            <button
              key={d.id}
              onClick={() => onChange(d.id)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                active ? "bg-white text-black" : "text-white/70 hover:bg-white/10 hover:text-white",
              )}
            >
              <span className="mr-1.5 opacity-50">{d.label}</span>
              {d.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
