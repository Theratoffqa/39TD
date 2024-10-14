import React, { useState } from 'react';

const Register = ({ onRegister }) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('usuario');

  const handleRegister = () => {
    const userData = { id, password, role };
    onRegister(userData); // Llama a la función onRegister pasada desde el componente padre (Login)
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
