import './Footer.css'

import { useLocation } from 'react-router-dom';

export default function Footer(){
    //change theme
  const location = useLocation();
  
    const themes = {
    "/": "retro",
    "/about": "gameBoy",
    "/games": "GrayGameBoy",
    "/service": "bridgePlatform",
    "/contact": "midNightDarkPurple",
    "/login": "midNightDarkBlue",
    "/register": "midNightDarkBlue",
  };

  const theme = themes[location.pathname] || "retro";

    return(
        <footer className={`footer-container ${theme}`}>
            <div className="footerItems">
                <h5>RetroVerse</h5>
                <p>Discover the best classic games from the past.</p>
                <p>Home | About | Services | Contact</p>
                <p>Facebook | Instagram | Discord | TikTok</p>
                <h5> © 2026 RetroVerse</h5>
            </div>
        </footer>
    ); 
}
