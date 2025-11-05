import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs"; // ✅ Import fs for SSL files

export default defineConfig({
plugins: [react()],
server: {
https: {
key: fs.readFileSync('ssl/key.pem'),
cert: fs.readFileSync('ssl/cert.pem'),
},
// port: 3000, // optional, ensures your dev server runs on 3000
},
test: {
globals: true,
environment: 'jsdom',
coverage: {
provider: 'v8',
reporter: ['text', 'html', 'lcov'],
},
}
});
