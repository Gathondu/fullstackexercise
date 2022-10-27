import React from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import Sprints from "./components/sprint/sprints";
import AddSprint from "./components/sprint/addSprint";
import Sprint from "./components/sprint/sprint";
import Tickets from "./components/ticket/tickets";
import AddTicket from "./components/ticket/addTicket";
import Ticket from "./components/ticket/ticket";
import Layout from "./App";

const AppRoutes = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/sprints" />} />
        <Route path="/sprints" element={<Sprints />} />
        <Route path="/sprints/add" element={<AddSprint />} />
        <Route path="/sprint/:sprintId" element={<Sprint />} />
        <Route path="/tickets" element={<Tickets />} />
        <Route path="/tickets/add" element={<AddTicket />} />
        <Route path="/ticket/:ticketId" element={<Ticket />} />
      </Routes>
    </Layout>
  );
};

export default AppRoutes;
