import svgr from '@honkhonk/vite-plugin-svgr';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
/**
 * @type {import('vite').UserConfig}
 */
export default defineConfig({
  plugins: [react(), svgr()],
  server: { port: 3333, cors: false },
  base: './',
});
