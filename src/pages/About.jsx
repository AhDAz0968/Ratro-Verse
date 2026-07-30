import './About.css';
import gameBoyHandheld from '../assets/gameBoyHandheld.jpg'
import gamingHistory from '../assets/gamingHistory.png'
import discoverGames from '../assets/discoverGames.png'
import gamingCommunity from '../assets/gamingCommunity.png'


function About() {
  return (
    <main className="AboutPage-container">
      
      <div className="aboutUs-container">
        <h3>About us</h3>
        <p>Discovering the Golden Age of Gaming</p>
      </div>

      <div className="whoWeAre-container">
        <img src={gameBoyHandheld} alt="Game Boy Pic" className='whoWeAre-img'/>
        <div className="whoWeAre">
          <h3>WHO WE ARE</h3>
          <p>
            ------------------ <br />
            Retro Game Hub is a platform <br />                 
            dedicated to helping players <br />  
            discover and explore classic <br />
            retro video games from past <br />                  
            generations. <br />

            We provide game information, <br />                   
            recommendations, and community <br />                
            reviews in one place. <br />
          </p>
        </div>
      </div>

      <div className="ourMission-container">

        <div className="ourMission">
          <h3>OUR MISSION</h3>
        </div>

        <div className="ourMissionItems">
          <div className="border-01">
            <div className="ourMissionItem">
              <img src={gamingHistory} alt="gaming history" className='ourMissionIcon'/>
              <p>Preserve Gaming History</p>
            </div>
          </div>
          <div className="border-01">
            <div className="ourMissionItem">
              <img src={discoverGames} alt="Discover Games" className='ourMissionIcon'/>
              <p>Help Players Discover Classic Games</p>
            </div>
          </div>
          <div className="border-01">
            <div className="ourMissionItem">
              <img src={gamingCommunity} alt="gaming history" className='ourMissionIcon'/>
              <p>Build a Retro Community</p>
            </div>
          </div>
          
          

        </div>
        
      </div>

    </main>
  );
}

export default About;