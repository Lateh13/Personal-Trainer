import React, { useState, useEffect, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { ButtonGroup, TextField } from '@mui/material';
import Addcustomer from './Addcustomer'
import Deletecustomer from './Deletecustomer';
import Editcustomer from './Editcustomer';
import Addtraining from './Addtraining';

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

    const deleteCustomer = (url) => {
        fetch(url, {method: 'DELETE'})
        .then(res => fetchData())
        .catch(error => console.error(error))
    }

    const saveCustomer = (customer) => {
        fetch('https://customerrest.herokuapp.com/api/customers', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer)
        })
        .then(res => fetchData())
        .catch(error => console.error(error))
    }

    const saveTraining = (training) => {
        fetch('https://customerrest.herokuapp.com/api/trainings', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(training)
        })
        .then(res => fetchData())
        .catch(error => console.error(error))
    }

    const updateCustomer = (customer, url) => {
        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(customer)
        })
        .then(res => fetchData())
        .catch(error => console.error(error))
    }

    const dataSearch = (event) => { 
        setSearch(event.target.value)
    }

    const defaultColumns = {
        sortable: true, filter: true, resizable: true, width:150
    }

    const columns = [
        {headerName: "Actions", width: 230,
        cellRendererFramework: params => {
            return (
                <ButtonGroup>
                    <Deletecustomer deleteCustomer={deleteCustomer} url={params.data.links[0].href}/>
                    <Editcustomer updateCustomer={updateCustomer} customer={params.data} />
                    <Addtraining saveTraining={saveTraining} url={params.data.links[0].href}/>
                </ButtonGroup>)}
        },
        {headerName: "Firstname", field:"firstname"}, 
        {headerName: "Lastname", field:"lastname"},
        {headerName: "Email", field:"email"},
        {headerName: "Phone", field:"phone"},
        {headerName: "Streetaddress", field:"streetaddress"},
        {headerName: "Postcode", field:"postcode"},
        {headerName: "City", field:"city"}
    ]

    return (
        <div className="ag-theme-alpine"style={{height:'700px',width:'100%',margin:'auto'}}>
            <Addcustomer saveCustomer={saveCustomer}/>
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

