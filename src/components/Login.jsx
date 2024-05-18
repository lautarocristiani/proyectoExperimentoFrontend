import React, { useState } from 'react';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import '../styles/login.css';

const Login = ({ setToken, setUser }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const baseUrl = 'https://expbackend.up.railway.app';
        const url = isLogin ? `${baseUrl}/login` : `${baseUrl}/signup`;

        // Encriptar la contraseña antes de enviarla
        const encryptedPassword = CryptoJS.AES.encrypt(password, 'your-secret-key').toString();

        try {
            const response = await axios.post(url, {
                nombre,
                apellido,
                email,
                password: encryptedPassword,  // Enviar la contraseña encriptada
            });

            if (response.data) {
                if (isLogin) {
                    setToken(response.data.token);
                    setUser({ nombre: response.data.nombre, apellido: response.data.apellido });
                } else {
                    setIsLogin(true);
                    alert('Usuario registrado correctamente. Ahora puede iniciar sesión.');
                }
            } else {
                setError('Respuesta del servidor no válida');
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Error en la autenticación');
        }
    };

    const handleSwitch = () => {
        setIsLogin(!isLogin);
        setNombre('');
        setApellido('');
        setEmail('');
        setPassword('');
        setError('');
    };

    return (
        <div className="login-container">
            <div className={`login-card ${isLogin ? 'login-mode' : 'signup-mode'}`}>
                <div className="card-content login-content">
                    <h2>Iniciar Sesión</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        {error && <p className="text-danger">{error}</p>}
                        <button type="submit" className="form-button w-100">Iniciar Sesión</button>
                    </form>
                    <div className="mt-3">
                        <span>¿No tienes una cuenta?</span>
                        <button onClick={handleSwitch} className="switch-button">Registrarse</button>
                    </div>
                </div>
                <div className="card-content signup-content">
                    <h2>Registrarse</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Apellido"
                                value={apellido}
                                onChange={(e) => setApellido(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        {error && <p className="text-danger">{error}</p>}
                        <button type="submit" className="form-button w-100">Registrarse</button>
                    </form>
                    <div className="mt-3">
                        <span>¿Ya tienes una cuenta?</span>
                        <button onClick={handleSwitch} className="switch-button">Iniciar Sesión</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
