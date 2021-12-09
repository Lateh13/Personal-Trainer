import { Dialog, DialogTitle, Button, DialogActions, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import React from "react";

export default function Deletecustomer(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }
    
    const removeCar = () => {
        props.deleteCustomer(props.url)
        handleClose();
    }

    return (
        <div>
            <IconButton aria-label="delete" onClick={handleClickOpen}><DeleteIcon /></IconButton>
            <Dialog 
                open={open} 
                onClose={handleClose}
                aria-labelledby="alert-title"
            >
            <DialogTitle id="alert-title">Are you certain you wish to delete the customer?</DialogTitle>
            <DialogActions>
                <Button onClick={handleClose}>No</Button>
                <Button onClick={removeCar}>Yes</Button>
            </DialogActions>
            </Dialog>
        </div>
    )
}