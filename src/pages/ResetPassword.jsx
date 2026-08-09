import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

export default function ResetPassword() {

  const [password, setPassword] = useState('');

  const navigate = useNavigate();


  async function handleUpdatePassword(e) {
    e.preventDefault();

    const { error } = await supabase.auth.updateUser({
        password
      });

    if (error) {
      alert(error.message);
      return;
    }

    alert('Password updated successfully');

    navigate('/login');
  }


  return (
    <div className='updatePassword-container'>

      <h2>NEW PASSWORD</h2>

      <form onSubmit={handleUpdatePassword}>

        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button type="submit">
          UPDATE PASSWORD
        </button>

      </form>

    </div>
  );
}