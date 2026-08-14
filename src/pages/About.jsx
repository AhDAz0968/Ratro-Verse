import '../styles/About.css';
import { useNavigate } from 'react-router-dom';

import gameBoyHandheld from '../assets/gameBoyHandheld.gif'
import gamingHistory from '../assets/gamingHistory.png'
import discoverGames from '../assets/discoverGames.png'
import gamingCommunity from '../assets/gamingCommunity.png'
import gameDatabase from '../assets/gameDatabase.png'
import gameReviews from '../assets/gameReviews.png'
import gamingCommunityReview from '../assets/gamingCommunityReview.png'
import ninjaWarrior from '../assets/ninja-warrior.png'


function About() {

  const navigate = useNavigate();

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

      <div className="projectObj-container">

            <div className="projectObj">
              <h3>PROJECT OBJECTIVES</h3>
            </div>

            <ol className='projectObjLists'>
              <li>Create a web platform for retro game information.</li>
              <li>Recommend classic games to users.</li>
              <li>Implement secure user authentication.</li>
              <li>Provide an admin dashboard for content management.</li>
              <li>Manage game records using CRUD operations.</li>
            </ol>

      </div>

      <div className="whatWeOffer-container">

        <div className="whatWeOffer">
          <h3>WHAT WE OFFER</h3>
        </div>

        <div className="whatWeOfferItems">
          <div className="border-01">
            <div className="whatWeOfferItem">
              <img src={gameDatabase} alt="gaming history" className='whatWeOfferIcon'/>
              <h4>Game Database</h4>
              <p>Browse retro games</p>
            </div>
          </div>
          <div className="border-01">
            <div className="whatWeOfferItem">
              <img src={gameReviews} alt="Discover Games" className='whatWeOfferIcon'/>
              <h4>Recommendations</h4>
              <p>Discover hidden gems</p>
            </div>
          </div>
          <div className="border-01">
            <div className="whatWeOfferItem">
              <img src={gamingCommunityReview} alt="gaming history" className='whatWeOfferIcon'/>
              <h4>Community Reviews</h4>
              <p>Read player opinions</p>
            </div>
          </div>
        </div>

      </div>

      <div className="platformFeature-container">

        <div className="platformFeature">
          <h3>PLATFORM FEATURES</h3>
        </div>
        <div className="outside-border">
          <div className="platformFeatureContent">

              <p>
                ✓ User Registration <br /> 
                                                                            
                ✓ Login & Authentication <br />      

                ✓ Game Search <br /> 

                ✓ Game Recommendations <br />

                ✓ Admin Dashboard <br />

                ✓ CRUD Management <br />

                ✓ Responsive Design <br />
              </p>

          </div>
        </div>
        
      </div>

      <div className="meetTheDev-container">

        <div className="DevInfoContainer">
            <div className="meetTheDev">
              <h3>MEET THE DEVELOPER</h3>
            </div>
            <div className="DeveloperInfo">
              <img src={ninjaWarrior} alt="me :)" className='myImg'/>
              <h4 className='myName'>Oa Kakada</h4>
              <p className='currentJob'>Student / Web Developer</p>
              <p>
                Developed using React.js and Supabase to create a modern platform for retro game enthusiasts.
              </p>
            </div>
        </div>
        
      </div>

      <div className="readyToExplore-container">
        <div className="outer-border">
          <div className="mid-border">

            <h4>READY TO EXPLORE RETRO GAMES?</h4>
            <p>Start your journey through gaming history today.</p>

            <button className='exploreBtn-02' onClick={() => navigate('/games')}>
              Explore Games 
            </button>

          </div>
        </div>
      </div>

    </main>
  );
}

export default About;