import axios from "axios";
import React, { useEffect, useState } from "react";
import { StudentModal, StudentTable } from "@components";
import { Button } from "@mui/material";
const index = () => {
   const [open, setOpen] = useState(false);
   const [data, setData] = useState([]);
   const [group, setGroup] = useState([]);
   const [teacher, setTeacher] = useState([]);
   useEffect(() => {
      axios.get("http://localhost:3000/students").then((res) => {
         setData(res?.data);
      });
   }, []);
   const handleClose = () => {
      setOpen(false);
   };
   const openModal = () => {
      axios.get("http://localhost:3000/groups").then((res) => {
         setGroup(res?.data);
      });
      axios.get("http://localhost:3000/teacher").then((res) => {
         setTeacher(res?.data);
      });
      setOpen(true);
   };
   return (
      <div>
         <StudentModal
            open={open}
            handleClose={handleClose}
            group={group}
            teacher={teacher}
         />
         <Button
            variant="contained"
            color="success"
            className="mb-3"
            onClick={openModal}
         >
            Add Student
         </Button>
         <StudentTable data={data} />
      </div>
   );
};

export default index;
