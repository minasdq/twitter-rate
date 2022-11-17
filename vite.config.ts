// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from 'vite';
// eslint-disable-next-line import/no-extraneous-dependencies
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      Assets: path.resolve(__dirname, './src/assets'),
      Atoms: path.resolve(__dirname, './src/atoms'),
      Components: path.resolve(__dirname, './src/components'),
      Types: path.resolve(__dirname, './src/types'),
    },
  },
});
