import {
   createBrowserRouter,
   createRoutesFromElements,
   Route,
   RouterProvider,
} from "react-router-dom";
import App from "../App";
import {
   AdminLayout,
   SignIn,
   StudentLayout,
   Teacher,
   Student,
   Group,
   Result,
   Course,
   AdminGroup,
   SignUp,
   Category,
} from "@pages";

const Index = () => {
   const router = createBrowserRouter(
      createRoutesFromElements(
         <Route path="/" element={<App />}>
            <Route index element={<SignIn />} />
            <Route path="sign-up" element={<SignUp />} />
            <Route path="admin-layout" element={<AdminLayout />}>
               <Route index element={<Teacher />} />
               <Route path="student" element={<Student />} />
               <Route path="admin-group" element={<AdminGroup />} />
               <Route path="course" element={<Course />} />
               <Route path="category" element={<Category />} />
            </Route>
            <Route path="student-layout" element={<StudentLayout />}>
               <Route index element={<Group />} />
               <Route path="result" element={<Result />} />
            </Route>
         </Route>
      )
   );

   return <RouterProvider router={router} />;
};

export default Index;
