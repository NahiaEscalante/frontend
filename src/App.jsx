import './index.css'
import { 
	BrowserRouter as Router, 
	Routes, 
	Route,
	Navigate } from 'react-router-dom'
import { Navbar } from './layout/Navbar'
import { Login } from './pages/Login'

function App() {
  
  return (
    <>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Navigate to="/auth/login"/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
