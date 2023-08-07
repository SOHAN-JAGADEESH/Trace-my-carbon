import React from 'react';
import './header.css';
import hero from '../../assets/hero1.jpg';

const Header = () => {
  return (
    <div className='carbon__header section__padding'>
      <div className='carbon__header-content'>
        <h1 className='gradient__text'> Know Your Impact To Make An Impact</h1>  
        <p>At Trace Your Carbon, we believe that understanding your carbon footprint is the first step towards creating a positive environmental impact. Our user-friendly carbon footprint calculator empowers you to make informed choices and take meaningful actions to reduce your carbon emissions.</p>      
      </div> 
      <div className='carbon__header-image'>
          <img src={hero} alt="hero"/>  
      </div>
    </div>
  )
}

export default Header
