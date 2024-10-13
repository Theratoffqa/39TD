import React, { useState } from 'react';

const RestrictSchedule = () => {
  const [schedule, setSchedule] = useState({
    professor: '',
    mondayStart: '',
    mondayEnd: '',
    tuesdayStart: '',
    tuesdayEnd: '',
    // Puedes agregar más días aquí según tus necesidades
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSchedule({
      ...schedule,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí podrías enviar los datos al backend
    console.log('Restricción de horarios guardada:', schedule);
    // Aquí enviarías los datos a través de una petición HTTP al backend
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Seleccionar Profesor */}
      <div>
        <label htmlFor="professor">Profesor:</label>
        <select name="professor" value={schedule.professor} onChange={handleInputChange}>
          <option value="">Seleccione un profesor</option>
          <option value="profesor1">Profesor 1</option>
          <option value="profesor2">Profesor 2</option>
          {/* Añade más opciones aquí según los profesores disponibles */}
        </select>
      </div>

      {/* Horarios para Lunes */}
      <div>
        <label htmlFor="mondayStart">Lunes (Inicio):</label>
        <input type="time" name="mondayStart" value={schedule.mondayStart} onChange={handleInputChange} />
        <label htmlFor="mondayEnd">Lunes (Fin):</label>
        <input type="time" name="mondayEnd" value={schedule.mondayEnd} onChange={handleInputChange} />
      </div>

      {/* Horarios para Martes */}
      <div>
        <label htmlFor="tuesdayStart">Martes (Inicio):</label>
        <input type="time" name="tuesdayStart" value={schedule.tuesdayStart} onChange={handleInputChange} />
        <label htmlFor="tuesdayEnd">Martes (Fin):</label>
        <input type="time" name="tuesdayEnd" value={schedule.tuesdayEnd} onChange={handleInputChange} />
      </div>

      {/* Agrega más días aquí si lo necesitas */}

      <button type="submit">Guardar Horario</button>
    </form>
  );
};

export default RestrictSchedule;
