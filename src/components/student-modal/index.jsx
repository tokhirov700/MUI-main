import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { studentValidationSchema } from "@utilis/validations";
import {
   FormControl,
   InputLabel,
   MenuItem,
   Select,
   TextField,
} from "@mui/material";
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

export default function BasicModal({
   open,
   handleClose,
   group,
   teacher,
   update,
}) {
   const initialValues = {
      group: update?.group || "",
      name: update?.name || "",
      age: update?.age || "",
      phone: update?.phone || "",
      address: update?.address || "",
      teacher: update?.teacher || "",
   };
   const handleSubmit = async (value) => {
      try {
         if (update?.id) {
            await axios.put(
               `http://localhost:3000/students/${update.id}`,
               value
            );
            window.location.reload();
         } else {
            await axios.post("http://localhost:3000/students", value);
            window.location.reload();
         }
         handleClose();
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <Modal open={open} onClose={handleClose}>
         <Box sx={style}>
            <Formik
               onSubmit={handleSubmit}
               initialValues={initialValues}
               validationSchema={studentValidationSchema}
               enableReinitialize
            >
               <Form>
                  <FormControl fullWidth sx={{ mt: 2 }}>
                     <InputLabel id="group-select-label">Groups</InputLabel>
                     <Field
                        labelId="group-select-label"
                        type="text"
                        name="group"
                        label="Group"
                        as={Select}
                        fullWidth
                     >
                        {group?.map((item) => (
                           <MenuItem key={item.id} value={item.id}>
                              {item.name}
                           </MenuItem>
                        ))}
                     </Field>
                     <ErrorMessage
                        name="group"
                        component="p"
                        className="text-red-500"
                     />
                     <Field
                        type="text"
                        name="name"
                        label="Name"
                        margin="normal"
                        fullWidth
                        as={TextField}
                     />
                     <ErrorMessage
                        name="name"
                        component="p"
                        className="text-red-500"
                     />
                     <Field
                        type="text"
                        name="age"
                        label="Age"
                        margin="normal"
                        fullWidth
                        as={TextField}
                     />
                     <ErrorMessage
                        name="age"
                        component="p"
                        className="text-red-500"
                     />
                     <Field
                        type="text"
                        name="phone"
                        label="Phone"
                        margin="normal"
                        fullWidth
                        as={TextField}
                     />
                     <ErrorMessage
                        name="phone"
                        component="p"
                        className="text-red-500"
                     />
                     <Field
                        type="text"
                        name="address"
                        label="Address"
                        margin="normal"
                        fullWidth
                        as={TextField}
                     />
                     <ErrorMessage
                        name="address"
                        component="p"
                        className="text-red-500"
                     />
                     <InputLabel
                        className="mt-[23.5rem]"
                        id="teacher-select-label"
                     >
                        Teachers
                     </InputLabel>
                     <Field
                        labelId="teacher-select-label"
                        type="text"
                        name="teacher"
                        label="Teacher"
                        margin="normal"
                        fullWidth
                        as={Select}
                     >
                        {teacher?.map((item) => (
                           <MenuItem key={item.id} value={item.id}>
                              {item.name}
                           </MenuItem>
                        ))}
                     </Field>
                     <ErrorMessage
                        name="teacher"
                        component="p"
                        className="text-red-500"
                     />
                     <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{ mt: 2 }}
                        onClick={handleSubmit}
                     >
                        Submit
                     </Button>
                  </FormControl>
               </Form>
            </Formik>
         </Box>
      </Modal>
   );
}
