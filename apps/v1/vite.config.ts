import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  server: {},
  resolve: {
    alias: {
      "@maid_melisa/shared": new URL("../../packages/shared", import.meta.url)
        .pathname,
      "@maid_melisa/shared/cn": new URL(
        "../../packages/shared/cn.ts",
        import.meta.url,
      ).pathname,
      "@maid_melisa/shared/theme": new URL(
        "../../packages/shared/theme.ts",
        import.meta.url,
      ).pathname,
      "@maid_melisa/templates": new URL("../../templates", import.meta.url)
        .pathname,
      "@maid_melisa/templates/types": new URL(
        "../../templates/types",
        import.meta.url,
      ).pathname,
    },
  },
});
