import React from 'react'
import Chat from '../assets/img/livechat.png'
import  '../assets/css/mainstyle.css';

import {  useSelector } from 'react-redux';



export const Welcome = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  
  
  const lightTheme=useSelector((state)=>state.themeKey);
  return (
  
    <div className="welcome-area">
    <img src={Chat} alt="" className="welcome-img" srcSet="" />
    <p className={"welcome-user"+ (lightTheme?" ":" dark")}>Hi ,  <span className='welcome-user-name'>{userData.data.name}</span>👋 </p>
    
    </div>
  )
}
