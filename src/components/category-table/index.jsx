import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import CategoryModal from "../category-modal";
import { category } from "@service";

export default function BasicTable({ categories }) {
   const [open, setOpen] = useState(false);
   const [update, setUpdate] = useState({});
   const [categoryList, setCategoryList] = useState(categories);
   const navigate = useNavigate();

   useEffect(() => {
      setCategoryList(categories);
   }, [categories]);

   function gotoSub(id) {
      localStorage.setItem('parentID', id);
      navigate('/admin-layout/sub-category');
   }

   const handleClose = () => {
      setOpen(false);
   };

   const editCategory = (item) => () => {
      setOpen(true);
      setUpdate(item);
   };

   const deleteCategory = (id) => async () => {
      await category.delete(id);
      setCategoryList((prev) => prev.filter(cat => cat.id !== id));
   };

   return (
      <TableContainer component={Paper}>
         <CategoryModal open={open} handleClose={handleClose} update={update} />
         <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
               <TableRow>
                  <TableCell align="center">T/R</TableCell>
                  <TableCell align="center">Category Name</TableCell>
                  <TableCell align="center">Actions</TableCell>
               </TableRow>
            </TableHead>
            <TableBody>
               {categoryList?.map((row, index) => (
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
                           Edit
                        </Button>
                        <Button
                           variant="contained"
                           color="error"
                           className=" w-[80px]"
                           onClick={deleteCategory(row.id)}
                        >
                           Delete
                        </Button>
                        <Button onClick={() => gotoSub(row.id)} variant="contained" color="primary">
                           View More
                        </Button>
                     </TableCell>
                  </TableRow>
               ))}
            </TableBody>
         </Table>
      </TableContainer>
   );
}
