import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import React, { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
const addClaim = async (values) => {
    try {
        let response = await axios.post('/report',

            {
                content: values.content,

            });
        console.log(response)
        window.location.reload()
    } catch (err) {
        console.error(err)
    }
}
export default function AddReport() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Define your Yup validation schema
    const validationSchema = Yup.object({
        content: Yup.string()
            .required('Obligatoire')

    });

    // Define your Formik form handling
    const formik = useFormik({
        initialValues: {
            content: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log(values);
            addClaim(values)
        }
    });
    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                add claim
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle><h2>Add Claim</h2></DialogTitle>
                <DialogContent>

                    <div>
                        <form onSubmit={formik.handleSubmit}>
                            <TextField
                                label="Content"
                                type="text"
                                fullWidth
                                variant="outlined"
                                margin="normal"
                                {...formik.getFieldProps('content')}
                                error={formik.touched.content && Boolean(formik.errors.content)}
                                helperText={formik.touched.content && formik.errors.content}
                            />


                            <Button type="submit" variant="contained" color="primary">
                                add
                            </Button>

                        </form>
                        {error && <p>Error: {error.message}</p>}
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}