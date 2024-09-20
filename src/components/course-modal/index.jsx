import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { courseValidationSchema } from "@utilis/validations";
import { FormControl, TextField } from "@mui/material";
import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";

const style = {
   position: "absolute",
   top: "50%",
   left: "50%",
   transform: "translate(-50%, -50%)",
   width: 400,
   bgcolor: "background.paper",
   border: "2px solid #000",
   boxShadow: 24,
   p: 4,
};

export default function BasicModal({ open, handleClose, update }) {
   const initialValues = {
      name: update?.name || "",
      duration: update?.duration || "",
      price: update?.price || "",
   };

   const handleSubmit = async (value) => {
      try {
         if (update?.id) {
            await axios.put(
               `http://localhost:3000/courses/${update.id}`,
               value
            );
            handleClose();
         } else {
            await axios.post("http://localhost:3000/courses", value);
            handleClose();
         }
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <div>
         <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
         >
            <Box sx={style}>
               <Formik
                  onSubmit={handleSubmit}
                  initialValues={initialValues}
                  validationSchema={courseValidationSchema}
                  enableReinitialize
               >
                  <Form>
                     <FormControl fullWidth className="flex flex-col gap-3">
                        <Field
                           name="name"
                           label="Name"
                           as={TextField}
                           fullWidth
                           margin="normal"
                        />
                        <ErrorMessage
                           name="name"
                           component="p"
                           className="text-red-500"
                        />
                        <Field
                           name="duration"
                           label="Duration"
                           as={TextField}
                           fullWidth
                        />
                        <ErrorMessage
                           name="duration"
                           component="p"
                           className="text-red-500"
                        />
                        <Field
                           name="price"
                           label="Price"
                           as={TextField}
                           fullWidth
                        />

                        <ErrorMessage
                           name="price"
                           component="p"
                           className="text-red-500"
                        />
                        <Button
                           type="submit"
                           variant="contained"
                           color="primary"
                        >
                           Save
                        </Button>
                     </FormControl>
                  </Form>
               </Formik>
            </Box>
         </Modal>
      </div>
   );
}
