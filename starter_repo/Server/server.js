const express = require("express");
const app = express();
const PORT = 8080;
const cors = require("cors");

app.use(cors());

const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'database-1.coejaf2wua8k.ap-southeast-2.rds.amazonaws.com',
  user: 'admin', 
  password: 'admin123', 
  database: 'initial_db', 
});

connection.connect();

connection.query(
    `CREATE TABLE IF NOT EXISTS neighborhood (
      id INT PRIMARY KEY AUTO_INCREMENT,
      postcode VARCHAR(255),
      avg_gas_bill DECIMAL(10, 2),
      avg_electricity_bill DECIMAL(10, 2)
    )`,
    (error) => {
      if (error) throw error;
    }
  );

const gasEmissionsFactor = 0.006; // kg CO2 per dollar spent
const electricityEmissionsFactor = 0.005; // kg CO2 per dollar spent

app.post("/api/compareFootprint", (req, res) => {
  const { gasBill, electricityBill, postcode } = req.body;
  const userGasFootprint = gasBill * gasEmissionsFactor;
  const userElectricityFootprint = electricityBill * electricityEmissionsFactor;

  // Query to get neighborhood data from the database
  const query = 'SELECT avg_gas_bill, avg_electricity_bill FROM neighborhood WHERE postcode = ?';
  connection.query(query, [postcode], (error, results) => {
    if (error) throw error;

    // Handle case where postcode is not found
    if (results.length === 0) {
      return res.status(404).json({ error: "Postcode not found" });
    }

    const neighborhoodAvgGasBill = results[0].avg_gas_bill;
    const neighborhoodAvgElectricityBill = results[0].avg_electricity_bill;

    const neighborhoodGasFootprint = neighborhoodAvgGasBill * gasEmissionsFactor;
    const neighborhoodElectricityFootprint = neighborhoodAvgElectricityBill * electricityEmissionsFactor;

    res.json({
      user: [userGasFootprint, userElectricityFootprint],
      neighborhood: [neighborhoodGasFootprint, neighborhoodElectricityFootprint]
    });
  });
});


app.get("/api/home", (req,res) => {
    res.json({ message: "Hello World!"});
});

app.listen(PORT, () => {
    console.log('server started on port ${PORT}');
});