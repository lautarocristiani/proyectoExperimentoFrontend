import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/usuarios.css';
import TablaUsuarios from './TablaUsuarios';
import FormularioUsuario from './FormularioUsuario';

const Usuarios = () => {
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        obtenerUsuarios();
    }, []);

    const obtenerUsuarios = async () => {
        try {
            const response = await axios.get('https://expbackend.up.railway.app/usuarios');
            setUsuarios(response.data);
        } catch (error) {
            console.error('Error al obtener los usuarios:', error);
        }
    }

    return (
      <div>
        <TablaUsuarios usuarios={usuarios} setUsuarios={setUsuarios} obtenerUsuarios={obtenerUsuarios} />
        <FormularioUsuario setUsuarios={setUsuarios} obtenerUsuarios={obtenerUsuarios} />
      </div>
    );
};

export default Usuarios;