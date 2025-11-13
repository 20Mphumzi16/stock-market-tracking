import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './Components/Login/login'
import Registration from './Components/Registration/Registration'
import Landing from './Components/Landing/Landing'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/dashboard" element={<Landing />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  )
}

export default App
