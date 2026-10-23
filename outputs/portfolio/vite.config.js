import { defineConfig } from 'vite';

// configure-pages supplies the actual path, including root sites/custom domains.
// Local development defaults to /. Normalize the surrounding slashes once.
const pagesBasePath = (process.env.PAGES_BASE_PATH || '').replace(/^\/+|\/+$/g, '');

export default defineConfig({
  base: pagesBasePath ? `/${pagesBasePath}/` : '/',
  build: {
    outDir: 'dist',
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
