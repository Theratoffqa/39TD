import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Login = () => { // Eliminar el onLogin aquí
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate('/register'); // Navega a la página de registro
  }

  const handleLogin = async () => {
    const loginData = { id, password };

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const user = await response.json();
        Cookies.set('user', JSON.stringify(user), { expires: 7 });
        navigate('/ciclo-selector'); // Redirige a la selección de ciclo
      } else {
        setErrorMessage('ID o contraseña incorrectos');
      }
    } catch (error) {
      setErrorMessage('Error al conectar con el servidor');
      console.error('Error al iniciar sesión:', error);
    }
  };

  return (
    <div>
      <h2>Inicio de Sesión</h2>
      <input 
        type="text" 
        placeholder="ID" 
        value={id} 
        onChange={(e) => setId(e.target.value)} 
      />
      <input 
        type="password" 
        placeholder="Contraseña" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
      />
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <button onClick={handleLogin}>Iniciar Sesión</button>
      <div className="inputRegister">
        <button onClick={handleRegister}>Registrarse</button>
      </div>
    </div>
  );
};

export default Login;
