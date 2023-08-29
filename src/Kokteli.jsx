import React, { useEffect, useState } from 'react';
import KoktelKartica from './KoktelKartica';
import axios from 'axios';

function Kokteli({ kokteli }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortByRating, setSortByRating] = useState(false);  

    const filteredKokteli = kokteli.filter(koktel => 
        koktel.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Računamo prosečnu ocenu za svaki koktel
    const averageRating = (reviews) => {
        const total = reviews.reduce((acc, review) => acc + review.rating, 0);
        return reviews.length ? total / reviews.length : 0;
    };

    const sortedKokteli = sortByRating 
        ? [...filteredKokteli].sort((a, b) => averageRating(b.reviews) - averageRating(a.reviews))
        : filteredKokteli;

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
        <>
        <div className="controls-container">
        <input
            type="text"
            placeholder="Pretraži koktele..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
        />
       
        <button onClick={() => setSortByRating(prev => !prev)}>
            Sortiraj po oceni
        </button>
    </div>
        <div className="kokteli-container">
            

            {sortedKokteli.map((koktel, i) => (
                <KoktelKartica key={koktel.id} cocktail={koktel} image={images[i]} />
            ))}
        </div> </>
    );
}

export default Kokteli;
