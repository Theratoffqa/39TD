import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Register = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('usuario');
  const navigate = useNavigate();

  const handleRegister = async () => {
    const userData = { id, password, role };
    
    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        Cookies.set('user', JSON.stringify(userData), { expires: 7 });
        navigate('/login');
      } else {
        console.error('Error en el registro');
      }
    } catch (error) {
      console.error('Error al conectarse con el backend:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
        className="input"
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="input"
      />
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="input"
      >
        <option value="usuario">Usuario</option>
        <option value="administrador">Administrador</option>
      </select>
      <button className="submit-btn" onClick={handleRegister}>
        Registrarse
      </button>
    </div>
  );
};

export default Register;
