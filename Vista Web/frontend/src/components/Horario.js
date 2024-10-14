import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AddProfesorForm from './AddProfesorForm';
import '../pages/App.css';  // Importar el archivo CSS

const Horario = ({ profesores = [], onEdit, onDelete, onAdd }) => {
  const dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const horas = Array.from({ length: 15 }, (_, i) => `${i + 8}:00`); // Horas de 8:00 a 22:00
  const [horarios, setHorarios] = useState(Array(dias.length).fill(null).map(() => Array(horas.length).fill('')));
  const [selectedProfesor, setSelectedProfesor] = useState('');
  const [showAddProfesorForm, setShowAddProfesorForm] = useState(false);
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const cicloSeleccionado = queryParams.get('ciclo') || '';

  useEffect(() => {
    if (!cicloSeleccionado) {
      console.error('No se seleccionó ningún ciclo');
    }
  }, [cicloSeleccionado]);

  const handleAddProfesor = async (nuevoProfesor) => {
    const profesorConCiclo = { ...nuevoProfesor, ciclo: cicloSeleccionado };
    const response = await fetch('http://localhost:5000/api/profesores', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profesorConCiclo),
    });
    if (response.ok) {
      const addedProfesor = await response.json();
      onAdd(addedProfesor);
      setShowAddProfesorForm(false);
    } else {
      console.error('Error al agregar profesor');
    }
  };

  const handleChange = (diaIndex, horaIndex, value) => {
    const newHorarios = [...horarios];
    newHorarios[diaIndex][horaIndex] = value;
    setHorarios(newHorarios);
  };

  const isTimeDisabled = (diaIndex, hora) => {
    if (!selectedProfesor) return false;
    const profesor = profesores.find(p => p.nombre === selectedProfesor);
    if (!profesor) return false;
    return !profesor.dias || !profesor.dias[diaIndex] || !profesor.dias[diaIndex].includes(hora);
  };

  const getAvailableCourses = () => {
    if (!selectedProfesor) return [];
    const profesor = profesores.find(p => p.nombre === selectedProfesor);
    return profesor ? [profesor.curso] : [];
  };

  return (
    <div className="container2"> {/* Aplicar la clase container */}
      <div className="professor-column"> {/* Nueva clase para la columna de profesores */}
        <h2>Lista de Profesores</h2>
        <ul>
          {profesores.map((profesor, index) => (
            <li key={index}>
              {profesor.nombre} {profesor.apellido} - {profesor.curso} - {profesor.ciclo}
              <button onClick={() => onEdit(profesor)}>Editar</button>
              <button onClick={() => onDelete(profesor)}>Eliminar</button>
            </li>
          ))}
        </ul>
        <button onClick={() => setShowAddProfesorForm(true)}>Agregar Profesor</button>
        {showAddProfesorForm && (
          <AddProfesorForm 
            onAddProfesor={handleAddProfesor} 
            onClose={() => setShowAddProfesorForm(false)} 
          />
        )}
        <h3>Seleccionar Profesor</h3>
        <select className="course-selector" onChange={(e) => setSelectedProfesor(e.target.value)} value={selectedProfesor}>
          <option  value="">Seleccione o Agregar un Profesor</option>
          {profesores.length === 0 && <option value="add">Agregar nueva opción</option>}
          {profesores.map(prof => (
            <option key={prof.nombre} value={prof.nombre}>{prof.nombre}</option>
          ))}
          {profesores.length > 0 && <option value="add">Agregar nueva opción</option>}
        </select>
      </div>

      <div className="table-column"> {/* Nueva clase para la columna de la tabla */}
        <table className="schedule-table">
          <thead>
            <tr>
              <th>Hora/Día</th>
              {dias.map((dia) => (
                <th key={dia}>{dia}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {horas.map((hora) => (
              <tr key={hora}>
                <td>{hora}</td>
                {dias.map((dia, diaIndex) => (
                  <td key={diaIndex}>
                    {isTimeDisabled(diaIndex, hora) ? (
                      <span className="disabled">No disponible</span>
                    ) : (
                      <select
                        value={horarios[diaIndex][horas.indexOf(hora)]}
                        onChange={(e) => handleChange(diaIndex, horas.indexOf(hora), e.target.value)}
                        className="course-selector"
                      >
                        <option value="">Seleccionar curso</option>
                        {getAvailableCourses().map((curso, index) => (
                          <option key={index} value={curso}>{curso}</option>
                        ))}
                      </select>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Horario;
