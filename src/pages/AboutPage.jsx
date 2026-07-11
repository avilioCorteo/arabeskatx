import PageShell from './PageShell.jsx'

const SOCIALS = [
  {
    label: 'Instagram',
    href: 'https://instagram.com/arabeskatx',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@arabeska_tx',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M16.6 5.82a4.28 4.28 0 0 1-1.06-2.82h-3.2v12.4a2.55 2.55 0 1 1-2.55-2.55c.26 0 .52.04.76.12V9.66a5.74 5.74 0 0 0-.76-.05 5.75 5.75 0 1 0 5.75 5.75V9.01a7.5 7.5 0 0 0 4.36 1.4V7.2a4.28 4.28 0 0 1-3.3-1.38z" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: 'https://facebook.com/arabeskatx',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
]

export default function AboutPage() {
  document.title = 'About · Arabeska — Plano, TX'

  return (
    <PageShell>
      <section className="menu-hero" aria-label="About Arabeska">
        <div className="menu-hero-text">
          <div className="menu-hero-word" aria-hidden="true">ABOUT</div>
          <p className="menu-hero-eyebrow">Our Story</p>
          <p className="menu-hero-tagline">A hookah lounge and restaurant built around slowing down.</p>
        </div>
      </section>

      <main className="page-body">
        <article className="page-story">
          <h2 className="page-story-title">Where Flavor Meets Vibe</h2>
          <p>
            Arabeska started with a simple idea: give Plano a place to unwind that
            actually feels like an occasion. Warm light, good music, and a hookah
            bar built by people who take the craft seriously — that's the room
            we set out to build, and the one we keep every night.
          </p>
          <p>
            The menu follows the same instinct. Our hookah program runs from
            house blends to traditional single flavors, the kitchen turns out
            shawarma, kabobs, and smash burgers made to order, and the drink
            list keeps things cold and bright with mojitos, lassis, and fresh
            mocktails. Nothing here is an afterthought.
          </p>
          <p>
            Come through for a quiet session with a book, or bring the whole
            group and take over a corner for the night — either way, pull up a
            seat and stay a while.
          </p>
          <p className="page-pullquote">"The taste you feel, the vibe you love."</p>
        </article>

        <div className="page-socials" aria-label="Follow Arabeska">
          {SOCIALS.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer noopener" className="footer-social-icon" aria-label={s.label}>
              {s.icon}
            </a>
          ))}
        </div>

        <a className="page-cta" href="/#reservation">Reserve a Table</a>
      </main>
    </PageShell>
  )
}
