import { useEffect, useMemo, useRef, useState } from 'react'
import { MENUS } from './menuData.js'

/* Tab order across the top of every menu page. */
const TABS = [
  { key: 'hookah', label: 'Hookah', icon: '◭' },
  { key: 'food', label: 'Food', icon: '✦' },
  { key: 'drinks', label: 'Drinks', icon: '❖' },
]

const SORTS = [
  { key: 'popular', label: 'Popular' },
  { key: 'price-asc', label: 'Price · Low to High' },
  { key: 'price-desc', label: 'Price · High to Low' },
  { key: 'az', label: 'A → Z' },
]

const NAV_ITEMS = [
  { label: 'Home', href: '/#home' },
  { label: 'Menu', href: '/food-menu.html' },
  { label: 'About Us', href: '/#about' },
  { label: 'Contact Us', href: '/#contact' },
  { label: 'Reservation', href: '/#reservation' },
]

const priceNum = (p) => Number(String(p).replace(/[^0-9.]/g, '')) || 0

/* Flatten a menu's sections into a single ordered list, then sort. */
function buildList(data, sort) {
  const flat = []
  data.sections.forEach((section) => {
    section.items.forEach((item) => flat.push({ ...item, sectionName: section.name }))
  })
  const list = [...flat]
  switch (sort) {
    case 'price-asc':
      list.sort((a, b) => priceNum(a.price) - priceNum(b.price))
      break
    case 'price-desc':
      list.sort((a, b) => priceNum(b.price) - priceNum(a.price))
      break
    case 'az':
      list.sort((a, b) => a.name.localeCompare(b.name))
      break
    case 'popular':
    default:
      list.sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0))
      break
  }
  return list
}

/* Custom-styled "Sort by" dropdown — a native <select> can't be themed
   past its trigger on most platforms, so this renders the option list
   itself to match the dark/gold menu theme. */
function SortDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)
  const current = SORTS.find((s) => s.key === value) ?? SORTS[0]

  useEffect(() => {
    if (!open) return
    const onDocDown = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false)
    }
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDocDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDocDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div className="menu-sort" ref={rootRef}>
      <span className="menu-sort-label">Sort by</span>
      <button
        type="button"
        className={`menu-sort-trigger ${open ? 'open' : ''}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        {current.label}
        <svg className="menu-sort-caret" width="10" height="6" viewBox="0 0 10 6" aria-hidden="true">
          <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <ul className="menu-sort-list" role="listbox">
          {SORTS.map((s) => (
            <li key={s.key} role="option" aria-selected={s.key === value}>
              <button
                type="button"
                className={`menu-sort-option ${s.key === value ? 'selected' : ''}`}
                onClick={() => {
                  onChange(s.key)
                  setOpen(false)
                }}
              >
                {s.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default function MenuPage({ data }) {
  const [sort, setSort] = useState('popular')
  const [menuOpen, setMenuOpen] = useState(false)

  const items = useMemo(() => buildList(data, sort), [data, sort])

  return (
    <div className="menu-page">
      {/* ===== TOP BAR ===== */}
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

      {/* ===== MOBILE MENU DROPDOWN ===== */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`} aria-hidden={!menuOpen}>
        {NAV_ITEMS.map((item) => (
          <a key={item.label} href={item.href} onClick={() => setMenuOpen(false)}>
            {item.label}
          </a>
        ))}
        <span className="mobile-menu-footer">5420 14th St · Plano, TX · 469-497-0900</span>
      </div>

      {/* ===== CATEGORY TABS ===== */}
      <nav className="menu-tabs" aria-label="Menu categories">
        {TABS.map((t) => (
          <a
            key={t.key}
            href={MENUS[t.key].file}
            className={`menu-tab ${t.key === data.key ? 'active' : ''}`}
            aria-current={t.key === data.key ? 'page' : undefined}
          >
            <span className="menu-tab-icon" aria-hidden="true">{t.icon}</span>
            {t.label}
          </a>
        ))}
      </nav>

      {/* ===== HERO BAND ===== */}
      <section className="menu-hero" aria-label={`${data.title} menu`}>
        <div className="menu-hero-text">
          <div className="menu-hero-word" aria-hidden="true">{data.title.toUpperCase()}</div>
          <p className="menu-hero-eyebrow">{data.eyebrow}</p>
          <p className="menu-hero-tagline">{data.tagline}</p>
        </div>
        <div className="menu-hero-media">
          <img className="menu-hero-img" src={data.image} alt={`${data.title} at Arabeska`} />
        </div>
      </section>

      {/* ===== FLAVORS / ITEMS ===== */}
      <main className="menu-body">
        <div className="menu-list-head">
          <h2 className="menu-list-title">{data.flavorsLabel}</h2>
          <SortDropdown value={sort} onChange={setSort} />
        </div>

        <ul className="menu-items">
          {items.map((item, i) => (
            <li key={item.id}>
              <a
                className="menu-item"
                href={`/item.html?menu=${data.key}&id=${item.id}`}
                aria-label={`${item.name} — view details`}
              >
                <span className="menu-item-thumb" aria-hidden="true">
                  <img src={item.image} alt="" loading="lazy" />
                </span>

                <span className="menu-item-main">
                  <span className="menu-item-index" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="menu-item-name">{item.name}</span>
                  {item.desc && <span className="menu-item-desc">{item.desc}</span>}
                  {item.popular && <span className="menu-item-pop">★ Popular</span>}
                </span>

                <span className="menu-item-aside">
                  <span className="menu-item-price">{item.price}</span>
                  <span className="menu-item-view" aria-hidden="true">View</span>
                </span>
              </a>
            </li>
          ))}
        </ul>

        {/* ===== STAFF CTA CARD ===== */}
        <aside className="menu-cta">
          <div className="menu-cta-text">
            <p className="menu-cta-eyebrow">Need recommendations?</p>
            <p className="menu-cta-line">Let our staff guide you to your perfect flavor.</p>
          </div>
          <a className="menu-cta-btn" href="tel:4694970900">Ask Our Staff</a>
        </aside>
      </main>

      <footer className="menu-foot">
        <a className="menu-foot-back" href="/">← Back to Arabeska</a>
        <p>5420 14th St, Plano TX 75094 · 469-497-0900</p>
      </footer>
    </div>
  )
}
