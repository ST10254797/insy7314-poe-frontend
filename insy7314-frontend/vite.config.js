import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";

export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: fs.readFileSync("../ssl/key.pem"),   // path relative to Vite root
      cert: fs.readFileSync("../ssl/cert.pem")
    },
    port: 5173
  }
});
