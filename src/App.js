import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Pocetna from './Pocetna';
import Kokteli from './Kokteli';
import Login from './Login';
import Register from './Register';
const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/', 
  
});
function App() {
  const [cocktails, setCocktails] = useState([]);

  useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await axiosInstance.get('/api/cocktails');
              setCocktails(response.data.data);
          } catch (error) {
              console.error('Došlo je do greške prilikom preuzimanja podataka', error);
          }
      };

      fetchData();
  }, []);
  console.log(cocktails)
  return (
    <div className="App">
       <Pocetna></Pocetna>
       <Kokteli kokteli={cocktails}></Kokteli>
       <Login></Login>
       <Register></Register>

    </div>
  );
}

export default App;
