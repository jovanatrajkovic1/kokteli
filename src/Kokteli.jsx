import React, { useState } from 'react';
import KoktelKartica from './KoktelKartica';

function Kokteli({ kokteli }) {
    const [searchTerm, setSearchTerm] = useState(''); // Držimo trenutni tekst pretrage u state-u

    // Filtriramo koktele na osnovu unosa korisnika
    const filteredKokteli = kokteli.filter(koktel => 
        koktel.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
            {filteredKokteli.map(koktel => (
                <KoktelKartica key={koktel.id} cocktail={koktel} />
            ))}
        </div>
    );
}

export default Kokteli;
