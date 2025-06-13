import React,{useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register(){

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
    const res=await axios.post(`${API}/api/register`,form);
    if(res.status===200){
    alert(res.data.message);
    navigate("/login");
 }else{
    alert("Registration Failed");
   }
}catch(err){
    alert("failed");
    console.error("faileed",err);
}
 }


    return(
        <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        <input type="text" name="username" placeholder="Username" onChange={handleChange}/>
        <input type="text" name="password" placeholder="Password" onChange={handleChange} />
        <button type="submit">Register</button>
        </form>
    );
}
export default Register;