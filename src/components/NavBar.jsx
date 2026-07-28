import { Link } from 'react-router-dom';
import { useState } from 'react';
import './NavBar.css';
import logo from '../assets/logo-dark-transparent.png'

export default function Navbar() {

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">
        <img src={logo} alt="RetroGame logo" className='logo-img'/>
      </Link>

      <button 
        className="hamburger" 
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>
      
      <div className={`nav-links ${menuOpen ? "active" : ""}`}>
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/about" className="nav-link">About</Link>
        <Link to="/cervice" className="nav-link">Service</Link>
        <Link to="/contact" className="nav-link">Contact</Link>
        <Link to="/login" className="login-btn">Login</Link>
      </div>

    </nav>
  );
}