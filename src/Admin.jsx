import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Admin({ kokteli ,setKokteli}) {
    const handleDelete = async (id) => {
        try {
            const token = sessionStorage.getItem('auth_token'); 
            await axios.delete(`http://127.0.0.1:8000/api/cocktails/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            
            const updatedKokteli = kokteli.filter(koktel => koktel.id !== id);
            setKokteli(updatedKokteli);

        } catch (error) {
            console.error('Došlo je do greške prilikom brisanja koktela', error);
        }
    };
    const navigate = useNavigate();
    return (
        <div className="admin-container">
            <h1>Admin Panel: Pregled koktela</h1>
            <button onClick={() => navigate('/dodaj')}>Dodaj koktel</button>
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
                    {kokteli && kokteli.map(koktel => (
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
                                <button onClick={() => navigate(`/azuriraj/${koktel.id}`)}>Ažuriraj koktel</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Admin;
