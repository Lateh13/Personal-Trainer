import React, { useState } from 'react';
import './App.css';
import Customerlist from './components/Customerlist';
import { AppBar, Tabs, Tab } from '@mui/material';
import Traininglist from './components/Traininglist';
import Calendar from './components/Calendar';
import Statistics from './components/Statistics';
import { Box, Toolbar, Typography } from '@material-ui/core';

function App() {


  const[value, setValue] = useState('customerList');

  const handleChange = (event, value) => {
    setValue(value);
  };

  return (
    <div className="App">
      <AppBar position="sticky" color="transparent" style={{backgroundColor:'#e6e6e6'}}>
        <Toolbar>
        <Typography component="h1" variant="h6" color="inherit">Personal Trainer</Typography>
        <Box sx={{ width: '80%' }}>
        <Tabs value={value} onChange={handleChange} centered style={{color:'black', fontWeight:'bold', textTransform:'none'}}>
          <Tab value="customerList" label="Customers" />
          <Tab value="trainingList" label="Trainings" />
          <Tab value="calendar" label="Calendar" />
          <Tab value="statistics" label="Statistics" />
        </Tabs>
        </Box>
        </Toolbar>
        {value === 'customerList' && <Customerlist />}
        {value === 'trainingList' && <Traininglist />}
        {value === 'calendar' && <Calendar />}
        {value === 'statistics' && <Statistics />}
      </AppBar>
    </div>
  );
}

export default App;