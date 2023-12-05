import React from 'react'
import {Login} from './Pages/Login'
import "./assets/css/mainstyle.css"
import {Routes,Route} from 'react-router-dom'
import {Signup} from './Pages/Signup';
import Maincomponent from './Components/Maincomponent';
import {Chatarea} from './Pages/ChatArea'
import {Welcome} from './Pages/Welcome'
import {User} from './Pages/User'



import Home from './Pages/Home';
import {Error} from './Pages/Error';


const App = () => {
const userData=JSON.parse(localStorage.getItem("userData"))

  

  return (
       
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
    {userData?<>
        <Route path='app' element={<Maincomponent/>}>
        <Route path='chat/:_id' element={<Chatarea/>}/>
        <Route path='welcome' element={<Welcome/>}/>
        <Route path='user' element={<User/>}/>
         {/* <Route path='' element={<SliderPhone/>}/>  */}
        </Route></>:
        <Route path="*" element={<Error/>}/> 
        
        
        }
        <Route path="*" element={<Error/>}/> 
        
      </Routes>
    
  )
}

export default App