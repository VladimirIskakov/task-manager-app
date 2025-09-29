/// <reference types="vitest" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path, { resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],

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
