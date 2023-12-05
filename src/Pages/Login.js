import React,{useState} from 'react'
import  '../assets/css/mainstyle.css';
import {NavLink, useNavigate} from 'react-router-dom'
import {  useSelector } from 'react-redux';
import axios from 'axios'


export const Login = () => {

const [data, setData] = useState({email:"",password:""});

const [, setLoading] = useState(false)
// const [loginStatus, setLoginStatus] = useState("")


const changeHandler=(e)=>{
setData({...data,[e.target.name]:e.target.value})
};
// console.log(process.env.REACT_APP_CHAT_LOGIN_API)
const navigate=useNavigate();
let loginHandler;

 
  loginHandler=async(e)=>{
    e.preventDefault();
  setLoading(true);
  try {

   
    const config={
      headers:{
        "Content-type":"application/json",
       
      },
    };
   await axios.post(process.env.REACT_APP_CHAT_LOGIN_API,data,config).then(async(response)=>{
    
  
    // console.log(response.data.token)
   await localStorage.setItem("userData", JSON.stringify(response));
  await navigate('/app')
   }).catch((error)=>{
    console.log(error)
   });
   
   
      // redirect('app');
  
  } catch (error) {
    console.log({msg:"Internal Server Error"});
  }
  }
 

  

  





const lightTheme=useSelector((state)=>state.themeKey);


  return (
    <div className= {"App"+ (lightTheme?" ":" App-dark")}>
   
    <div className={"login-container"+ (lightTheme?" ":" login-container-dark")}> 
    <div className={"login-box"+ (lightTheme?" ":" dark")}>
<form className={"login-form"+ (lightTheme?" ":" dark")}

>
<h1 className={"login-heading"+ (lightTheme?" ":" dark")}>Log in</h1>
<label htmlFor="email" className={"login-label"+ (lightTheme?" ":" dark")}>Email</label>
<input type="email" className={"login-input"+ (lightTheme?" ":" dark")} placeholder='Enter Your Email' name="email" 
value={data.email}
onChange={changeHandler}
required
/>
<label htmlFor="password" className={"login-label"+ (lightTheme?" ":" dark")}>Password</label>
<input type="password" name="password"className={"login-input"+ (lightTheme?" ":" dark")} placeholder='Enter Your Password'
value={data.password}
onChange={changeHandler}
required
/>
<button type='submit' className={"login-btn"+ (lightTheme?" ":" login-btn-dark")} onClick={loginHandler} >Login</button>
<p className='login-para'>Don't have account? <NavLink to={'/signup'}  className={"login-link"+ (lightTheme?" ":" login-link-dark")}>Register Now</NavLink></p>
</form>

    </div>
    </div> </div>
  )
}
