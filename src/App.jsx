import { Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'

import Home from './pages/Home'
import SearchResults from './pages/SearchResults';
import About from './pages/About'
import Games from './pages/Games'
import Service from './pages/Service';
import Contact from './pages/Contact';
import Login from './pages/Login'
import Register from "./pages/Register";
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import AdminDashboard from "./pages/admin/AdminDashboard";

import Footer from "./components/Footer";

export default function App() {
  return (
    <div>

      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/games-searchresults" element={<SearchResults />} />
        <Route path="/about" element={<About />} />
        <Route path="/games" element={<Games />} />
        <Route path="/service" element={<Service />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />}/>
        <Route path="/reset-password" element={<ResetPassword />}/>

        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>

      <Footer />
    </div>
  );
}
