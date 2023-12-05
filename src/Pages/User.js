import React,{useContext, useState,useEffect} from 'react'
import chat from '../assets/img/livechat.png';
import {useDispatch,  useSelector } from 'react-redux';
import axios from 'axios';

import { refreshSidebarFun } from "../Feature/refreshSlice";
import { myContext } from "../Components/Maincomponent";


export const User = () => {
  const { refresh, } = useContext(myContext)
  const lightTheme=useSelector((state)=>state.themeKey);
  const [users, setUsers] = useState([])

  
  const dispatch = useDispatch();
  const userData = JSON.parse(localStorage.getItem("userData"));
  
 
  useEffect(() => {
    const config={
      headers:{
        Authorization:`Bearer ${userData.data.token}`
        
      }
    }
    // console.log(localStorage.getItem('token'))
  axios.get(process.env.REACT_APP_CHAT_USER_API,config).then((data)=>{
   
   
    setUsers(data.data.data)
    // setSearch(data.data.data)
  }).catch((error)=>{
console.log(error)
  });

   }, [refresh,userData.data.token]);
 

  
    // console.log(localStorage.getItem('token'))
 
  

  return (
    <>
     
    <div className="chatarea-container search-scroll">
    <div className={"sb-header"+ (lightTheme?" ":" dark")}>
        <span className={"online-span"+ (lightTheme?" ":" dark")}>

        <img src={chat} className={" online-img"+ (lightTheme?" ":" dark")} alt="" />
        <h3 className={"online-heading"+ (lightTheme?" ":" dark")}>Available User</h3>
        </span>
    </div>
       
       
    
       
       
       
    
      {users?.map((user)=>{
 return(<div className={"sb-header"+ (lightTheme?" ":" dark")}
 key={user._id}
 onClick={() => {
  console.log("Creating chat with ", user.name);
  const config = {
    headers: {
      Authorization: `Bearer ${userData.data.token}`,
    },
  };
  axios.post(
    process.env.REACT_APP_CHAT_API,
    {
      userId: user._id,
    },
    config
  );
  dispatch(refreshSidebarFun());
}}
 >

    <h4 className='sb-headng'
   
    >{user.name}</h4>
  </div>)
})}
      

     
     
    </div>
 
    </>
  )


}