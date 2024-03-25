import React, { useState } from 'react';
import './App.css';
import JanuaryGraph from './components/JanuaryGraph';
import MayGraph from './components/MayGraph';
import ComparisonGraph from './components/ComparisonGraph';
import PatientDataTable from './components/PatientDataTable';

function App() {
  const [activeView, setActiveView] = useState('table'); // shows main table on startup

  return (
    <div className="App">
      <header className="App-header">
        <h1>A1C Blood Tests</h1>
        <div className="graph-controls">
          <button onClick={() => setActiveView('January')}>January</button>
          <button onClick={() => setActiveView('May')}>May</button>
          <button onClick={() => setActiveView('Comparison')}>Comparison</button>
          <button onClick={() => setActiveView('table')}>Show Table</button>
        </div>
        {activeView === 'January' && <JanuaryGraph />}
        {activeView === 'May' && <MayGraph />}
        {activeView === 'Comparison' && <ComparisonGraph />}
        {activeView === 'table' && <PatientDataTable />}
      </header>
    </div>
  );
}

export default App;
