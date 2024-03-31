import React, { useState } from 'react';
import './App.css';
import JanGraph from './components/JanGraph';
import MayGraph from './components/MayGraph';
import ComparisonGraph from './components/ComparisonGraph';
import PatientDataTable from './components/PatientDataTable';

function App() {
  const [activeView, setActiveView] = useState('table'); // shows main table on startup

  
  const handleViewChange = (view) => {
    setActiveView(view);
  };
  
  // months used are only Jan and May  
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  return (
    <div className="App">
      <header className="App-header">
        <h1>A1C Blood Tests</h1>
        <div className="graph-controls">
          {/* Buttons */}
          <button onClick={() => handleViewChange('table')}>Show Table</button>
          <button onClick={() => handleViewChange('Comparison')}>Comparison</button>
          
          {/* Dropdown for month selection */}
          <select className="dropdown" onChange={(e) => setActiveView(e.target.value)}>
            {months.map(months => (
              <option key={months} months={months}>{months}</option>
            ))}
          </select>
        </div>

        {/* rendering based on activeView */}
        {activeView === 'January' && <JanGraph />}
        {activeView === 'May' && <MayGraph />}
        {activeView === 'Comparison' && <ComparisonGraph />}
        {activeView === 'table' && <PatientDataTable />}        
      </header>
    </div>
  );
}

export default App;
