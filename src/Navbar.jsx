import React from 'react';
import { Link,  useNavigate } from 'react-router-dom';
import axios from 'axios';

function Navbar({ token,setToken }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      
        const authToken = sessionStorage.getItem('auth_token');

      
        const config = {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        };

        
        await axios.post('http://127.0.0.1:8000/api/logout', {}, config);

        
        setToken(null);
        navigate('/login');

    } catch (error) {
        console.error('Došlo je do greške prilikom odjavljivanja', error);
    }
};


  return (
    <nav className="navbar">
      <Link className="navbar-item" to="/">Početna</Link>
      <Link className="navbar-item" to="/kokteli">Kokteli</Link>
      {!token ? (
        <>
          <Link className="navbar-item" to="/login">Login</Link>
          <Link className="navbar-item" to="/register">Register</Link>
        </>
      ) : (
        <button onClick={handleLogout} className="navbar-item">Logout</button>
      )}
    </nav>
  );
}

export default Navbar;
