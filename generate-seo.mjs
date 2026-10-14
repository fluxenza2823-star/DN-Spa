// Generates public/robots.txt and public/sitemap.xml before every build.
// The domain comes from VITE_SITE_URL (env var or .env file), or from Vercel's
// production URL variable. Nothing is hardcoded.
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

function readDotEnv() {
  const out = {};
  for (const name of ['.env', '.env.production', '.env.local']) {
    const file = resolve(process.cwd(), name);
    if (!existsSync(file)) continue;
    for (const line of readFileSync(file, 'utf8').split(/\r?\n/)) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
      if (m && !line.trim().startsWith('#')) out[m[1]] = m[2].replace(/^['"]|['"]$/g, '');
    }
  }
  return out;
}

const dot = readDotEnv();
let siteUrl =
  process.env.VITE_SITE_URL ||
  dot.VITE_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : '');
siteUrl = siteUrl.replace(/\/+$/, '');

// The .env.example placeholder must never end up in a real sitemap.
if (/your-domain\.com/.test(siteUrl)) siteUrl = '';

const routes = ['/', '/services', '/about', '/home-service', '/contact', '/privacy'];
const pub = resolve(process.cwd(), 'public');
if (!existsSync(pub)) mkdirSync(pub, { recursive: true });

let robots = 'User-agent: *\nAllow: /\n';
if (siteUrl) {
  robots += `\nSitemap: ${siteUrl}/sitemap.xml\n`;
  const today = new Date().toISOString().slice(0, 10);
  const urls = routes
    .map((r) => `  <url><loc>${siteUrl}${r === '/' ? '/' : r}</loc><lastmod>${today}</lastmod></url>`)
    .join('\n');
  writeFileSync(
    resolve(pub, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
  );
  console.log(`[seo] sitemap.xml + robots.txt generated for ${siteUrl}`);
} else {
  writeFileSync(resolve(pub, 'sitemap.xml'), '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>\n');
  console.warn('[seo] VITE_SITE_URL is not set: sitemap is empty and robots.txt has no Sitemap line. Set it before going live.');
}
writeFileSync(resolve(pub, 'robots.txt'), robots);
