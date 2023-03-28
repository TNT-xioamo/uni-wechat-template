import { defineConfig } from "vite";
// import { createStyleImportPlugin, VantResolve } from 'vite-plugin-style-import';
import uni from '@dcloudio/vite-plugin-uni'
import styleImport, { VantResolve } from "vite-plugin-style-import";
import path from "path"
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    uni(),
    styleImport({
      resolves: [VantResolve()],
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
});