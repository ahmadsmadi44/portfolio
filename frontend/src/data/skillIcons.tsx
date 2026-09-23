import type { IconType } from "react-icons";
import {
  SiPython, SiTypescript, SiReact, SiNodedotjs, SiLangchain, SiN8N,
  SiClaude, SiSupabase, SiFastapi, SiPostgresql, SiOpencv, SiTensorflow, SiVercel,
} from "react-icons/si";
import { FaAws, FaMicrosoft } from "react-icons/fa6";

/**
 * Maps each SKILLS label (src/data/content.ts) to a brand-logo icon.
 * A few labels have no official mark in Simple Icons (Power BI has none at
 * all; "OpenAI / Claude APIs" and "YOLO11 / OpenCV" are dual-brand) — those
 * fall back to the closest brand-family icon rather than a generic glyph.
 */
export const SKILL_ICONS: Record<string, IconType> = {
  "Python": SiPython,
  "TypeScript": SiTypescript,
  "React": SiReact,
  "Node.js": SiNodedotjs,
  "LangGraph": SiLangchain,
  "n8n": SiN8N,
  "OpenAI / Claude APIs": SiClaude,
  "Supabase / pgvector": SiSupabase,
  "FastAPI": SiFastapi,
  "LangSmith": SiLangchain,
  "SQL": SiPostgresql,
  "Power BI": FaMicrosoft,
  "YOLO11 / OpenCV": SiOpencv,
  "TensorFlow": SiTensorflow,
  "AWS": FaAws,
  "Vercel": SiVercel,
};
