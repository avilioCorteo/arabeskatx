import { useEffect, useState, useRef } from 'react'
import './ReservationButton.css'

const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="4" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.8" />
    <path d="M3 9h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M8 2v4M16 2v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="8.5" cy="14" r="1.2" fill="currentColor" />
    <circle cx="12" cy="14" r="1.2" fill="currentColor" />
    <circle cx="15.5" cy="14" r="1.2" fill="currentColor" />
  </svg>
)

export default function ReservationButton({ onClick }) {
  const [collapsed, setCollapsed] = useState(false)
  const ticking = useRef(false)

  useEffect(() => {
    const onScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          setCollapsed(window.scrollY > 80)
          ticking.current = false
        })
        ticking.current = true
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="resv-wrapper">
      <button
        className={`resv-btn${collapsed ? ' resv-btn--collapsed' : ''}`}
        aria-label="Make a reservation"
        onClick={onClick}
      >
        <span className="resv-icon"><CalendarIcon /></span>
        <span className="resv-label">Reservation</span>
        <span className="resv-shine" aria-hidden="true" />
      </button>
    </div>
  )
}
