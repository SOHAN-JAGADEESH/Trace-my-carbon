'use client';
import React, {useEffect, useState} from 'react'
import styles from '../styles';

const Explore = () => {
  

  const [message, setMessage] = useState("Loading");
  
  useEffect(() => {
    fetch("http://localhost:8080/api/home").then(
      response => response.json()
    ).then(
      data => {
        console.log(data)
        setMessage(data.message)
      }
    )
  }, []);
  return (
    <section>
      <h1>{message}</h1>
    </section>
  )
  
};

export default Explore;
