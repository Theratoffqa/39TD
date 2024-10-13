import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { Route, useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate('/register');
  }

  const handleLogin = () => {
    const user = JSON.parse(Cookies.get('user') || '{}');
    if (user.id === id && user.password === password) {
      onLogin(user);
      navigate('/ciclo-selector'); // Redirige a la selección de ciclo
    } else {
      alert('ID o contraseña incorrectos');
    }
  };

  return (
    <div>
      <h2>Inicio de Sesión</h2>
      <input type="text" placeholder="ID" value={id} onChange={(e) => setId(e.target.value)} />
      <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Iniciar Sesión</button>
      <div className='inputRegister'>
        <button onClick={handleRegister}>Register</button>
      </div>
    </div>
  );
};

export default Login;
