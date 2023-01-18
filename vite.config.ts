import { defineConfig, InlineConfig, UserConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslintPlugin from "@nabla/vite-plugin-eslint";
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';

interface VitestConfigExport extends UserConfig {
  test: InlineConfig;
}

export default defineConfig({
  plugins: [react(), eslintPlugin(), tsconfigPaths()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/setup.js',
  },
  build: {
    sourcemap: true
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
} as VitestConfigExport);
