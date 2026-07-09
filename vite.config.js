import { defineConfig } from 'vite'
import react from '@vitejs/react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/portfolio/', // Tells Vite to look in the correct subdirectory
})
