import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './App.css';  // Importar el archivo CSS
import Register from './Register'; // Importar el componente Register

const Login = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLogin, setIsLogin] = useState(true); // Añadir el estado isLogin
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate('/register'); // Navega a la página de registro
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

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
    <div className="form-structor">
      {/* Formulario de registro */}
      <div className={`signup ${!isLogin ? '' : 'slide-up'}`}>
        <h2 className="form-title" onClick={toggleForm} id="signup">
          <span>o</span> Registrarse
        </h2>
        <div className="form-holder">
          <Register onRegister={handleRegister} />
        </div>
      </div>

      {/* Formulario de inicio de sesión */}
      <div className={`login ${isLogin ? '' : 'slide-up'}`}>
        <div className="center">
          <h2 className="form-title" onClick={toggleForm} id="login">
            <span>o</span> Iniciar Sesión
          </h2>
          <div className="form-holder">
            <input
              type="text"
              className="input"
              placeholder="ID"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
            <input
              type="password"
              className="input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errorMessage && <p className="error">{errorMessage}</p>} {/* Mostrar mensaje de error */}
          </div>
          <button className="submit-btn" onClick={handleLogin}>
            Iniciar Sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
