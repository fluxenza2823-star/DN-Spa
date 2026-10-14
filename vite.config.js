import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// Resolves the public site URL from VITE_SITE_URL (or Vercel's production URL
// at build time). Nothing is hardcoded. If neither exists, it stays empty and
// the site falls back to relative URLs / the current origin.
function resolveSiteUrl(env) {
  const raw =
    env.VITE_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : '');
  return raw.replace(/\/+$/, '');
}

function siteUrlHtmlPlugin(siteUrl) {
  return {
    name: 'site-url-html',
    transformIndexHtml(html) {
      return html.replaceAll('__SITE_URL__', siteUrl);
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const siteUrl = resolveSiteUrl(env);
  return {
    // Root-relative base works on localhost, Vercel preview URLs and custom domains alike.
    base: '/',
    plugins: [react(), siteUrlHtmlPlugin(siteUrl)],
    build: { outDir: 'dist' },
  };
});
