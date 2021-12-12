import { IconButton } from "@material-ui/core";
import { Dialog, DialogTitle, Button, DialogActions } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
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
            <IconButton aria-label="delete" onClick={handleClickOpen}><DeleteIcon /></IconButton>
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