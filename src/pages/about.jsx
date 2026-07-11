import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AboutPage from './AboutPage.jsx'
import '../styles.css'
import '../menu/menu.css'
import './pages.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AboutPage />
  </StrictMode>
)
