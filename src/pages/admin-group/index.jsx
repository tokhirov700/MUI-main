import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { GroupTable, GroupModal } from "@components";
const index = () => {
   const [data, setData] = useState([]);
   const [open, setOpen] = useState(false);
   const [course, setCourse] = useState([]);
   useEffect(() => {
      axios.get("http://localhost:3000/groups").then((res) => {
         setData(res?.data);
      });
   });
   const handleClose = () => {
      setOpen(false);
   };
   const openModal = () => {
      axios.get("http://localhost:3000/courses").then((res) => {
         setCourse(res?.data);
      });
      setOpen(true);
   };

   return (
      <div>
         <GroupModal open={open} handleClose={handleClose} course={course} />
         <Button
            variant="contained"
            color="success"
            className="mb-3"
            onClick={openModal}
         >
            Add Group
         </Button>
         <GroupTable data={data} />
      </div>
   );
};

export default index;
