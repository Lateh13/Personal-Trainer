import React from "react";
import { Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Stack } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from '@mui/lab/AdapterDateFns';

export default function Addtraining(props) {
    const [open, setOpen] = React.useState(false);
    const [training, setTraining] = React.useState({
        date: new Date().toISOString(), activity: '', duration: '', customer: ''
    })

    const handleClickOpen = () => {
        setTraining({...training, customer: props.url})
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleInputChange = (event) => {
        setTraining({...training, [event.target.name]: event.target.value});
    }

    const handleDateInput = (event) => {
        setTraining({...training, date: event});
    }

    const addTraining = () => {
        props.saveTraining(training);
        handleClose();
    }

    return (
        <div>
            <Button size="small" style={{margin: 5}} variant="text" color="primary" onClick={handleClickOpen}>Add Training</Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">New Training</DialogTitle>
                <Stack spacing={2}>
                <DialogContent>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateTimePicker
                            label="Date & Time"
                            value={training.date}
                            onChange={(e) => handleDateInput(e)}
                            renderInput={(params) => <TextField {...params} />}
                            fullWidth
                        />
                    </LocalizationProvider>
                    <TextField
                        margin="dense"
                        name="activity"
                        value={training.activity}
                        onChange={e => handleInputChange(e)}
                        label="Activity"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        name="duration"
                        value={training.duration}
                        onChange={e => handleInputChange(e)}
                        label="Duration (min)"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Cancel</Button>
                    <Button onClick={addTraining} color="primary">Save</Button>
                </DialogActions>
                </Stack>
            </Dialog>
        </div>
    )
}