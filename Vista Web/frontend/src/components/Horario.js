import React, { useState } from 'react';

const Horario = ({ profesores, onEdit, onDelete, onAdd }) => {
  const dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const horas = Array.from({ length: 15 }, (_, i) => `${i + 8}:00`); // Horas de 8:00 a 22:00
  const [horarios, setHorarios] = useState(Array(dias.length).fill(null).map(() => Array(horas.length).fill('')));
  const [selectedProfesor, setSelectedProfesor] = useState('');

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
    <div style={{ display: 'flex' }}>
      <div style={{ marginRight: '20px' }}>
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
        <button onClick={onAdd}>Agregar Profesor</button> {/* Botón para agregar profesor */}
        <h3>Seleccionar Profesor</h3>
        <select onChange={(e) => setSelectedProfesor(e.target.value)} value={selectedProfesor}>
          <option value="">Seleccione o Agregar un Profesor</option>
          {profesores.length === 0 && <option value="add">Agregar nueva opción</option>}
          {profesores.map(prof => (
            <option key={prof.nombre} value={prof.nombre}>{prof.nombre}</option>
          ))}
          {profesores.length > 0 && <option value="add">Agregar nueva opción</option>}
        </select>
      </div>

      <table style={{ borderCollapse: 'collapse' }}>
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
                <td key={diaIndex} style={{ border: '1px solid black', padding: '10px' }}>
                  {isTimeDisabled(diaIndex, hora) ? (
                    <span style={{ color: 'gray' }}>No disponible</span>
                  ) : (
                    <select
                      value={horarios[diaIndex][horas.indexOf(hora)]}
                      onChange={(e) => handleChange(diaIndex, horas.indexOf(hora), e.target.value)}
                      style={{ width: '100%' }}
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
  );
};

export default Horario;
