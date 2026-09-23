import type { IconType } from "react-icons";
import {
  SiPython, SiReact, SiNodedotjs, SiLangchain, SiN8N, SiSupabase, SiFastapi, SiOpencv,
  SiHubspot, SiNotion, SiGmail, SiScikitlearn, SiGooglegemini, SiAnthropic, SiUltralytics, SiScipy, SiKeras, SiTensorflow,
} from "react-icons/si";
import { FaAws } from "react-icons/fa6";
import { SKILL_ICONS } from "./skillIcons";

/** Logo lookup for any tech label (project stacks + skills). Unknown labels render text-only. */
export const TECH_ICONS: Record<string, IconType> = {
  ...SKILL_ICONS,
  "Python": SiPython,
  "React": SiReact,
  "Node.js": SiNodedotjs,
  "LangGraph": SiLangchain,
  "n8n": SiN8N,
  "Supabase / pgvector": SiSupabase,
  "FastAPI": SiFastapi,
  "OpenCV": SiOpencv,
  "YOLO11": SiUltralytics,
  "HubSpot": SiHubspot,
  "Notion": SiNotion,
  "Gmail": SiGmail,
  "scikit-learn": SiScikitlearn,
  "Gemini": SiGooglegemini,
  "Anthropic": SiAnthropic,
  "AWS (IaC)": FaAws,
  "SciPy": SiScipy,
  "Keras": SiKeras,
  "TensorFlow": SiTensorflow,
};
