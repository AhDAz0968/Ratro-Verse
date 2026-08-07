import { Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'

import Home from './pages/Home'
import SearchResults from './pages/SearchResults';
import About from './pages/About'
import Service from './pages/Service';
import Contact from './pages/Contact';

import Login from './pages/Login'
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
        <Route path="/service" element={<Service />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>

      <Footer />
    </div>
  );
}
