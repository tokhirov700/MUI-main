import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { CourseModal } from "@components";
export default function BasicTable({ data }) {
   const [open, setOpen] = useState(false);
   const [update, setUpdate] = useState({});
   const handleClose = () => {
      setOpen(false);
   };

   const Edit = (item) => {
      setUpdate(item);
      setOpen(true);
   };

   const Delete = (id) => {
      try {
         axios.delete(`http://localhost:3000/courses/${id}`);
         window.location.reload();
      } catch (error) {
         console.log(error);
      }
   };
   return (
      <TableContainer component={Paper}>
         <CourseModal open={open} handleClose={handleClose} update={update} />
         <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
               <TableRow>
                  <TableCell align="center">T/R</TableCell>
                  <TableCell align="center">course name</TableCell>
                  <TableCell align="center">duration</TableCell>
                  <TableCell align="center">price</TableCell>
                  <TableCell align="center">actions</TableCell>
               </TableRow>
            </TableHead>
            <TableBody>
               {data.map((row, index) => (
                  <TableRow
                     key={row.id}
                     sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                     <TableCell align="center">{index + 1}</TableCell>
                     <TableCell align="center">{row.name}</TableCell>
                     <TableCell align="center">{row.duration}</TableCell>
                     <TableCell align="center">{row.price}</TableCell>
                     <TableCell align="center" className="flex gap-3">
                        <Button
                           variant="contained"
                           color="primary"
                           onClick={() => Edit(row)}
                        >
                           edit
                        </Button>
                        <Button
                           variant="contained"
                           color="error"
                           className=" w-[80px] "
                           onClick={() => Delete(row.id)}
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
