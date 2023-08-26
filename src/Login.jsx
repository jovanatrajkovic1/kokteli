import React, { useState } from 'react';
 
function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Logika za prijavljivanje korisnika...
        console.log("Prijavljen:", { email, password });
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
