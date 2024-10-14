import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import './App.css';  // Importar el archivo CSS
import Register from './Register'; // Importar el componente Register

const Login = () => { // Eliminar el onLogin aquí
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);  // Controlar el estado de la vista (login/registro)
  const navigate = useNavigate();

  // Función para cambiar entre login y registro
  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleRegister = (userData) => {
    // Guarda el usuario registrado en cookies
    Cookies.set('user', JSON.stringify(userData), { expires: 7 });
    alert('Usuario registrado correctamente');
    setIsLogin(true);  // Volver al formulario de login después del registro
  };

  const handleLogin = () => {
    const user = JSON.parse(Cookies.get('user') || '{}');
    if (user.id === id && user.password === password) {
      onLogin(user);
      navigate('/ciclo-selector');  // Redirige a la selección de ciclo
    } else {
      alert('ID o contraseña incorrectos');
    }
  };

  return (
    <div className="form-structor">
      {/* Formulario de registro */}
      <div className={`signup ${!isLogin ? '' : 'slide-up'}`}>
        <h2 className="form-title" onClick={toggleForm} id="signup">
          <span>or</span> Registrarse
        </h2>
        <div className="form-holder">
          <Register onRegister={handleRegister} />
        </div>
      </div>

      {/* Formulario de inicio de sesión */}
      <div className={`login ${isLogin ? '' : 'slide-up'}`}>
        <div className="center">
          <h2 className="form-title" onClick={toggleForm} id="login">
            <span>or</span> Iniciar Sesión
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
