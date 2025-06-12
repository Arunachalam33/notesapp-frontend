import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import Login from "./components/Login"
import Register from "./components/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const root=ReactDOM.createRoot(<App />, document.getElementById("root"));
root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
        </Routes>
    </BrowserRouter>
);


