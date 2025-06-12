import React,{useState} from "react";
import axios from "axios";

function Register(){

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
    const res=await axios.post("http://localhost:4000/api/register",form);
    alert(res.data.message);
   }catch(err){
    alert("Registration Failed");
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