import React from 'react'
import { NavLink } from 'react-router-dom'
import '../assets/css/mainstyle.css'

const NavbarComp = () => {
  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-lg z-4 position-fixed w-100 fixed-top ">
  <NavLink className="navbar-brand " to={'/'}>
    <img src='/logo.png' className='rounded logo mx-5 my-2'alt='logo'></img>
    </NavLink>
  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav d-flex justify-content-end align-items-center ms-auto me-5">
      <li className="nav-item active">
        <NavLink className="nav-link" to={"/"}>Home</NavLink>
      </li>
     
      <li className="nav-item">
        <NavLink className="nav-link" to={"/"}>Parimal Share</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to={"/"}>Air Face</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to={"/"}>Prisha AI</NavLink>
      </li>
      <li className="nav-item">
    <NavLink className="btn btn-primary my-2 my-sm-0 mb-sm-2 mb-md-2 mb-lg-0" to={'/signup'}>Signup</NavLink>
        </li> 
        <li className="nav-item">

      <NavLink className="btn btn-warning my-2 my-sm-0 mx-2 text-primary-emphasis nav-btn" to={'/login'}>Login</NavLink>
        </li>
    </ul>
   
  </div>
</nav>
    
    </>
  )
}

export default NavbarComp