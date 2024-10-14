import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';  // Importar el archivo CSS

const CicloSelector = () => {
  const [ciclos, setCiclos] = useState([]);
  const [selectedCiclo, setSelectedCiclo] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Simulación de una llamada a un API para obtener los ciclos
    const fetchCiclos = async () => {
      // Aquí puedes reemplazar esto con una llamada real a tu backend
      const fetchedCiclos = ['Ciclo 1', 'Ciclo 2', 'Ciclo 3']; // Simulación de ciclos
      setCiclos(fetchedCiclos);
    };

    fetchCiclos();
  }, []);

  const handleSelect = () => {
    if (selectedCiclo) {
      // Guardar la selección en el backend (agregar lógica aquí si es necesario)
      navigate('/horario'); // Redirige al horario
    }
  };
  
  return (
    <div className="container"> {/* Agrega la clase container aquí */}
      <h2>Seleccionar Ciclo</h2>
      <select onChange={(e) => setSelectedCiclo(e.target.value)}>
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
