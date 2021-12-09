import React, { useState } from 'react';
import './App.css';
import Customerlist from './components/Customerlist';
import { AppBar, Tabs, Tab } from '@mui/material';
import Traininglist from './components/Traininglist';

function App() {
  const[value, setValue] = useState('customerList');

  const handleChange = (event, value) => {
    setValue(value);
  };

  return (
    <div className="App">
      <AppBar position="static" style={{ background: '#ffffff' }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab value="customerList" label="Customers" />
          <Tab value="trainingList" label="Trainings" />
        </Tabs>
        {value === 'customerList' && <Customerlist />}
        {value === 'trainingList' && <Traininglist />}
      </AppBar>
    </div>
  );
}

export default App;