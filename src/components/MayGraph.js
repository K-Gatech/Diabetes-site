import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import jsonData from '../data.json';

// Register the chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const MayGraph = () => {

  // Creates labels based on patient IDs (1-5). Stop labels at 5 but includes all patients
  const patientLabels = jsonData.map((patient, index) => `Patient ${index + 1}`).slice(0,5);

  // Segregate A1C levels by gender
  const a1cLevelsByGender = jsonData.reduce((acc, patient) => {
    const genderKey = patient.gender.toLowerCase();
    acc[genderKey] = acc[genderKey] || [];
    acc[genderKey].push(patient.a1cResults[1]?.a1c); // Directly accessing the first A1C result
  return acc;
}, {});

  const data = {
    labels: patientLabels,
    datasets: [
      {
        label: 'Female',
        data: a1cLevelsByGender.female || [],
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        tension: 0.3,
      },
      {
        label: 'Male',
        data: a1cLevelsByGender.male || [],
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        tension: 0.3,
      },
      {
        label: 'Other',
        data: a1cLevelsByGender.other || [],
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.5)',
        tension: 0.3,
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
        text: 'A1C Levels for May by Gender',
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: 'A1C Level (%)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Patients',
        },
      },
    },
  };

  return <Line options={options} data={data} />;
};

export default MayGraph;
