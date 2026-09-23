import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { viteSingleFile } from "vite-plugin-singlefile";

// `npm run build`      -> dist/ : the real multi-page site (public/ assets copied alongside)
// `npm run build:demo` -> dist-demo/index.html : one self-contained file with every design direction
export default defineConfig(({ mode }) => ({
  plugins: [react(), tailwindcss(), ...(mode === "demo" ? [viteSingleFile()] : [])],
  resolve: { alias: { "@": path.resolve(import.meta.dirname, "./src") } },
  base: mode === "preview" ? "./" : "/",
  publicDir: mode === "demo" ? false : "public",
  build: { chunkSizeWarningLimit: 4000, outDir: mode === "demo" ? "dist-demo" : mode === "preview" ? "dist-preview" : "dist" },
}));
