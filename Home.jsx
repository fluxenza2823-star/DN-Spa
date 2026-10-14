import { Link } from 'react-router-dom';
import {
  Clock,
  Home as HomeIcon,
  MapPin,
  MessageCircle,
  Star,
  ShieldCheck,
  Leaf,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import Seo from '../components/Seo.jsx';
import Reveal from '../components/Reveal.jsx';
import SafeImage from '../components/SafeImage.jsx';
import ServiceCard from '../components/ServiceCard.jsx';
import FAQ from '../components/FAQ.jsx';
import ContactButtons from '../components/ContactButtons.jsx';
import { site, whatsappHref } from '../config/site';

const faqs = [
  {
    q: 'Which massage and spa services do you offer?',
    a: 'Our full service menu is being finalised on this website. Please message us on WhatsApp or call to ask what is currently available.',
  },
  {
    q: 'Do you offer home-service bookings?',
    a: 'Yes, home-service bookings are offered, subject to availability. Use the home-service request form or message us on WhatsApp to ask whether your area and time can be accommodated.',
  },
  {
    q: 'Are you really open 24 hours?',
    a: `Our business listing shows that we are open 24 hours. Because availability can vary at different times, we recommend messaging or calling first to confirm a slot.`,
  },
  {
    q: 'How much does a session cost?',
    a: 'Prices are not published on this website yet. Please ask us on WhatsApp or by phone and we will share the current price before you confirm.',
  },
  {
    q: 'Is my booking confirmed when I submit the form?',
    a: 'No. The form opens WhatsApp with your request already written. Your booking is only confirmed once the business replies and agrees the details with you.',
  },
  {
    q: 'What personal details do you ask for?',
    a: 'Only what is needed to arrange a visit: your name, phone number, preferred time, chosen service and the location. See our Privacy Policy for more.',
  },
];

export default function Home() {
  const preview = site.services.slice(0, 3);
  return (
    <>
      <Seo structuredData />

      {/* HERO */}
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Vyasarpadi, Chennai</p>
            <h1>
              Slow down. <em>Breathe.</em> Let us come to you.
            </h1>
            <p className="lead">
              {site.name} offers calm massage and spa care in Chennai, with home-service
              bookings available subject to availability. Reach out any time to arrange your
              visit.
            </p>
            <div className="btn-row">
              <Link to="/home-service" className="btn btn-primary">Book a Massage</Link>
              <a
                className="btn btn-whatsapp"
                href={whatsappHref(`Hello ${site.name}, I would like to ask about a booking.`)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp (opens in a new tab)"
              >
                <MessageCircle size={18} aria-hidden="true" /> Chat on WhatsApp
              </a>
            </div>
            <p className="hero-note">
              <Clock size={16} aria-hidden="true" /> {site.hours.summary} (per our business listing)
            </p>
          </div>

          <div className="hero-visual">
            <div className="arch">
              <SafeImage
                src={site.images.hero.src}
                alt={site.images.hero.alt}
                eager
                width="800"
                height="1000"
              />
            </div>
            <div className="glass-badge">
              <span className="pulse-dot" aria-hidden="true" />
              <div>
                <strong>{site.hours.summary}</strong>
                <span>Confirm availability by chat or call</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="section">
        <div className="container split">
          <Reveal>
            <p className="eyebrow">Welcome</p>
            <h2>A quieter way to look after yourself</h2>
          </Reveal>
          <Reveal delay={100}>
            <p>
              Life in the city moves quickly. {site.name} is a massage and spa business in
              Vyasarpadi, Chennai, built around giving you a calm space to rest, whether you
              visit or request a home-service session.
            </p>
            <p>
              We keep things simple: reach us on WhatsApp or by phone, tell us what you are
              looking for, and we will confirm what is available and the price with you directly.
            </p>
            <Link to="/about" className="text-link">
              More about us <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* SERVICES OVERVIEW */}
      <section className="section section-tint">
        <div className="container">
          <Reveal className="section-head">
            <p className="eyebrow">Services</p>
            <h2>Our services</h2>
            <p className="lead">
              Service names, durations and prices are being confirmed. Ask us for the current menu.
            </p>
          </Reveal>
          <div className="card-grid">
            {preview.map((s, i) => (
              <Reveal key={s.id} delay={i * 80}>
                <ServiceCard service={s} />
              </Reveal>
            ))}
          </div>
          <p className="center-cta">
            <Link to="/services" className="btn btn-outline">View all services</Link>
          </p>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="section">
        <div className="container">
          <Reveal className="section-head">
            <p className="eyebrow">Why choose us</p>
            <h2>What you can count on</h2>
          </Reveal>
          <ul className="feature-grid">
            {[
              {
                icon: Clock,
                title: 'Open 24 hours',
                text: 'Our business listing shows round-the-clock opening. Message or call to confirm a time.',
              },
              {
                icon: HomeIcon,
                title: 'Home-service bookings',
                text: 'Request a visit at your location, subject to availability.',
              },
              {
                icon: MessageCircle,
                title: 'Easy to reach',
                text: 'Book or ask questions by WhatsApp or phone, in whichever way suits you.',
              },
              {
                icon: MapPin,
                title: 'Based in Vyasarpadi',
                text: 'Find us at Karunanithi Salai Main St, Chennai 600017.',
              },
            ].map(({ icon: Icon, title, text }, i) => (
              <Reveal as="li" key={title} className="feature" delay={i * 70}>
                <span className="feature-icon"><Icon size={22} aria-hidden="true" /></span>
                <h3>{title}</h3>
                <p>{text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* HOME SERVICE HIGHLIGHT */}
      <section className="section section-dark">
        <div className="container highlight">
          <Reveal className="highlight-media">
            <SafeImage
              src={site.images.homeService.src}
              alt={site.images.homeService.alt}
              width="900"
              height="700"
            />
          </Reveal>
          <Reveal delay={100}>
            <p className="eyebrow eyebrow-light">Home service</p>
            <h2>Relax where you are most comfortable</h2>
            <p>
              Send us a home-service request with your preferred service, date, time and
              location. We will reply to confirm availability and price. A request is not a
              confirmed booking until we reply.
            </p>
            <div className="btn-row">
              <Link to="/home-service" className="btn btn-light">Request home service</Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* REVIEW SUMMARY */}
      <section className="section">
        <div className="container review-card-wrap">
          <Reveal className="review-card">
            <div className="stars" aria-hidden="true">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} size={22} className={i < 4 ? 'star-on' : 'star-half'} />
              ))}
            </div>
            <p className="review-score">
              <strong>{site.rating.value}</strong> / 5
            </p>
            <p className="review-count">
              Based on {site.rating.count} Google reviews
            </p>
            <p className="review-source">Source: {site.rating.source}. Figures may change over time.</p>
            <a
              className="text-link"
              href={site.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Read reviews on Google Maps <ExternalLink size={16} aria-hidden="true" />
            </a>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="section section-tint">
        <div className="container narrow">
          <Reveal className="section-head">
            <p className="eyebrow">FAQ</p>
            <h2>Common questions</h2>
          </Reveal>
          <FAQ items={faqs} />
        </div>
      </section>

      {/* CONTACT CTA */}
      <section className="section">
        <div className="container cta-band">
          <Reveal>
            <Leaf size={28} aria-hidden="true" className="cta-leaf" />
            <h2>Ready to book or have a question?</h2>
            <p className="lead">
              Message us on WhatsApp or call {site.phone.display}. We are listed as open 24 hours.
            </p>
            <ContactButtons align="center" />
            <p className="small-note">
              <ShieldCheck size={16} aria-hidden="true" /> Bookings are confirmed only after the business replies.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
