import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Services from './pages/Services'
import ServiceRequest from './pages/ServiceRequest'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="servicios" element={<Services />} />
        <Route path="solicitar-servicio" element={<ServiceRequest />} />
      </Route>
    </Routes>
  )
}

export default App
