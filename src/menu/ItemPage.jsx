import { findItem, MENUS } from './menuData.js'

/* Read ?menu=…&id=… from the URL. */
function getParams() {
  const p = new URLSearchParams(window.location.search)
  return { menuKey: p.get('menu'), itemId: p.get('id') }
}

export default function ItemPage() {
  const { menuKey, itemId } = getParams()
  const found = findItem(menuKey, itemId)

  if (!found) {
    return (
      <div className="item-page item-page--missing">
        <header className="menu-bar">
          <a className="menu-bar-logo" href="/" aria-label="Arabeska home">
            <img src="/images/ak-logo.png" alt="" className="menu-bar-mark" />
            <span className="menu-bar-word">ARABESKA</span>
          </a>
        </header>
        <main className="item-missing-body">
          <h1>Item not found</h1>
          <p>We couldn’t find that item. Browse one of our menus instead:</p>
          <nav className="item-missing-links">
            {Object.values(MENUS).map((m) => (
              <a key={m.key} href={m.file}>{m.title} Menu</a>
            ))}
          </nav>
        </main>
      </div>
    )
  }

  const { menu, item } = found
  document.title = `${item.name} · Arabeska`

  return (
    <div className="item-page">
      <header className="menu-bar">
        <a className="menu-bar-logo" href="/" aria-label="Arabeska home">
          <img src="/images/ak-logo.png" alt="" className="menu-bar-mark" />
          <span className="menu-bar-word">ARABESKA</span>
        </a>
        <nav className="menu-bar-right" aria-label="Back to menu">
          <a className="menu-resv-pill menu-resv-pill--ghost" href={menu.file}>
            ← {menu.title} Menu
          </a>
        </nav>
      </header>

      <main className="item-main">
        <div className="item-media">
          <img src={item.image} alt={item.name} />
        </div>

        <div className="item-info">
          <span className="item-eyebrow">{menu.title} · {item.section}</span>
          <h1 className="item-name">{item.name}</h1>
          <span className="item-price">{item.price}</span>
          <p className="item-desc">{item.desc}</p>

          {item.popular && <span className="item-badge">★ Guest Favorite</span>}

          <a
            className="item-cta"
            href="/#reservation"
          >
            Reserve a Table
          </a>
          <a className="item-call" href="tel:4694970900">
            or call to order · (469) 497-0900
          </a>
        </div>
      </main>
    </div>
  )
}
