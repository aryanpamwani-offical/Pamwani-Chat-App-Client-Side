import React,{useState,useEffect,useContext} from 'react'
import '../assets/css/mainstyle.css'
import '../assets/css/responsive.css'
import {useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSlice } from '../Feature/sliderSlice';
import axios from "axios";
import { myContext } from "./Maincomponent";
import { refreshSidebarFun } from '../Feature/refreshSlice';

export const SliderPhone = () => {
  
  const lightTheme=useSelector((state)=>state.themeKey);
  const sliderPhone=useSelector((state)=>state.toggleSlice);
  const navigate=useNavigate();
  const dispatch=useDispatch();
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
  
   // console.log(data.data)
   setConversations(data.data)

 }).catch((error)=>{
console.log(error)
 });
   
 }, [refresh,conversations,user.token]);


  return (
<>
{sliderPhone ?
<div className={"sb-phone-conversation sb-phone-conversation-resp"+ (lightTheme?" ":" dark")}>
      {conversations.map((conversation, index) => {
        // console.log("current convo : ", conversation);
        if (conversation.users.length === 1) {
          return <div key={index}></div>;
        }
        
          if (conversation.latestMessage === undefined) {
            // console.log("No Latest Message with ", conversation.users[1]);
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
                      "/chat" +
                        conversation._id +
                        "&" +
                        conversation.users[1].name
                    );
                    dispatch(toggleSlice())
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
              <>
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
                  dispatch(toggleSlice());
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





                {/* <p className={"con-timeStamp" + (lightTheme ? "" : " dark")}>
                {conversation.timeStamp}
              </p> */}
              </div>
              
              </>
            );  
          }
        })}
      </div>
      :<div className="slider-none"></div>}
      </>
  )
}

