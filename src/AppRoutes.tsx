import { Route, Routes } from "react-router-dom";
import { HomePage, CardPage } from "./pages";

const AppRoutes = () => (
   <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/:id" element={<CardPage />} />
   </Routes>
);

export default AppRoutes;
