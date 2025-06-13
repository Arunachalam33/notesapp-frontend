import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import Login from "./components/Login";
import Register from "./components/Register";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { isAuthenticated } from "./utils/auth";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={isAuthenticated()?<App />:<Navigate to="/register"/>} />
      <Route path="/login" element={isAuthenticated()?<Navigate to="/"/>:<Login />}/>
      <Route path="/register" element={isAuthenticated()?<Navigate to="/"/>:<Register />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);


