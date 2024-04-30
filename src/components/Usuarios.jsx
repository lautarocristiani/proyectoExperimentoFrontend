import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/usuarios.css';
import CrearUsuarios from './CrearUsuarios';

const Usuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [newUser, setNewUser] = useState({ nombre: '', apellido: '', email: '' });
    const [editUser, setEditUser] = useState({ nombre: '', apellido: '', email: '', userID: '' });
    const [deleteUserID, setDeleteUserID] = useState('');


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

    const createUser = async (event) => {
        event.preventDefault();
        try {
          const response = await axios.post(`https://expbackend.up.railway.app/usuarios`, newUser);
          setUsuarios([...users, { ...newUser, id: response.data.id }]); // Asumiendo que la API devuelve el nuevo usuario
          setNewUser({ nombre: '', apellido: '', email: '' }); // Reiniciar el formulario
          alert('Usuario creado');
        } catch (error) {
          alert('Error creando usuario');
        }
    };

    const handleNewUserChange = (e) => {
        const { name, value } = e.target;
        setNewUser(prevState => ({ ...prevState, [name]: value }));
    };

    return (<div>
        <table className="table">
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
        </table>
        <div>
            <h2>Crear Usuario</h2>
            <form onSubmit={createUser}>
                <input type="text" placeholder="Nombre" name="nombre" value={newUser.nombre} onChange={handleNewUserChange} required />
                <input type="text" placeholder="Apellido" name="apellido" value={newUser.apellido} onChange={handleNewUserChange} required />
                <input type="email" placeholder="Email" name="email" value={newUser.email} onChange={handleNewUserChange} required />
                <button type="submit">Crear Usuario</button>
            </form>
        </div>
    </div>
    );
};

export default Usuarios;