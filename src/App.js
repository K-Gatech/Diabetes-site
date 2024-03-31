import React, { useState } from 'react';
import './App.css';
import JanGraph from './components/JanGraph';
import MayGraph from './components/MayGraph';
import ComparisonGraph from './components/ComparisonGraph';
import PatientDataTable from './components/PatientDataTable';

function App() {
  const [activeView, setActiveView] = useState('table'); // shows main table on startup

  // This handler changes the active view based on what the user selects
  const handleViewChange = (view) => {
    setActiveView(view);
  };

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  return (
    <div className="App">
      <header className="App-header">
        <h1>A1C Blood Tests</h1>
        <div className="graph-controls">
          {/* Existing buttons for table and comparison */}
          <button onClick={() => handleViewChange('table')}>Show Table</button>
          <button onClick={() => handleViewChange('Comparison')}>Comparison</button>
          
          {/* Dropdown for year selection */}
          <select className="dropdown" onChange={(e) => setActiveView(e.target.value)}>
            {months.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>

        {/* Conditional rendering based on activeView */}
        {activeView === 'January' && <JanGraph />}
        {activeView === 'May' && <MayGraph />}
        {activeView === 'Comparison' && <ComparisonGraph />}
        {activeView === 'table' && <PatientDataTable />}
        {/* Add additional rendering for other years based on the activeView */}
      </header>
    </div>
  );
}

export default App;
