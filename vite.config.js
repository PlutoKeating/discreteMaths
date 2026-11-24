import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'node:path';

// 多页面：仓库根 index.html 是站点首页；每个章节子目录自带 index.html 作为独立入口。
// 构建产物保持目录结构（dist/Logic-and-Proof/index.html、dist/Relation/index.html），Cloudflare 以子路径访问。
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        home: resolve(__dirname, 'index.html'),
        logic: resolve(__dirname, 'Logic-and-Proof/index.html'),
        relation: resolve(__dirname, 'Relation/index.html'),
      },
    },
  },
});
