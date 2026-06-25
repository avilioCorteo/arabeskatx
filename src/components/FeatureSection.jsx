export default function FeatureSection() {
  return (
    <section className="fresh-section" id="signature" aria-label="Signature">
      <div className="fresh-word reveal" aria-hidden="true">SIGNATURE</div>

      <div className="fresh-product reveal reveal-d1">
        <div className="fresh-img-wrap">
          <img
            className="fresh-hero-img"
            src="/images/hookah.png"
            alt="Noor Jahan signature hookah"
            loading="lazy"
          />
          <p className="hero-item-tag ember fresh-noor-jahan">NOOR JAHAN</p>
        </div>
        <p className="fresh-caption">
          OUR SIGNATURE HOOKAH — CRAFTED TO PERFECTION
        </p>
      </div>
    </section>
  )
}
