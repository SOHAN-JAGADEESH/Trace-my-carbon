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

app.get("/api/home", (req,res) => {
    res.json({ message: "Hello World!"});
});

app.listen(PORT, () => {
    console.log('server started on port ${PORT}');
});