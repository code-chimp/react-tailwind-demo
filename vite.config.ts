import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  preview: { port: 3000 },
  server: { port: 3000, open: true },
  resolve: {
    alias: { '@': resolve(__dirname, './src') },
  },
});
