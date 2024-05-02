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
          <nav class="navbar">
            <ul class="nav-list">
              <li class="nav-item">
                <Link to="/precioDolar" class="nav-link">Precio dolar oficial</Link>
              </li>
              <li class="nav-item">
                <Link to="/Usuarios" class="nav-link">Administrar usuarios</Link>
              </li>
              <li class="nav-item">
                <Link to="/Usuarios" class="nav-link">Administrar usuarios</Link>
              </li>
            </ul>
          </nav>
        <Routes>
          <Route path="/precioDolar" element={<PrecioDolarOficial />} />
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="/grafico" element={<Grafico />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
