import React from 'react';
import patientsData from './PatientsData';

// A1C levels if statment
function classifyA1c(a1c) {
  if (a1c < 5.7) return 'Normal';
  if (a1c >= 5.7 && a1c <= 6.4) return 'Pre-Diabetic';
  if (a1c >= 6.5) return 'Diabetic';
  return 'Unknown'; 
}

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
          {patientsData.map((patient, index) => (
            <tr key={index}>
              <td>{patient.id}</td>
              <td>{patient.name}</td>
              <td>{patient.gender}</td>
              <td>{`${patient.a1cJanuary}%`}</td>
              {/* Jan Status */}
              <td className={`status ${classifyA1c(patient.a1cJanuary).toLowerCase()}`}>
                {classifyA1c(patient.a1cJanuary)}
              </td>
              <td>{`${patient.a1cMay}%`}</td>
              {/* May Status */}
              <td className={`status ${classifyA1c(patient.a1cMay).toLowerCase()}`}>
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
