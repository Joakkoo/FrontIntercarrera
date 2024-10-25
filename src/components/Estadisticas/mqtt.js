import React, { useState, useEffect } from 'react';
import DataChart from './Grafico';

const SensorDashboard = () => {
  const [temperatura, setTemperatura] = useState([]);
  const [humedad, setHumedad] = useState([]);
  const [luz, setLuz] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4001/api/sensor-data');
        const data = await response.json();
        console.log(data)
        if (data.temperatura && data.humedad && data.luminosidad) {
          setTemperatura((prev) => [...prev, data.temperatura].slice(-10));
          setHumedad((prev) => [...prev, data.humedad].slice(-10));
          setLuz((prev) => [...prev, data.luz].slice(-10));
        }
      } catch (error) {
        console.error('Error fetching sensor data:', error);
      }
    };

    const intervalId = setInterval(fetchData, 2000); // Actualizar cada 2 segundos

    return () => clearInterval(intervalId); // Limpiar el intervalo al desmontar
  }, []);

  return (
    <div>
      <h2>Dashboard de Sensores</h2>
      <DataChart label="Temperatura" dataPoints={temperatura} color="red" />
      <DataChart label="Humedad" dataPoints={humedad} color="blue" />
      <DataChart label="Luminosidad" dataPoints={luz} color="yellow" />
    </div>
  );
};

export default SensorDashboard;