import React from 'react'; 

function KoktelKartica({ cocktail }) {
    return (
        <div className="koktel-kartica">
              <img src="https://www.thecocktaildb.com/images/media/drink/vrwquq1478252802.jpg/preview" alt={cocktail.name} className="koktel-image" />
            <h2 className="koktel-title">{cocktail.name}</h2>
            <p className="koktel-description">{cocktail.description}</p>
            
            <h3>Sastojci:</h3>
            <ul className="ingredients-list">
                {cocktail.ingredients.map(ingredient => (
                    <li key={ingredient.id}>{ingredient.name}</li>
                ))}
            </ul>
            
            <h3>Recenzije:</h3>
            <ul className="reviews-list">
                {cocktail.reviews.map(review => (
                    <li key={review.user_id}>
                        <strong>Ocena: {review.rating}</strong>
                        <p>{review.content}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default KoktelKartica;
