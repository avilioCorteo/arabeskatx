import { useState } from 'react'

/* Same nav set the menu pages use — root-prefixed so it works from any page. */
const NAV_ITEMS = [
  { label: 'Home', href: '/#home' },
  { label: 'Menu', href: '/food-menu.html' },
  { label: 'About Us', href: '/about.html' },
  { label: 'Contact Us', href: '/contact.html' },
  { label: 'Reservation', href: '/#reservation' },
]

/* Shared chrome for standalone pages (About, Contact): top bar, mobile
   dropdown, and footer — mirrors the scaffolding in MenuPage.jsx so these
   pages feel like part of the same site. */
export default function PageShell({ children }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="menu-page">
      <header className="menu-bar">
        <a className="menu-bar-logo" href="/" aria-label="Arabeska home">
          <img src="/images/ak-logo.png" alt="" className="menu-bar-mark" />
          <span className="menu-bar-word">ARABESKA</span>
        </a>

        <div className="menu-bar-right">
          <a className="menu-resv-pill" href="/#reservation">
            <span className="menu-resv-dot" aria-hidden="true" />
            Reservation
          </a>
          <button
            className={`menu-burger ${menuOpen ? 'open' : ''}`}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`} aria-hidden={!menuOpen}>
        {NAV_ITEMS.map((item) => (
          <a key={item.label} href={item.href} onClick={() => setMenuOpen(false)}>
            {item.label}
          </a>
        ))}
        <span className="mobile-menu-footer">5420 14th St · Plano, TX · 469-497-0900</span>
      </div>

      {children}

      <footer className="menu-foot">
        <a className="menu-foot-back" href="/">← Back to Arabeska</a>
        <p>5420 14th St, Plano TX 75094 · 469-497-0900</p>
      </footer>
    </div>
  )
}
