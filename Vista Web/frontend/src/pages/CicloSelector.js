import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';  // Importar el archivo CSS

const CicloSelector = () => {
  const [ciclos, setCiclos] = useState([]);
  const [selectedCiclo, setSelectedCiclo] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCiclos = async () => {
      const fetchedCiclos = [
        'Ciclo 1', 'Ciclo 2', 'Ciclo 3', 'Ciclo 4', 'Ciclo 5', 'Ciclo 6', 'Ciclo 7', 'Ciclo 8', 'Ciclo 9', 'Ciclo 10'
      ];
      setCiclos(fetchedCiclos);
    };
    fetchCiclos();
  }, []);

  const handleSelect = () => {
    if (selectedCiclo) {
      navigate(`/horario?ciclo=${selectedCiclo}`);
    }
  };
  
  return (
    <div className="container"> {/* Agrega la clase container aquí */}
      <h2>Seleccionar Ciclo</h2>
      <select onChange={(e) => setSelectedCiclo(e.target.value)} value={selectedCiclo}>
        <option value="">Seleccione un ciclo</option>
        {ciclos.map((ciclo, index) => (
          <option key={index} value={ciclo}>{ciclo}</option>
        ))}
      </select>
      <button onClick={handleSelect}>Seleccionar</button>
    </div>
  );
};

export default CicloSelector;
