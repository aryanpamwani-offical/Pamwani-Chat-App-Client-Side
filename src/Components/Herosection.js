import React from 'react'
import {NavLink, useNavigate} from 'react-router-dom'
const Herosection = () => {
  return (
    <>
    <div className="container-fluid positon-relative mt-5">
        <div className="row d-flex justify-content-around">
          <div className="col-6 d-flex flex-column my-auto">
            

<h1 className='p-3'>Simplify Your Digital Life with <span className='text-primary'>Self Connect Chat App</span></h1>
<div className='px-3'>

<NavLink to={'/signup'}><button className='rounded-4 bg-primary text-white hero-btn my-2 w-25 w-md-50 w-sm-75 w border-0'>Get Started</button>
</NavLink></div>
          </div>
          <div className="col-6   rounded mt-5">
            <img src="/hero.jpg" className='rounded-5 hero mt-5' alt="" />
          </div>
        </div>
       
    </div>
    </>
  )
}

export default Herosection