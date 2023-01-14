import { defineConfig, InlineConfig, UserConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslintPlugin from "@nabla/vite-plugin-eslint";

interface VitestConfigExport extends UserConfig {
  test: InlineConfig;
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslintPlugin()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/setup.js',
  }
} as VitestConfigExport)
