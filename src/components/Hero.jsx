const PRODUCTS = [
  {
    image: '/images/hookah.png',
    alt: 'Premium flavored hookah',
    tag: 'HOOKAH',
    tagClass: '',
    href: '/hookah-menu.html',
  },
  {
    image: '/images/burger.png',
    alt: 'Signature smash burger and bites',
    tag: 'FOOD',
    tagClass: '',
    href: '/food-menu.html',
    center: true,
  },
  {
    image: '/images/mojito.png',
    alt: 'Fresh-made mojitos and mocktails',
    tag: 'DRINKS',
    tagClass: '',
    href: '/drinks-menu.html',
  },
]

const REVEAL = ['reveal', 'reveal reveal-d1', 'reveal reveal-d2']

export default function Hero() {
  return (
    <section className="hero" id="home" aria-label="Featured">
      <div className="hero-brand-word" aria-hidden="true">ARABESKA</div>

      <div className="hero-showcase">
        {PRODUCTS.map((p, i) => (
          <a
            key={p.tag}
            className={`hero-item ${p.center ? 'blob-specialty-col' : ''} ${REVEAL[i]}`}
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={p.alt}
          >
            <div className="hero-item-lift">
              <div className="hero-item-blob">
                <img src={p.image} alt={p.alt} />
              </div>
              <p className={`hero-item-tag ${p.tagClass}`}>{p.tag}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
