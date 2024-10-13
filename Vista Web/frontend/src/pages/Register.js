import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const Register = ({ onRegister }) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('usuario');
  const navigate = useNavigate();

  const handleRegister = () => {
    const userData = { id, password, role };
    Cookies.set('user', JSON.stringify(userData), { expires: 7 });
    onRegister(userData);
    navigate('/login'); // Redirige a la página de inicio de sesión
  };

  return (
    <div>
      <h2>Registro</h2>
      <input type="text" placeholder="ID" value={id} onChange={(e) => setId(e.target.value)} />
      <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="usuario">Usuario</option>
        <option value="administrador">Administrador</option>
      </select>
      <button onClick={handleRegister}>Registrarse</button>
    </div>
  );
};

export default Register;
