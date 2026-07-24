import { Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'

import Home from './pages/Home'
import About from './pages/About'
import Login from './pages/Login'

export default function App() {
  return (
    <div>
      {/* Navbar renders on every page */}
      <Navbar />

      {/* Pages render here depending on the URL route */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}
