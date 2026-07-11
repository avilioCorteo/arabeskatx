import { useEffect, useState } from 'react'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import FeatureSection from './components/FeatureSection.jsx'
import Footer from './components/Footer.jsx'
import ReservationButton from './components/ReservationButton.jsx'
import ReservationModal from './components/ReservationModal.jsx'

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [reservationOpen, setReservationOpen] = useState(false)

  /* Nav scroll shadow */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Auto-open the reservation modal when linked here via #reservation
     (e.g. "Reserve a Table" from a menu item page). There's no in-page
     anchor to scroll to — the hash is just a signal to open the modal. */
  useEffect(() => {
    if (window.location.hash === '#reservation') {
      setReservationOpen(true)
      history.replaceState(null, '', window.location.pathname + window.location.search)
    }
  }, [])

  /* Lock body scroll while the mobile menu is open + close on Escape */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    const onKey = (e) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  /* Scroll reveal via IntersectionObserver */
  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal:not(.visible)')
    if (!reveals.length) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )
    reveals.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="page">
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} scrolled={scrolled} />
      <main>
        <Hero />
        <FeatureSection />
      </main>
      <Footer />
      <ReservationButton onClick={() => setReservationOpen(true)} />
      <ReservationModal open={reservationOpen} onClose={() => setReservationOpen(false)} />
    </div>
  )
}
