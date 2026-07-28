import './Home.css';
import crtTV from '../assets/CRT-TV.jpg'
import marioCover from '../assets/mario-cover.jpg'
import smartRec from '../assets/smart.png'
import shakeHands from '../assets/shaking-hands.png'
import retroController from '../assets/retro-controller.png'

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
                    <p className='featuedGameTitle'>Contra Action</p>
                    <h5 className='featureGameRating'>⭐ 4.8</h5>
                    <button className='viewFeaturedGameBtn'> (View) </button>
                  </div>
                </div>
                <div className="feature-item">
                  <img src={marioCover} alt="super mario cover" className='marioCoverImg'/>
                  <div className="featureDesc">
                    <p className='featuedGameTitle'>Metal Slug</p>
                    <h5 className='featureGameRating'>⭐ 5.0</h5>
                    <button className='viewFeaturedGameBtn'> (View) </button>
                  </div>
                </div>
                <div className="feature-item">
                  <img src={marioCover} alt="super mario cover" className='marioCoverImg'/>
                  <div className="featureDesc">
                    <p className='featuedGameTitle'>Pac-Man Arcade</p>
                    <h5 className='featureGameRating'>⭐ ⭐ 4.7</h5>
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

      <div className="game-catagories">
          <div className="homePage-item-title">
            <h3>GAME CATEGORIES</h3>
          </div>
          <div className="homePage-item-border-row category-grid">
            <div className='catagoryItem'>
              <h4>Arcade</h4>
            </div>
            <div className='catagoryItem'>
              <h4>Platformer</h4>
            </div>
            <div className='catagoryItem'>
              <h4>Fighting</h4>
            </div>
            <div className='catagoryItem'>
              <h4>RPG</h4>
            </div>
            <div className='catagoryItem'>
              <h4>Adventure</h4>
            </div>
            <div className='catagoryItem'>
              <h4>Run & Gun</h4>
            </div>
          </div>
      </div>

      <div className="top-recommendations">
          <div className="homePage-item-title">
            <h3>TOP RECOMMENDATIONS</h3>
          </div>
          <div className="homePage-item-border-col">
            <h4 className='topRecomHeader'>Based on community ratings and popularity</h4>

            <div className="topRecommendGames">
              <div className="recommendItem">
                <h4>#1 Chrono Trigger</h4>
                <p>RPG • SNES • 1995</p>
                <p>A legendary role-playing game known for its story and multiple endings.</p>

                <button className='readMoreBtn'>[ Read More ]</button>
              </div>
              <div className="recommendItem">
                <h4>#2 Castlevania: Symphony of the Night</h4>
                <p>Action RPG • PlayStation • 1997</p>
                <p>Famous for exploration, combat, and gothic atmosphere</p>

                <button className='readMoreBtn'>[ Read More ]</button>
              </div>
              <div className="recommendItem">
                <h4>#3 Metal Slug</h4>
                <p>Run & Gun • Arcade • 1996</p>
                <p>One of the most iconic arcade shooters of all time.</p>

                <button className='readMoreBtn'>[ Read More ]</button>
              </div>
            </div>
          </div>
      </div>

      <div className="why-us">
        <div className="why-us-title">
          <h3>TOP RECOMMENDATIONS</h3>
        </div>
        <div className="us-items">
          <div className="us-item">
            <img src={retroController} alt="huge library logo" className='whyUsImg'/>
            <h4>Huge Game Library</h4>
            <p>Explore hundreds of retro titles</p>
          </div>
          <div className="us-item">
            <img src={shakeHands} alt="shaking hands logo" className='whyUsImg'/>
            <h4>Trusted Reviews</h4>
            <p>Read community ratings and reviews</p>
          </div>
          <div className="us-item">
            <img src={smartRec} alt="huge library logo" className='whyUsImg'/>
            <h4>Smart Recommendations</h4>
            <p>Explore hundreds of retro titles</p>
          </div>
        </div>
        
      </div>

      <div className="join-community">
        <div className="homePage-item-title">
            <h3>JOIN THE COMMUNITY</h3>
          </div>
          <div className="homePage-item-border-col">
            <p className='communityP'>Create an account to save favorites, rate games, and receive recommendations.</p>

            <button className='registerBtn'>Register Now</button>
          </div>
      </div>

    </div>
  );
}