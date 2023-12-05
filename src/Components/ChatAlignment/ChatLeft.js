import React from 'react'
import { useSelector } from 'react-redux';
import  '../../assets/css/mainstyle.css';
const ChatLeft = ({chatmessage}) => {
  const lightTheme=useSelector((state)=>state.themeKey);
  return (
    <div className="align-left">
        <div className={"chat-left"+ (lightTheme?" ":" chat-left-dark")} >
          <p>{chatmessage}</p>
        </div></div>
  )
}

export default ChatLeft