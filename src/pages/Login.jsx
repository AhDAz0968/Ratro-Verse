import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

export default function Login() {
  

  return (
     <div className="loginPage-container">

      <section className="auth-container">
        
        <div className="authHeader">
          <h1>PLAYER AUTHENTICATION</h1>
        </div>
        
        <div className="loginPart">

            <div className="auth-tabs">
              <button className='auth-btn'>LOGIN</button>
              <button className='auth-btn'>REGISTER</button>
            </div>

           
            <form className="login-form">

              <div className="login-group">
                <label>EMAIL</label>
                <input type="email" className='login-inputBtn'/>
              </div>

              <div className="login-group">
                <label>PASSWORD</label>
                <input type="password" className='login-inputBtn'/>
              </div>

              <button type="submit" className='loginSubmit-btn'>
                LOGIN
              </button>

              <p className='forgetPassword'>Forgot Password?</p>

            </form>
        </div>
      </section>

    </div>
  );
}