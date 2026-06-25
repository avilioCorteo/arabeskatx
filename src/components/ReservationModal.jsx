import { useState, useEffect, useCallback } from 'react'
import './ReservationModal.css'

const MONTH_NAMES = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December'
]
const DAY_NAMES = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']

const BASE_SLOTS = [
  '4:00 PM','5:00 PM','6:00 PM','7:00 PM',
  '8:00 PM','9:00 PM','10:00 PM','11:00 PM',
]
const WEEKEND_EXTRA = ['12:00 AM','1:00 AM','2:00 AM']

const OCCASIONS = [
  { id: 'dinner',  name: 'Dinner',           meta: 'Hookah · food · drinks · 2–3 hr' },
  { id: 'hookah',  name: 'Hookah Session',   meta: 'Premium lounge experience · 1–2 hr' },
  { id: 'event',   name: 'Private Event',    meta: 'Group of 10+ · custom setup' },
  { id: 'vip',     name: 'Birthday / VIP',   meta: 'VIP section · bottle service available' },
]

const STEPS = ['Date & Time', 'Party & Occasion', 'Confirm']

function getSlots(date) {
  if (!date) return []
  const dow = date.getDay()
  return dow === 5 || dow === 6 ? [...BASE_SLOTS, ...WEEKEND_EXTRA] : BASE_SLOTS
}

function taken(d) {
  const seed = d.getFullYear() * 10000 + d.getMonth() * 100 + d.getDate()
  const r = (Math.sin(seed) * 9301 + 49297) % 233280 / 233280
  return r > 0.55
}

function buildCalendar(year, month) {
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const cells = []
  for (let i = 0; i < firstDay; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)
  return cells
}

function fmt(d) {
  if (!d) return null
  return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
}

function stepOf(sd, ss) {
  if (!sd) return 0
  if (!ss) return 0
  return 2
}

const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M2 2l14 14M16 2L2 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
)
const CheckIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <path d="M5 14l6 6L23 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)
const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

