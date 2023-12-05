import React from 'react'
import  '../assets/css/mainstyle.css';
import  '../assets/css/responsive.css';
import {NavLink } from 'react-router-dom'
export const Error = () => {
  return (
    <>
    <div className="error-container">
        <div className="error-heading-container">
            <h1 className="error-heading">404</h1>
            </div> 
            <div className="error-paragraph">
                <p className="error-paragraph">Page Not Found</p>
            </div>
            <div className="error-btn-container"><NavLink to={'/'} className="error-anchr"><button className="error-btn" >Return Home</button></NavLink></div>
    </div>
    </>
  )
}

