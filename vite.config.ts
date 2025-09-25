import react from '@vitejs/plugin-react';
import { copyFileSync, existsSync } from 'fs';
import { defineConfig } from 'vite';

export default defineConfig({
  envPrefix: ['MEDPLUM_', 'GOOGLE_', 'RECAPTCHA_'],
  plugins: [
    react({
      include: '**/*.{tsx|ts|jsx|js|svg}',
    }),
  ],
  server: {
    port: 3000,
  },
  publicDir: 'static',
  build: {
    sourcemap: true,
    chunkSizeWarningLimit: 2000,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
});
