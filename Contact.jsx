import { MapPin, Clock, ExternalLink } from 'lucide-react';
import Seo from '../components/Seo.jsx';
import PageHero from '../components/PageHero.jsx';
import ContactButtons from '../components/ContactButtons.jsx';
import { site } from '../config/site';

export default function Contact() {
  return (
    <>
      <Seo
        title="Contact"
        description="Contact Day Night Outcall Massage Spa in Vyasarpadi, Chennai by phone or WhatsApp. Address, map and business hours."
        structuredData
      />
      <PageHero eyebrow="Contact" title="Get in touch">
        Call or message us to ask a question or arrange a visit.
      </PageHero>

      <section className="section">
        <div className="container contact-grid">
          <div className="contact-info">
            <h2>Talk to us</h2>
            <ContactButtons />

            <div className="info-block">
              <h3><MapPin size={18} aria-hidden="true" /> Address</h3>
              <address>
                {site.address.line1},<br />
                {site.address.area}, {site.address.city},<br />
                {site.address.state} {site.address.postalCode}, {site.address.country}
              </address>
              <a className="text-link" href={site.mapsUrl} target="_blank" rel="noopener noreferrer">
                Open in Google Maps <ExternalLink size={16} aria-hidden="true" />
              </a>
            </div>

            <div className="info-block">
              <h3><Clock size={18} aria-hidden="true" /> Business hours</h3>
              <p><strong>{site.hours.summary}</strong></p>
              <p className="muted">{site.hours.note}</p>
            </div>
          </div>

          <div className="map-wrap">
            <iframe
              title={`Map showing ${site.name}`}
              src={site.mapsEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <p className="small-note">
              The embedded map is searched by address and may show an approximate location.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
