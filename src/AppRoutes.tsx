import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import CardPage from "./pages/Card/CardPage";

const AppRoutes = () => (
   <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/:id" element={<CardPage />} />
   </Routes>
);

export default AppRoutes;
