import https from "./config";

const subcategory = {
   create: (parentID,) => https.post(`/sub-category/create/${parentID}`),
   get: (parentID) => https.get(`/sub-category/search/${parentID}`),  
   update: (id, data) => https.patch(`/sub-category/update/${id}`, data), 
   delete: (id) => https.delete(`/sub-category/delete/${id}`),
};

export default subcategory;
