import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import Login from "./components/Login";
import Register from "./components/Register";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { isAuthenticated } from "./utils/auth";
import ProtectedRoute from "./utils/ProtectedRoute";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      {/* Home route is protected */}
      <Route path="/" element={<ProtectedRoute><App /></ProtectedRoute>} />
      
      {/* Login & Register should be open for unauthenticated users */}
      <Route path="/login" element={
        isAuthenticated() ? <Navigate to="/" /> : <Login />
      } />
      
      <Route path="/register" element={
        isAuthenticated() ? <Navigate to="/" /> : <Register />
      } />

      {/* Catch-all route */}
      <Route path="*" element={<Navigate to={isAuthenticated() ? "/" : "/login"} />} />
    </Routes>
  </BrowserRouter>
);


