const NAV_ITEMS = [
  { label: 'Home', href: '#home' },
  { label: 'Menu', href: '/food-menu.html', external: true },
  { label: 'About Us', href: '#about' },
  { label: 'Contact Us', href: '#contact' },
  { label: 'Reservation', href: '#reservation' },
]

export default function Header({ menuOpen, setMenuOpen, scrolled }) {
  return (
    <>
      <nav className={`site-nav ${scrolled ? 'scrolled' : ''}`} id="siteNav">
        <div className="nav-inner">
          <div className="nav-right">
            <span className="menu-text-label" aria-hidden="true">MENU</span>
            <button
              className={`hamburger ${menuOpen ? 'open' : ''}`}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((o) => !o)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </nav>


      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`} aria-hidden={!menuOpen}>
        {NAV_ITEMS.map((item) => (
          <a
            key={item.label}
            href={item.href}
            {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            onClick={() => setMenuOpen(false)}
          >
            {item.label}
          </a>
        ))}
        <span className="mobile-menu-footer">
          5420 14th St · Plano, TX · 469-497-0900
        </span>
      </div>
    </>
  )
}
