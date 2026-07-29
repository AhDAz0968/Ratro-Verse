import './About.css';
import gameBoyHandheld from '../assets/gameBoyHandheld.jpg'


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

    </main>
  );
}

export default About;