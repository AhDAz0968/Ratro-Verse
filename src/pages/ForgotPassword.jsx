import { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function ForgotPassword(){
    
    const [email, setEmail] = useState('');

    //reset password function
    async function handleResetPassword(e){
        e.preventDefault();

        const {error} = await supabase.auth.resetPasswordForEmail(email,
            {
                redirectTo: 'http://localhost:5173/reset-password'
            }
        );

        if (error) {
            alert(error.message);
            return;
        }

        alert('Password reset email sent!');
    }


    return(
        <div className="forgotPassword-container">

            <h2>RESET PASSWORD</h2>

            <form onSubmit={handleResetPassword}>

                <div className="forgot-group">
                <label>EMAIL</label>

                <input
                    type="email"
                    value={email}
                    onChange={(e) =>
                    setEmail(e.target.value)
                    }
                />
                </div>

                <button type="submit">
                SEND RESET LINK
                </button>

            </form>

        </div>
    );
}