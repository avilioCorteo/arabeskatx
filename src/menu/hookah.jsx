import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import MenuPage from './MenuPage.jsx'
import { hookahMenu } from './menuData.js'
import '../styles.css'
import './menu.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MenuPage data={hookahMenu} />
  </StrictMode>
)
