import path from 'path';

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

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
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
