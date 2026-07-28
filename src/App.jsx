import { Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'

import Home from './pages/Home'
import SearchResults from './pages/SearchResults';
import About from './pages/About'
import Login from './pages/Login'
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

import Footer from "./components/Footer";

export default function App() {
  return (
    <div>

      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/games" element={<SearchResults />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>

      <Footer />
    </div>
  );
}
