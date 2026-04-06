import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc'; 
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import { fileURLToPath } from 'url';

// In ESM (JavaScript Modules), we need to manually define __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Vite Configuration for FinDash
 * Using SWC for high-performance JSX compilation and 
 * Tailwind v4 for cinematic styling.
 */
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Provides the "@" shortcut to your /src directory
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    // Ensuring the dev server runs smoothly on your local machine
    port: 3000,
    host: true,
  },
});