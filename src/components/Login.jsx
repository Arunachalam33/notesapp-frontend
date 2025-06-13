import React,{useState} from "react";
import axios from "axios";
import { useNavigate ,Link} from "react-router-dom";

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
    navigate("/",{replace:true});  
    
   }catch(err){
    console.error("Login failed",err);
    alert("Login Failed");
   }
}


    return(
        <div>
         <h2>Login</h2>
        <form onSubmit={handleSubmit}>
       
        <input  value={form.username} name="username" placeholder="Username" onChange={handleChange}/>
        <input value={form.password} name="password" placeholder="Password" onChange={handleChange} />
        <button type="submit">Login</button>
        </form>
         <p>
        Don’t have an account?{" "}
        <Link to="/register">Register here</Link>
      </p>
      </div>
    );
}
export default Login;