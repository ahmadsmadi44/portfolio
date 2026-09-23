import { useEffect, useState } from "react";
import DemoSwitcher, { DEMO_IDS, type DemoId } from "@/components/site/DemoSwitcher";
import { ScrollTrigger } from "@/lib/gsap";
import PortfolioA from "@/demos/PortfolioA";
import PortfolioB from "@/demos/PortfolioB";
import PortfolioC from "@/demos/PortfolioC";
import GlassLayout from "@/demos/glass/GlassLayout";
import EditorialDemo from "@/demos/glass/EditorialDemo";
import { GLASS_VARIANTS } from "@/demos/glass/variants";

type Route = { demo: DemoId; sub?: string };

const read = (): Route => {
  const [h, sub] = window.location.hash.replace("#/", "").split("/");
  return { demo: (DEMO_IDS.includes(h) ? h : "c3") as DemoId, sub: sub || undefined };
};

export default function App() {
  const [route, setRoute] = useState<Route>(read);
  const { demo, sub } = route;

  useEffect(() => {
    const on = () => setRoute(read());
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    const t = setTimeout(() => ScrollTrigger.refresh(), 400);
    return () => clearTimeout(t);
  }, [demo, sub]);

  const change = (d: DemoId) => {
    window.location.hash = `/${d}`;
  };

  const variant = demo !== "c3" ? GLASS_VARIANTS.find((v) => v.id === demo) : undefined;

  return (
    <>
      {demo === "a" && <PortfolioA key="a" />}
      {demo === "b" && <PortfolioB key="b" />}
      {demo === "c" && <PortfolioC key="c" />}
      {demo === "c3" && <EditorialDemo key="c3" projectId={sub} />}
      {variant && <GlassLayout key={variant.id} v={variant} />}
      <DemoSwitcher current={demo} onChange={change} />
    </>
  );
}
