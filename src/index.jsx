import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import App from "./components/App";
import Login from "./components/Login";
import Register from "./components/Register";
import { isAuthenticated } from "./utils/auth";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      {/* 1) Dashboard */}
      <Route
        path="/"
        element={
          isAuthenticated() 
            ? <App /> 
            : <Navigate to="/login" replace />
        }
      />

      {/* 2) Login */}
      <Route
        path="/login"
        element={
          isAuthenticated() 
            ? <Navigate to="/" replace /> 
            : <Login />
        }
      />

      {/* 3) Register */}
      <Route
        path="/register"
        element={
          isAuthenticated()
            ? <Navigate to="/" replace />
            : <Register />
        }
      />

      {/* 4) Fallback */}
      <Route 
        path="*"
        element={<Navigate to={isAuthenticated() ? "/" : "/login"} replace />}
      />
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);

