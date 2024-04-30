import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/precioDolarOficial.css';

const PrecioDolarOficial = () => {
    const [precioDolarOficial, setprecioDolarOficial] = useState(null);
    useEffect(() => {
        const obtenerDolarOficial = async () => {
          try {
            const response = await axios.get('https://dolarapi.com/v1/dolares');
            const oficial = response.data.find(d => d.nombre === "Oficial");
            if (oficial) {
              setprecioDolarOficial(oficial.venta);
            } else {
              console.error('No se encontró el dólar oficial');
            }
          } catch (error) {
            console.error('Error al obtener el precio del dólar oficial:', error);
          }
        };
    
        obtenerDolarOficial();
      }, []);

      return <h1 className={`h1-dolar ${precioDolarOficial === null ? 'loading' : ''}`}>
        Precio del dólar oficial: {precioDolarOficial !== null ? `$${precioDolarOficial}` : 'Cargando...'}
      </h1>;
}

export default PrecioDolarOficial;