import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: process.env.IS_DOCKER || process.env.KUBERNETES_SERVICE_HOST 
          ? 'http://backend:3000' 
          : 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});