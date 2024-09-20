import React from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box, Card, CardContent, Typography } from "@mui/material";
import { ToastContainer } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { signUpValidationSchema } from "@utilis/validations";
import { Notification } from "@utilis/notification";
import { auth } from "@service";

const Index = () => {
   const navigate = useNavigate();
   const initialValues = {
      first_name: "",
      last_name: "",
      phone_number: "",
      email: "",
      password: "",
   };

   const handleSumbit = async (value) => {
      try {
         const response = await auth.sign_up(value);
         if (response.status === 201) {
            navigate("/sign-in");
         } else {
            Notification({
               title: "Password or Name is wrong",
               type: "error",
            });
         }
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
         <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
         />
         <Card sx={{ width: 400, padding: 2 }}>
            <CardContent>
               <Typography variant="h4" align="center" gutterBottom>
                  Sign Up
               </Typography>
               <Formik
                  onSubmit={handleSumbit}
                  initialValues={initialValues}
                  validationSchema={signUpValidationSchema}
               >
                  <Form id="sign-up">
                     <Field
                        type="text"
                        name="first_name"
                        fullWidth
                        margin="normal"
                        label="First Name"
                        as={TextField}
                        helperText={
                           <ErrorMessage
                              name="first_name"
                              component="p"
                              style={{ color: "red" }}
                           />
                        }
                     />
                     <Field
                        type="text"
                        name="last_name"
                        fullWidth
                        margin="normal"
                        label="Last Name"
                        as={TextField}
                        helperText={
                           <ErrorMessage
                              name="last_name"
                              component="p"
                              style={{ color: "red" }}
                           />
                        }
                     />
                     <Field
                        type="text"
                        name="phone_number"
                        fullWidth
                        margin="normal"
                        label="Phone Number"
                        as={TextField}
                        helperText={
                           <ErrorMessage
                              name="phone_number"
                              component="p"
                              style={{ color: "red" }}
                           />
                        }
                     />
                     <Field
                        type="email"
                        name="email"
                        fullWidth
                        margin="normal"
                        label="Email"
                        as={TextField}
                        helperText={
                           <ErrorMessage
                              name="email"
                              component="p"
                              style={{ color: "red" }}
                           />
                        }
                     />
                     <Field
                        type="password"
                        name="password"
                        fullWidth
                        margin="normal"
                        label="Password"
                        as={TextField}
                        helperText={
                           <ErrorMessage
                              name="password"
                              component="p"
                              style={{ color: "red" }}
                           />
                        }
                     />
                     <Button
                        type="submit"
                        variant="contained"
                        color="success"
                        fullWidth
                        sx={{ mt: 3 }}
                     >
                        Sign Up
                     </Button>
                  </Form>
               </Formik>
            </CardContent>
         </Card>
      </Box>
   );
};

export default Index;
