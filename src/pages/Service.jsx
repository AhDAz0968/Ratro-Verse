import './Service.css';
import gameBoyCartridge from '../assets/gameBoyCartridge.png'
import topRatedGame from '../assets/topRatedGame.png'
import mostPopularGames from '../assets/mostPopularGames.png'
import hiddenGems from '../assets/hiddenGems.png'

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export default function Service(){

    const [platforms, setPlatforms] = useState([]);
    const [topGames, setTopGames] = useState([]);

    useEffect(() => {
        fetchPlatforms();
        fetchTopGames();
    }, []);

    async function fetchPlatforms(){
        const { data, error } = await supabase
        .from('games')
        .select('platform');

        if (error){
            console.log(error);
            return;
        }

        const uniquePlatforms = [
            ...new Set(data.map(game => game.platform))
        ];

        setPlatforms(uniquePlatforms);
    }

    async function fetchTopGames(){
        const { data, error } = await supabase
        .from('games')
        .select('*')
        .order('rating', {ascending: false})
        .limit(3);

        if (error){
            console.log(error);
            return;
        }

        setTopGames(data);     
    }

    return(
        <main className='servicePage-container'>

            <div className="userMenual-container">
                <div className="userMenualItems">
                    <img src={gameBoyCartridge} alt="gameBoy Cartridge" className='cartridgeImg'/>
                    <div className="userMenualDesc">
                        <h3>GAME BOY USER MANUAL</h3>
                        <p>HOW RETRO GAME HUB WORKS</p>
                    </div>
                </div>
            </div>

            <div className="contentTitle-container">
                <div className="headerTitle">
                    <h3>PLAYER JOURNEY</h3>
                </div>
                <div className="playerjourneyItems">
                    <div className="playerjourneyItem">
                        <p>Start</p>
                        <p className='userStep'>1.CREATE ACCOUNT</p>
                        <p className='userStep'>2.EXPLORE RETRO GAMES</p>
                        <p className='userStep'>3.DISCOVER NEW TITLES</p>
                        <p className='userStep'>4.SAVE TO FAVORITES</p>
                        <p>Stop</p>
                    </div>
                </div>
                
            </div>


            <div className='recommendationSystem-Container'>
                <div className='headerTitle'>
                    <h3>RECOMMENDATION SYSTEM</h3>
                </div>

                <div className='recommendationSystemItems'>
                    <div className='recommendationSystemItem'>
                        <h4>TOP RATED GAMES</h4>
                        <img src={topRatedGame} alt="Top Rated Games" className='recomSys-img'/>
                        <p>Highest Ratings</p>
                    </div>
                    <div className='recommendationSystemItem'>
                        <h4>MOST POPULAR</h4>
                        <img src={mostPopularGames} alt="Top Rated Games" className='recomSys-img'/>
                        <p>Community Picks</p>
                    </div>
                    <div className='recommendationSystemItem'>
                        <h4>HIDDEN GEMS</h4>
                        <img src={hiddenGems} alt="Top Rated Games" className='recomSys-img'/>
                        <p>Lesser Known Great Games </p>
                    </div>
                </div>
            </div>

            <div className='retroPlatform-container'>
                <div className='headerTitle'>
                    <h3>RETRO PLATFORMS</h3>
                </div>

                <div className='platformItems'>

                    {platforms.map((platform) => (
                        <div
                            className="platformItem"
                            key={platform}
                        >
                            <h4>{platform}</h4>
                        </div>
                    ))}
                    
                </div>
            </div>

            <div className='playerReviews-container'>
                <div className='headerTitle'>
                    <h3>PLAYER FEEDBACK SYSTEM</h3>
                </div>

                <div className='reviewsItems'>
                    <div className='reviewItem'>
                    <h4>USER_001</h4>
                    <p className='reviewStars'>⭐⭐⭐⭐⭐</p>
                    <p className='reviewDesc'>"Chrono Trigger is a masterpiece"</p>
                    </div>

                    <div className='reviewItem'>
                    <h4>USER_002</h4>
                    <p className='reviewStars'>⭐⭐⭐⭐</p>
                    <p className='reviewDesc'>"Metal Slug remains incredibly fun even today."</p>
                    </div>

                    <div className='reviewItem'>
                    <h4>USER_003</h4>
                    <p className='reviewStars'>⭐⭐⭐⭐⭐</p>
                    <p className='reviewDesc'>"Best place to discover old classics."</p>
                    </div>
                </div>
            </div>

            <div className='searchEngine-container'>
                <div className='headerTitle'>
                    <h3>SEARCH ENGINE</h3>
                </div>

                <div className='searchEngineItems'>
                    <ul className='searchLists'>
                        <li>Title</li>
                        <li>Genre</li>
                        <li>Platform</li>
                        <li>Rating</li>
                    </ul>
                </div>
            </div>

        </main>
    );
}