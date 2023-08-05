'use client';
import React, {useEffect, useState} from 'react'
import styles from '../styles';

const Explore = () => {
  

  const [message, setMessage] = useState("Loading");
  
  
  return (
    <section>
      <h1>{message}</h1>
    </section>
  )
  
};

export default Explore;
