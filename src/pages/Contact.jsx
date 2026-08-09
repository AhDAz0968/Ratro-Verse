import '../styles/Contact.css';
import purpleGameBoy from '../assets/purpleGameBoy.png'

import { useState, useEffect, use } from 'react';
import { supabase } from '../lib/supabase';

export default function Contact(){
    const [contactInfo, setContactInfo] = useState(null);
    const [socialLinks, setSocialLinks] = useState([]);
    const [faqs, setFaqs] = useState([]);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [topic, setTopic] = useState('');
    const [message, setMessage] = useState('');


    //load data 
    useEffect(() => {
        fetchContactInfo();
        fetchSocialLinks();
        fetchFaqs();
    }, []);

    //fetch contact info
    async function fetchContactInfo() {
        const {data, error} = await supabase
            .from('contact_info')
            .select('*')
            .single();

        if(error){
            console.error(error);
            return;
        }

        setContactInfo(data);
    }

    //Fetch Social Links
    async function fetchSocialLinks(){
        const {data, error} = await supabase
        .from('social_links')
        .select('*');
        

        if(error){
            console.error(error);
            return;
        }

        setSocialLinks(data);
    }

    //Fetch FAQs
    async function fetchFaqs() {
        const { data, error } = await supabase
            .from('faq')
            .select('*');

        if (error) {
            console.error(error);
            return;
        }

        setFaqs(data);
    }

    //Contact Form Submission
    async function handleSubmit(e) {
        e.preventDefault();

        const { error } = await supabase
            .from('contact_messages')
            .insert([
                {
                    name, 
                    email, 
                    topic, 
                    message
                }
            ]);

            if (error) {
                console.error(error);
                alert('Failed to send message');
                return;
            }

            alert('Message sent successfully! ヾ(≧▽≦*)o');

            setName('');
            setEmail('');
            setTopic('');
            setMessage('');
    }

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
                
                <form className='contactForm' onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>NAME</label>
                    <input 
                        type="text" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder='RetroFan123'
                    />
                </div>

                <div className="form-group">
                    <label>EMAIL</label>
                    <input 
                        type="email"
                        value = {email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='retro@gamil.com'
                    />
                </div>

                <div className="form-group">
                    <label>TOPIC</label>
                    <input 
                        type="text" 
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        placeholder='Bug report'
                    />
                </div>

                <div className="form-group">
                    <label>MESSAGE</label>
                    <textarea 
                        rows="3" 
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder=" Write your message... "/>
                </div>

                <button type="submit" className='contactSubmitBtn'>
                    SEND MESSAGE
                </button>
                </form>

            </section>

            <div className="outerBorder02">
                <section className="contactInfo-container">
                    <div className="contactInfoHeader">
                        <h2>CONTACT INFORMATION</h2>
                    </div>
                    
                    <div className="contactInfo-grid">

                        <div className="contactInfo-card">
                            <h4>📧 EMAIL</h4>
                            <p>{contactInfo?.email}</p>
                        </div>

                        <div className="contactInfo-card">
                            <h4>📱 PHONE</h4>
                            <p>{contactInfo?.phone}</p>
                        </div>

                        <div className="contactInfo-card">
                            <h4>📍 LOCATION</h4>
                            <p>{contactInfo?.location}</p>
                        </div>

                    </div>
                </section>
            </div>
            
            <div className="outerBorder02">
                <section className="socialLinks-container">
                    <div className="socialLinksHeader">
                        <h2>SOCIAL LINKS</h2>
                    </div>
                    

                    <div className="socialLinks-grid">

                        {socialLinks.map((social) => (
                            <a  
                                key={social.id}
                                href={social.url}
                                target="_blank"
                                rel="noreferrer"
                                className="social-card"
                            >
                                <h3>{social.platform}</h3>
                            </a>
                        ))}

                    </div>

                </section>
            </div>
            
            <div className="outerBorder02">
                <section className="faq-container">
                    <div className="fagHeader">
                        <h2>FAQ SECTION</h2>
                    </div>
                    
                    {faqs.map((faq) => (
                        <div
                            className="faq-item"
                            key={faq.id}
                        >
                            <h3>Q: {faq.question}</h3>
                            <p>A: {faq.answer}</p>
                        </div>
                    ))}
                    
                </section>
            </div>
    
        </div>
    );
}