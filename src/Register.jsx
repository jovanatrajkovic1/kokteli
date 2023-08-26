import React, { useState } from 'react';
 

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Logika za registraciju korisnika...
        console.log("Registrovan:", { email, password, name });
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
