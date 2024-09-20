import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { TextField, Button, Box, Card, CardContent, Typography } from "@mui/material";
import { ToastContainer } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { signInValidationSchema } from "@utilis/validations";
import { Notification } from "@utilis/notification";
import { auth } from "@service";

const Index = () => {
   const navigate = useNavigate();
   const initialValues = {
      phone_number: "",
      password: "",
   };

   const handleSumbit = async (value) => {
      try {
         const response = await auth.sign_in(value);
         const access_token = response?.data?.data.tokens.access_token;
         localStorage.setItem("access_token", access_token);
         if (response.status === 201) {
            navigate("/admin-layout");
         }
      } catch (error) {
         console.log(error);
         Notification({
            title: "Password or Name is wrong",
            type: "error",
         });
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
                  Sign In
               </Typography>
               <Formik
                  onSubmit={handleSumbit}
                  initialValues={initialValues}
                  validationSchema={signInValidationSchema}
               >
                  <Form id="sign-in">
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
                        Sign In
                     </Button>
                  </Form>
               </Formik>
               <Box mt={2} textAlign="center">
                  <Typography variant="body2">Don’t have an account?</Typography>
                  <NavLink to="/sign-up" style={{ color: "#4caf50", textDecoration: "none" }}>
                     Sign Up here
                  </NavLink>
               </Box>
            </CardContent>
         </Card>
      </Box>
   );
};

export default Index;
