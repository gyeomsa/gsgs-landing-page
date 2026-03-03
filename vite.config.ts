import path from 'path';

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import Sitemap from 'vite-plugin-sitemap';

// https://vite.dev/config/
export default defineConfig({
  // VITE_BASE_PATH 미설정 시: GitHub Pages → /gsgs-landing-page/, 로컬 → /
  // 커스텀 도메인 사용 시: 워크플로우에 env: VITE_BASE_PATH: "/" 추가
  base: process.env.VITE_BASE_PATH ?? (process.env.GITHUB_ACTIONS ? '/gsgs-landing-page/' : '/'),
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
    tailwindcss(),
    Sitemap({
      hostname: 'https://gyeomsa.github.io/gsgs-landing-page',
      dynamicRoutes: ['/preregistration'],
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
