import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

const port = process.env.PORT ? Number(process.env.PORT) : 5173;
const basePath = process.env.BASE_PATH || "/";

export default defineConfig({
  base: basePath,
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
      "@assets": path.resolve(import.meta.dirname, "..", "..", "attached_assets"),
    },
    dedupe: ["react", "react-dom"],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/.pnpm/react@") || id.includes("node_modules/.pnpm/scheduler@")) return "vendor";
          if (id.includes("node_modules/.pnpm/firebase@")) return "firebase";
          if (id.includes("node_modules/.pnpm/leaflet@") || id.includes("node_modules/.pnpm/react-leaflet@")) return "leaflet";
          if (id.includes("node_modules/.pnpm/framer-motion@")) return "framer";
          if (id.includes("node_modules/.pnpm/lucide-react@")) return "icons";
          if (id.includes("node_modules/.pnpm/@radix-ui")) return "ui";
          if (id.includes("node_modules/.pnpm/tailwind-merge") || id.includes("node_modules/.pnpm/clsx") || id.includes("node_modules/.pnpm/class-variance-authority")) return "ui";
          if (id.includes("node_modules/")) return "deps";
        },
      },
    },
  },
  server: {
    port,
    strictPort: true,
    host: "0.0.0.0",
    allowedHosts: true,
    fs: {
      strict: true,
    },
  },
  preview: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
  },
});
