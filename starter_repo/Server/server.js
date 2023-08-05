const express = require("express");
const app = express();
const PORT = 8080;
const cors = require("cors");

app.use(cors());
app.use(express.json());

const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'database-1.coejaf2wua8k.ap-southeast-2.rds.amazonaws.com',
  user: 'admin', 
  password: 'admin123', 
  database: 'initial_db', 
});

connection.connect();


const gasEmissionsFactor = 0.006; // kg CO2 per dollar spent
const electricityEmissionsFactor = 0.005; // kg CO2 per dollar spent

app.post("/api/compareFootprint", (req, res) => {
  const { gasBill, electricityBill, postcode } = req.body;
  const userGasFootprint = gasBill * gasEmissionsFactor;
  const userElectricityFootprint = electricityBill * electricityEmissionsFactor;

  // Query to get neighborhood data from the database
  const query = 'SELECT average_emissions_per_customer_per_annum FROM neighborhood WHERE post_code = ?';
connection.query(query, [postcode], (error, results) => {
  if (error) {
    return res.status(500).json({ error: 'An error occurred while querying the database.' });
  }

  // Handle case where postcode is not found
  if (results.length === 0) {
    return res.status(404).json({ error: "Postcode not found" });
  }

  // Assuming average_emissions_per_customer_per_annum contains both gas and electricity emissions
  const neighborhoodEmissions = results[0].average_emissions_per_customer_per_annum;

  // User's emissions
  const userEmissions = userGasFootprint + userElectricityFootprint;

  res.json({
    user: userEmissions,
    neighborhood: neighborhoodEmissions
    });
  });
});


app.get("/api/home", (req,res) => {
    res.json({ message: "Hello World!"});
});

app.listen(PORT, () => {
    console.log('server started on port ${PORT}');
});