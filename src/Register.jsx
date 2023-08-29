import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/register', {
                name: name,
                email: email,
                password: password
            });

            if (response.status === 200 || response.status === 201) {
                // Pretpostavljam da server vraća status 200 ili 201 za uspešnu registraciju.
                navigate('/login');
            } else {
                console.error('Došlo je do greške prilikom registracije');
            }
        } catch (error) {
            console.error('Došlo je do greške prilikom registracije', error);
        }
    };

    return (
        <div className="registration-container">
            <div className="registration-header">
                <h1>Registracija</h1>
                <p>Dobrodošli u koktel svet! Kreirajte svoj nalog.</p>
            </div>
            <form onSubmit={handleSubmit} className="registration-form">
                <input
                    type="text"
                    placeholder="Ime"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
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
                <button type="submit">Registruj se</button>
            </form>
        </div>
    );
}

export default Register;
