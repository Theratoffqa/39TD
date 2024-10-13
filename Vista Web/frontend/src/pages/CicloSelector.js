import React from 'react';
import { useNavigate } from 'react-router-dom';

const CicloSelector = ({ onSelectCiclo, ciclos }) => {
  const navigate = useNavigate();

  const handleSelect = (ciclo) => {
    onSelectCiclo(ciclo);
    navigate('/horario'); // Redirige al horario
  };

  return (
    <div>
      <h2>Seleccionar Ciclo</h2>
      <select onChange={(e) => handleSelect(e.target.value)}>
        <option value="">Seleccione un ciclo</option>
        {ciclos.map((ciclo, index) => (
          <option key={index} value={ciclo}>{ciclo}</option>
        ))}
      </select>
    </div>
  );
};

export default CicloSelector;
