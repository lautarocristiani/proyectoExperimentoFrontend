import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/usuarios.css';

const Usuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    useEffect(() => {
        const obtenerUsuarios = async () => {
            try {
                const response = await axios.get('https://expbackend.up.railway.app/usuarios');
                setUsuarios(response.data);
            } catch (error) {
                console.error('Error al obtener los usuarios:', error);
            }
        };
        obtenerUsuarios();
    }, []);
    return (<table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>eMail</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.nombre}</td>
              <td>{u.apellido}</td>
              <td>{u.email}</td>
            </tr>
          ))}
        </tbody>
      </table>);
};

export default Usuarios;