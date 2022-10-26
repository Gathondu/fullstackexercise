import React from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import Sprints from "./components/sprint/sprints";
import AddSprint from "./components/sprint/addSprint";
import Layout from "./App";

const AppRoutes = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/sprints" />} />
        <Route path="/sprints" element={<Sprints />} />
        <Route path="/sprints/add" element={<AddSprint />} />
      </Routes>
    </Layout>
  );
};

export default AppRoutes;
