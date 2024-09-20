import React, { useEffect, useState } from "react";
import { category } from "@service";
import { Button } from "@mui/material";
import { CategoryTable, CategoryModal } from "@components";

const Index = () => {
   const [open, setOpen] = useState(false);
   const [categories, setCategories] = useState([]);
   const handleClose = () => {
      setOpen(false);
   };

   useEffect(() => {
      const res = category.get();
      res.then((res) => {
         setCategories(res?.data?.data?.categories);
      });
   }, []);
   const openModal = async () => {
      setOpen(true);
   };
   return (
      <div>
         <CategoryModal open={open} handleClose={handleClose} />
         <Button
            variant="contained"
            color="success"
            onClick={openModal}
            className="mb-3"
         >
            Add Category
         </Button>
         <CategoryTable categories={categories} />
      </div>
   );
};

export default Index;
