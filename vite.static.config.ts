import path from "node:path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root: path.join(projectRoot, "static-src"),
  base: "/",
  publicDir: path.join(projectRoot, "public"),
  plugins: [react()],
  preview: {
    allowedHosts: ["terminal.local"],
  },
  build: {
    outDir: path.join(projectRoot, "static-build"),
    emptyOutDir: true,
    sourcemap: false,
  },
});
