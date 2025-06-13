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
      {/* 1) Dashboard: only when logged in */}
      <Route
        path="/"
        element={
          isAuthenticated() 
            ? <App /> 
            : <Navigate to="/login" replace />
        }
      />

      {/* 2) Login page: only when not logged in */}
      <Route
        path="/login"
        element={
          isAuthenticated() 
            ? <Navigate to="/" replace /> 
            : <Login />
        }
      />

      {/* 3) Register page: only when not logged in */}
      <Route
        path="/register"
        element={
          isAuthenticated() 
            ? <Navigate to="/" replace />  
            : <Register />
        }
      />

      {/* 4) Fallback: catch any unknown URL */}
      <Route
        path="*"
        element={
          isAuthenticated() 
            ? <Navigate to="/" replace /> 
            : <Navigate to="/login" replace />
        }
      />
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);

