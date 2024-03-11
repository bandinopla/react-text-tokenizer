// vite.config.js
import { defineConfig } from 'vite';
import path from "path";
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default defineConfig({
  publicDir: false,
  plugins: [nodeResolve()],
  
  build: {
    manifest: true,
    minify: true, 
    reportCompressedSize: true,  
    lib: {
        entry: path.resolve(__dirname, "src/index.tsx"),
        name: "react-text-tokenizer", 
        fileName:"react-text-tokenizer",
        formats:["esm"]
      },
    rollupOptions: {
        external: [
            "react",
            "react/jsx-runtime"
        ], 
    }
  }
});