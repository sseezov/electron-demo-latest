import './styles.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Routes, Route, HashRouter } from 'react-router'
import App from './App.jsx'
import UpdatePartner from './UpdatePartner.jsx'
import CreatePartner from './CreatePartner.jsx'

createRoot(document.getElementById('root')).render(
  <HashRouter>
    <StrictMode>
      <Routes>
        <Route path='/' element={<App/>}/>
        <Route path='/update' element={<UpdatePartner/>}/>
        <Route path='/create' element={<CreatePartner/>}/>
      </Routes>
    </StrictMode>
  </HashRouter>
)
