import React from "react";
import ReactDOM from "react-dom/client";
import AppRoutes from "./Routes";
import reportWebVitals from "./reportWebVitals";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
} from "@apollo/client";
import { BrowserRouter as Router } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const root = ReactDOM.createRoot(document.getElementById("root"));

const client = new ApolloClient({
  link: new HttpLink({
    uri: "/graphql",
  }),
  cache: new InMemoryCache(),
});

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Router>
          <AppRoutes />
        </Router>
      </LocalizationProvider>
    </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
