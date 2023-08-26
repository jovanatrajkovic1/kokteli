import React, { useEffect, useState } from 'react';
import KoktelKartica from './KoktelKartica';
import axios from 'axios';

function Kokteli({ kokteli }) {
    const [searchTerm, setSearchTerm] = useState(''); // Držimo trenutni tekst pretrage u state-u

    // Filtriramo koktele na osnovu unosa korisnika
    const filteredKokteli = kokteli.filter(koktel => 
        koktel.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const [images, setImages] = useState([]);

    useEffect(() => {
        async function fetchRandomCocktailImages() {
            const numberOfImages = 5;
            const fetchedImages = [];

            for (let i = 0; i < numberOfImages; i++) {
                const response = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/random.php');
                fetchedImages.push(response.data.drinks[0].strDrinkThumb);
            }

            setImages(fetchedImages);
        }

        fetchRandomCocktailImages();
    }, []);
    return (
        <div className="kokteli-container">
            {/* Input polje za pretragu */}
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Pretraži koktele..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Prikazujemo filtrirane koktele */}
            {filteredKokteli.map((koktel,i) => (
                <KoktelKartica key={koktel.id} cocktail={koktel} image={images[i]} />
            ))}
        </div>
    );
}

export default Kokteli;
