import { useEffect } from "react";
import { BrowserRouter, HashRouter, Navigate, Route, Routes, useLocation, useNavigate, useParams } from "react-router-dom";

// The hosted preview can only serve one page, so it uses #/ routes; the real site uses clean URLs.
const Router = import.meta.env.MODE === "preview" ? HashRouter : BrowserRouter;
import { ScrollTrigger } from "@/lib/gsap";
import GlassLayout, { type GlassVariant } from "@/demos/glass/GlassLayout";
import ProjectPage from "@/demos/glass/ProjectPage";
import { EDITORIAL } from "@/demos/glass/variants";
import { ALL_PROJECTS, NAME, PROJECTS } from "@/data/content";
import FootballTabs from "@/legacy/FootballTabs.jsx";
import ContentEngineDemo from "@/legacy/ContentEngineDemo.jsx";
import "@/legacy/legacy.css";
import SiteAbout from "./SiteAbout";

/**
 * The real, deployable portfolio: Editorial in Paper & Ink, with clean URLs.
 * Keeps the old site's addresses working (/projects/:id and
 * /pitch-vision/tactics/:id) so existing links on the resume still land.
 */
const MATCH = "liverpool-madrid-five";
const hrefFor = (id: string) => (id === "pitch-vision" ? `/pitch-vision/tactics/${MATCH}` : `/projects/${id}`);

const SITE: GlassVariant = { ...EDITORIAL, projectHref: hrefFor, useCovers: true, Extras: SiteAbout };

/** Same-origin <a href> clicks become client-side navigations (no full reload). */
function LinkInterceptor() {
  const navigate = useNavigate();
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a");
      if (!a || a.target || a.hasAttribute("download")) return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      e.preventDefault();
      navigate(url.pathname + url.search + url.hash);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [navigate]);
  return null;
}

function ScrollReset() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) requestAnimationFrame(() => document.getElementById(hash.slice(1))?.scrollIntoView());
    else window.scrollTo(0, 0);
    const t = setTimeout(() => ScrollTrigger.refresh(), 400);
    return () => clearTimeout(t);
  }, [pathname, hash]);
  return null;
}

function Title({ text }: { text: string }) {
  useEffect(() => { document.title = text; }, [text]);
  return null;
}

const renderEmbed = (kind: "tactical-lab" | "content-engine", matchId = MATCH, initialTab: "tactics" | "shots" = "tactics") =>
  kind === "tactical-lab" ? <FootballTabs matchId={matchId} initialTab={initialTab} /> : <ContentEngineDemo />;

function ProjectRoute() {
  const { id = "" } = useParams();
  if (id === "pitch-vision") return <Navigate to={hrefFor("pitch-vision")} replace />;
  if (id === "lead-engine") return <Navigate to="/projects/outbound-engine" replace />;
  const p = PROJECTS.find((x) => x.id === id);
  if (!p && ALL_PROJECTS.some((x) => x.id === id)) return <Navigate to="/#projects" replace />; // hidden for now
  if (!p) return <NotFound />;
  return (
    <>
      <Title text={`${p.title} | ${NAME}`} />
      <ProjectPage key={id} v={SITE} projectId={id} homeHref="/#projects" hrefFor={hrefFor} renderEmbed={(k) => renderEmbed(k)} />
    </>
  );
}

function MatchRoute() {
  const { id = MATCH } = useParams();
  return (
    <>
      <Title text={`Matchlens | ${NAME}`} />
      <ProjectPage key="pitch-vision" v={SITE} projectId="pitch-vision" homeHref="/#projects" hrefFor={hrefFor} renderEmbed={(k) => renderEmbed(k, id)} />
    </>
  );
}

function ShotsRoute() {
  return (
    <>
      <Title text={`Matchlens | ${NAME}`} />
      <ProjectPage key="pitch-vision-shots" v={SITE} projectId="pitch-vision" homeHref="/#projects" hrefFor={hrefFor} renderEmbed={(k) => renderEmbed(k, MATCH, "shots")} />
    </>
  );
}

function NotFound() {
  return (
    <div className="demo-root flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center" style={{ ...(SITE.vars as object), fontFamily: SITE.fontBody }}>
      <Title text={`Not found | ${NAME}`} />
      <h1 className="text-5xl tracking-[-0.04em]" style={{ fontFamily: SITE.fontDisplay }}>That page isn’t <em className="text-primary">here.</em></h1>
      <a href="/" className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground">Back to the portfolio</a>
    </div>
  );
}

export default function SiteApp() {
  return (
    <Router>
      <LinkInterceptor />
      <ScrollReset />
      <Routes>
        <Route path="/" element={<><Title text={`${NAME} | AI Solutions Engineer`} /><GlassLayout key="home" v={SITE} /></>} />
        <Route path="/projects/:id" element={<ProjectRoute />} />
        <Route path="/pitch-vision" element={<Navigate to={hrefFor("pitch-vision")} replace />} />
        <Route path="/pitch-vision/tactics/:id" element={<MatchRoute />} />
        <Route path="/pitch-vision/shots/:id" element={<ShotsRoute />} />
        <Route path="/pitch-vision/:id" element={<Navigate to={hrefFor("pitch-vision")} replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
