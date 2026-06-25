import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ItemPage from './ItemPage.jsx'
import '../styles.css'
import './menu.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ItemPage />
  </StrictMode>
)
