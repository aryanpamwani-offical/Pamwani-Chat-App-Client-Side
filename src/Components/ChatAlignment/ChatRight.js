import React from 'react'
import { useSelector } from 'react-redux';
import  '../../assets/css/mainstyle.css';
 const ChatRight = ({chatmessage}) => {
  const lightTheme=useSelector((state)=>state.themeKey);
  return (
    <div className="align-right">
    <div className={"chat-right"+ (lightTheme?" ":" chat-right-dark")}>
    <p>{chatmessage}</p>
    </div>
    </div>
  )
}
export default ChatRight