import { Phone, MessageCircle } from 'lucide-react';
import { site, telHref, whatsappHref } from '../config/site';

export default function MobileActionBar() {
  return (
    <div className="mobile-bar" role="region" aria-label="Quick contact">
      <a className="btn btn-ghost" href={telHref} aria-label={`Call ${site.phone.display}`}>
        <Phone size={18} aria-hidden="true" /> Call
      </a>
      <a
        className="btn btn-whatsapp"
        href={whatsappHref(`Hello ${site.name}, I would like to ask about a booking.`)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp (opens in a new tab)"
      >
        <MessageCircle size={18} aria-hidden="true" /> WhatsApp
      </a>
    </div>
  );
}
