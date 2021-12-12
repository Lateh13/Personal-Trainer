import React, { useState, useEffect, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import { TextField } from '@mui/material';
import { parseJSON } from 'date-fns';
import Deletetraining from './Deletetraining';
import { Box, Container, Grid, InputAdornment } from '@material-ui/core';
import SearchIcon from '@mui/icons-material/Search';
import { CssBaseline } from '@mui/material';

export default function Traininglist() {
    const [trainings, setTrainings] = useState([]);
    const [search, setSearch] = useState('');

    const gridRef = useRef();
    useEffect(() => fetchData(), []);

    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => {
            setTrainings(data)
        })
        .catch(error => console.error(error))
    }

    const deleteTraining = (trainingId) => {
        let url = "https://customerrest.herokuapp.com/api/trainings/"+trainingId;
        fetch(url, {method: 'DELETE'})
        .then(res => fetchData())
        .catch(error => console.error(error))
    }

    const dataSearch = (event) => { 
        const lowerCase = event.target.value.toLowerCase()
        setSearch(lowerCase)
    }

    const defaultColumns = {
        sortable: true, filter: true, resizable: true, width:200
    }

    const dateFormat = (params) => {
        let d = parseJSON(params.data.date)
        const [date, time] = [d.toLocaleDateString('fi-FI'), d.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})]
        return date+" "+time
    }

    const columns = [
        {headerName: "Delete", width:130,
        cellRendererFramework: params => {
            return (<Deletetraining deleteTraining={deleteTraining} trainingId={params.data.id}/>)}
        },
        {headerName: "Activity", field:"activity"},
        {headerName: "Date", field:"date", valueFormatter: dateFormat},
        {headerName: "Duration (min)", field:"duration"},
        {headerName: "Customer", field:"customer", valueGetter: function fullName(params){
            const name = params.data.customer.firstname + " " + params.data.customer.lastname
            return (name)
        }}
    ]

    return (
        <div className="ag-theme-material" style={{ backgroundColor: 'white', height:'1000px', width:'100%' }}>
            <div style={{ width: '100%', height: '940px'}}>
            <CssBaseline />
                <Container style={{paddingTop:'30px', margin:0}}>
                    <Box>
                        <Grid container>
                            <Grid align="left" component="h2" item xs={6} style={{marginBlockStart:'0'}} >Trainings</Grid>
                            <Grid align="right" item xs={5}>
                                <TextField 
                                    name="search" 
                                    placeholder="Search" 
                                    variant="standard" 
                                    onChange={dataSearch}
                                    InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            </Grid>
                        </Grid>
                    </Box>
                </Container>
                <div style={{ height:'100%', width:'100%', padding:'10px' }}>
                    <AgGridReact
                        ref={gridRef}
                        onGridReady={ params => gridRef.current = params.api }
                        rowSelection="multiple"
                        columnDefs={columns}
                        defaultColDef={defaultColumns}
                        rowData={search ? trainings.filter(e => e.activity.toLowerCase().includes(search) ||
                            e.customer.firstname.toLowerCase().includes(search) || e.customer.lastname.toLowerCase().includes(search)) : trainings}>
                    </AgGridReact>
                </div>
            </div>
        </div>
    );
}

