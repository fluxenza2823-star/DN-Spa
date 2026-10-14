// =============================================================================
// CENTRAL SITE CONFIGURATION
// Edit this file to change business details, SEO text, services and images.
// Anything marked "to be confirmed" is a placeholder: replace it only with
// information you have verified with the business owner.
// =============================================================================

const addressFull =
  '126, Karunanithi Salai Main St, Vyasarpadi, Chennai, Tamil Nadu 600017, India';

// Production domain. Set VITE_SITE_URL in .env (local) or in Vercel's
// Environment Variables. If empty, the site uses the current origin instead,
// so it still works on localhost and *.vercel.app URLs.
const envUrl = (import.meta.env.VITE_SITE_URL || '').trim().replace(/\/+$/, '');
const siteUrl = /your-domain\.com/.test(envUrl) ? '' : envUrl;

export const TBC = 'Details to be confirmed';

export const site = {
  name: 'Day Night Outcall Massage Spa',
  shortName: 'Day Night Spa',
  tagline: 'Restful massage and spa care, when you need it.',

  // Public URL used for canonical links, Open Graph and structured data.
  url: siteUrl,

  phone: {
    display: '+91 70916 52065',
    tel: '+917091652065', // used in tel: links
  },

  whatsapp: {
    display: '+91 70916 52065',
    number: '917091652065', // international format, digits only (wa.me)
  },

  // Optional. Leave empty until the business confirms a public email address.
  email: '',

  address: {
    line1: '126, Karunanithi Salai Main St',
    area: 'Vyasarpadi',
    city: 'Chennai',
    state: 'Tamil Nadu',
    postalCode: '600017',
    country: 'India',
    full: addressFull,
  },

  hours: {
    summary: 'Open 24 hours',
    note: 'As provided by the business listing. Please message or call to confirm availability before you book.',
  },

  // Map link and embed need no API key.
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(addressFull),
  mapsEmbedUrl:
    'https://www.google.com/maps?q=' + encodeURIComponent(addressFull) + '&output=embed',

  // Leave a link empty ('') to hide it. Add only official, verified profiles.
  social: {
    instagram: '',
    facebook: '',
    youtube: '',
    googleBusiness: '',
  },

  // Rating supplied by the owner / Google listing. Shown with attribution only.
  rating: {
    value: 4.5,
    count: 22,
    source: 'Google listing (figures supplied by the business owner)',
    // Keep false until the rating is verified directly on the live Google profile.
    // When true, it is added to the structured data (JSON-LD).
    includeInStructuredData: false,
  },

  seo: {
    titleSuffix: 'Day Night Outcall Massage Spa',
    defaultTitle: 'Day Night Outcall Massage Spa | Massage & Spa in Vyasarpadi, Chennai',
    defaultDescription:
      'Day Night Outcall Massage Spa in Vyasarpadi, Chennai. Massage and spa services with home-service bookings, subject to availability. Open 24 hours as listed.',
    // Replace with a 1200x630 JPG/PNG for best social previews.
    ogImage: '/images/hero.svg',
  },

  // Images live in /public/images. Replace these files (or point to your own
  // licensed photography) to change visuals. Missing images fall back to a
  // soft gradient automatically.
  images: {
    hero: {
      src: '/images/hero.svg',
      alt: 'Calm spa scene with balanced stones and a sage leaf',
    },
    about: {
      src: '/images/about.svg',
      alt: 'Soft candle light and leaves in a quiet spa setting',
    },
    homeService: {
      src: '/images/home-service.svg',
      alt: 'Folded towels and a green sprig, suggesting a relaxing session at home',
    },
  },

  // SERVICES: placeholders only. Do not add names, durations or prices until
  // they are confirmed with the business. Set `available: true` once verified.
  services: [
    {
      id: 'service-1',
      name: 'Massage service 1 (name to be confirmed)',
      description: TBC,
      duration: TBC,
      price: TBC,
      available: false,
    },
    {
      id: 'service-2',
      name: 'Massage service 2 (name to be confirmed)',
      description: TBC,
      duration: TBC,
      price: TBC,
      available: false,
    },
    {
      id: 'service-3',
      name: 'Spa service (name to be confirmed)',
      description: TBC,
      duration: TBC,
      price: TBC,
      available: false,
    },
  ],

  // Shown as the last option in the booking form.
  otherServiceLabel: 'Not sure yet, I will discuss on WhatsApp',

  // Privacy policy template fields.
  privacy: {
    lastUpdated: 'Date to be confirmed',
    controllerName: 'Day Night Outcall Massage Spa',
  },
};

// Convenience helpers -------------------------------------------------------
export const telHref = `tel:${site.phone.tel}`;
export const whatsappHref = (message) =>
  `https://wa.me/${site.whatsapp.number}` +
  (message ? `?text=${encodeURIComponent(message)}` : '');

export const absoluteUrl = (path = '/') => {
  const base = site.url || (typeof window !== 'undefined' ? window.location.origin : '');
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
};
