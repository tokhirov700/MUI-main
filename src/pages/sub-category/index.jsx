import React, { useEffect, useState } from "react";
import { subcategory } from "@service";
import { Button } from "@mui/material";
import { SubcategoryTable, SubcategoryModal } from "@components";

const Index = () => {
   const [open, setOpen] = useState(false);
   const [subcategories, setSubcategories] = useState([]);
   const [parentID,] = useState(localStorage.getItem('parentID') || "");  

   const handleClose = () => {
      setOpen(false);
   };

   useEffect(() => {
      const fetchSubcategories = async () => {
         try {
            const res = await subcategory.get(parentID);
            setSubcategories(res?.data?.data?.subcategories || []); ;  
         } catch (error) {
            console.log("Xatolik:", error);
         }
      };

      fetchSubcategories();
   }, [parentID]);

   const openModal = () => {
      setOpen(true);  
   };

   return (
      <div>
         <SubcategoryModal open={open} handleClose={handleClose} parentID={parentID} />
         <Button
            variant="contained"
            color="success"
            onClick={openModal}
         >
            Add Subcategory
         </Button>
         <SubcategoryTable subcategories={subcategories} />
      </div>
   );
};

export default Index;
