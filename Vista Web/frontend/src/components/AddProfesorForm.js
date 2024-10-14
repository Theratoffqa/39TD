import React, { useState } from 'react';

const AddProfesorForm = ({ onAddProfesor, onClose }) => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [curso, setCurso] = useState('');
  const [ciclo, setCiclo] = useState('');
  const [dias, setDias] = useState(Array(6).fill([]).map(() => [])); // Inicializa los días

  const handleSave = () => {
    onAddProfesor({ nombre, apellido, curso, ciclo, dias });
    setNombre('');
    setApellido('');
    setCurso('');
    setCiclo('');
    setDias(Array(6).fill([]).map(() => [])); // Reinicia
  };

  const toggleDia = (diaIndex, hora) => {
    const newDias = [...dias];
    const index = newDias[diaIndex].indexOf(hora);
    if (index > -1) {
      newDias[diaIndex].splice(index, 1); // Remover
    } else {
      newDias[diaIndex].push(hora); // Agregar
    }
    setDias(newDias);
  };

  return (
    <div className="overlay">
      <div className="form-container">
        <h3>Agregar Nuevo Profesor</h3>
        <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
        <input type="text" placeholder="Apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} />
        <input type="text" placeholder="Curso" value={curso} onChange={(e) => setCurso(e.target.value)} />
        <input type="text" placeholder="Ciclo" value={ciclo} onChange={(e) => setCiclo(e.target.value)} />
        <h4>Días Disponibles</h4>
        {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'].map((dia, index) => (
          <div key={index} className="day-checkbox">
            <label>{dia}</label>
            <div className="checkbox-group">
              {Array.from({ length: 15 }, (_, i) => `${i + 8}:00`).map(hora => (
                <label key={hora}>
                  <input type="checkbox" checked={dias[index].includes(hora)} onChange={() => toggleDia(index, hora)} />
                  {hora}
                </label>
              ))}
            </div>
          </div>
        ))}
        <div className="button-group">
          <button onClick={handleSave}>Guardar</button>
          <button onClick={onClose}>Cerrar</button>
        </div>
      </div>
    </div>
  );
};

export default AddProfesorForm;
