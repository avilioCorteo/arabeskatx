import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ContactPage from './ContactPage.jsx'
import '../styles.css'
import '../menu/menu.css'
import './pages.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContactPage />
  </StrictMode>
)
