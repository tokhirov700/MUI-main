import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { teacherValidationSchema } from "@utilis/validations";

import {
   FormControl,
   InputLabel,
   MenuItem,
   Select,
   TextField,
} from "@mui/material";
import axios from "axios";

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

export default function BasicModal({ open, handleClose, course, update }) {
   const initialValues = {
      name: update?.name || "",
      course: update?.course || "",
   };

   const handleSumbit = async (value) => {
      try {
         if (update?.id) {
            await axios.put(
               `http://localhost:3000/teacher/${update.id}`,
               value
            );
            handleClose();
            window.location.reload();
         } else {
            await axios.post("http://localhost:3000/teacher", value);
            handleClose();
            window.location.reload();
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
                  onSubmit={handleSumbit}
                  initialValues={initialValues}
                  validationSchema={teacherValidationSchema}
                  enableReinitialize
               >
                  <Form>
                     <FormControl fullWidth sx={{ mt: 2 }}>
                        <InputLabel id="demo-simple-select-label">
                           Course
                        </InputLabel>
                        <Field
                           labelId="demo-simple-select-label"
                           type="text"
                           name="course"
                           label="Course"
                           as={Select}
                           fullWidth
                        >
                           {course?.map((item, index) => {
                              return (
                                 <MenuItem key={index} value={item?.name}>
                                    {item?.name}
                                 </MenuItem>
                              );
                           })}
                        </Field>
                        <ErrorMessage
                           name="course"
                           component="p"
                           className="text-red-500"
                        />
                        <Field
                           type="text"
                           name="teacher"
                           margin="normal"
                           fullWidth
                           label="Teacher Name"
                           as={TextField}
                        />
                        <ErrorMessage
                           name="teacher"
                           component="p"
                           className="text-red-500"
                        />
                        <Button variant="contained" fullWidth type="submit">
                           save
                        </Button>
                     </FormControl>
                  </Form>
               </Formik>
            </Box>
         </Modal>
      </div>
   );
}
