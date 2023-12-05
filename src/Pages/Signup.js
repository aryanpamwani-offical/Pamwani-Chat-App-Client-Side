import React, { useState } from 'react'
import  '../assets/css/mainstyle.css';
import {NavLink, useNavigate} from 'react-router-dom'
import {  useSelector } from 'react-redux';
import axios from 'axios'
export const Signup = () => {
 
const [data, setData] = useState({name:"",email:"",password:""});
const [ setLoading] = useState(false)
const [setSignupStatus]=useState("")

const navigate=useNavigate();
const changeHandler=(e)=>{
setData({...data,[e.target.name]:e.target.value})
};

const signupHandler=async(e)=>{
  e.preventDefault();
setLoading(true);
try {
  const config={
    headers:{
      "Content-type":"application/json",
      
    },
  };
 await axios.post(process.env.REACT_APP_CHAT_SIGNUP_API,data,config).then((response)=>{

    setSignupStatus({msg:"Success",key:Math.random()});
    navigate('/login');
  });

  
 
} catch (error) {
  setSignupStatus({msg:"Internal Server Error"});
}
}


  const lightTheme=useSelector((state)=>state.themeKey);
  return (
    <div className= {"App"+ (lightTheme?" ":" App-dark")}>
    <div className={"login-container"+ (lightTheme?" ":" login-container-dark")}>


    
    <div className={"login-box"+ (lightTheme?" ":" dark")}>
<form className={"login-form"+ (lightTheme?" ":" dark")} >
        <h1 className={"login-heading"+ (lightTheme?" ":" dark")}>Signup</h1>
        <label htmlFor="text" className={"login-label"+ (lightTheme?" ":" dark")}>Name</label>
<input type="text" className={"login-input"+ (lightTheme?" ":" dark")} placeholder='Enter Your Name' name="name" 
value={data.name}
onChange={changeHandler}
required
/>


<label htmlFor="email" className={"login-label"+ (lightTheme?" ":" dark")} >Email</label>
<input type="email" className={"login-input"+ (lightTheme?" ":" dark")} placeholder='Enter Your Email' name="email"
value={data.email}
onChange={changeHandler}
required
/>
<label htmlFor="password" className={"login-label"+ (lightTheme?" ":" dark")}

>Password</label>
<input type="password" name="password"className={"login-input"+ (lightTheme?" ":" dark")} placeholder='Enter Your Password'
value={data.password}
onChange={changeHandler}
required
/>
<button type='submit' onClick={signupHandler} className={"login-btn"+ (lightTheme?" ":" login-btn-dark")}>Signup</button>
<p className='login-para'>Already have an account? <NavLink to={'/login'} className={"login-link"+ (lightTheme?" ":" login-link-dark")} >Login</NavLink></p>
</form>

    </div>
    </div></div>
  )
}