export default function ReservationModal({ open, onClose }) {
  const today = new Date()
  today.setHours(0,0,0,0)

  const [sd, setSd] = useState(null)      // selected date
  const [ss, setSs] = useState(null)      // selected slot
  const [sp, setSp] = useState(2)         // party size
  const [sv, setSv] = useState('dinner')  // occasion id
  const [vy, setVy] = useState(today.getFullYear())
  const [vm, setVm] = useState(today.getMonth())
  const [confirmed, setConfirmed] = useState(false)

  const activeStep = stepOf(sd, ss)

  const reset = useCallback(() => {
    setSd(null); setSs(null); setSp(2); setSv('dinner')
    setVy(today.getFullYear()); setVm(today.getMonth())
    setConfirmed(false)
  }, [])

  const close = useCallback(() => { reset(); onClose() }, [reset, onClose])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') close() }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, close])

  if (!open) return null

  const cells = buildCalendar(vy, vm)
  const isMinMonth = vy === today.getFullYear() && vm === today.getMonth()

  function prevMonth() {
    if (isMinMonth) return
    if (vm === 0) { setVy(y => y - 1); setVm(11) } else setVm(m => m - 1)
    setSd(null); setSs(null)
  }
  function nextMonth() {
    if (vm === 11) { setVy(y => y + 1); setVm(0) } else setVm(m => m + 1)
    setSd(null); setSs(null)
  }
  function selectDay(d) {
    const date = new Date(vy, vm, d)
    if (date < today || taken(date)) return
    setSd(date); setSs(null)
  }

  function dayClass(d) {
    const date = new Date(vy, vm, d)
    if (sd && date.getTime() === sd.getTime()) return 'picked'
    if (date < today) return 'gone'
    if (date.getTime() === today.getTime()) return 'now'
    if (taken(date)) return 'gone'
    return 'open'
  }

  const slots = getSlots(sd)
  const occasion = OCCASIONS.find(o => o.id === sv)

  const summaryDateStr = sd
    ? sd.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
    : null
  const summaryMoStr = sd
    ? sd.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    : null

  function handleConfirm() {
    if (!sd || !ss) return
    setConfirmed(true)
  }

  const confirmMeta = sd && ss && occasion
    ? `Party of ${sp} · ${occasion.name} · ${summaryDateStr} at ${ss}`
    : ''

  return (
    <div
      className="resv-modal"
      role="dialog"
      aria-modal="true"
      aria-label="Make a reservation"
      onClick={(e) => { if (e.target === e.currentTarget) close() }}
    >
      <div className="resv-modal-inner">
        <div className="resv-shell">
          <button className="resv-close" onClick={close} aria-label="Close"><CloseIcon /></button>

          <div className="resv-header">
            <span className="resv-brow">ARABESKA · PLANO, TX</span>
            <h2>Reserve your <em>evening.</em></h2>
            <p>Walk-ins welcome — reservations guarantee your table. Pick a date, time, and party size.</p>
          </div>

          <div className="resv-stepper" role="list">
            {STEPS.map((label, i) => (
              <div
                key={label}
                className={`resv-step${activeStep >= i ? ' on' : ''}`}
                role="listitem"
              >
                <span className="rsn">{i + 1}</span>
                {label}
              </div>
            ))}
          </div>

          <div className="resv-layout">
            {/* Calendar */}
            <div className="resv-cal-card">
              <div className="resv-cal-head">
                <div className="resv-cal-mo">
                  {MONTH_NAMES[vm]}<span className="yr">{vy}</span>
                </div>
                <div className="resv-cal-nav">
                  <button onClick={prevMonth} disabled={isMinMonth} aria-label="Previous month">‹</button>
                  <button onClick={nextMonth} aria-label="Next month">›</button>
                </div>
              </div>

              <div className="resv-cal-wk">
                {DAY_NAMES.map(d => <span key={d}>{d}</span>)}
              </div>

              <div className="resv-cal-grid">
                {cells.map((d, i) => (
                  d === null
                    ? <div key={`e${i}`} className="resv-day dim" />
                    : (
                      <div
                        key={d}
                        className={`resv-day ${dayClass(d)}`}
                        onClick={() => selectDay(d)}
                        role="button"
                        tabIndex={dayClass(d) === 'open' || dayClass(d) === 'now' ? 0 : -1}
                        aria-label={`${MONTH_NAMES[vm]} ${d}`}
                        onKeyDown={e => e.key === 'Enter' && selectDay(d)}
                      >
                        <span className="rd">{d}</span>
                        <span className="rs">
                          {dayClass(d) === 'open' || dayClass(d) === 'now' ? 'open' :
                           dayClass(d) === 'gone' ? 'n/a' :
                           dayClass(d) === 'picked' ? 'selected' : ''}
                        </span>
                      </div>
                    )
                ))}
              </div>

              <div className="resv-legend">
                <span className="resv-leg"><span className="resv-sw a" />Available</span>
                <span className="resv-leg"><span className="resv-sw p" />Selected</span>
                <span className="resv-leg"><span className="resv-sw t" />Today</span>
                <span className="resv-leg"><span className="resv-sw x" />Unavailable</span>
              </div>
            </div>

            {/* Summary sidebar */}
            <div className="resv-sum-card">
              <div className="resv-se">Your Reservation</div>
              <div className="resv-sd">
                {summaryDateStr
                  ? <>{summaryDateStr.split(',')[0]}<br/><span style={{fontSize:'20px',fontWeight:400}}>{summaryMoStr}</span></>
                  : <span className="mt">No date selected</span>
                }
              </div>
              {ss && <div className="resv-ss">{ss} · {occasion?.name}</div>}

              <div className="resv-div" />

              <div className="resv-pl">Party Size</div>
              <div className="resv-party">
                <button
                  className="resv-party-btn"
                  onClick={() => setSp(n => Math.max(1, n - 1))}
                  disabled={sp <= 1}
                  aria-label="Decrease party size"
                >−</button>
                <span className="resv-party-count">{sp}</span>
                <button
                  className="resv-party-btn"
                  onClick={() => setSp(n => Math.min(20, n + 1))}
                  disabled={sp >= 20}
                  aria-label="Increase party size"
                >+</button>
                <span className="resv-party-label">guest{sp !== 1 ? 's' : ''}</span>
              </div>

              <div className="resv-div" />

              <div className="resv-pl">Select a Time</div>
              {!sd
                ? <div className="resv-slot-empty">Select a date first</div>
                : (
                  <div className="resv-slots">
                    {slots.map(slot => (
                      <div
                        key={slot}
                        className={`resv-slot${ss === slot ? ' on' : ''}`}
                        onClick={() => setSs(slot)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={e => e.key === 'Enter' && setSs(slot)}
                      >
                        {slot}
                      </div>
                    ))}
                  </div>
                )
              }

              <div className="resv-div" />

              <div className="resv-pl">Occasion</div>
              <div className="resv-occ-list">
                {OCCASIONS.map(occ => (
                  <div
                    key={occ.id}
                    className={`resv-occ${sv === occ.id ? ' on' : ''}`}
                    onClick={() => setSv(occ.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={e => e.key === 'Enter' && setSv(occ.id)}
                  >
                    <span className="resv-occ-nm">{occ.name}</span>
                    <span className="resv-occ-mt">{occ.meta}</span>
                  </div>
                ))}
              </div>

              <button
                className="resv-cta"
                onClick={handleConfirm}
                disabled={!sd || !ss}
              >
                Request Reservation <ArrowIcon />
              </button>
              <p className="resv-note">Reservations held for 15 min · Walk-ins always welcome</p>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation overlay */}
      {confirmed && (
        <div className="resv-confirm-ov" role="dialog" aria-modal="true" aria-label="Reservation confirmed">
          <div className="resv-ov-card">
            <div className="resv-ov-chk"><CheckIcon /></div>
            <h3>You're <em>reserved.</em></h3>
            <div className="resv-ov-meta">
              <strong>{confirmMeta}</strong><br/>
              We'll see you soon. Check your inbox for a confirmation.
            </div>
            <div className="resv-ov-actions">
              <button className="resv-btn-s" onClick={close}>Close</button>
              <button className="resv-btn-g" onClick={close}>Done</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
