import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import GlassLayout, { type GlassVariant } from "./GlassLayout";
import ProjectPage from "./ProjectPage";
import { BlobBackdrop } from "./backdrops";
import { EDITORIAL } from "./variants";

/**
 * Editorial, with the colour combos Ahmad picked from his reference photos.
 * Only colours change between them — layout, fonts, motion stay identical.
 * [background, accent] pairs map onto --background / --primary.
 */
type EdPalette = {
  id: string;
  name: string;
  pair: [string, string];
  vars: Record<string, string>;
  blobs: string[];
  blobOpacity: number;
};

const PALETTES: EdPalette[] = [
  {
    id: "ink",
    name: "Paper & Ink",
    pair: ["#f3efe7", "#2440ff"],
    vars: EDITORIAL.vars,
    blobs: ["#b9c4ff", "#ffd9c2", "#c9e7ff"],
    blobOpacity: 0.6,
  },
  {
    id: "tamarillo",
    name: "Tamarillo & Butter",
    pair: ["#f4dfa8", "#8f1512"],
    vars: {
      "--background": "#f4dfa8",
      "--foreground": "#2b0b09",
      "--muted-foreground": "#7b4f3c",
      "--primary": "#8f1512",
      "--primary-foreground": "#fbeccb",
      "--border": "rgba(43,11,9,0.16)",
    },
    blobs: ["#fbefc9", "#e8b16e", "#c6453b"],
    blobOpacity: 0.45,
  },
  {
    id: "lichen",
    name: "Limestone & Lichen",
    pair: ["#ecdad0", "#6d8a48"],
    vars: {
      "--background": "#ecdad0",
      "--foreground": "#2a2a20",
      "--muted-foreground": "#716a5e",
      "--primary": "#6d8a48",
      "--primary-foreground": "#ffffff",
      "--border": "rgba(42,42,32,0.14)",
    },
    blobs: ["#b8c99a", "#f6e6dc", "#d9bfb2"],
    blobOpacity: 0.6,
  },
  {
    id: "vermilion",
    name: "Vermilion & Slate",
    pair: ["#d2dfe5", "#e3170a"],
    vars: {
      "--background": "#d2dfe5",
      "--foreground": "#101a22",
      "--muted-foreground": "#4f6270",
      "--primary": "#e3170a",
      "--primary-foreground": "#ffffff",
      "--border": "rgba(16,26,34,0.14)",
    },
    blobs: ["#a9c3cf", "#f2a58f", "#e9f1f4"],
    blobOpacity: 0.6,
  },
  {
    id: "peach",
    name: "Peach & Baby Blue",
    pair: ["#f8d8c4", "#4a88dc"],
    vars: {
      "--background": "#f8d8c4",
      "--foreground": "#1b2230",
      "--muted-foreground": "#6f5e58",
      "--primary": "#4a88dc",
      "--primary-foreground": "#ffffff",
      "--border": "rgba(27,34,48,0.14)",
    },
    blobs: ["#f2a383", "#8ebdf3", "#fde7da"],
    blobOpacity: 0.6,
  },
];

const home = "#/c3";
const hrefFor = (id: string) => `#/c3/${id}`;

export default function EditorialDemo({ projectId }: { projectId?: string }) {
  const [pid, setPid] = useState("ink");
  const pal = PALETTES.find((p) => p.id === pid)!;

  const v: GlassVariant = useMemo(
    () => ({
      ...EDITORIAL,
      vars: pal.vars,
      Backdrop: () => <BlobBackdrop key={pal.id} colors={pal.blobs} blur={110} opacity={pal.blobOpacity} size={40} />,
      projectHref: hrefFor,
    }),
    [pal],
  );

  return (
    <>
      {projectId ? (
        <ProjectPage key={projectId} v={v} projectId={projectId} homeHref={home} hrefFor={hrefFor} />
      ) : (
        <GlassLayout v={v} />
      )}

      {/* colour-combo picker (demo only) */}
      <div className="fixed right-3 top-3 z-[90]">
        <div className="flex items-center gap-1.5 rounded-full border border-white/60 bg-white/55 py-1.5 pl-3 pr-1.5 shadow-lg backdrop-blur-xl">
          <span className="hidden pr-1 text-[11px] font-medium text-black/70 sm:inline" style={{ fontFamily: "'Inter Tight Variable', sans-serif" }}>{pal.name}</span>
          {PALETTES.map((p) => (
            <button
              key={p.id}
              type="button"
              title={p.name}
              aria-label={p.name}
              onClick={() => setPid(p.id)}
              className={cn(
                "size-6 shrink-0 overflow-hidden rounded-full border border-black/10 transition-transform",
                p.id === pid ? "scale-110 ring-2 ring-black/70 ring-offset-1" : "opacity-80 hover:scale-105 hover:opacity-100",
              )}
              style={{ background: `linear-gradient(135deg, ${p.pair[0]} 50%, ${p.pair[1]} 50%)` }}
            />
          ))}
        </div>
      </div>
    </>
  );
}
