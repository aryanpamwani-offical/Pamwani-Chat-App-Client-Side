import React,{useState,useContext,useEffect} from 'react'

import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import  '../assets/css/mainstyle.css';
import ChatLeft from '../Components/ChatAlignment/ChatLeft';
import ChatRight  from "../Components/ChatAlignment/ChatRight";
import {  useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Skeletons from '../Components/Skeleton'

import axios from "axios";
import { myContext } from "../Components/Maincomponent";
import io from 'socket.io-client';
import InputEmoji from 'react-input-emoji'
const ENDPOINT=process.env.REACT_APP_CHAT;
var socket;
export const Chatarea = () => {
  const lightTheme=useSelector((state)=>state.themeKey);
  const [messageContent, setMessageContent] = useState("");
 
  const dyParams = useParams();
  const [chat_id, chat_user] = dyParams._id.split("&");
 
  const [allMessages, setAllMessages] = useState([]);
  
  const { refresh, setRefresh } = useContext(myContext);
  const [loaded, setloaded] = useState(false);
  const [socketStatus,setSoketStatus]=useState(false);
  const [allMessagesCopy,setAllMessagesCopy]=useState([]);
 
  const userData = JSON.parse(localStorage.getItem("userData"));
 
 
  
  let response=null;
  const sendMessage = () => {

   
    const config = {
      headers: {
        Authorization: `Bearer ${userData.data.token}`,
      },
    };
    axios
      .post(
        process.env.REACT_APP_CHAT_MESSAGE_API,
        {
          content: messageContent,
          chatId: chat_id,
        },
        config
      )
      .then(({ data }) => {
        
       response=data;
      });
      socket.emit("newMessage",response)
    };

    
    useEffect(() => {
      socket=io(ENDPOINT);
      socket.emit('setup',userData);
      socket.on('connection',()=>{
        setSoketStatus(!socketStatus);
      });
      socket.connect();
      return () => {
        socket.disconnect();
      }
      
    }, );
    useEffect(() => {
      socket.on("message received",(newMessage)=>{
    if (!allMessagesCopy||allMessagesCopy._id===newMessage._id) {
      
    }else{
      setAllMessages([...allMessages],newMessage)
    }
      })
    }, )
  useEffect(() => {
    
    const config = {
      headers: {
        Authorization: `Bearer ${userData.data.token}`,
      },
    };
    axios.get(`${process.env.REACT_APP_CHAT_MESSAGE_API}/${chat_id}`, config)
      .then(({ data }) => {
        
        setAllMessages(data);
        socket.emit("join chat",chat_id)
        setloaded(true);
     
      });
      setAllMessagesCopy(allMessages)
    
  }, [refresh, chat_id, userData.data.token,allMessages]);



 const handleChange=(messageContent)=>{
  setMessageContent(messageContent)
 }

 



  


  
    return (
    <>
      
{!loaded ?<Skeletons/>:
      <div className="chatarea-container">
      <div className={"chat-header"+ (lightTheme?" ":" dark")}>
        <div>
          <IconButton>
            <p className="con-icon">
            {chat_user[0]}

            </p>
            <p className={"con-title"+ (lightTheme?" ":" dark")}> {chat_user}</p>
          </IconButton>

        </div>
        <div>
          <IconButton>
            <DeleteIcon className={"icons"+ (lightTheme?" ":" dark")}/></IconButton>
        </div>
      </div>
      <div className={"chat-box"+ (lightTheme?" ":" dark")} >
        <div className={"chat-align"+ (lightTheme?" ":" dark")} >
        {allMessages
            .slice(0)
           
            .map((message, index) => {
              const sender = message.sender;
              const self_id = userData.data._id;
              if (sender._id === self_id) {
               
                
                return <ChatRight chatmessage={message.content}  key={index}/>;
              } else {
               
                return <ChatLeft chatmessage={message.content} key={index}/>;
              }
            })}
       
       
        </div>
        
      </div>
      <div className={"msg-area"+ (lightTheme?" ":" dark")} > 
        <div className={'msg-box'+ (lightTheme?" ":" dark")}>
        <InputEmoji  name="messageContent" 
           value={messageContent}
           onChange={handleChange}
           
         
          placeholder=" " id="" />
        </div>
        <div className='msg-content'>
       
           
          
          {messageContent?
          
            
            <IconButton 
           onClick={() => {
            sendMessage();
            setRefresh(!refresh);
          }}
          >
            <SendIcon className={"icons"+ (lightTheme?" ":" dark")}/>
          </IconButton >: <IconButton 
           
          >
            <SendIcon className={"icons"+ (lightTheme?" ":" dark")}/>
          </IconButton > }
         
        </div>
      </div>
    </div>} </>
    )
    
    
  }     
      


    
      
    
  

