import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { site, absoluteUrl } from '../config/site';

function setMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function buildLocalBusiness() {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const data = {
    '@context': 'https://schema.org',
    '@type': 'HealthAndBeautyBusiness',
    name: site.name,
    telephone: site.phone.tel,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.line1,
      addressLocality: site.address.city,
      addressRegion: site.address.state,
      postalCode: site.address.postalCode,
      addressCountry: 'IN',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: days,
        opens: '00:00',
        closes: '23:59',
      },
    ],
    hasMap: site.mapsUrl,
  };
  if (site.url) data.url = site.url + '/';
  if (site.email) data.email = site.email;
  const sameAs = Object.values(site.social).filter(Boolean);
  if (sameAs.length) data.sameAs = sameAs;
  if (site.rating.includeInStructuredData) {
    data.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: site.rating.value,
      reviewCount: site.rating.count,
    };
  }
  return data;
}

export default function Seo({ title, description, path, structuredData = false }) {
  const { pathname } = useLocation();

  useEffect(() => {
    const fullTitle = title ? `${title} | ${site.seo.titleSuffix}` : site.seo.defaultTitle;
    const desc = description || site.seo.defaultDescription;
    const url = absoluteUrl(path ?? pathname);
    const image = absoluteUrl(site.seo.ogImage);

    document.title = fullTitle;
    setMeta('name', 'description', desc);
    setMeta('property', 'og:type', 'website');
    setMeta('property', 'og:site_name', site.name);
    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', desc);
    setMeta('property', 'og:url', url);
    setMeta('property', 'og:image', image);
    setMeta('name', 'twitter:card', 'summary_large_image');

    let link = document.head.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', url);

    const id = 'ld-json-local-business';
    const existing = document.getElementById(id);
    if (existing) existing.remove();
    if (structuredData) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = id;
      script.text = JSON.stringify(buildLocalBusiness());
      document.head.appendChild(script);
    }
  }, [title, description, path, pathname, structuredData]);

  return null;
}
