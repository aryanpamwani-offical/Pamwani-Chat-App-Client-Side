import React,{useState,useEffect,useContext} from 'react'
import '../assets/css/mainstyle.css'
import '../assets/css/responsive.css'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { IconButton } from '@mui/material';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';

import NightlightOutlinedIcon from '@mui/icons-material/NightlightOutlined';
import SearchIcon from "@mui/icons-material/Search";
import LightModeOutlinedIcon from "@mui/icons-material/LightMode";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import { useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from "../Feature/themeSlice";
import axios from "axios";
import { myContext } from "./Maincomponent";
import { refreshSidebarFun } from '../Feature/refreshSlice';
import { toggleSlice } from '../Feature/sliderSlice';


export const Slidebar = () => {
 
   const lightTheme=useSelector((state)=>state.themeKey);
   
   const navigate=useNavigate();
  const dispatch=useDispatch()
  const { refresh, setRefresh } = useContext(myContext);
  const [conversations, setConversations] = useState([]);
  const userData = JSON.parse(localStorage.getItem("userData"));


  const user = userData.data;
  useEffect(() => {
    const config={
      headers:{
        Authorization:`Bearer ${user.token}`
        
      }
    }
    
  axios.get(process.env.REACT_APP_CHAT_API,config).then((data)=>{
   
   
    setConversations(data.data)

  }).catch((error)=>{
console.log(error)
  });
    
  }, [refresh,conversations,user.token]);



  return (
    <>
   
    <div className='slidebar-container'>
      <div className={"sb-header" + (lightTheme?" ":" dark")}>
        <div className='sb-header-icon'>

          <IconButton  onClick={() => {
              navigate("/app/welcome");
            }}>

            <AccountCircleOutlinedIcon className={"icons"+ (lightTheme?" ":" dark")}/>
          </IconButton>
        </div>
        <div className='sb-header-icon'> 

          <IconButton onClick={()=>{navigate('user')}}  >
            <PersonAddAltOutlinedIcon className={"icons"+ (lightTheme?" ":" dark")}/>

          </IconButton>
       
         <IconButton className='chat-responsive-icon' onClick={()=>{dispatch(toggleSlice())}} >
            <ChatOutlinedIcon className={"icons"+ (lightTheme?" ":" dark")}/>
          </IconButton> 
          <IconButton onClick={()=>dispatch(toggleTheme(),refreshSidebarFun(!refresh))}>
           {lightTheme?<>
           <NightlightOutlinedIcon className={"icons"+ (lightTheme?" ":" dark")}/>
           
           </>
           :
           <>
           <LightModeOutlinedIcon className={"icons"+ (lightTheme?" ":" dark")}/>
           </>
           } 

          </IconButton>
          <IconButton
            onClick={() => {
              localStorage.removeItem("userData");
              navigate("/login");
            }}
          >
             <ExitToAppIcon className={"icons" + (lightTheme ? "" : " dark")} />
             </IconButton>
        </div>
      </div>
      <div className={"sb-search sb-search-resp"+ (lightTheme?" ":" dark")}>
        <IconButton>
          <SearchIcon className={"icons"+ (lightTheme?" ":" dark")}/></IconButton>
        <input type="search" name="" className={"search-box"+ (lightTheme?" ":" dark")} placeholder='search' id="" />
      </div>
      <div className={"sb-conversation sb-conversation-resp"+ (lightTheme?" ":" dark")}>
      {conversations.map((conversation, index) => {
          
          if (conversation.users.length === 1) {
            return <div key={index}></div>;
          }
          if (conversation.latestMessage === undefined) {
           
            return (
              <div
                key={index}
                onClick={() => {
                  console.log("Refresh fired from sidebar");
                  dispatch(refreshSidebarFun());
                  setRefresh(!refresh);
                }}
              >
                <div
                  key={index}
                  className={"conversation-container"+ (lightTheme?" ":"conversation-container-dark")}
                  onClick={() => {
                    navigate(
                      "chat/" +
                        conversation._id +
                        "&" +
                        conversation.users[1].name
                    );
                  }}
                  // dispatch change to refresh so as to update chatArea
                >
                  <p className={"con-icon" + (lightTheme ? "" : " con-icon-dark")}>
                    {conversation.users[1].name[0]}
                  </p>
                  <div className="chat-align">


                  <p className={"con-title" + (lightTheme ? "" : " dark")}>
                    {conversation.users[1].name}
                  </p>

                  <p className="con-lastMessage">
                    No previous Messages, click here to start a new chat
                  </p>
                  </div>

                </div>
              </div>
            );
          } else {
            return (
              <div
                key={index}
                className="conversation-container"
                onClick={() => {
                  navigate(
                    "chat/" +
                      conversation._id +
                      "&" +
                      conversation.users[1].name
                  );
                }}
              >
                <p className={"con-icon" + (lightTheme ? "" : " con-icon-dark")}>
                  {conversation.users[1].name[0]}
                </p>
                <div className="chat-align">
                <p className={"con-title" + (lightTheme ? "" : " con-title-dark")}>
                  {conversation.users[1].name}
                </p>

                <p className="con-lastMessage">
                  {conversation.latestMessage.content}
                </p></div>





              
              </div>
            );
          }
        })}
      </div>
    </div>
   
    </>
  )
}
