import React from 'react';
import KoktelKartica from './KoktelKartica';

function Kokteli({ kokteli }) {
    return (
        <div className="kokteli-container">
            {kokteli.map(koktel => (
                <KoktelKartica key={koktel.id} cocktail={koktel} />
            ))}
        </div>
    );
}

export default Kokteli;
