import { Phone, MessageCircle } from 'lucide-react';
import { site, telHref, whatsappHref } from '../config/site';

export default function ContactButtons({ message, align = 'start' }) {
  return (
    <div className={`btn-row btn-row-${align}`}>
      <a className="btn btn-primary" href={telHref} aria-label={`Call ${site.phone.display}`}>
        <Phone size={18} aria-hidden="true" /> Call {site.phone.display}
      </a>
      <a
        className="btn btn-whatsapp"
        href={whatsappHref(message || `Hello ${site.name}, I would like to ask about a booking.`)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp (opens in a new tab)"
      >
        <MessageCircle size={18} aria-hidden="true" /> Chat on WhatsApp
      </a>
    </div>
  );
}
