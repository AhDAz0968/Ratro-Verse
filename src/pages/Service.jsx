import './Service.css';
import gameBoyCartridge from '../assets/gameBoyCartridge.png'
import topRatedGame from '../assets/topRatedGame.png'
import mostPopularGames from '../assets/mostPopularGames.png'
import hiddenGems from '../assets/hiddenGems.png'

export default function Service(){
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

        </main>
    );
}