import React, { useState } from 'react';
import Horario from './components/Horario';
import Register from './pages/Register';
import Login from './pages/Login';
import CicloSelector from './pages/CicloSelector';
import Reader from './pages/Reader';
import AddProfesorForm from './components/AddProfesorForm';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {

  return (
    <Router>
    <div>
      <h1>Horario Semanal</h1>
      <Routes>
        <Route path='/login' element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/ciclo-selector" element={<CicloSelector/>} />
        <Route path="/horario" element={<Horario/>} />
        <Route path="/reader" element={<Reader/>} />
        <Route path="/" element={<Login/>} />
      </Routes>
    </div>
    </Router>
  );
};

export default App;
