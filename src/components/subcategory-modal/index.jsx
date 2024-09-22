import * as React from "react";
import { Box, Button, Modal, FormControl, TextField } from "@mui/material";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { categoryValidationSchema } from "@utilis/validations";
import { subcategory } from "@service";

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

export default function SubcategoryModal({ open, handleClose, update, parentID }) {
   const initialValues = {
      name: update?.name || "", 
   };

   const handleSubmit = async (values) => {
      try {
         if (update?.id) {
            await subcategory.update(update.id, { name: values.name });
         } else {
            
            await subcategory.create({ name: values.name, categoryId: parentID });
         }
         handleClose(); 
         window.location.reload(); 
      } catch (error) {
         console.log("Xatolik:", error);
      }
   };

   return (
      <Modal open={open} onClose={handleClose}>
         <Box sx={style}>
            <Formik
               initialValues={initialValues}
               validationSchema={categoryValidationSchema}
               onSubmit={handleSubmit}
               enableReinitialize 
            >
               <Form>
                  <FormControl fullWidth className="flex flex-col gap-3">
                     <Field
                        name="name"
                        label="Subcategory Name"
                        as={TextField}
                        fullWidth
                     />
                     <ErrorMessage name="name" component="p" className="text-red-500" />

                     <Button type="submit" variant="contained" color="primary">
                        Save
                     </Button>
                  </FormControl>
               </Form>
            </Formik>
         </Box>
      </Modal>
   );
}
