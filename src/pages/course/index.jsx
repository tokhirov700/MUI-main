import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Button } from "@mui/material";
import { CourseModal, CourseTable } from "@components";
const index = () => {
   const [open, setOpen] = useState(false);
   const [data, setData] = useState([]);
   useEffect(() => {
      axios.get("http://localhost:3000/courses").then((res) => {
         setData(res?.data);
      });
   });
   const handleClose = () => {
      setOpen(false);
   };
   const openModal = () => {
      setOpen(true);
   };
   return (
      <div>
         <CourseModal open={open} handleClose={handleClose} />
         <Button
            variant="contained"
            color="success"
            className="mb-3"
            onClick={openModal}
         >
            Add Course
         </Button>
         <CourseTable data={data} />
      </div>
   );
};

export default index;
