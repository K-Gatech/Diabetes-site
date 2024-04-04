import React from 'react';
import jsonData from '../data.json';   // currently data.json is in the main src folder

function classifyA1c(a1c) {
  if (a1c < 5.7) return 'Normal';
  if (a1c >= 5.7 && a1c <= 6.4) return 'Pre-Diabetic';
  if (a1c >= 6.5) return 'Diabetic';
  return 'Unknown';
}

// changing json to appropriate format
const transformedData = jsonData.map(patient => ({
  id: patient.gender_id,
  name: patient.name,
  gender: patient.gender,
  a1cJanuary: patient.a1cResults[0]?.a1c,
  a1cMay: patient.a1cResults[1]?.a1c,
}));

function PatientDataTable() {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Patient Name</th>
            <th>Gender</th>
            <th>A1C - January</th>
            <th>Status - January</th>
            <th>A1C - May</th>
            <th>Status - May</th>
          </tr>
        </thead>
        <tbody>
          {transformedData.map((patient, index) => (
            <tr key={index}>
              <td>{patient.id}</td>
              <td>{patient.name}</td>
              <td>{patient.gender}</td>
              <td>{`${patient.a1cJanuary}%`}</td>
              <td className={`status ${classifyA1c(patient.a1cJanuary).toLowerCase().replace(/\s+/g, '-')}`}>
                {classifyA1c(patient.a1cJanuary)}
              </td>
              <td>{`${patient.a1cMay}%`}</td>
              <td className={`status ${classifyA1c(patient.a1cMay).toLowerCase().replace(/\s+/g, '-')}`}>
                {classifyA1c(patient.a1cMay)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PatientDataTable;
