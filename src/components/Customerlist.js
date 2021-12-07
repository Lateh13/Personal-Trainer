import React, { useState, useEffect, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import { TextField } from '@mui/material';
import { GridOptionsWrapper } from 'ag-grid-community';

export default function Customerlist() {
    const [customers, setCustomers] = useState([]);
    const [search, setSearch] = useState('');

    const gridRef = useRef();
    useEffect(() => fetchData(), []);

    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
        .catch(error => console.error(error))
    }

    const dataSearch = (event) => { 
        setSearch(event.target.value)
    }

    const defaultColumns = {
        sortable: true, filter: true, resizable: true, width:150
    }

    const columns = [
        {headerName: "Firstname", field:"firstname"},
        {headerName: "Lastname", field:"lastname"},
        {headerName: "Email", field:"email"},
        {headerName: "Phone", field:"phone"},
        {headerName: "Streetaddress", field:"streetaddress"},
        {headerName: "Postcode", field:"postcode"},
        {headerName: "City", field:"city"}
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
                rowData={search ? customers.filter(e => e.firstname.includes(search) || e.lastname.includes(search) || e.email.includes(search)
                    || e.phone.includes(search) || e.streetaddress.includes(search) || e.postcode.includes(search) || e.city.includes(search)) : customers}>
            </AgGridReact>
        </div>
    );
}

