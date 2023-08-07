import React, { useContext, useEffect, useState } from 'react';
import './footer.css';
import CarbonFootprintContext from '../CarbonFootprintContext.js';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';

const Footer = () => {
  const { postcode, data, total } = useContext(CarbonFootprintContext);
  const [neighborhoodData, setNeighborhoodData] = useState(null);
  const [showComparison, setShowComparison] = useState(false);

  useEffect(() => {
    if (showComparison) {
      const url = `http://localhost:8080/api/compareFootprint`;

      // Get total emissions value as a number
      const totalEmissions = parseFloat(total.replace(/[^\d\.]/g,''));

      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          emissons: totalEmissions,
          postcode: postcode
        })
      })
        .then(response => response.json())
        .then(data => {
          setNeighborhoodData(data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  }, [postcode, total, showComparison]);

  // Prepare the data for the BarChart
  const barData = neighborhoodData
    ? [
        {
          name: 'Carbon Footprint',
          User: (neighborhoodData.user * 1000),
          Neighborhood: neighborhoodData.neighborhood,
        },
      ]
    : [];

  return (
    <div className="footer">
      <div className="carbon__compare-heading">
          <h1 className="gradient__text">Compare Your Carbon Footprint With Your Neighborhood</h1>
          
      </div>
      <button onClick={() => setShowComparison(!showComparison)} className="compare-button">
        {showComparison ? 'Hide Comparison' : 'Show Comparison'}
      </button>
      {showComparison && neighborhoodData && (
        <div>
          <BarChart width={500} height={300} data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="User" fill="#8884d8" />
            <Bar dataKey="Neighborhood" fill="#82ca9d" />
          </BarChart>
        </div>
      )}
      <div className='footer__text'>
        This chart displays where you stand in terms of your carbon footprint in your neighborhood
      </div>
    </div>
  )
}

export default Footer;
