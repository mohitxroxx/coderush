import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const isProduction = process.env.NODE_ENV === 'production';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: isProduction
      ? {}
      : {
          '/api': {
            target: 'https://coderush.onrender.com',
            changeOrigin: true,
            logLevel: 'debug', // Add this line to enable logging
          },
        },
  },
  define: {
    'process.env': {
      VITE_BASE_URL: JSON.stringify(process.env.VITE_BASE_URL),
    },
  },
  plugins: [react()],
});
