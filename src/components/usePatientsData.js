// usePatientsData.js
import { useState, useEffect } from 'react';

const usePatientsData = () => {
  const [patientsData, setPatientsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Added loading state

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/data.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const transformedData = data.map(patient => ({
          id: patient.gender_id,
          name: patient.name,
          gender: patient.gender,
          a1cJanuary: patient.a1cResults[0].a1c,
          a1cMay: patient.a1cResults[1].a1c,
        }));
        setPatientsData(transformedData);
      } catch (e) {
        console.error("Failed to load patient data:", e);
      }
      setIsLoading(false); // Set loading to false after data is fetched
    };
    loadData();
  }, []);

  return { patientsData, isLoading }; // Return both data and loading state
};

export default usePatientsData;
