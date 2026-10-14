import { Info } from 'lucide-react';
import Seo from '../components/Seo.jsx';
import PageHero from '../components/PageHero.jsx';
import Reveal from '../components/Reveal.jsx';
import ServiceCard from '../components/ServiceCard.jsx';
import ContactButtons from '../components/ContactButtons.jsx';
import { site } from '../config/site';

export default function Services() {
  return (
    <>
      <Seo
        title="Services"
        description="Massage and spa services from Day Night Outcall Massage Spa in Vyasarpadi, Chennai. Ask for the current service list, durations and prices."
      />
      <PageHero eyebrow="Services" title="Massage and spa services">
        Our service details are being confirmed. Contact us for what is available today.
      </PageHero>

      <section className="section">
        <div className="container">
          <p className="notice">
            <Info size={18} aria-hidden="true" />
            <span>
              Names, descriptions, durations and prices below are placeholders marked
              &ldquo;Details to be confirmed&rdquo;. Nothing here is a promise of availability.
              Edit them in <code>src/config/site.js</code> once verified.
            </span>
          </p>
          <div className="card-grid">
            {site.services.map((s, i) => (
              <Reveal key={s.id} delay={i * 80}>
                <ServiceCard service={s} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-tint">
        <div className="container cta-band">
          <h2>Ask about the current service list</h2>
          <p className="lead">We will tell you what is available and the price before you confirm.</p>
          <ContactButtons
            align="center"
            message={`Hello ${site.name}, could you share your current services and prices?`}
          />
        </div>
      </section>
    </>
  );
}
