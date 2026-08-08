import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from '../lib/supabase'
import './Register.css';

export default function Register() {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();

  //register function
  async function handleRegister(e){
    e.preventDefault();

    if(password !== confirmPassword){
      console.log('password do not match');
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password
    });

    if(error){
      alert(error.message);
      return;
    }

    await supabase
      .from('profiles')
      .insert([
        {
          id: data.user.id,
          username
        }
      ]);

    alert('Account created successfully');

    navigate('/login')  
  }

  return (
    <div className="registerPage-container">
      <form onSubmit={handleRegister} className="register-form">

        <div className="form-group">
          <label>USERNAME</label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)}
            className='register-inputBtn'  
          />
        </div>

        <div className="register-group">
          <label>EMAIL</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className='register-inputBtn'/>
        </div>

        <div className="register-group">
          <label>PASSWORD</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className='register-inputBtn'/>
        </div>

        <div className="register-group">
          <label>CONFIRM PASSWORD</label>
          <input 
            type="password" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            className='register-inputBtn'
           />
        </div>

        <button type="submit">
          CREATE ACCOUNT
        </button>
        <Link to="/login">
          Already have an account? Try Login
        </Link>
      </form>
    </div>
    
  );
}