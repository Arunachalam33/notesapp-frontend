import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../utils/AuthContext";

function Login() {
  const API = "https://notesapp-backend-50tc.onrender.com";
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(`${API}/api/login`, form);
      const token = res.data.token;
      login(token); // ✅ updates the auth context state
      alert("Login successful");
      navigate("/",{state:{refresh:true}}); // ✅ triggers rerender based on state
    } catch (err) {
      alert("Login failed");
      console.error("Login error", err);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input type="text" name="username" placeholder="Username" onChange={handleChange} />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} />
      <button type="submit">Login</button>
      <div className="auth-footer">
        <p>dont have an account?</p>
      <button onClick={()=>navigate("/register")}>Register</button>
      </div>
      
    </form>
    </div>
    
  );
}

export default Login;
