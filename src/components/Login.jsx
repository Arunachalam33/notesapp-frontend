import React,{useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login({}){

    const API = "https://notesapp-backend-50tc.onrender.com";
    const navigate = useNavigate();

 const[form,setForm]=useState({
    username:"",
    password:""
 })

  function handleChange(event){
    const {value,name}=event.target;
    

    setForm((prev)=>
    {
        return {...prev,[name]:value}
    });
}
 async function handleSubmit(event){
   event.preventDefault();
  try{
    const res=await axios.post(`${API}/api/login`,form);
    const token=res.data.token;
    localStorage.setItem("token",token);
    alert("Login Successfull");
    navigate("/");  
    
   }catch(err){
    console.error("Login failed",err);
    localStorage.setItem("token", res.data.token);
    alert("Login Failed");
   }
}


    return(
        <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input type="text" name="username" placeholder="Username" onChange={handleChange}/>
        <input type="text" name="password" placeholder="Password" onChange={handleChange} />
        <button type="submit">Login</button>
        </form>
    );
}
export default Login;