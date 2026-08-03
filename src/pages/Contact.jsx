import './Contact.css';
import purpleGameBoy from '../assets/purpleGameBoy.png'

export default function Contact(){
    return(
        <div className="contactPage-container">

      
            <section className="contactHero-container">

                <div className="contactItems"> 
                    <h2>CONTACT TERMINAL</h2>
                    <p>SEND A MESSAGE TO RETRO GAME HUB</p>
                </div>

                <img src={purpleGameBoy} alt="purple Game Boy" className='purpleGamboyImg'/>

            </section>

            
            <section className="contactForm-container">

                <div className="contactFormHeader">
                    <h2>SEND MESSAGE</h2>
                </div>
                
                <form className='contactForm'>
                <div className="form-group">
                    <label>NAME</label>
                    <input type="text" placeholder='RetroFan123'/>
                </div>

                <div className="form-group">
                    <label>EMAIL</label>
                    <input type="email" placeholder='retro@gamil.com'/>
                </div>

                <div className="form-group">
                    <label>TOPIC</label>
                    <input type="text" placeholder='bug'/>
                </div>

                <div className="form-group">
                    <label>MESSAGE</label>
                    <textarea rows="3" placeholder="Just kidding, there's no bug "></textarea>
                </div>

                <button type="submit" className='contactSubmitBtn'>
                    SEND MESSAGE
                </button>
                </form>

            </section>

    
            <section className="contactInfo-container">
                <div className="contactInfoHeader">
                    <h2>CONTACT INFORMATION</h2>
                </div>
                
                <div className="contactInfo-grid">

                    <div className="contactInfo-card">
                        <h4>📧 EMAIL</h4>
                        <p>retrogamehub@gmail.com</p>
                    </div>

                    <div className="contactInfo-card">
                        <h4>📱 PHONE</h4>
                        <p>+855 XX XXX XXX</p>
                    </div>

                    <div className="contactInfo-card">
                        <h4>📍 LOCATION</h4>
                        <p>Phnom Penh, Cambodia</p>
                    </div>

                </div>
            </section>

            <section className="socialLinks-container">
                <div className="socialLinksHeader">
                    <h2>SOCIAL LINKS</h2>
                </div>
                

                <div className="socialLinks-grid">

                <div className="social-card">
                    <h3>FACEBOOK</h3>
                </div>

                <div className="social-card">
                    <h3>INSTAGRAM</h3>
                </div>

                <div className="social-card">
                    <h3>DISCORD</h3>
                </div>

                <div className="social-card">
                    <h3>GITHUB</h3>
                </div>

                </div>
            </section>

            <section className="faq-container">
                <div className="fagHeader">
                    <h2>FAQ SECTION</h2>
                </div>
                

                <div className="faq-item">
                <h3>Q: How can I submit a game recommendation?</h3>
                <p>
                    A: Create an account and use the recommendation feature.
                </p>
                </div>

                <div className="faq-item">
                <h3>Q: Can I review games?</h3>
                <p>
                    A: Yes. Registered users can submit reviews.
                </p>
                </div>

                <div className="faq-item">
                <h3>Q: Can I save favorite games?</h3>
                <p>
                    A: Yes. Favorites are available after login.
                </p>
                </div>
            </section>

    </div>
    );
}