import { Link } from 'react-router-dom';
import { Clock, Tag, ArrowRight } from 'lucide-react';
import { TBC } from '../config/site';

export default function ServiceCard({ service }) {
  const { name, description, duration, price, available } = service;
  const pending = description === TBC || !available;
  return (
    <article className="service-card">
      <div className="service-card-head">
        <h3>{name}</h3>
        {pending && <span className="chip chip-soft">To be confirmed</span>}
      </div>
      <p className="service-desc">{description}</p>
      <dl className="service-meta">
        <div>
          <dt><Clock size={16} aria-hidden="true" /> Duration</dt>
          <dd>{duration}</dd>
        </div>
        <div>
          <dt><Tag size={16} aria-hidden="true" /> Price</dt>
          <dd>{price}</dd>
        </div>
      </dl>
      <Link className="text-link" to="/home-service">
        Request this service <ArrowRight size={16} aria-hidden="true" />
      </Link>
    </article>
  );
}
