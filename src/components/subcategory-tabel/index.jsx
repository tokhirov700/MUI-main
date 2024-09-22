import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { useState } from "react";
import { SubcategoryModal } from "@components";
import { subcategory } from "@service";

export default function SubcategoryTable({ subcategories }) {
   const [open, setOpen] = useState(false);
   const [update, setUpdate] = useState({}); 
   
   const handleClose = () => {
      setOpen(false);  
   };

   const editSubcategory = (item) => () => {
      setUpdate(item);  
      setOpen(true);    
   };

   const deletesubCategory = (id) => async () => {
         await subcategory.delete(id);
         window.location.reload();
      }

   return (
      <TableContainer component={Paper}>
         <SubcategoryModal open={open} handleClose={handleClose} update={update} />
         <Table sx={{ minWidth: 650 }} aria-label="subcategory table">
            <TableHead>
               <TableRow>
                  <TableCell align="center">T/R</TableCell>
                  <TableCell align="center">Subcategory Name</TableCell>
                  <TableCell align="center">Actions</TableCell>
               </TableRow>
            </TableHead>
            <TableBody>
               {subcategories && subcategories.length > 0 ? (
                  subcategories.map((row, index) => (
                     <TableRow key={row.id}>
                        <TableCell align="center">{index + 1}</TableCell>
                        <TableCell align="center">{row.name}</TableCell>
                        <TableCell align="center">
                           <Button variant="contained" color="primary" onClick={editSubcategory(row)}>
                              Edit
                           </Button>
                           <Button
                              variant="contained"
                              color="error"
                              className="w-[80px]"
                              onClick={deletesubCategory(row.id)}
                           >
                              Delete
                           </Button>
                        </TableCell>
                     </TableRow>
                  ))
               ) :ork (
                  <TableRow>
                     <TableCell colSpan={3} align="center">
                        Subcategory not found
                     </TableCell>
                  </TableRow>
               )}
            </TableBody>
         </Table>
      </TableContainer>
   );
}
