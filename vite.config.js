import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src',
  publicDir: 'public',
  build: {
    outDir: '../dist',
    rollupOptions: {
      input: {
        main: resolve('src/index.html'),
        cart: resolve('src/cart/index.html'),
        checkout: resolve('src/checkout/index.html'),
        product: resolve('src/product_pages/index.html'),
        product_listing: resolve('src/product_listing/index.html'),
      },
    },
  },
});