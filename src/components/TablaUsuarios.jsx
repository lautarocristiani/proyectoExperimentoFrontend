import React from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const TablaUsuarios = ({ usuarios, setUsuarios, obtenerUsuarios }) => {
  const eliminarUsuario = async (id) => {
    try {
      await axios.delete(`https://expbackend.up.railway.app/usuarios/${id}`);
      setUsuarios(usuarios.filter(usuario => usuario.id !== id));
      obtenerUsuarios();
    } catch (error) {
      alert('Error eliminando usuario');
    }
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Email</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {usuarios.map(usuario => (
          <tr key={usuario.id}>
            <td>{usuario.id}</td>
            <td>{usuario.nombre}</td>
            <td>{usuario.apellido}</td>
            <td>{usuario.email}</td>
            <td>
              <button onClick={() => eliminarUsuario(usuario.id)}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TablaUsuarios;