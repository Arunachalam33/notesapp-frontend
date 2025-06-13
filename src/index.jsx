import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import Login from "./components/Login";
import Register from "./components/Register";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { isAuthenticated } from "./utils/auth";

const[isregistered,setregistered]=useState(false);

function handleregister(){
  setregistered(true);
}

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={isAuthenticated()?<App />:<Navigate to="/register"/>} />
      <Route path="/login" element={isAuthenticated()?<Navigate to="/"/>:<Login />}/>
      <Route path="/register" element={isregistered?<Navigate to="/login"/>:<Register />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);


