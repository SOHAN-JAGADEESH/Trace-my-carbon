import React from 'react';
import './navbar.css';


const Navbar = () => {
  return (
    <div className='carbon__navbar'>
      <div className='carbon__navbar-links'>
        <div className="carbon__navbar-links_logo">
          <h3 className="gradient__text">Trace My Carbon</h3>
        </div>
        <div className="carbon__navbar-links_container">
          <p><a href="#calculate"> </a></p>
        </div>
      </div>
    </div>
  )
}

export default Navbar
