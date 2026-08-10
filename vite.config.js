import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        inscription: resolve(__dirname, "inscription.html"),
        merciInscription: resolve(__dirname, "merci-inscription.html"),
      },
    },
  },
});
