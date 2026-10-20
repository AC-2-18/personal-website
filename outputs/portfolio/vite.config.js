import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  build: {
    target: 'es2022',
    rolldownOptions: {
      onwarn(warning, warn) {
        // Motion also supports server-rendered apps; this app renders entirely in the browser.
        if (warning.code === 'MODULE_LEVEL_DIRECTIVE' && /node_modules[\\/](framer-motion|motion)[\\/]/.test(warning.id || warning.loc?.file || warning.message)) return;
        warn(warning);
      },
    },
  },
});
