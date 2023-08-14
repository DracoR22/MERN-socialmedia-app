import React, { useState } from 'react'
import { Formik } from 'formik'
import * as yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setLogin } from '../state'
import Dropzone from 'react-dropzone'
import {
    Box,
    Button,
    TextField,
    Typography,
  } from "@mui/material";

const LogIn = () => {

const loginSchema = yup.object().shape({
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
})

const initialValuesLogin = {
    email: '',
    password: '',
}

const [pageType, setPageType] = useState('login')
const dispatch = useDispatch()
const navigate = useNavigate()

const login = async (values, onSubmitProps) => {
    const loggedInResponse = await fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const loggedIn = await loggedInResponse.json();
    onSubmitProps.resetForm();
    if (loggedIn) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      navigate("/");
    }
  };

const handleFormSubmit = async (values, onSubmitProps) => {
    await login(values, onSubmitProps)
}

  return (
  <Formik onSubmit={handleFormSubmit}  initialValues={initialValuesLogin} validationSchema={loginSchema}>
    {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
    }) => (
        <form className='mx-10' onSubmit={handleSubmit}>
            <h1 className='flex justify-center text-center text-3xl font-bold text-accent my-8'>Log in to your uniVerse account</h1>
            <Box display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            >
                <>
                <TextField
              label={<span className="text-primary">Email</span>}
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "gray", // Replace "red" with your desired border color
                  },
                  "&:hover fieldset": {
                    borderColor: "gray", // Replace "blue" with your desired border color on hover
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "green", // Replace "green" with your desired border color when focused
                  },
                }, gridColumn: "span 4"
              }}
            />
            <TextField
              label={<span className="text-primary">Password</span>}
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "gray", // Replace "red" with your desired border color
                  },
                  "&:hover fieldset": {
                    borderColor: "gray", // Replace "blue" with your desired border color on hover
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "green", // Replace "green" with your desired border color when focused
                  },
                }, gridColumn: "span 4"
              }}
            />

                </>
            </Box>
            {/* BUTTONS */}
         <Box>
          <Button
           fullWidth
           type="submit"
           sx={{
             m: "2rem 0",
             p: "1rem",
             backgroundColor: "#1877F2",
             "&:hover": {
                backgroundColor: "#398af5",
              },
              color: "white", 
              fontWeight: "bold",
           }}>
            Log In
          </Button>
          <div className='flex justify-center mb-6'>
          <p>Dont have an account yet?</p>
          <Link to='/signup' className='pl-1 underline'>Sign Up</Link>
          </div>
         </Box>
        </form>
    )}
  </Formik>
  )
}

export default LogIn