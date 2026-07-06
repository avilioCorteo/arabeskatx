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
      {/* Nav bar — slides in after scroll, contains logo + hamburger */}
      <nav className={`site-nav${scrolled ? ' scrolled' : ' nav-hidden'}`} id="siteNav">
        <div className="nav-inner">
          <a href="#home" className="nav-logo-img" aria-label="Arabeska home">
            <img src="/images/ak-logo.png" alt="Arabeska logo" />
          </a>
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

      {/* Logo + hamburger — always fixed at top when nav bar is hidden */}
      {!scrolled && (
        <>
          <a href="#home" className="nav-logo-fixed" aria-label="Arabeska home">
            <img src="/images/ak-logo.png" alt="Arabeska logo" />
          </a>
          <div className="nav-hamburger-fixed">
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
        </>
      )}


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
