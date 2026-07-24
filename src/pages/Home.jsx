import './Home.css';
import crtTV from '../assets/CRT-TV.jpg'


export default function Home() {
  return (
    <div className="heroHeader-container">

      <div className="heroHeader">
        <h3>█████ RETRO GAME HUB █████</h3>
        <p>Discover Classic Games From The Golden Era Of Gaming</p>
      </div>
      <div className="headerDescription-container">
        
        <div className="headerDiscription">
           <p>Browse legendary titles, explore hidden gems, and find your next retro adventure.</p>

          <button className='headerDesc-btn'>Explore Games</button>
          <button className='headerDesc-btn'>Join Community</button>
        </div>

        <img src={crtTV} alt="CRT TV" className='desc-img'/>

      </div>
    </div>
  );
}