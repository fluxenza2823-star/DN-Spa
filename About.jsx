import { Link } from 'react-router-dom';
import { Leaf, MapPin, Clock, Home as HomeIcon } from 'lucide-react';
import Seo from '../components/Seo.jsx';
import PageHero from '../components/PageHero.jsx';
import Reveal from '../components/Reveal.jsx';
import SafeImage from '../components/SafeImage.jsx';
import { site } from '../config/site';

export default function About() {
  return (
    <>
      <Seo
        title="About"
        description="About Day Night Outcall Massage Spa, a massage and spa business in Vyasarpadi, Chennai offering home-service bookings subject to availability."
      />
      <PageHero eyebrow="About us" title="Calm care, close to home">
        {site.name} is a massage and spa business based in Vyasarpadi, Chennai.
      </PageHero>

      <section className="section">
        <div className="container split split-media">
          <Reveal className="about-media">
            <SafeImage src={site.images.about.src} alt={site.images.about.alt} width="900" height="700" />
          </Reveal>
          <Reveal delay={100}>
            <h2>Our approach</h2>
            <p>
              We want every visit to feel unhurried. That means clear communication, honest
              information about what is available, and a simple way to reach us at any hour
              listed on our business profile.
            </p>
            <p>
              We offer massage and spa services, including home-service bookings subject to
              availability. We confirm services and prices directly with you before anything is
              booked.
            </p>
            <ul className="fact-list">
              <li><MapPin size={18} aria-hidden="true" /> {site.address.full}</li>
              <li><Clock size={18} aria-hidden="true" /> {site.hours.summary} (as provided by the business listing)</li>
              <li><HomeIcon size={18} aria-hidden="true" /> Home-service bookings, subject to availability</li>
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="section section-tint">
        <div className="container narrow">
          <Reveal className="section-head">
            <p className="eyebrow">Verified information</p>
            <h2>Editable business details</h2>
          </Reveal>
          <div className="placeholder-grid">
            {[
              ['Year established', 'To be confirmed by the business'],
              ['Team and therapist details', 'To be confirmed by the business'],
              ['Qualifications and certifications', 'To be confirmed by the business'],
              ['Hygiene and safety practices', 'To be confirmed by the business'],
            ].map(([k, v]) => (
              <div className="placeholder-item" key={k}>
                <Leaf size={18} aria-hidden="true" />
                <div>
                  <h3>{k}</h3>
                  <p>{v}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="small-note">
            Add these sections only with information the business can verify. Edit this page in{' '}
            <code>src/pages/About.jsx</code>.
          </p>
          <p className="center-cta">
            <Link to="/contact" className="btn btn-outline">Contact us</Link>
          </p>
        </div>
      </section>
    </>
  );
}
