import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Asegúrate de instalar e importar los íconos de Bootstrap
import '../styles/navbar.css';

const Navbar = ({ user, handleLogout }) => {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/precioDolar" className="nav-link">Precio dólar oficial</Link>
        </li>
        <li className="nav-item">
          <Link to="/usuarios" className="nav-link">Administrar usuarios</Link>
        </li>
        <li className="nav-item">
          <Link to="/grafico" className="nav-link">Gráfico</Link>
        </li>
        <li className="nav-item user-info">
          <span className="nav-link">{user.nombre} {user.apellido}</span>
        </li>
        <li className="nav-item">
          <button onClick={handleLogout} className="nav-link logout-button">
            <i className="bi bi-box-arrow-right"></i>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;