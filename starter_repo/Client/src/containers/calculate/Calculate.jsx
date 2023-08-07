import React, { useContext, useState } from 'react';
import './calculate.css';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import CarbonFootprintContext from '../CarbonFootprintContext.js';


const Calculate = () => {
    const { postcode, setPostcode, data, setData, total, setTotal } = useContext(CarbonFootprintContext);
    //const [postcode, setPostcode] = useState('');
    const [gasBill, setGasBill] = useState('');
    const [electricityBill, setElectricityBill] = useState('');
    const [result, setResult] = useState('');
    //const [data, setData] = useState([]);

    const COLORS = ['#AE67FA', '#F49867'];

    const handleCalculateClick = () => {
        // Conversion factors
        const elecConversionFactor = 0.000707; // Metric tons CO2 per kWh
        const gasConversionFactor = 0.0053; // Metric tons CO2 per therm

        // Costs per unit of energy (AUD)
        const elecCostPerKwh = 0.25; // AUD per kWh
        const gasCostPerTherm = 0.02; // AUD per therm

        // Ensure the inputs are numbers
        if (isNaN(electricityBill) || isNaN(gasBill)) {
            setResult('Please enter valid numbers for electricity and gas bills.');
        } else {
            // Calculate the energy consumption from the bill
            const elecEnergy = electricityBill / elecCostPerKwh;
            const gasEnergy = gasBill / gasCostPerTherm;

            // Calculate the carbon emissions
            const elecEmissions = elecEnergy * elecConversionFactor;
            const gasEmissions = gasEnergy * gasConversionFactor;
            const totalEmissions = elecEmissions + gasEmissions;

            const resultText = `Total carbon emissions: ${totalEmissions.toFixed(2)} metric tons CO2`;
            setResult(resultText);
            setTotal(resultText);

            // Update the data for the pie chart
            setData([
              { name: 'Electricity', value: elecEmissions },
              { name: 'Gas', value: gasEmissions },
          ]);
          
        }
    }

    return (
      
        <div className="carbon__calculate section__margin" id="wgpt3">
            <div className="carbon__calculate-heading">
                <h1 className="gradient__text">Calculate Your Carbon Footprint</h1>
                <p>Enter your Postcode, Electricity and Gas bills</p>
            </div>
            <div className="carbon__calculator-container">
            <div className="input-field">
                    <label>
                        Postcode:
                    </label>
                    <input
                        type="text"
                        value={postcode}
                        onChange={(e) => setPostcode(e.target.value)}
                        
                    />
                </div>
                <div className="input-field">
                    <label>
                        Gas Bill:
                    </label>
                    <input
                        type="text"
                        value={gasBill}
                        onChange={(e) => setGasBill(e.target.value)}
                        placeholder="$"
                    />
                </div>
                <div className="input-field">
                    <label>
                        Electricity Bill:
                    </label>
                    <input
                        type="text"
                        value={electricityBill}
                        onChange={(e) => setElectricityBill(e.target.value)}
                        placeholder="$"
                    />
                </div>
                <button onClick={handleCalculateClick} className="calculate-button">
                    Calculate
                </button>
                <div className="result">
                    {result}
                </div>
                
                {data.length > 0 && (
                    <PieChart width={400} height={400}>
                        <Pie
                            dataKey="value"
                            isAnimationActive={false}
                            data={data}
                            cx={200}
                            cy={200}
                            outerRadius={80}
                            fill="#8884d8"
                            label
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                )}
            </div>
        </div>
       
    );
}

export default Calculate;
