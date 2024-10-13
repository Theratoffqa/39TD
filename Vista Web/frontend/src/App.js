import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Cookies from 'js-cookie';
import Login from './pages/Login';
import Register from './pages/Register';
import CicloSelector from './pages/CicloSelector';
import Home from './pages/Home';
import AddProfesorForm from './components/AddProfesorForm';

const App = () => {
  const [profesores, setProfesores] = useState([]);
  const [currentProfesor, setCurrentProfesor] = useState(null);
  const [user, setUser] = useState(null);
  const [selectedCiclo, setSelectedCiclo] = useState('');
  const ciclos = Array.from({ length: 10 }, (_, i) => `Ciclo ${i + 1}`);

  const handleRegister = (userData) => {
    setUser(userData);
  };

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleSelectCiclo = (ciclo) => {
    setSelectedCiclo(ciclo);
  };

  const addOrUpdateProfesor = (nuevoProfesor) => {
    if (currentProfesor) {
      setProfesores(profesores.map(prof => prof === currentProfesor ? nuevoProfesor : prof));
    } else {
      setProfesores([...profesores, nuevoProfesor]);
    }
    setCurrentProfesor(null); // Reinicia el estado del profesor actual
  };

  const handleEdit = (profesor) => {
    setCurrentProfesor(profesor);
  };

  const handleDelete = (profesor) => {
    setProfesores(profesores.filter(prof => prof !== profesor));
  };

  return (
    <Router>
      <div>
        <h1>Horario Semanal</h1>
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register onRegister={handleRegister} />} />
          <Route 
            path="/ciclo-selector" 
            element={<CicloSelector ciclos={ciclos} onSelectCiclo={handleSelectCiclo} />} 
          />
          <Route 
            path="/horario" 
            element={<Home profesores={profesores} onEdit={handleEdit} onDelete={handleDelete} />} 
          />
          <Route path="/" element={<Login onLogin={handleLogin} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
