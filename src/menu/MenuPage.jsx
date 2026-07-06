import { useMemo, useState } from 'react'
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

/* Two-letter monogram from the item name for the thumbnail tile. */
function monogram(name) {
  const words = name.replace(/[^a-zA-Z ]/g, '').trim().split(/\s+/)
  if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase()
  return name.replace(/[^a-zA-Z]/g, '').slice(0, 2).toUpperCase()
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
          <label className="menu-sort">
            <span className="menu-sort-label">Sort by</span>
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              {SORTS.map((s) => (
                <option key={s.key} value={s.key}>{s.label}</option>
              ))}
            </select>
          </label>
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
                  <span className="menu-item-mono">{monogram(item.name)}</span>
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
