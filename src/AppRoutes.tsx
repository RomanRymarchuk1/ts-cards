import { Route, Routes } from "react-router-dom";
import { HomePage, PostPage } from "./pages";

const AppRoutes = () => (
   <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/:id" element={<PostPage />} />
   </Routes>
);

export default AppRoutes;
