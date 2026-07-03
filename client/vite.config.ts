import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@assets": resolve(__dirname, 'src/assets'),
      "@components": resolve(__dirname, 'src/components'),
      "@graphql": resolve(__dirname, 'src/graphql'),
      "@hooks": resolve(__dirname, 'src/hooks'),
      "@lib": resolve(__dirname, 'src/lib'),
      "@modules": resolve(__dirname, 'src/modules'),
      "@pages": resolve(__dirname, 'src/pages'),
      "@router": resolve(__dirname, 'src/router'),
      "@appTypes": resolve(__dirname, 'src/types'),
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/setup.ts',
  }
})
