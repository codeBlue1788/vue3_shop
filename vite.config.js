import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'

import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  // 配置src別名
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src")
    }
  },
  // 消除i18n警告 //You are running the esm-bundler build of vue-i18n...
  define: {
    __VUE_I18N_FULL_INSTALL__: true,
    __VUE_I18N_LEGACY_API__: false,
    __INTLIFY_PROD_DEVTOOLS__: false,
  },
  plugins: [vue(), WindiCSS()],
  server: {
    open: true,
    host: "localhost",
    port: "9080",
    proxy: {
      "/api": {
        target: "http://localhost:8080/",
        changeOrigin: true,
        ws: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api/, "")
      }
    }
  },
  build: {
    target: "modules",
    outDir: "dist",
    assetsDir: "assets"
  }
})
