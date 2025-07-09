import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // root: path.resolve(__dirname, 'src'),
  // build: {
  //   outDir: '../dist'
  // },
  // server: {
  //   port: 8080
  // },
  plugins: [react()],
})
