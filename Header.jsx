import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import { site, telHref } from '../config/site';

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/home-service', label: 'Home Service' },
  { to: '/contact', label: 'Contact' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
      <div className="container header-inner">
        <Link to="/" className="brand" aria-label={`${site.name}, home`}>
          <span className="brand-mark" aria-hidden="true" />
          <span className="brand-text">
            <span className="brand-name">Day Night</span>
            <span className="brand-sub">Outcall Massage Spa</span>
          </span>
        </Link>

        <nav
          id="primary-nav"
          className={`nav${open ? ' is-open' : ''}`}
          aria-label="Primary"
        >
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className="nav-link">
              {l.label}
            </NavLink>
          ))}
          <Link to="/home-service" className="btn btn-primary nav-cta">Book a Massage</Link>
        </nav>

        <div className="header-actions">
          <a className="icon-btn" href={telHref} aria-label={`Call ${site.phone.display}`}>
            <Phone size={18} aria-hidden="true" />
          </a>
          <button
            type="button"
            className="icon-btn menu-toggle"
            aria-expanded={open}
            aria-controls="primary-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </div>
    </header>
  );
}
