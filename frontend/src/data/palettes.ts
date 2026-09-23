export type Palette = {
  name: string;
  /** swatch shown in the picker */
  swatch: string;
  /** drives --primary (accent text, icons, buttons) */
  primary: string;
  /** eyebrow / kicker text color */
  eyebrow: string;
  /** ShaderGradient plane colors, brightest -> palest */
  color1: string;
  color2: string;
  color3: string;
};

export const PALETTES: Palette[] = [
  {
    name: "Sunset",
    swatch: "#ff6a1a",
    primary: "#ff6a1a",
    eyebrow: "#b83c05",
    color1: "#ff8a3d",
    color2: "#ffd8bb",
    color3: "#fff5ec",
  },
  {
    name: "Ocean",
    swatch: "#0ea5b7",
    primary: "#0ea5b7",
    eyebrow: "#0b6e79",
    color1: "#3fd0e0",
    color2: "#bdeef2",
    color3: "#f0fbfc",
  },
  {
    name: "Meadow",
    swatch: "#4f9d4f",
    primary: "#3f8f45",
    eyebrow: "#2d6b32",
    color1: "#7ed08a",
    color2: "#d4f0c8",
    color3: "#f6fbef",
  },
  {
    name: "Berry",
    swatch: "#b34cc9",
    primary: "#a83cc4",
    eyebrow: "#7d2a97",
    color1: "#d68ae0",
    color2: "#f0d0ee",
    color3: "#fbf1fa",
  },
  {
    name: "Dusk",
    swatch: "#6366f1",
    primary: "#5457e5",
    eyebrow: "#3b3ec2",
    color1: "#8a8ef2",
    color2: "#d6d7fb",
    color3: "#f3f3fd",
  },
];
