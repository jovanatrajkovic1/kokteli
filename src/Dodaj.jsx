import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Dodaj({setKokteli}) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const [allIngredients, setAllIngredients] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
         
        async function fetchIngredients() {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/ingredients');
                setAllIngredients(response.data);
            } catch (error) {
                console.error("Došlo je do greške prilikom učitavanja sastojaka.", error);
            }
        }
        fetchIngredients();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            const token = sessionStorage.getItem('auth_token');
    
            const response = await axios.post('http://127.0.0.1:8000/api/cocktails', {
                name,
                description,
                ingredients
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
    
          
            const newCocktail = response.data.data;
            setKokteli(prevKokteli => [...prevKokteli, newCocktail]);
    
            navigate('/admin');
    
        } catch (error) {
            console.error('Došlo je do greške prilikom dodavanja koktela', error);
        }
    };
    

    return (
        <div className="dodaj-container">
            <h1>Dodaj novi koktel</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Ime koktela"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Opis"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                ></textarea>
                <select  onChange={(e) => {
                    const selectedOptions = Array.from(e.target.selectedOptions).map(option => parseInt(option.value));
                    setIngredients(selectedOptions);
                }}>
                    {allIngredients.map(ingredient => (
                        <option key={ingredient.id} value={ingredient.id}>
                            {ingredient.name}
                        </option>
                    ))}
                </select>
                <button type="submit">Dodaj koktel</button>
            </form>
        </div>
    );
}

export default Dodaj;
