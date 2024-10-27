import React from 'react';
import './Estadisticas.css';

const getBarColor = (value) => {
  if (value > 70) return 'green';
  if (value > 40) return 'orange';
  return 'red';
};

const Estadisticas = ({ hunger, happiness, energy, health }) => {
  const stats = [
    { label: 'Hambre', value: hunger },
    { label: 'Felicidad', value: happiness },
    { label: 'Energía', value: energy },
    { label: 'Salud', value: health },
  ];

  return (
    <div className="stats">
      {stats.map((stat, index) => (
        <div key={index} className="stat-bar">

          <span className="heart">{stat.label}</span>
          <div className="bar">
            <div
              className="fill"
              style={{
                width: `${stat.value}%`,
                backgroundColor: getBarColor(stat.value),
              }}
            ></div>
          </div>
          <span className="label"></span>
        </div>
      ))}
    </div>
  );
};

export default Estadisticas;
