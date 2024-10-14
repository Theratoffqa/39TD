import React from 'react';
import Horario from '../components/Horario';

const Home = ({ profesores = [], onEdit, onDelete }) => {
  return (
    <div>
      <h2>Horario</h2>
      <Horario profesores={profesores} onEdit={onEdit} onDelete={onDelete} />
    </div>
  );
};

export default Home;
