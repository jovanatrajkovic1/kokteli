import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Azuriraj({ kokteli, setKokteli }) {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    // ... Slično za ostale atribute koktela ...

    useEffect(() => {
        const cocktail = kokteli.find(k => k.id === parseInt(id));
        if (cocktail) {
            setName(cocktail.name);
            setDescription(cocktail.description);
            // ... Slično za ostale atribute koktela ...
        }
    }, [id, kokteli]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const token = sessionStorage.getItem('auth_token'); 
            const response = await axios.put(`http://127.0.0.1:8000/api/cocktails/${id}`, {
                name,
                description,
                // ... Slično za ostale atribute koktela ...
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const updatedCocktail = response.data; // Pretpostavljajući da server vraća ažurirani koktel kao odgovor
            setKokteli(prevKokteli => prevKokteli.map(k => k.id === updatedCocktail.id ? updatedCocktail : k));
        } catch (error) {
            console.error('Došlo je do greške prilikom ažuriranja koktela', error);
        }
    };

    return (
        <div className="azuriraj-container">
            <h1>Ažuriraj Koktel</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Ime koktela"
                />
                <textarea 
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder="Opis koktela"
                />
                {/* ... Ostali input polja ... */}
                <button type="submit">Ažuriraj</button>
            </form>
        </div>
    );
}

export default Azuriraj;
