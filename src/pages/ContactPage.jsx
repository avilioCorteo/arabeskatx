import PageShell from './PageShell.jsx'

const CARDS = [
  {
    label: 'Location',
    icon: '📍',
    content: <>5420 14th St<br />Plano, TX 75094</>,
    href: 'https://maps.google.com/?q=5420+14th+St,+Plano,+TX+75094',
  },
  {
    label: 'Phone',
    icon: '📞',
    content: '(469) 497-0900',
    href: 'tel:4694970900',
  },
  {
    label: 'Email',
    icon: '✉️',
    content: 'info@arabeskatx.com',
    href: 'mailto:info@arabeskatx.com',
  },
  {
    label: 'Hours',
    icon: '🕐',
    content: (
      <>
        Mon–Thu · 4PM–1AM<br />
        Fri–Sat · 4PM–3AM<br />
        Sun · 4PM–1AM
      </>
    ),
  },
]

export default function ContactPage() {
  document.title = 'Contact · Arabeska — Plano, TX'

  return (
    <PageShell>
      <section className="menu-hero" aria-label="Contact Arabeska">
        <div className="menu-hero-text">
          <div className="menu-hero-word" aria-hidden="true">CONTACT</div>
          <p className="menu-hero-eyebrow">Get In Touch</p>
          <p className="menu-hero-tagline">Questions, group bookings, or just want directions — reach out.</p>
        </div>
      </section>

      <main className="page-body">
        <div className="page-contact-grid">
          {CARDS.map((c) => {
            const Tag = c.href ? 'a' : 'div'
            const linkProps = c.href
              ? { href: c.href, target: c.href.startsWith('http') ? '_blank' : undefined, rel: c.href.startsWith('http') ? 'noreferrer noopener' : undefined }
              : {}
            return (
              <Tag key={c.label} className={`page-contact-card${c.href ? ' is-link' : ''}`} {...linkProps}>
                <span className="page-contact-icon" aria-hidden="true">{c.icon}</span>
                <span className="page-contact-label">{c.label}</span>
                <span className="page-contact-value">{c.content}</span>
              </Tag>
            )
          })}
        </div>

        <a className="page-cta" href="/#reservation">Reserve a Table</a>
      </main>
    </PageShell>
  )
}
