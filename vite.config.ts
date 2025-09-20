import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
  server: {
    port: 21000, // 固定端口
    host: '0.0.0.0', // 本地和局域网可访问，
    proxy: {
      '/base': 'http://localhost:20001'
    }
  },
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    outDir: 'dist',      // 打包输出目录
    assetsDir: 'assets', // 静态资源目录
    sourcemap: false,    // 是否生成 source map
    // minify: 'esbuild'    // 压缩工具：esbuild / terser
  },
  base: '/app/',
})
