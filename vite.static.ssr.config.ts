import path from "node:path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root: projectRoot,
  plugins: [react()],
  build: {
    ssr: path.join(projectRoot, "static-src/ssr.tsx"),
    outDir: path.join(projectRoot, ".static-ssr"),
    emptyOutDir: true,
    minify: false,
    rollupOptions: {
      output: {
        entryFileNames: "ssr.mjs",
      },
    },
  },
});
