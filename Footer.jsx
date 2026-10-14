import { Link } from 'react-router-dom';
import { MapPin, Phone, MessageCircle, Clock } from 'lucide-react';
import { site, telHref, whatsappHref } from '../config/site';

export default function Footer() {
  const socials = Object.entries(site.social).filter(([, url]) => url);
  const labels = {
    instagram: 'Instagram',
    facebook: 'Facebook',
    youtube: 'YouTube',
    googleBusiness: 'Google Business Profile',
  };
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <p className="footer-brand">{site.name}</p>
          <p className="muted-light">{site.tagline}</p>
          {socials.length > 0 && (
            <ul className="footer-list" aria-label="Social links">
              {socials.map(([key, url]) => (
                <li key={key}>
                  <a href={url} target="_blank" rel="noopener noreferrer">{labels[key] || key}</a>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <p className="footer-title">Explore</p>
          <ul className="footer-list">
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/home-service">Home Service</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
          </ul>
        </div>
        <div>
          <p className="footer-title">Get in touch</p>
          <ul className="footer-list footer-contact">
            <li><Phone size={16} aria-hidden="true" /><a href={telHref}>{site.phone.display}</a></li>
            <li>
              <MessageCircle size={16} aria-hidden="true" />
              <a href={whatsappHref()} target="_blank" rel="noopener noreferrer">WhatsApp</a>
            </li>
            <li><Clock size={16} aria-hidden="true" />{site.hours.summary}</li>
            <li>
              <MapPin size={16} aria-hidden="true" />
              <address>{site.address.full}</address>
            </li>
          </ul>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>&copy; {new Date().getFullYear()} {site.name}. All rights reserved.</p>
        <p>Service availability and details are confirmed directly with the business.</p>
      </div>
    </footer>
  );
}
