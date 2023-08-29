import React from 'react';
import { Link } from 'react-router-dom';
 

function Navbar({ token }) {
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
        <Link className="navbar-item" to="/logout">Logout</Link>
      )}
    </nav>
  );
}

export default Navbar;
