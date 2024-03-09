import { fileURLToPath, URL } from 'node:url'
import { readFileSync } from 'fs'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
    https: {
      key: readFileSync('midi-lemons.key'),
      cert: readFileSync('midi-lemons.crt'),
    }
  },
  build: {
    target: "es2022"
  },
  esbuild: {
    target: "es2022",
    drop: ['console', 'debugger'],//drop: ['debugger'],//drop: ['console', 'debugger'],
  },
  optimizeDeps:{
    esbuildOptions: {
      target: "es2022",
    }
  },
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@midi': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
