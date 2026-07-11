import { defineConfig } from 'vite'
import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      // Multi-page app: the landing page plus a standalone file per menu
      // and one data-driven item-detail page.
      input: {
        main: resolve(__dirname, 'index.html'),
        hookah: resolve(__dirname, 'hookah-menu.html'),
        food: resolve(__dirname, 'food-menu.html'),
        drinks: resolve(__dirname, 'drinks-menu.html'),
        item: resolve(__dirname, 'item.html'),
        about: resolve(__dirname, 'about.html'),
        contact: resolve(__dirname, 'contact.html'),
      },
    },
  },
  server: {
    watch: {
      // Loose media files dropped in the project root (screenshots, screen
      // recordings, source cutouts, the reference PNG) aren't app sources —
      // ignoring them keeps the file watcher from crashing on EBUSY when one
      // is mid-write/locked (e.g. an in-progress screen recording).
      ignored: [
        '**/*.png', '**/*.jpg', '**/*.jpeg',
        '**/*.mp4', '**/*.mov', '**/*.webm',
        '**/_research/**', '**/dist/**',
      ],
    },
  },
})
