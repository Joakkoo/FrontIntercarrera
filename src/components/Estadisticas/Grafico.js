import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Registrar los componentes de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const DataChart = ({ label, dataPoints, color }) => {
  const data = {
    labels: Array(dataPoints.length).fill(''), // Etiquetas vacías, reemplázalas si quieres.
    datasets: [
      {
        label: label,
        data: dataPoints,
        fill: false,
        backgroundColor: color,
        borderColor: color,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `Gráfico de ${label}`,
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default DataChart;
