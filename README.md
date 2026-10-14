# Day Night Outcall Massage Spa: Website

A responsive spa website built with **React + Vite + plain CSS + Lucide icons + React Router**. It runs on localhost and on Vercel, and does not depend on Claude or any other hosting.

Pages: Home, Services, About, Home Service (WhatsApp booking request), Contact, Privacy Policy.

## Important honesty notes

- **No invented content.** Services, prices, durations, therapist details and certifications are placeholders marked "Details to be confirmed". Fill them in `src/config/site.js` only after the business verifies them.
- **No customer testimonials.** The only review content is the owner-supplied Google rating (4.5 from 22 reviews), shown with attribution. It is **not** included in the structured data until you set `rating.includeInStructuredData: true` in `src/config/site.js` after verifying it on the live Google profile.
- **No booking database.** The booking form validates input and opens WhatsApp with a prefilled message. The site never claims a booking is confirmed.
- **Images are illustrations.** No photos could be downloaded while building this project, so the site ships with three original SVG illustrations in `public/images/`. To use real spa photography, download properly licensed images (for example from Unsplash or Pexels, checking each licence), save them in `public/images/`, and update the `images` section in `src/config/site.js`. If an image fails to load, a soft gradient fallback is shown.
- **Social preview image.** Many social platforms ignore SVG for link previews. Add a 1200x630 JPG or PNG (for example `public/images/og.jpg`) and set `seo.ogImage` in `src/config/site.js`.
- **Privacy policy** is a template, not legal advice.

## Project structure

```
day-night-spa/
  public/
    favicon.svg
    images/            hero.svg, about.svg, home-service.svg
    robots.txt         generated at build time
    sitemap.xml        generated at build time
  scripts/generate-seo.mjs
  src/
    config/site.js     ALL business details, SEO, services, images
    components/        Header, Footer, Seo, ServiceCard, FAQ, ...
    pages/             Home, Services, About, HomeService, Contact, Privacy, NotFound
    utils/booking.js   validation + WhatsApp message builder
    styles/global.css
    App.jsx, main.jsx
  .env.example
  .gitignore
  index.html
  package.json
  vite.config.js
  vercel.json
  README.md
```

## Install and run locally

Requires Node.js 18 or newer.

```bash
npm install
npm run dev        # http://localhost:5173
```

Production build and local preview:

```bash
npm run build      # outputs to dist/
npm run preview    # http://localhost:4173
```

No domain or environment variable is needed locally.

## Editing the content

Open `src/config/site.js`. It holds the business name, phone, WhatsApp number, address, hours, Google Maps URL, SEO title and description, social links, services and images. The WhatsApp link uses `https://wa.me/917091652065` and click-to-call uses `tel:+917091652065`.

## Environment variable

`.env.example` contains:

```
VITE_SITE_URL=https://your-domain.com
```

This is an **example value** and must be replaced with your real domain (no trailing slash). Copy it to `.env` for local use if you want, and add the same variable in Vercel. It is used for canonical links, Open Graph URLs, structured data, the sitemap and robots.txt. If it is not set, the site still works: it uses the current origin, and the sitemap stays empty until you set it.

## Upload to GitHub

1. Create an empty repository on github.com (no README).
2. In the project folder:

```bash
git init
git add .
git commit -m "Initial website"
git branch -M main
git remote add origin https://github.com/YOUR-USER/YOUR-REPO.git
git push -u origin main
```

`.env` is git-ignored, so no secrets are uploaded.

## Deploy to Vercel

1. Sign in at vercel.com (the free Hobby plan is enough to start) and choose **Add New, Project**.
2. Import your GitHub repository.
3. Vercel detects Vite. Confirm: Build Command `npm run build`, Output Directory `dist`, Install Command `npm install`.
4. Open **Environment Variables** and add `VITE_SITE_URL` with your real domain (for example `https://www.example.com`). If you do not have a domain yet, you can add it later and redeploy.
5. Click **Deploy**. You get a `*.vercel.app` URL that already works over HTTPS.
6. Test every page, refresh on `/contact` and `/home-service` (no 404 expected), and test the WhatsApp and call buttons on your phone.

`vercel.json` already contains the SPA fallback so refreshing a nested route works.

## Connect a custom domain

1. In Vercel, open the project, then **Settings, Domains, Add**. Enter your domain (for example `example.com`). Vercel will also offer `www.example.com` and a redirect between them.
2. Vercel shows the DNS records to create for your domain. Use the exact values shown in your dashboard. Typical values are:
   - **Apex/root domain** (`example.com`): `A` record, name `@`, value `76.76.21.21`
   - **www subdomain**: `CNAME` record, name `www`, value `cname.vercel-dns.com`
3. Create those records at your registrar (see below), then click **Refresh** in Vercel. DNS changes can take from a few minutes to 48 hours.
4. Once the domain shows as valid, Vercel issues an HTTPS certificate automatically.
5. Set `VITE_SITE_URL` to the final address (decide whether `www` or the bare domain is primary), then **redeploy** so canonical links and the sitemap use it.
6. Submit `https://your-domain/sitemap.xml` in Google Search Console if you use it. No ranking is guaranteed.

### Registrar guidance

The steps are similar at every registrar (GoDaddy, Namecheap, Hostinger, BigRock, Google Domains successors, Cloudflare, etc.):

1. Log in and open the domain's **DNS management** (sometimes called "DNS zone" or "Advanced DNS").
2. Delete any existing `A` record for `@` that points to a parking page, and any conflicting `CNAME` for `www`.
3. Add the `A` and `CNAME` records shown by Vercel.
4. Leave email (`MX`) records alone if you use email on the domain.
5. If you use Cloudflare, set the Vercel records to **DNS only** (grey cloud) at first.
6. Alternative: change your nameservers to the ones Vercel gives you, and manage DNS inside Vercel.

## Troubleshooting

**Build fails on Vercel.** Check the build log. Confirm the Node version is 18 or newer (Project Settings, General, Node.js Version) and that `package.json` was committed. Run `npm run build` locally to reproduce.

**404 when refreshing a page.** Make sure `vercel.json` is in the repository root and was deployed. Redeploy after adding it.

**Canonical or sitemap shows the wrong domain, or sitemap is empty.** `VITE_SITE_URL` was missing or wrong when the build ran. Fix the variable in Vercel and redeploy (environment variables are baked in at build time).

**Domain says "Invalid configuration".** The DNS records do not match what Vercel shows, or have not propagated. Re-check name, type and value, remove conflicting records, wait, then refresh.

**HTTPS not working or certificate pending.** Certificates are issued after DNS validates. Wait for propagation. Also check that no CAA record blocks Let's Encrypt, and that Cloudflare proxying is off while verifying.

**WhatsApp does not open on desktop.** WhatsApp Web or the desktop app must be available. The form shows a fallback link if the browser blocks the pop-up.

**Map looks approximate.** The embed searches by address. For an exact pin, open the business on Google Maps, choose Share, Embed a map, and paste that URL into `mapsEmbedUrl` in `src/config/site.js`.

**Fonts or icons missing.** Run `npm install` again; fonts come from npm packages, not external CDNs.
