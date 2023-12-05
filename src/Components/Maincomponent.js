import React,{createContext, useState} from 'react'
import  '../assets/css/mainstyle.css';
import { Slidebar } from './Slidebar';
import { Outlet } from 'react-router-dom';
import {  useSelector } from "react-redux";
import { SliderPhone } from './SliderPhone';

export const myContext = createContext();
const Maincomponent = () => {
  const lightTheme=useSelector((state)=>state.themeKey);
  const sliderPhone=useSelector((state)=>state.toggleSlice);
  const [refresh, setRefresh] = useState(true);

 
  return (
   <div className= {"App"+ (lightTheme?" ":" App-dark")}>
   
<div className={"main-container"+ (lightTheme?" ":" main-container-dark")}>
<myContext.Provider value={{ refresh: refresh, setRefresh: setRefresh }}>
  <Slidebar/>
  {sliderPhone?<SliderPhone/>:
   <Outlet/> }
  </myContext.Provider>
</div>
   </div>
  )
}

export default Maincomponent