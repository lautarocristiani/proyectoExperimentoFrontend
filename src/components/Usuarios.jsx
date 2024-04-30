import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/usuarios.css';

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

    const crearUsuario = async (event) => {
        event.preventDefault();
        try {
          const response = await axios.post(`https://expbackend.up.railway.app/usuarios`, newUser);
          setUsuarios([...usuarios, { ...newUser, id: response.data.id }]); // Asumiendo que la API devuelve el nuevo usuario
          setNewUser({ nombre: '', apellido: '', email: '' }); // Reiniciar el formulario
          alert('Usuario creado');
        } catch (error) {
            console.error('Error creando usuario:', error);
            alert('Error creando usuario: ' + error.message);
        }
    };

    const handleNewUserChange = (e) => {
        const { name, value } = e.target;
        setNewUser(prevState => ({ ...prevState, [name]: value }));
    };

    const modificarUsuario = async (event) => {
        event.preventDefault();
        try {
          const response = await axios.put(`https://expbackend.up.railway.app/usuarios`, editUser);
          setUsuarios(users.map(u => u.id === editUser.userID ? {...response.data} : u));
          setEditUser({ nombre: '', apellido: '', email: '', userID: '' });
          alert('Usuario actualizado');
        } catch (error) {
          alert('Error actualizando usuario');
        }
    };

    const handleEditUserChange = (e) => {
        const { name, value } = e.target;
        setEditUser(prevState => ({ ...prevState, [name]: value }));
    };

    const eliminarUsuario = async (event) => {
        event.preventDefault();
        try {
          await axios.delete(`https://expbackend.up.railway.app/usuarios/${deleteUserID}`);
          setUsuarios(users.filter(u => u.id !== deleteUserID));
          setDeleteUserID('');
          alert('Usuario eliminado');
        } catch (error) {
          alert('Error eliminando usuario');
        }
    };
    const handleDeleteUserIDChange = (e) => {
        setDeleteUserID(e.target.value);
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
            <form onSubmit={crearUsuario}>
                <input type="text" placeholder="Nombre" name="nombre" value={newUser.nombre} onChange={handleNewUserChange} required />
                <input type="text" placeholder="Apellido" name="apellido" value={newUser.apellido} onChange={handleNewUserChange} required />
                <input type="email" placeholder="Email" name="email" value={newUser.email} onChange={handleNewUserChange} required />
                <button type="submit">Crear Usuario</button>
            </form>
        </div>
        <div style={{ margin: '20px', padding: '20px', border: '1px solid #ccc' }}>
            <h2>Modificar Usuario</h2>
            <form onSubmit={modificarUsuario}>
                <input type="text" placeholder="ID del Usuario" name="userID" value={editUser.userID} onChange={handleEditUserChange} required />
                <input type="text" placeholder="Nombre" name="nombre" value={editUser.nombre} onChange={handleEditUserChange} required />
                <input type="text" placeholder="Apellido" name="apellido" value={editUser.apellido} onChange={handleEditUserChange} required />
                <input type="email" placeholder="Email" name="email" value={editUser.email} onChange={handleEditUserChange} required />
                <button type="submit">Modificar Usuario</button>
            </form>
        </div>
        <div style={{ margin: '20px', padding: '20px', border: '1px solid #ccc' }}>
            <h2>Eliminar Usuario</h2>
            <form onSubmit={eliminarUsuario}>
                <input type="text" placeholder="ID del Usuario" value={deleteUserID} onChange={handleDeleteUserIDChange} required />
                <button type="submit">Eliminar Usuario</button>
            </form>
        </div>
    </div>
    );
};

export default Usuarios;