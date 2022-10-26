import React from "react";
import { Container } from "@mui/material";
import Header from "./components";

const App = ({ children }) => {
  return (
    <Container className="App">
      <Header title="SecureFrame" />
      {children}
    </Container>
  );
};

export default App;
