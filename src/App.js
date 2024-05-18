import React, { useState, useEffect } from 'react';
import './App.css';
import './styles/navbar.css';
import PrecioDolarOficial from './components/PrecioDolarOficial';
import Usuarios from './components/Usuarios';
import Grafico from './components/Grafico';
import Login from './components/Login';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';

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
            <nav className="navbar">
              <ul className="nav-list">
                <li className="nav-item">
                  <Link to="/precioDolar" className="nav-link">Precio dolar oficial</Link>
                </li>
                <li className="nav-item">
                  <Link to="/usuarios" className="nav-link">Administrar usuarios</Link>
                </li>
                <li className="nav-item">
                  <Link to="/grafico" className="nav-link">Grafico</Link>
                </li>
                <li className="nav-item user-info">
                  <span className="nav-link">{user.nombre} {user.apellido}</span>
                </li>
                <li className="nav-item">
                  <button onClick={handleLogout} className="nav-link logout-button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
                      <path fillRule="evenodd" d="M10 2a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-3a1 1 0 0 1-1-1V9.5H9v-3h1V2zm-2.5 4.5a.5.5 0 0 0-.5.5v1h-3V8h-1v4h1v-.5h3v1a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5V12h-2v1H3V9h7v1.5a.5.5 0 0 0 .5-.5H7v-2H3v1H2V8.5h4V8a.5.5 0 0 0 .5-.5h1a.5.5 0 0 0 .5-.5H3.5a.5.5 0 0 0-.5.5v4.5H1V4h2V3h6V2H3V1h6V0h-2V1H2V2H1v12H0V1.5a.5.5 0 0 0-.5.5H0v10a.5.5 0 0 0 .5.5H2v.5H1.5V16h4.5a.5.5 0 0 0 .5-.5h4.5a.5.5 0 0 0 .5-.5H11v1H4v1.5H3V15h7v-1h-2V9h3v-1h2V5h-4v-.5H4V2h3v1H1V0H2v1h6v1h2v1h3v5H11zM4 4H3v2h1V4zm4 0H7v2h1V4zm4 0h-1v2h1V4zM4 8H3v2h1V8zm4 0H7v2h1V8zm4 0h-1v2h1V8z" />
                    </svg>
                  </button>
                </li>
              </ul>
            </nav>
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