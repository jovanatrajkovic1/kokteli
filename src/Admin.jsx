import axios from 'axios';
import React from 'react';

function Admin({ kokteli ,setKokteli}) {
    const handleDelete = async (id) => {
        try {
            const token = sessionStorage.getItem('auth_token'); // Preuzmite token iz session storage-a
            await axios.delete(`http://127.0.0.1:8000/api/cocktails/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            // Osvežavanje liste koktela tako da se ukloni obrisan koktel
            const updatedKokteli = kokteli.filter(koktel => koktel.id !== id);
            setKokteli(updatedKokteli);

        } catch (error) {
            console.error('Došlo je do greške prilikom brisanja koktela', error);
        }
    };
    return (
        <div className="admin-container">
            <h1>Admin Panel: Pregled koktela</h1>
            
            <table className="kokteli-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Ime</th>
                        <th>Opis</th>
                        <th>Sastojci</th>
                        <th>Opcije</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {kokteli.map(koktel => (
                        <tr key={koktel.id}>
                            <td>{koktel.id}</td>
                            <td>{koktel.name}</td>
                            <td>{koktel.description}</td>
                            <td>
                                <ul>
                                    {koktel.ingredients.map(ingredient => (
                                        <li key={ingredient.id}>{ingredient.name}</li>
                                    ))}
                                </ul>
                            </td>
                            <td>
                                <button onClick={() => handleDelete(koktel.id)}>Obriši koktel</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Admin;
