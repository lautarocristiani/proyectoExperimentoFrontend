import React, { useState, useEffect } from 'react';
import './App.css';
import PrecioDolarOficial from './components/PrecioDolarOficial';
import Usuarios from './components/Usuarios';
import Grafico from './components/Grafico';
import Login from './components/Login';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState({ nombre: '', apellido: '' });

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
  }, []);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }, [token, user]);

  const handleLogout = () => {
    if (window.confirm("¿Estás seguro de cerrar sesión?")) {
      setToken(null);
      setUser({ nombre: '', apellido: '' });
    }
  };

  return (
    <div className='App'>
      <Router>
        {token ? (
          <>
            <Navbar user={user} handleLogout={handleLogout} />
            <Routes>
              <Route path="/precioDolar" element={<PrecioDolarOficial />} />
              <Route path="/usuarios" element={<Usuarios />} />
              <Route path="/grafico" element={<Grafico symbol="BTCUSD" />} />
              <Route path="*" element={<Navigate to="/precioDolar" />} />
            </Routes>
          </>
        ) : (
          <Routes>
            <Route path="/login" element={<Login setToken={setToken} setUser={setUser} />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        )}
      </Router>
    </div>
  );
}

export default App;