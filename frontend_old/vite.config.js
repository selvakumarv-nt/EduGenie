import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/qa': 'http://localhost:8000',
      '/explain': 'http://localhost:8000',
      '/quiz': 'http://localhost:8000',
      '/summarize': 'http://localhost:8000',
      '/learn': 'http://localhost:8000',
      '/health': 'http://localhost:8000'
    }
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true
  }
});
