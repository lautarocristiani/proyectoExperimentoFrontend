import './App.css';
import './styles/navbar.css';
import PrecioDolarOficial from './components/PrecioDolarOficial';
import Usuarios from './components/Usuarios';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Grafico from './components/Grafico';

function App() {
  return (
    <div>
      <Router>
          <nav className="navbar">
            <ul className="nav-list">
              <li className="nav-item">
                <Link to="/precioDolar" className="nav-link">Precio dolar oficial</Link>
              </li>
              <li className="nav-item">
                <Link to="/Usuarios" className="nav-link">Administrar usuarios</Link>
              </li>
              <li className="nav-item">
                <Link to="/grafico" className="nav-link">Grafico</Link>
              </li>
            </ul>
          </nav>
        <Routes>
          <Route path="/precioDolar" element={<PrecioDolarOficial />} />
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="/grafico" element={<Grafico symbol="BTCUSD" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
