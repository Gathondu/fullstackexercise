import React from "react";
import { Routes, Route } from "react-router-dom";
import Sprints from "./components/sprint";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/sprints" element={Sprints} />
    </Routes>
  );
};

export default AppRoutes;
