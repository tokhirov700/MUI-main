import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import {
   FormControl,
   InputLabel,
   MenuItem,
   Select,
   TextField,
} from "@mui/material";
import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { groupValidationSchema } from "../../utilis/validations";

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
            await axios.put(`http://localhost:3000/groups/${update.id}`, value);
            handleClose();
         } else {
            await axios.post("http://localhost:3000/groups", value);
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
                  onSubmit={handleSumbit}
                  initialValues={initialValues}
                  validationSchema={groupValidationSchema}
                  enableReinitialize
               >
                  <Form>
                     <FormControl fullWidth className="flex flex-col gap-3">
                        <InputLabel id="demo-simple-select-label">
                           Course
                        </InputLabel>
                        <Field
                           as={Select}
                           labelId="demo-simple-select-label"
                           id="demo-simple-select"
                           name="course"
                           label="Course"
                           fullWidth
                           margin="normal"
                        >
                           {course?.map((item) => (
                              <MenuItem key={item.id} value={item.id}>
                                 {item.name}
                              </MenuItem>
                           ))}
                        </Field>
                        <ErrorMessage
                           name="course"
                           component="p"
                           className="text-red-500"
                        />
                        <Field
                           type="text"
                           name="name"
                           as={TextField}
                           fullWidth
                           margin="normal"
                           label="Group Name"
                        />
                        <ErrorMessage
                           name="name"
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
