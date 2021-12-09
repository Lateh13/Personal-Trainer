import { Dialog, DialogTitle, Button, DialogActions } from "@mui/material";
import React from "react";

export default function Deletetraining(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }
    
    const removeTraining = () => {
        props.deleteTraining(props.trainingId)
        handleClose();
    }

    return (
        <div>
            <Button size="small" color="error" onClick={handleClickOpen}>Delete</Button>
            <Dialog 
                open={open} 
                onClose={handleClose}
                aria-labelledby="alert-title"
            >
            <DialogTitle id="alert-title">Are you certain you wish to delete the training?</DialogTitle>
            <DialogActions>
                <Button onClick={handleClose}>No</Button>
                <Button onClick={removeTraining}>Yes</Button>
            </DialogActions>
            </Dialog>
        </div>
    )
}