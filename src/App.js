import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Pocetna from './Pocetna';
import Kokteli from './Kokteli';
import Login from './Login';
import Register from './Register';
import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import Admin from './Admin';
import Azuriraj from './Azuriraj';
const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/', 
  
});
function App() {
  const [cocktails, setCocktails] = useState([]);
  const [token, setToken] = useState(null);

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
    <Router>
      <Navbar token={token} setToken={setToken}></Navbar>
      <div className="App">
        <Routes>
          <Route   path="/" element={<Pocetna/>} />
          <Route path="/admin"     element={ <Admin kokteli={cocktails} setKokteli={setCocktails} />}> </Route>

          <Route path="/kokteli"     element={ <Kokteli kokteli={cocktails} />}> </Route>
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/register" element={<Register/>} />
          <Route path="/azuriraj/:id" element={<Azuriraj kokteli={cocktails} setKokteli={setCocktails} />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
