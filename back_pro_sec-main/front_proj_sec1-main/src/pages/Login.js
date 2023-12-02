import React, { useContext, useEffect, useState } from 'react';
import { TextField, Button, CircularProgress, Typography, ThemeProvider, createTheme, Box, CssBaseline, Container } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AuthContext } from '../context/AuthContext'
import { Link, Navigate, redirect } from 'react-router-dom';
import axios from 'axios';
const theme = createTheme();

const Login = () => {
    // const {login,user } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Define your Yup validation schema
    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Required'),
        password: Yup.string().required('Required'),
    });
    const login = async (values) => {
        setLoading(true)
        try {
            let response = await axios.post('auth/', { email: values.email, password: values.password });
            console.log(response)
            localStorage.setItem("token", JSON.stringify(response.data.token))
            setLoading(false)
            window.location.replace("/");
        } catch (err) {
            console.error(err)
            setError({ message: "Wrong Email or Password" })
            setLoading(false)

        }
    };
    // Define your Formik form handling
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            login(values)
            // redirect('/dashboard')
        }
    });
    if (localStorage.getItem('token'))
        return (
            <Navigate to='/' />
        )
    else
        return (
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            marginBottom: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >

                        <Typography component="h1" variant="h5">
                            Login
                        </Typography>
                        <form onSubmit={formik.handleSubmit}>
                            <TextField
                                label="Email"
                                type="email"
                                fullWidth
                                variant="outlined"
                                margin="normal"
                                {...formik.getFieldProps('email')}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                            />
                            <TextField
                                label="Password"
                                type="password"
                                fullWidth
                                variant="outlined"
                                margin="normal"
                                {...formik.getFieldProps('password')}
                                error={formik.touched.password && Boolean(formik.errors.password)}
                                helperText={formik.touched.password && formik.errors.password}
                            />
                            {error && <Typography variant='body2' style={{color:"red"}} > {error.message}</Typography>}

                            {loading ? (
                                <CircularProgress />
                            ) : (
                                <Button fullWidth type="submit" variant="contained" color="primary">
                                    Login
                                </Button>

                            )}
                            <Link to='/signup' style={{textDecoration:"none"}}>
                                <Typography> create account </Typography>
                            </Link>
                        </form>
                    </Box>
                </Container>
            </ThemeProvider >
        );
};

export default Login;