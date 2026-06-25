import { MENUS } from './menuData.js'

/* The other two menus, for the cross-links in the sub-nav. */
function otherMenus(currentKey) {
  return Object.values(MENUS).filter((m) => m.key !== currentKey)
}

export default function MenuPage({ data }) {
  return (
    <div className="menu-page">
      {/* Top bar — wordmark back to home + cross-links to the other menus */}
      <header className="menu-bar">
        <a className="menu-bar-logo" href="/">
          <span className="logo-script">Arabeska</span>
          <span className="logo-sub">Hookah Lounge · Plano, TX</span>
        </a>
        <nav className="menu-bar-links" aria-label="Other menus">
          {otherMenus(data.key).map((m) => (
            <a key={m.key} href={m.file}>{m.title}</a>
          ))}
        </nav>
      </header>

      {/* Hero band — giant category word with the product cutout */}
      <section className="menu-hero" aria-label={`${data.title} menu`}>
        <div className="menu-hero-word" aria-hidden="true">{data.title.toUpperCase()}</div>
        <img className="menu-hero-img" src={data.image} alt={`${data.title} at Arabeska`} />
        <p className="menu-hero-tagline">{data.tagline}</p>
      </section>

      {/* Sections */}
      <main className="menu-body">
        {data.sections.map((section) => (
          <section className="menu-section" key={section.name}>
            <div className="menu-section-head">
              <h2 className="menu-section-title">{section.name}</h2>
              {section.note && <span className="menu-section-note">{section.note}</span>}
            </div>
            <ul className="menu-items">
              {section.items.map((item) => (
                <li key={item.id}>
                  <a
                    className="menu-item"
                    href={`/item.html?menu=${data.key}&id=${item.id}`}
                    aria-label={`${item.name} — view details`}
                  >
                    <div className="menu-item-row">
                      <span className="menu-item-name">{item.name}</span>
                      <span className="menu-item-leader" aria-hidden="true" />
                      <span className="menu-item-price">{item.price}</span>
                    </div>
                    {item.desc && <p className="menu-item-desc">{item.desc}</p>}
                    <span className="menu-item-cue" aria-hidden="true">View details →</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </main>

      <footer className="menu-foot">
        <a className="menu-foot-back" href="/">← Back to Arabeska</a>
        <p>5420 14th St, Plano TX 75094 · 469-497-0900</p>
      </footer>
    </div>
  )
}
