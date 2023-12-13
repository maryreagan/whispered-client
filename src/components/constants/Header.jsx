import React from 'react'
import './constants.css'
import logo from '../assets/Group-2.png'
function Header({clearLocalStorage}) {
    
  return (
    <div className='header-content'>
        <img src={logo} alt="logo" />
        <button onClick={clearLocalStorage}>Logout</button>
    </div>
  )
}

export default Header