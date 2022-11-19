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
      Hooks: path.resolve(__dirname, './src/hooks'),
      Configs: path.resolve(__dirname, './src/configs'),
      Types: path.resolve(__dirname, './src/types'),
      Utils: path.resolve(__dirname, './src/utils'),
    },
  },
});
