import React, { useState } from 'react';
import './App.css';
import A2014Graph from './components/A2014Graph';
import B2015Graph from './components/B2015Graph';
import ComparisonGraph from './components/ComparisonGraph';
import PatientDataTable from './components/PatientDataTable';

function App() {
  const [activeView, setActiveView] = useState('table'); // shows main table on startup

  // This handler changes the active view based on what the user selects
  const handleViewChange = (view) => {
    setActiveView(view);
  };

  const years = [2014, 2015, 2016, 2017, 2018, 2019, 2020];

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
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>

        {/* Conditional rendering based on activeView */}
        {activeView === '2014' && <A2014Graph />}
        {activeView === '2015' && <B2015Graph />}
        {activeView === 'Comparison' && <ComparisonGraph />}
        {activeView === 'table' && <PatientDataTable />}
        {/* Add additional rendering for other years based on the activeView */}
      </header>
    </div>
  );
}

export default App;
