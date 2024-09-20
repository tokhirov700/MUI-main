import React, { useEffect, useState } from "react";
import { category } from "@service";
import { Button } from "@mui/material";
import { SubcategoryTable, SubcategoryModal } from "@components";

const Index = () => {
   const [open, setOpen] = useState(false);
   const [categories, setCategories] = useState([]);
   const [subcategories, setSubcategories] = useState([]);

   const handleClose = () => {
      setOpen(false);
   };

   useEffect(() => {
      const fetchCategories = async () => {
         const res = await category.get();
         setCategories(res?.data?.data?.categories);
      };

      const fetchSubcategories = async () => {
         const res = await category.get();
         setSubcategories(res?.data?.data?.subcategories);
      };

      fetchCategories();
      fetchSubcategories();
   }, []);

   const openModal = () => {
      setOpen(true);
   };

   return (
      <div>
         <SubcategoryModal open={open} handleClose={handleClose} categories={categories} />
         <Button
            variant="contained"
            color="success"
            onClick={openModal}
            className="mb-3"
         >
            Add Subcategory
         </Button>
         <SubcategoryTable subcategories={subcategories} categories={categories} />
      </div>
   );
};

export default Index;
