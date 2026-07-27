import './Home.css';
import crtTV from '../assets/CRT-TV.jpg'
import marioCover from '../assets/mario-cover.jpg'

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';


export default function Home() {

  const [games, setGames] = useState([]);

useEffect(() => {
  fetchGames();
}, []);

async function fetchGames() {
  const { data, error } = await supabase
    .from('games')
    .select('*');

  if (error) {
    console.error(error);
    return;
  }

  setGames(data);
}

  return (
    <div className="homePage-container">

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

      <div className="quick-stats">
        <div className="homePage-item-title">
          <h3>QUICK STATS</h3>
        </div>
        <div className="homePage-item-border-row">
          <div className="quick-stats-item">
            <h4 className='stat-title'>Total Games</h4>
            <h5 className='stat-number'>500+</h5>
          </div>
          <div className="quick-stats-item">
            <h4 className='stat-title'>Categories</h4>
            <h5 className='stat-number'>20+</h5>
          </div>
          <div className="quick-stats-item">
            <h4 className='stat-title'>Active Users</h4>
            <h5 className='stat-number'>1000+</h5>
          </div>
          <div className="quick-stats-item">
            <h4 className='stat-title'>Reviews</h4>
            <h5 className='stat-number'>5000+</h5>
          </div>
        </div>
      </div>

      <div className="search-games">
        <div className="homePage-item-title">
          <h3>SEARCH GAMES</h3>
        </div>
        <div className="homePage-item-border-col">
          <p>Search by game title, genre, platform...</p>
          <div className="search-place">
            <input type="text" className='searchBar'/>
            <button className="searchBtn">
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="featured-games">
        <div className="homePage-item-title">
          <h3>FEATURED RETRO GAMES</h3>
        </div>
        <div className="homePage-item-border-row">
          <div className="featuredGames-container">
            <div className="featuredGamesItems">
                <div className="feature-item">
                <img src={marioCover} alt="super mario cover" className='marioCoverImg'/>
                <div className="featureDesc">
                  <p className='featuedGameTitle'>Super Mario Bros Platformer</p>
                  <h5 className='featureGameRating'>⭐ 4.9</h5>
                  <button className='viewFeaturedGameBtn'> (View) </button>
                </div>
              </div>
              <div className="feature-item">
                <img src={marioCover} alt="super mario cover" className='marioCoverImg'/>
                <div className="featureDesc">
                  <p className='featuedGameTitle'>Super Mario Bros Platformer</p>
                  <h5 className='featureGameRating'>⭐ 4.9</h5>
                  <button className='viewFeaturedGameBtn'> (View) </button>
                </div>
              </div>
              <div className="feature-item">
                <img src={marioCover} alt="super mario cover" className='marioCoverImg'/>
                <div className="featureDesc">
                  <p className='featuedGameTitle'>Super Mario Bros Platformer</p>
                  <h5 className='featureGameRating'>⭐ 4.9</h5>
                  <button className='viewFeaturedGameBtn'> (View) </button>
                </div>
              </div>
              <div className="feature-item">
                <img src={marioCover} alt="super mario cover" className='marioCoverImg'/>
                <div className="featureDesc">
                  <p className='featuedGameTitle'>Super Mario Bros Platformer</p>
                  <h5 className='featureGameRating'>⭐ 4.9</h5>
                  <button className='viewFeaturedGameBtn'> (View) </button>
                </div>
              </div>
            </div>

            <div className="showMoreFeaturedBtn">
              <button>[Show More]</button>
            </div>
          </div>
            

            

          </div>
          
        </div>
      </div>
    

    

  );
}