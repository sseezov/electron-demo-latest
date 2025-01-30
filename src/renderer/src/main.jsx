import './styles.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StrictMode>
      <Routes>
        <Route path='/' element={<App/>}/>
      </Routes>
    </StrictMode>
  </BrowserRouter>
)
