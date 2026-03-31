import { Routes, Route } from 'react-router-dom'
import SafetyDashboard from './pages/SafetyDashboard'

function App() {
  return (
    <Routes>
      <Route path="/" element={<SafetyDashboard />} />
      <Route path="*" element={<SafetyDashboard />} />
    </Routes>
  )
}

export default App
