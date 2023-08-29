import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function Azuriraj({ kokteli, setKokteli ,refresh}) {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    let navigate = useNavigate();

    useEffect(() => {
        const cocktail = kokteli.find(k => k.id === parseInt(id));
        if (cocktail) {
            setName(cocktail.name);
            setDescription(cocktail.description);
           
        }
    }, [id, kokteli]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const token = sessionStorage.getItem('auth_token'); 
            const response = await axios.put(`http://127.0.0.1:8000/api/cocktails/${id}`, {
                name,
                description,
            
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log(response.data.data)
            const updatedCocktail = response.data.data
            setKokteli(prevKokteli => prevKokteli.map(k => k.id === updatedCocktail.id ? updatedCocktail : k));
            navigate('/admin')
        } catch (error) {
            console.error('Došlo je do greške prilikom ažuriranja koktela', error);
        }
    };

    return (
        <div className="dodaj-container">
            <h1>Ažuriraj Koktel</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Ime koktela"
                />
                <br /><br />
                <textarea 
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder="Opis koktela"
                />
                 <br /><br />
                <button type="submit">Ažuriraj</button>
            </form>
        </div>
    );
}

export default Azuriraj;
