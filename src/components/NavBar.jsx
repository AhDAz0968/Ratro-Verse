import { Link } from 'react-router-dom';
import './NavBar.css';
import logo from '../assets/logo-dark-transparent.png'

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">
        <img src={logo} alt="RetroGame logo" className='logo-img'/>
      </Link>
      
      <div className="nav-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/about" className="nav-link">About</Link>
        <Link to="/cervice" className="nav-link">Cervice</Link>
        <Link to="/contact" className="nav-link">Contact</Link>
        <Link to="/login" className="login-btn">Login</Link>

      </div>
    </nav>
  );
}