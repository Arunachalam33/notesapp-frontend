import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const API = "https://notesapp-backend-50tc.onrender.com";
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: ""
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Simple frontend validation
    if (!form.username || !form.password) {
      alert("Please fill out both fields.");
      return;
    }

    try {
      const res = await axios.post(`${API}/api/register`, form);

      if (res.status === 200) {
        alert(res.data.message || "Registered successfully!");
        navigate("/login");
      } else {
        alert("Registration failed");
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        alert(`Error: ${err.response.data.message}`);
      } else {
        alert("Registration failed. Please try again.");
      }
      console.error("Registration error:", err);
    }
  };

  return (
    <div className="auth-container">
       <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={form.username}
        onChange={handleChange}
      />
      <input
        type="password" // ✅ changed from "text" to "password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
      />
      <button type="submit">Register</button>
    </form>
    </div>
   
  );
}

export default Register;
