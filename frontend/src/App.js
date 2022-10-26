import React from "react";
import { Container } from "@mui/material";
import Header from "./components";
import AppRoutes from "./Routes";

const App = () => {
  return (
    <Container className="App">
      <Header title="SecureFrame" />
      <div>
        <AppRoutes />
      </div>
    </Container>
  );
};

export default App;
