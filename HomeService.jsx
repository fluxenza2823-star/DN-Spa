import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, CircleCheck, CircleAlert, ShieldCheck } from 'lucide-react';
import Seo from '../components/Seo.jsx';
import PageHero from '../components/PageHero.jsx';
import ContactButtons from '../components/ContactButtons.jsx';
import { site } from '../config/site';
import { validateBooking, bookingWhatsappUrl, todayISO } from '../utils/booking';

const empty = { name: '', phone: '', service: '', date: '', time: '', location: '', consent: false };
const fieldOrder = ['name', 'phone', 'service', 'date', 'time', 'location', 'consent'];

export default function HomeService() {
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | opened | blocked
  const [waUrl, setWaUrl] = useState('');
  const formRef = useRef(null);

  const serviceOptions = [...site.services.map((s) => s.name), site.otherServiceLabel];

  function update(e) {
    const { name, type, value, checked } = e.target;
    setValues((v) => ({ ...v, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
  }

  function onSubmit(e) {
    e.preventDefault();
    const found = validateBooking(values);
    setErrors(found);
    if (Object.keys(found).length) {
      setStatus('idle');
      const first = fieldOrder.find((k) => found[k]);
      requestAnimationFrame(() => formRef.current?.querySelector(`[name="${first}"]`)?.focus());
      return;
    }
    setStatus('sending');
    const url = bookingWhatsappUrl(values);
    setWaUrl(url);
    const win = window.open(url, '_blank');
    if (win) {
      win.opener = null;
      setStatus('opened');
    } else {
      setStatus('blocked');
    }
  }

  const errorList = fieldOrder.filter((k) => errors[k]);
  const err = (k) => (errors[k] ? `${k}-error` : undefined);

  return (
    <>
      <Seo
        title="Home Service Booking Request"
        description="Request a home-service massage or spa visit from Day Night Outcall Massage Spa in Chennai. Your request opens in WhatsApp and is not confirmed until the business replies."
      />
      <PageHero eyebrow="Home service" title="Request a home-service visit">
        Fill in the form and we will open WhatsApp with your request ready to send.
      </PageHero>

      <section className="section">
        <div className="container form-layout">
          <form className="form-card" onSubmit={onSubmit} noValidate ref={formRef} aria-describedby="form-note">
            <p id="form-note" className="notice notice-strong">
              <ShieldCheck size={18} aria-hidden="true" />
              <span>
                Submitting this form does <strong>not</strong> confirm a booking and nothing is
                saved on this website. It opens WhatsApp with a pre-filled message. Your request is
                confirmed only when the business replies and agrees the details with you.
              </span>
            </p>

            {errorList.length > 0 && (
              <div className="alert alert-error" role="alert">
                <CircleAlert size={18} aria-hidden="true" />
                <div>
                  <strong>Please fix the following:</strong>
                  <ul>
                    {errorList.map((k) => (
                      <li key={k}><a href={`#${k}`}>{errors[k]}</a></li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            <div className="field">
              <label htmlFor="name">Your name</label>
              <input id="name" name="name" type="text" autoComplete="name" value={values.name}
                onChange={update} aria-invalid={!!errors.name} aria-describedby={err('name')} required />
              {errors.name && <p className="field-error" id="name-error">{errors.name}</p>}
            </div>

            <div className="field">
              <label htmlFor="phone">Phone number</label>
              <input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel"
                placeholder="98765 43210" value={values.phone} onChange={update}
                aria-invalid={!!errors.phone} aria-describedby={err('phone')} required />
              {errors.phone && <p className="field-error" id="phone-error">{errors.phone}</p>}
            </div>

            <div className="field">
              <label htmlFor="service">Requested service</label>
              <select id="service" name="service" value={values.service} onChange={update}
                aria-invalid={!!errors.service} aria-describedby={err('service')} required>
                <option value="">Select a service</option>
                {serviceOptions.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
              {errors.service && <p className="field-error" id="service-error">{errors.service}</p>}
            </div>

            <div className="field-row">
              <div className="field">
                <label htmlFor="date">Preferred date</label>
                <input id="date" name="date" type="date" min={todayISO()} value={values.date}
                  onChange={update} aria-invalid={!!errors.date} aria-describedby={err('date')} required />
                {errors.date && <p className="field-error" id="date-error">{errors.date}</p>}
              </div>
              <div className="field">
                <label htmlFor="time">Preferred time</label>
                <input id="time" name="time" type="time" value={values.time} onChange={update}
                  aria-invalid={!!errors.time} aria-describedby={err('time')} required />
                {errors.time && <p className="field-error" id="time-error">{errors.time}</p>}
              </div>
            </div>

            <div className="field">
              <label htmlFor="location">Service location</label>
              <textarea id="location" name="location" rows={3} autoComplete="street-address"
                placeholder="Area, street and landmark" value={values.location} onChange={update}
                aria-invalid={!!errors.location} aria-describedby={err('location')} required />
              {errors.location && <p className="field-error" id="location-error">{errors.location}</p>}
            </div>

            <div className="field field-check">
              <input id="consent" name="consent" type="checkbox" checked={values.consent}
                onChange={update} aria-invalid={!!errors.consent} aria-describedby={err('consent')} />
              <label htmlFor="consent">
                I have read the <Link to="/privacy">Privacy Policy</Link> and agree to my details
                being sent to the business through WhatsApp.
              </label>
            </div>
            {errors.consent && <p className="field-error" id="consent-error">{errors.consent}</p>}

            <button type="submit" className="btn btn-whatsapp btn-block" disabled={status === 'sending'}>
              <MessageCircle size={18} aria-hidden="true" />
              {status === 'sending' ? 'Opening WhatsApp…' : 'Send request on WhatsApp'}
            </button>

            <div aria-live="polite">
              {status === 'opened' && (
                <div className="alert alert-success">
                  <CircleCheck size={18} aria-hidden="true" />
                  <div>
                    <strong>WhatsApp opened with your request.</strong>
                    <p>
                      Please press send in WhatsApp. This is not a confirmed booking until the
                      business replies. If WhatsApp did not open,{' '}
                      <a href={waUrl} target="_blank" rel="noopener noreferrer">use this link</a>.
                    </p>
                  </div>
                </div>
              )}
              {status === 'blocked' && (
                <div className="alert alert-error">
                  <CircleAlert size={18} aria-hidden="true" />
                  <div>
                    <strong>Your browser blocked the WhatsApp window.</strong>
                    <p>
                      <a href={waUrl} target="_blank" rel="noopener noreferrer">Tap here to open WhatsApp</a>{' '}
                      or call {site.phone.display}.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </form>

          <aside className="side-card">
            <h2>Prefer to chat or call?</h2>
            <p>Reach us directly. We are listed as {site.hours.summary.toLowerCase()}; please confirm availability.</p>
            <ContactButtons />
            <h3>Good to know</h3>
            <ul className="plain-list">
              <li>Home-service is subject to availability in your area.</li>
              <li>Prices and service details are confirmed by the business before booking.</li>
              <li>Please do not share sensitive health information in your request.</li>
            </ul>
          </aside>
        </div>
      </section>
    </>
  );
}
