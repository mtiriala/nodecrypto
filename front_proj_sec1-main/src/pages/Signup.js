import React, { useEffect, useState } from 'react';
import { TextField, Button, CircularProgress, createTheme, ThemeProvider, Container, CssBaseline, Box, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const theme = createTheme();



const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const register = async (values) => {
    try {
      let response = await axios.post('register/',

        {
          email: values.email,
          password: values.password,
          firstName: values.firstName,
          lastName: values.lastName,
          phone: values.phone,
          job: values.job,
          grade: values.grade
        });
      console.log(response)
      window.location.replace('/login')
    } catch (err) {
      console.error(err)
      setError({ message: err.response.data.message })
    }
  }
  // Define your Yup validation schema
  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Required'),
    password: Yup.string()
      .required('Required'),
    cpassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'wrong password ')
      .required('Required'),
    firstName: Yup.string()
      .required('Obligatoire'),
    lastName: Yup.string()
      .required('Obligatoire'),
    phone: Yup.number()
      .typeError(' Numero est invalide')
      .required('Obligatoire')
      .max(99999999, 'Saisir 8 chiffres')
      .min(10000000, 'Saisir 8 chiffres'),
    job: Yup.string()
      .required('Obligatoire'),
    grade: Yup.string()
      .required('Obligatoire'),

  });

  // Define your Formik form handling
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      cpassword: '',
      firstName: '',
      lastName: '',
      phone: '',
      job: '',
      grade: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      register(values)
    }
  });

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
            SignUp
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              label="FirstName"
              type="text"
              fullWidth
              variant="outlined"
              margin="normal"
              {...formik.getFieldProps('firstName')}
              error={formik.touched.firstName && Boolean(formik.errors.firstName)}
              helperText={formik.touched.firstName && formik.errors.firstName}
            />
            <TextField
              label="LastName"
              type="text"
              fullWidth
              variant="outlined"
              margin="normal"
              {...formik.getFieldProps('lastName')}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
            />
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
            <TextField
              label="Confirm Password"
              type="password"
              fullWidth
              variant="outlined"
              margin="normal"
              {...formik.getFieldProps('cpassword')}
              error={formik.touched.cpassword && Boolean(formik.errors.cpassword)}
              helperText={formik.touched.cpassword && formik.errors.cpassword}
            />
            <TextField
              label="Phone"
              type="number"
              fullWidth
              variant="outlined"
              margin="normal"
              {...formik.getFieldProps('phone')}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
            />
            <TextField
              label="Job"
              type="text"
              fullWidth
              variant="outlined"
              margin="normal"
              {...formik.getFieldProps('job')}
              error={formik.touched.job && Boolean(formik.errors.job)}
              helperText={formik.touched.job && formik.errors.job}
            />
            <TextField
              label="Grade"
              type="text"
              fullWidth
              variant="outlined"
              margin="normal"
              {...formik.getFieldProps('grade')}
              error={formik.touched.grade && Boolean(formik.errors.grade)}
              helperText={formik.touched.grade && formik.errors.grade}
            />
            {error && <Typography variant='body2' style={{ color: "red" }} > {error.message}</Typography>}

            {loading ? (
              <CircularProgress />
            ) : (
              <Button fullWidth type="submit" variant="contained" color="primary">
                Signup
              </Button>
            )}
          </form>
        </Box>
      </Container >
    </ThemeProvider >
  );
};

export default Signup;