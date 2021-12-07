import React, { useState, useEffect, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import { TextField } from '@mui/material';
import { parseJSON } from 'date-fns';

export default function Traininglist() {
    const [trainings, setTrainings] = useState([]);
    const [search, setSearch] = useState('');

    const gridRef = useRef();
    useEffect(() => fetchData(), []);

    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/api/trainings')
        .then(response => response.json())
        .then(data => setTrainings(data.content))
        .catch(error => console.error(error))
    }

    const dataSearch = (event) => { 
        setSearch(event.target.value)
    }

    const defaultColumns = {
        sortable: true, filter: true, resizable: true, width:150
    }

    const dateFormat = (params) => {
        let p = parseJSON(params.data.date)
        const [date, time] = [p.toLocaleDateString('fi-FI'), p.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})]
        return date+" "+time
    }

    const columns = [
        {headerName: "Date", field:"date", valueFormatter: dateFormat},
        {headerName: "Duration", field:"duration"},
        {headerName: "Activity", field:"activity"}
    ]

    return (
        <div className="ag-theme-material"style={{height:'700px',width:'100%',margin:'auto'}}>
            <TextField name="search" label="Search" variant="standard" onChange={dataSearch}/>
            <AgGridReact
                ref={gridRef}
                onGridReady={ params => gridRef.current = params.api }
                rowSelection="multiple"
                columnDefs={columns}
                defaultColDef={defaultColumns}
                rowData={search ? trainings.filter(e => e.date.includes(search) || e.activity.includes(search)) : trainings}>
            </AgGridReact>
        </div>
    );
}

