import React, { useState } from 'react';
import axios from 'axios';

const FormularioUsuario = ({ setUsuarios, obtenerUsuarios }) => {
  const [usuario, setUsuario] = useState({ nombre: '', apellido: '', email: '' });

  const handleChange = (e) => {
    setUsuario({...usuario, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://expbackend.up.railway.app/usuarios', usuario);
      obtenerUsuarios(); // Actualizar la lista después de agregar
      alert('Usuario creado exitosamente');
      setUsuario({ nombre: '', apellido: '', email: '' }); // Limpiar el formulario
    } catch (error) {
      alert('Error creando usuario: ' + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="nombre" placeholder="Nombre" value={usuario.nombre} onChange={handleChange} required />
      <input type="text" name="apellido" placeholder="Apellido" value={usuario.apellido} onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email" value={usuario.email} onChange={handleChange} required />
      <button type="submit">Guardar Usuario</button>
    </form>
  );
};

export default FormularioUsuario;