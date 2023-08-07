'use client';
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Chart, { Colors } from 'chart.js/auto';
import styles from '../styles';
import { fadeIn, staggerContainer } from '../utils/motion';

const About = () => {
  const [bills, setBills] = useState({
    gas: '',
    electricity: '',
    postcode: '',
  });

  const [carbonFootprint, setCarbonFootprint] = useState(null);
  const [pieData, setPieData] = useState(null);
  const [barData, setBarData] = useState(null);
  const [showComparison, setShowComparison] = useState(false);
  const pieRef = useRef(null);
  const barRef = useRef(null);
  const chartRef = useRef(null);

  //change the lifecycle of the entire thing
  useEffect(() => {
    if (pieData && pieRef.current) {
      if (chartRef.current) chartRef.current.destroy(); // Destroy previous chart instance

      chartRef.current = new Chart(pieRef.current, {
        type: 'pie',
        data: pieData,
      });
    }
  }, [pieData]);

  useEffect(() => {
    if (barData && barRef.current && showComparison) {
      new Chart(barRef.current, {
        type: 'bar',
        data: barData,
      });
    }
  }, [barData, showComparison]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setBills((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Replace these values with actual emissions factors for your region.
    const gasEmissionsFactor = 0.006; // kg CO2 per dollar spent
    const electricityEmissionsFactor = 0.005; // kg CO2 per dollar spent

    const gasFootprint = bills.gas * gasEmissionsFactor;
    const electricityFootprint = bills.electricity * electricityEmissionsFactor;
    const { gas, electricity, postcode } = bills;

    const totalFootprint = gasFootprint + electricityFootprint;
    setCarbonFootprint(totalFootprint);

    

    // Set up the data for the pie chart
    setPieData({
      labels: ['Gas', 'Electricity'],
      datasets: [
        {
          data: [gasFootprint, electricityFootprint],
          backgroundColor: ['#FF5733', '#33FF57'],
        },
      ],
    });

    fetch('http://localhost:8080/api/compareFootprint', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      gasBill: bills.gas,
      electricityBill: bills.electricity,
      postcode: bills.postcode,
    }),
  })
  .then(response => response.json())
  .then(data => {
    const userEmissions = data.user;
    const neighborhoodEmissions = data.neighborhood;

    setBarData({
      labels: ['User', 'Neighborhood'],
      datasets: [
        {
          data: [userEmissions, neighborhoodEmissions],
          backgroundColor: ['#FF5733', '#33FF57'],
        },
      ],
    });

    // Save the data to the state or pass it to the Explore section as needed
    // e.g., setNeighborhoodEmissions(neighborhoodEmissions);

    console.log('User:', userEmissions, 'Neighborhood:', neighborhoodEmissions);
  })
  .catch(error => {
    console.error('There was an error sending the data to the backend:', error);
  });



    // Reset the form if needed.
    setBills({ gas: '', electricity: '', postcode: '' });
  };

  const handleCompare = () => {
    setShowComparison(true);
  };

  return (
    <section className={`${styles.paddings} relative z-10 flex flex-col justify-center items-center`}style={{height: '200vh'}}>
      <div className="gradient-02 z-0" />
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className={`${styles.innerWidth} mx-auto ${styles.flexCenter} flex-col`}
        
      >
        <div className="video-container">
        <iframe width="1260" 
        height="515" 
        src="https://www.youtube.com/embed/aCu9rZvXRLg" 
        title="Carbon Footprint" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        allowfullscreen>
        </iframe>
        </div>
        <img 
        src="/logo1.svg"
        alt="menu"
        className = "w-[269px] h-[269px] object-contain"
      />
        <form onSubmit={handleSubmit}>
        <h2 className="text-2xl font-semibold mb-4 text-white" >Calculate Your Carbon Footprint</h2>
        <p className='text-white'>Enter your monthly gas and electricity bills to estimate your carbon footprint.</p>
        <div className="mt-4">
          <label htmlFor="postcode" className="block text-sm font-medium text-gray-700">Postcode:</label>
          <input
            type="text"
            name="postcode"
            id="postcode"
            value={bills.postcode}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            placeholder="Enter your postcode"
          />
        </div>
        <div className="mt-4">
          <label htmlFor="gas" className="block text-sm font-medium text-gray-700">Gas Bills:</label>
          <input
            type="number"
            name="gas"
            id="gas"
            value={bills.gas}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            placeholder="Enter your gas bills"
          />
        </div>
        <div className="mt-4">
          <label htmlFor="electricity" className="block text-sm font-medium text-gray-700">Electricity Bills:</label>
          <input
            type="number"
            name="electricity"
            id="electricity"
            value={bills.electricity}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            placeholder="Enter your electricity bills"
          />
        </div>
        <button type="submit" className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Submit
          </button>
        
        </form>
        {carbonFootprint !== null && (
          <>
          <p className="mt-4">
            Your estimated carbon footprint is {carbonFootprint.toFixed(2)} kg of CO2.
          </p>
          <div className="mt-4">
            <canvas ref={pieRef}></canvas>
          </div>
          <p className="mt-4">
            You can compare your carbon footprint with your neighbors
          </p>
          <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleCompare}>
            Compare
          </button>
          {showComparison && (
            <div className="mt-4">
              <canvas ref={barRef}></canvas>
            </div>
          )}
        </>
        )}
      </motion.div>
    </section>
  );
};

export default About;
