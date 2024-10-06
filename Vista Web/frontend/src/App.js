import React, { useState } from 'react';
import Horario from './components/Horario';
import AddProfesorForm from './components/AddProfesorForm';

const App = () => {
  const [profesores, setProfesores] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [currentProfesor, setCurrentProfesor] = useState(null);

  const addOrUpdateProfesor = (nuevoProfesor) => {
    if (currentProfesor) {
      setProfesores(profesores.map(prof => prof === currentProfesor ? nuevoProfesor : prof));
    } else {
      setProfesores([...profesores, nuevoProfesor]);
    }
    setShowForm(false); // Cierra el formulario después de guardar
    setCurrentProfesor(null); // Reinicia el estado del profesor actual
  };

  const handleEdit = (profesor) =>{
    setCurrentProfesor(profesor);
    setShowForm(true);
  };

  const handleDelete = (profesor) => {
    setProfesores(profesores.filter(prof => prof !== profesor));
  }

  return (
    <div>
      <h1>Horario Semanal</h1>
      {showForm && <AddProfesorForm onAddProfesor={addOrUpdateProfesor} onClose={() => setShowForm(false)} profesor={currentProfesor}/>}
      <button onClick={() =>{setCurrentProfesor(null); setShowForm(true);}}>Agregar Profesor</button>
      <Horario profesores={profesores} onEdit={handleEdit} onDelete={handleDelete}/>
    </div>
  );
};

export default App;
