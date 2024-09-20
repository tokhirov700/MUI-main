import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { category } from "@service";
import { useState } from "react";
import { CategoryModal } from "@components";
export default function BasicTable({ categories }) {
   const [open, setOpen] = useState(false);
   const [update, setUpdate] = useState({});
   const handleClose = () => {
      setOpen(false);
   };
   const editCategory = (item) => () => {
      setOpen(true);
      setUpdate(item);
   };
   const deleteCategory = (id) => () => {
      category.delete(id).then(() => window.location.reload());
   };
   return (
      <TableContainer component={Paper}>
         <CategoryModal open={open} handleClose={handleClose} update={update} />
         <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
               <TableRow>
                  <TableCell align="center">T/R</TableCell>
                  <TableCell align="center">Category Name</TableCell>
                  <TableCell align="center">actions</TableCell>
               </TableRow>
            </TableHead>
            <TableBody>
               {categories?.map((row, index) => (
                  <TableRow
                     key={row.id}
                     sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                     <TableCell align="center">{index + 1}</TableCell>
                     <TableCell align="center">{row.name}</TableCell>
                     <TableCell align="center" className="flex gap-3">
                        <Button
                           variant="contained"
                           color="primary"
                           className=" w-[80px]"
                           onClick={editCategory(row)}
                        >
                           edit
                        </Button>
                        <Button
                           variant="contained"
                           color="error"
                           className=" w-[80px]"
                           onClick={deleteCategory(row.id)}
                        >
                           Delete
                        </Button>
                     </TableCell>
                  </TableRow>
               ))}
            </TableBody>
         </Table>
      </TableContainer>
   );
}
