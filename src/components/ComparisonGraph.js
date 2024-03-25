import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import patientsData from './PatientsData';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ComparisonGraph = () => {
  // Initialize status counts
  const statusCounts = {
    female: { January: 0, May: 0 },
    male: { January: 0, May: 0 },
    other: { January: 0, May: 0 },
  };

  // A1C levels if statment
  const classifyA1c = (a1c) => {
    if (a1c < 5.7) return 'Normal';
    if (a1c >= 5.7 && a1c <= 6.4) return 'Pre-Diabetic';
    if (a1c >= 6.5) return 'Diabetic';
    return 'Unknown'; 
  };

  // Count for each gender and month
  patientsData.forEach(patient => {
    const genderKey = patient.gender.toLowerCase();
    const janStatus = classifyA1c(patient.a1cJanuary);
    const mayStatus = classifyA1c(patient.a1cMay);
    
    if (janStatus !== 'Diabetic') statusCounts[genderKey].January++;
    if (mayStatus !== 'Diabetic') statusCounts[genderKey].May++;
  });

  const data = {
    labels: ['Female', 'Male', 'Other'],
    datasets: [
      {
        label: 'January - Non-Diabetic',
        data: [statusCounts.female.January, statusCounts.male.January, statusCounts.other.January],
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      },
      {
        label: 'May - Non-Diabetic',
        data: [statusCounts.female.May, statusCounts.male.May, statusCounts.other.May],
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        stacked: false,
      },
      y: {
        beginAtZero: true, 
        max: 6, 
        title: {
          display: true,
          text: 'Count'
        },
      },
    },
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Comparison of Non-Diabetic Status from January to May by Gender',
      },
    },
  };

  return <Bar options={options} data={data} />;
};

export default ComparisonGraph;
