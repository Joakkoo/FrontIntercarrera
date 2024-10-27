import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart, LinearScale, CategoryScale, LineElement, PointElement, Title, Tooltip, Legend } from "chart.js";
import axios from "axios";
import "../estilos/graficos.css";

// Registra los componentes necesarios de Chart.js
Chart.register(LinearScale, CategoryScale, LineElement, PointElement, Title, Tooltip, Legend);

const Grafico = () => {
  const [historicalData, setHistoricalData] = useState([]);

  useEffect(() => {
    // Llama a la API para obtener los datos históricos
    axios.get("http://localhost:4001/api/mascota/datos-historicos")
      .then(response => {
        setHistoricalData(response.data);
      })
      .catch(error => {
        console.error("Error al obtener datos históricos:", error);
      });
  }, []);

  // Preparar los datos de cada gráfico con muestreo de datos
  const sampleRate = 12; // Por ejemplo, muestreo cada 5 puntos para mayor claridad
  const fechas = historicalData.map(data => new Date(data.fecha).toLocaleDateString());
  const temperaturas = historicalData.map(data => data.temperatura);
  const humedades = historicalData.map(data => data.humedad);
  const luces = historicalData.map(data => data.luz);

  const fechasMuestreadas = fechas.filter((_, index) => index % sampleRate === 0);
  const temperaturasMuestreadas = temperaturas.filter((_, index) => index % sampleRate === 0);
  const humedadesMuestreadas = humedades.filter((_, index) => index % sampleRate === 0);
  const lucesMuestreadas = luces.filter((_, index) => index % sampleRate === 0);

  // Opciones para todos los gráficos
  const options = {
    scales: {
      x: {
        ticks: {
          maxTicksLimit: 12 // Limita el número de etiquetas en el eje X
        }
      },
      y: {
        beginAtZero: true,
        type: 'linear' // Puedes cambiar a 'logarithmic' si los datos varían mucho
      }
    },
    elements: {
      point: {
        radius: 1 // Ajusta el tamaño de los puntos
      },
      line: {
        tension: 0.4 // Suaviza las líneas
      }
    }
  };

  return (
    <div className="grafico-container"> 
      <h2>Historial de Sensores</h2>

      {/* Gráfico de Temperatura */}
      <div className="grafico">
        <h3>Temperatura</h3>
        <Line
          data={{
            labels: fechasMuestreadas,
            datasets: [
              {
                label: "Temperatura (°C)",
                data: temperaturasMuestreadas,
                fill: false,
                borderColor: "red",
                tension: 0.1
              }
            ]
          }}
          options={options}
        />
      </div>

      {/* Gráfico de Humedad */}
      <div className="grafico">
        <h3>Humedad</h3>
        <Line
          data={{
            labels: fechasMuestreadas,
            datasets: [
              {
                label: "Humedad (%)",
                data: humedadesMuestreadas,
                fill: false,
                borderColor: "blue",
                tension: 0.1
              }
            ]
          }}
          options={options}
        />
      </div>

      {/* Gráfico de Luz */}
      <div className="grafico">
        <h3>Luz</h3>
        <Line
          data={{
            labels: fechasMuestreadas,
            datasets: [
              {
                label: "Luz (lx)",
                data: lucesMuestreadas,
                fill: false,
                borderColor: "yellow",
                tension: 0.1
              }
            ]
          }}
          options={options}
        />
      </div>
    </div>
  );
};

export default Grafico;
