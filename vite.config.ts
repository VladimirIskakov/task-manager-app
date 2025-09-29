/// <reference types="vitest" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path, { resolve } from 'path';
import { fileURLToPath } from 'url';
import { VitePWA } from 'vite-plugin-pwa';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [
  react(),
  VitePWA({
    registerType: 'autoUpdate',
    manifest: {
      name: 'Task Manager App',
      short_name: 'Tasks',
      start_url: '/',
      display: 'standalone',
      background_color: '#ffffff',
      theme_color: '#ffffff',
      icons: [
        { src: 'icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
        { src: 'icons/icon-512x512.png', sizes: '512x512', type: 'image/png' },
      ],
    },
    workbox: {
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/your-api-url\.com\/.*$/,
          handler: 'NetworkFirst',
          options: { cacheName: 'api-cache', expiration: { maxEntries: 50, maxAgeSeconds: 86400 } },
        },
      ],
    },
  }),
],

  resolve: {
    alias: [
      { find: '@', replacement: resolve(__dirname, './src') },
      { find: 'root', replacement: resolve(__dirname, './') },
    ],
  },

  test: {
    globals: true,        
    environment: 'jsdom', 
    setupFiles: './src/setupTests.ts',
    coverage: {
      reporter: ['text', 'json', 'html'], 
    },
  },
});
