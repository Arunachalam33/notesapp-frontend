import React,{useState} from "react";
import axios from "axios";

function Login({onLogin}){

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
    const res=await axios.post("http://localhost:4000/api/login",form);
    const token=res.data.token;
    localStorage.setItem("token",token);
    alert("Login Successfull");
    onLogin();
   }catch(err){
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