import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase'
import { Link } from 'react-router-dom';
import '../styles/Login.css';

export default function Login() {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
   
  //login funtion
  async function handleLogin(e) {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email, 
      password
    });

    if(error){
      alert(error.message);
      return;
    }

    alert('Login successful');

    navigate('/');
  }


  return (
     <div className="loginPage-container">

      <section className="auth-container">
        
        <div className="authHeader">
          <h1>PLAYER AUTHENTICATION</h1>
        </div>
        
        <div className="loginPart">

            <div className="auth-tabs">
              
                <button className="auth-btn" onClick={() => navigate('/login')}>LOGIN</button>
            
                <button className="auth-btn" onClick={() => navigate('/register')}>REGISTER</button>
              
            </div>

           
            <form className="login-form" onSubmit={handleLogin}>

              <div className="login-group">
                <label>EMAIL</label>
                <input 
                  type="email" 
                  className='login-inputBtn'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="login-group">
                <label>PASSWORD</label>
                <input 
                  type="password" 
                  className='login-inputBtn'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button type="submit" className='loginSubmit-btn'>
                LOGIN
              </button>

              <Link to="/login" className="forgetPassword" >
                Forgot Password?
              </Link>

            </form>
        </div>
      </section>

    </div>
  );
}