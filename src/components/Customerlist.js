import React, { useState, useEffect, useRef } from 'react';
import '../App.css'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { ButtonGroup, CssBaseline, TextField } from '@mui/material';
import Addcustomer from './Addcustomer'
import Deletecustomer from './Deletecustomer';
import Editcustomer from './Editcustomer';
import Addtraining from './Addtraining';
import { Container, Grid, InputAdornment } from '@material-ui/core';
import SearchIcon from '@mui/icons-material/Search';
import { Box } from '@mui/system';

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
        const lowerCase = event.target.value.toLowerCase()
        setSearch(lowerCase)
        console.log(lowerCase)
    }

    const defaultColumns = {
        sortable: true, filter: true, resizable: true, width:170
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
        <div className="ag-theme-material" style={{ backgroundColor:'white', height:'1000px', width:'100%' }}>
            <div style={{ width: '100%', height: '940px'}}>
                <CssBaseline />
                <Container style={{paddingTop:'30px', margin:0}}>
                    <Box>
                        <Grid container>
                            <Grid align="left" component="h2" item xs={6} style={{marginBlockStart:'0'}} >Customers</Grid>
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
                            <Grid align="right" item xs={1}><Addcustomer saveCustomer={saveCustomer}/></Grid>
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
                        rowData={search ? customers.filter(e => e.firstname.toLowerCase().includes(search) || 
                            e.lastname.toLowerCase().includes(search) || e.email.toLowerCase().includes(search) || 
                            e.phone.toLowerCase().includes(search) || e.streetaddress.toLowerCase().includes(search) || 
                            e.postcode.toLowerCase().includes(search) || e.city.toLowerCase().includes(search)) : customers}>
                    </AgGridReact>
                </div>
            </div>
        </div>
    );
}

