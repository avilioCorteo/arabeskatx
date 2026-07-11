const PILL_LINKS = [
  { label: 'Menu', href: '/food-menu.html', external: true },
  { label: 'About', href: '/about.html' },
  { label: 'Reservations', href: '#reservation' },
  { label: 'Contact', href: '/contact.html' },
]

export default function Footer() {
  return (
    <footer className="site-footer-minimal" id="contact">
      <a className="footer-logo-minimal reveal" href="#home">
        <span className="logo-script">Arabeska</span>
        <span className="logo-sub">Hookah Lounge · Plano, TX</span>
      </a>

      <nav className="footer-nav-grid reveal reveal-d1" aria-label="Footer navigation">
        {PILL_LINKS.map((link) => (
          <a
            key={link.label}
            className="footer-nav-btn"
            href={link.href}
            {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          >
            {link.label}
          </a>
        ))}
      </nav>

      <div className="footer-socials-minimal reveal reveal-d2" aria-label="Social links">
        <a
          href="https://instagram.com/arabeskatx"
          target="_blank"
          rel="noreferrer noopener"
          className="footer-social-icon"
          aria-label="Instagram"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
          </svg>
        </a>
        <a
          href="https://www.tiktok.com/@arabeska_tx"
          target="_blank"
          rel="noreferrer noopener"
          className="footer-social-icon"
          aria-label="TikTok"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M16.6 5.82a4.28 4.28 0 0 1-1.06-2.82h-3.2v12.4a2.55 2.55 0 1 1-2.55-2.55c.26 0 .52.04.76.12V9.66a5.74 5.74 0 0 0-.76-.05 5.75 5.75 0 1 0 5.75 5.75V9.01a7.5 7.5 0 0 0 4.36 1.4V7.2a4.28 4.28 0 0 1-3.3-1.38z" />
          </svg>
        </a>
        <a
          href="https://facebook.com/arabeskatx"
          target="_blank"
          rel="noreferrer noopener"
          className="footer-social-icon"
          aria-label="Facebook"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
          </svg>
        </a>
      </div>

      <div className="footer-info-minimal reveal reveal-d2">
        <p>5420 14th St, Plano TX 75094 · 469-497-0900</p>
        <p>Mon–Thu 4PM–1AM · Fri–Sat 4PM–3AM · Sun 4PM–1AM</p>
      </div>

      <p className="footer-copy-minimal">
        © {new Date().getFullYear()} Arabeska · Plano, TX · All rights reserved.
      </p>
    </footer>
  )
}
