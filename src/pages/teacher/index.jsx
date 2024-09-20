import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { TeacherModal, TeacherTable } from "@components";
import { Button } from "@mui/material";
const index = () => {
   const [open, setOpen] = useState(false);
   const [course, setCourse] = useState([]);
   const [data, setData] = useState([]);
   useEffect(() => {
      axios.get("http://localhost:3000/teacher").then((res) => {
         setData(res?.data);
      });
   }, []);
   const handleClose = () => {
      setOpen(false);
   };
   const openModal = async () => {
      await axios.get("http://localhost:3000/courses").then((res) => {
         setCourse(res?.data);
      });
      setOpen(true);
   };
   return (
      <div>
         <TeacherModal open={open} handleClose={handleClose} course={course} />
         <Button
            variant="contained"
            color="success"
            className="mb-3"
            onClick={openModal}
         >
            Add Teacher
         </Button>
         <TeacherTable data={data} />
      </div>
   );
};

export default index;
