import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/clear-route/',
  plugins: [react()],
  build: {
    minify: false,
    sourcemap: true,
    target: 'esnext',
  },
})
