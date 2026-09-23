import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import SiteApp from "./site/SiteApp";

// `npm run build`       -> the real portfolio site (dist/, deploy to Vercel)
// `npm run build:demo`  -> the one-file design-directions demo (dist-demo/index.html)
const Root = import.meta.env.MODE === "demo" ? App : SiteApp;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
);
