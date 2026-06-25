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
          <a className="menu-bar-logo" href="/">
            <span className="logo-script">Arabeska</span>
            <span className="logo-sub">Hookah Lounge · Plano, TX</span>
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
        <a className="menu-bar-logo" href="/">
          <span className="logo-script">Arabeska</span>
          <span className="logo-sub">Hookah Lounge · Plano, TX</span>
        </a>
        <nav className="menu-bar-links" aria-label="Back to menu">
          <a href={menu.file}>← {menu.title} Menu</a>
        </nav>
      </header>

      <main className="item-main">
        <div className="item-media">
          <img src={menu.image} alt={item.name} />
        </div>
        <div className="item-info">
          <span className="item-eyebrow">{menu.title} · {item.section}</span>
          <h1 className="item-name">{item.name}</h1>
          <span className="item-price">{item.price}</span>
          <p className="item-desc">{item.desc}</p>
          <a className="item-back" href={menu.file}>← Back to {menu.title} Menu</a>
        </div>
      </main>
    </div>
  )
}
