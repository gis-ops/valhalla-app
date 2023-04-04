import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      {
        find: 'actions',
        replacement: path.resolve(__dirname, './src/actions'),
      },
      {
        find: 'components',
        replacement: path.resolve(__dirname, './src/components'),
      },
      {
        find: 'Controls',
        replacement: path.resolve(__dirname, './src/Controls'),
      },
      {
        find: 'images',
        replacement: path.resolve(__dirname, './src/images'),
      },
      {
        find: 'utils',
        replacement: path.resolve(__dirname, './src/utils'),
      },
    ],
  },
  plugins: [svgr(), react()],
})
