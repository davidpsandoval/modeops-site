import React from 'react'
import { createRoot } from 'react-dom/client'
import LandingPage from './LandingPage.jsx'

// If you want minimal default styling without Tailwind setup,
// you can uncomment the next line and create src/styles.css
// import './styles.css'

const container = document.getElementById('root')
const root = createRoot(container)
root.render(<LandingPage />)
