export const NAME = "Ahmad Al-Smadi";
export const INITIALS = "AS";
export const ROLE = "AI Solutions Engineer";
export const SUBROLE = "Aerospace Engineer";
export const LOCATION = "Milton, ON";
export const TAGLINE = "I build AI agent systems, automation pipelines, and applied ML — with an aerospace engineer's discipline for testing things until they actually work.";

export const SUMMARY = "AI agent systems and automation pipelines. Aerospace-engineered.";

export const CONTACT = {
  email: "ahmadalsmadi4444@gmail.com",
  github: "https://github.com/ahmadsmadi44",
  linkedin: "https://linkedin.com/in/ahmadalsmadi",
  resumeHref: "#",
};

export const SOCIALS = [
  { name: "GitHub", href: CONTACT.github },
  { name: "LinkedIn", href: CONTACT.linkedin },
  { name: "Email", href: `mailto:${CONTACT.email}` },
] as const;

export const WORK = [
  {
    company: "Lumora AI",
    title: "Founder & AI Solutions Engineer",
    href: "https://www.lumorai.ca",
    logo: "",
    start: "Jan 2025",
    end: "Present",
    location: "Remote",
    description: "AI agent systems + automation pipelines for clients.",
  },
  {
    company: "Celestica",
    title: "PM Intern, Global Automation Team",
    href: "https://www.celestica.com",
    logo: "/assets/logos/celestica.png",
    start: "May 2024",
    end: "Sept 2025",
    location: "Toronto, ON",
    description: "Power BI reporting for C-suite automation initiatives.",
  },
] as const;

export const EDUCATION = [
  {
    school: "Toronto Metropolitan University",
    href: "https://www.torontomu.ca",
    logo: "/assets/logos/tmu.png",
    degree: "B.Eng, Aerospace Engineering",
    detail: "Winter 2026 Dean's List, Faculty of Engineering and Architectural Science",
    start: "2021",
    end: "2026",
  },
] as const;

export const CAPSTONE = {
  title: "Atlas Aeronautics — X-Series Capstone",
  description: "1st place, unanimous decision from Bombardier's review panel — a first for the competition.",
};

export const SKILLS = [
  "Python", "TypeScript", "React", "Node.js", "LangGraph", "n8n",
  "OpenAI / Claude APIs", "Supabase / pgvector", "FastAPI", "LangSmith",
  "SQL", "Power BI", "YOLO11 / OpenCV", "TensorFlow", "AWS", "Vercel",
] as const;

/**
 * Projects, in the same order and with the same names as the live portfolio
 * (ahmad-al-smadi-portfolio.vercel.app). `dates` holds the category label shown
 * on cards (the live site shows categories, not years).
 */
export const ALL_PROJECTS = [
  {
    id: "content-engine",
    cover: "/assets/content-engine/cover/poster.jpg",
    coverVideo: "/assets/content-engine/cover/demo-card.mp4",
    visual: "content-engine",
    title: "Content Engine",
    dates: "Agent systems",
    description: "One interview in. An entire content studio out.",
    tech: ["LangGraph", "Supabase", "FastAPI"],
    href: "https://github.com/ahmadsmadi44/content-engine",
    status: "Demo verified",
  },
  {
    id: "pitch-vision",
    cover: "/assets/pitch-detection-preview.jpg",
    coverVideo: "/assets/pitch-vision/demo-card.mp4",
    visual: "pitch-vision",
    title: "Football Match Analytics",
    dates: "Computer vision → full stack",
    description: "Raw footage to tracked players, ratings, and tactics.",
    tech: ["YOLO11", "ByteTrack", "React"],
    href: "https://ahmad-al-smadi-portfolio.vercel.app/pitch-vision/tactics/liverpool-madrid-five",
    status: "Interactive demo",
  },
  {
    id: "outbound-engine",
    cover: "/assets/automation/outbound-card-poster.jpg",
    coverVideo: "/assets/automation/outbound-card.mp4",
    visual: "lead-engine",
    title: "Outbound Engine",
    dates: "Automation",
    description: "Source, enrich, score, and draft outreach, hands-off.",
    tech: ["n8n", "Apify", "HubSpot"],
    href: "#",
    status: "Video · 1:57",
  },
  {
    id: "coordinate-classifier",
    cover: "/assets/project-covers/coordinate-model-evidence.jpg",
    coverVideo: "",
    visual: "predictive-maintenance",
    title: "Coordinate Classification",
    dates: "Applied ML",
    description: "Five models compared. 0.9961 weighted F1.",
    tech: ["scikit-learn", "Python"],
    href: "https://github.com/ahmadsmadi44/AER850_Project_1",
    status: "Complete",
  },
  {
    id: "visual-inspection",
    cover: "/assets/project-covers/surface-inspection-evidence.jpg",
    coverVideo: "",
    visual: "surface-inspection",
    title: "Aircraft Surface Inspection",
    dates: "Deep learning",
    description: "CNNs that flag cracks, missing screws, and paint damage.",
    tech: ["TensorFlow", "Keras"],
    href: "https://github.com/ahmadsmadi44/AER850_Project_2",
    status: "Complete",
  },
  {
    id: "component-detection",
    cover: "/assets/project-covers/pcb-scan-poster.jpg",
    coverVideo: "/assets/project-covers/pcb-scan.mp4",
    visual: "pcb",
    title: "PCB Component Detection",
    dates: "Computer vision",
    description: "YOLO11 across 13 component classes and unseen boards.",
    tech: ["YOLO11", "OpenCV"],
    href: "https://github.com/ahmadsmadi44/AER850_Project_3",
    status: "Complete",
  },
] as const;

/** Projects hidden for now (kept so they're one line away from coming back). */
const HIDDEN = new Set<string>(["coordinate-classifier", "visual-inspection"]);

/** The projects shown on the site: Content Engine, Football, Outbound Engine, PCB Detection. */
export const PROJECTS = ALL_PROJECTS.filter((p) => !HIDDEN.has(p.id));
