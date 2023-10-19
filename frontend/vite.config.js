/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from '@svgr/rollup'
import legacyPlugin from '@vitejs/plugin-legacy'

const proxy = 'https://rmproject.miaowm5.com/'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    react(),
    svgr(),
    legacyPlugin({ targets: ['chrome 52'] }),
  ],
  build: {
    outDir: '../dist/frontend',
    assetsDir: 'static',
    emptyOutDir: true,
  },
  server: {
    open: true,
    port: 3500,
    proxy: {
      '/api': { target: proxy, changeOrigin: true },
      '/assets': { target: proxy, changeOrigin: true },
    },
  },
})
