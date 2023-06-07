import * as path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '~/__generated__': path.resolve(__dirname, '/src/__generated__'),
      '~/components': path.resolve(__dirname, '/src/components'),
      '~/contexts': path.resolve(__dirname, '/src/contexts'),
      '~/hooks': path.resolve(__dirname, '/src/hooks'),
      '~/types': path.resolve(__dirname, '/src/types'),
      '~/utils': path.resolve(__dirname, '/src/utils'),
    },
  },
})
