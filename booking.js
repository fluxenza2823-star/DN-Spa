import { site, whatsappHref } from '../config/site';

export const todayISO = () => new Date().toLocaleDateString('en-CA'); // YYYY-MM-DD, local time

export function normalisePhone(value) {
  let digits = String(value || '').replace(/[^\d]/g, '');
  if (digits.startsWith('0091')) digits = digits.slice(4);
  else if (digits.startsWith('91') && digits.length === 12) digits = digits.slice(2);
  else if (digits.startsWith('0') && digits.length === 11) digits = digits.slice(1);
  return digits;
}

export function validateBooking(values) {
  const errors = {};
  const name = values.name.trim();
  if (name.length < 2) errors.name = 'Please enter your name (at least 2 characters).';

  const phone = normalisePhone(values.phone);
  if (!/^[6-9]\d{9}$/.test(phone)) {
    errors.phone = 'Enter a valid 10-digit Indian mobile number, for example 98765 43210.';
  }

  if (!values.service) errors.service = 'Please choose a service or select the discuss option.';

  if (!values.date) errors.date = 'Please choose a preferred date.';
  else if (values.date < todayISO()) errors.date = 'The preferred date cannot be in the past.';

  if (!values.time) errors.time = 'Please choose a preferred time.';

  if (values.location.trim().length < 8) {
    errors.location = 'Please enter the area or address for the visit (at least 8 characters).';
  }

  if (!values.consent) {
    errors.consent = 'Please tick the box to confirm you have read the privacy notice.';
  }
  return errors;
}

export function buildBookingMessage(values) {
  const phone = normalisePhone(values.phone);
  return [
    `Hello ${site.name}, I would like to request a home-service booking.`,
    '',
    `Name: ${values.name.trim()}`,
    `Phone: +91 ${phone}`,
    `Service: ${values.service}`,
    `Preferred date: ${values.date}`,
    `Preferred time: ${values.time}`,
    `Location: ${values.location.trim()}`,
    '',
    'Please let me know if this is available and what the price is. I understand this request is not confirmed until you reply.',
  ].join('\n');
}

export const bookingWhatsappUrl = (values) => whatsappHref(buildBookingMessage(values));
