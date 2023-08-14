import React from 'react'
import { Formik } from 'formik'
import * as yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setLogin}  from '../state'
import Dropzone from 'react-dropzone'
import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery
} from "@mui/material";
import FlexBetween from './FlexBetween'


const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("requred"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  location: yup.string().required("required"),
  occupation: yup.string().required("required"),
  picture: yup.string().required("required"),
})

const initialValuesRegister  = {
firstName: '',
lastName: '',
email: '',
password: '',
location: '',
occupation: '',
picture: '',
}

const SignUp = () => {

  const dispatch = useDispatch()
const navigate = useNavigate()
const isNonMobile = useMediaQuery("(min-width:600px)");

  const register = async (values, onSubmitProps) => {
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append("picturePath", values.picture.name);
  
    const savedUserResponse = await fetch(
      "http://localhost:8080/auth/register",
      {
        method: "POST",
        body: formData,
      }
    );
    const savedUser = await savedUserResponse.json();
    onSubmitProps.resetForm();
  
    if (savedUser) {
      navigate("/login");
    }
  };

const handleFormSubmit = async (values, onSubmitProps) => {
  await register(values, onSubmitProps)
}

  return (
    <Formik onSubmit={handleFormSubmit} initialValues={initialValuesRegister} validationSchema={registerSchema}>
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
        <form className='mx-10' onSubmit={handleSubmit} >
          <h1 className='flex justify-center text-center my-8 font-bold text-3xl text-accent'>
            Create your new uniVerse account
          </h1>
            <Box display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}>
                <>
                <TextField className=''
                  label={<span className="text-primary">First Name</span>}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name='firstName'
                  error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                  helperText={touched.firstName && errors.firstName}
                 
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
                    }, gridColumn: "span 2"
                  }}
                />
                 <TextField
                  label={<span className="text-primary">Last name</span>}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name='lastName'
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "gray", // Replace "red" with your desired border color
                      },
                      "&:hover fieldset": {
                        borderColor: 'gray', // Replace "blue" with your desired border color on hover
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "green", // Replace "green" with your desired border color when focused
                      },
                    }, gridColumn: "span 2"
                  }}
                />
                 <TextField
                  label={<span className="text-primary">Location</span>}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.location}
                  name='location'
                  error={Boolean(touched.location) && Boolean(errors.location)}
                  helperText={touched.location && errors.location}
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
                  label={<span className="text-primary">Occupation</span>}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.occupation}
                  name='occupation'
                  error={Boolean(touched.occupation) && Boolean(errors.occupation)}
                  helperText={touched.occupation && errors.occupation}
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
                <Box
                gridColumn='span-4'
                border={'2px'}
                borderRadius="5px"
                p="1rem"  sx={{ gridColumn: "span 4" }}>

                <Dropzone
                 acceptedFiles=".jpg,.jpeg,.png"
                 multiple={false}
                 onDrop={(acceptedFiles) =>
                   setFieldValue("picture", acceptedFiles[0])
                 }
                >
      
                {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={'2px dashed'}
                        p="1rem"
                        sx={{ "&:hover": { cursor: "pointer" }  }}
                      >
                        <input {...getInputProps()} />
                        {!values.picture ? (
                          <p>Add Picture Here</p>
                        ) : (
                            <FlexBetween >
                            <Typography>{values.picture.name}</Typography>
                           
                            </FlexBetween>
                        )}
                      </Box>
                    )}

                </Dropzone>
                 
                </Box>
                </>

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
            Register
          </Button>
          <div className='flex justify-center mb-6'>
          <p>Already have an account?</p>
          <Link to='/login' className='pl-1 underline'>Log in</Link>
          </div>
         </Box>

        </form>
    )}
  </Formik>
  )
}

export default SignUp