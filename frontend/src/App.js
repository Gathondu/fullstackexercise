import React from "react";
import { Container } from "@mui/material";
import Header from "./components";

const App = ({ children }) => {
  return (
    <>
      <Header title="FullStack Exercise" />
      <Container sx={{ mt: "1rem" }} className="App">
        {children}
      </Container>
    </>
  );
};

export default App;
