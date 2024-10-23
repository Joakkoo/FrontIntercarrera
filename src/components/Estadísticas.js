import React from 'react';

const Estadisticas = ({ hunger, happiness, energy, health }) => {
  return (
    <div className="stats">
      <p>Hambre: {hunger}</p>
      <p>Felicidad: {happiness}</p>
      <p>Energía: {energy}</p>
      <p>Salud: {health}</p>
    </div>
  );
};

export default Estadisticas;
