import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

function Login({setToken}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();  

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login', {
                email: email,
                password: password
            });

            if (response.status === 200) {
                sessionStorage.setItem("auth_token",response.data.token)
                setToken(response.data.token)
                navigate('/kokteli');  
            } else {
                console.error('Došlo je do greške prilikom prijave');
            }
        } catch (error) {
            console.error('Došlo je do greške prilikom prijave', error);
        }
    };

    return (
        <div className="login-container">
            <div className="login-header">
                <h1>Prijava</h1>
                <p>Dobrodošli u koktel svet! Molimo vas da se prijavite.</p>
            </div>
            <form onSubmit={handleSubmit} className="login-form">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Lozinka"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Prijavi se</button>
            </form>
        </div>
    );
}

export default Login;
