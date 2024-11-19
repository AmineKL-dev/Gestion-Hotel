import mysql from "mysql2";
import express from "express";

const app = express();
const port = 3306;

// Create connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "aminesql",
  database: "Hoteldb", 
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error(`There is an error: ${err.message}`);
  } else {
    console.log("MySQL Server connected successfully!");
  }
});

// Set up a test route
app.get("/", (req, res) => {
  res.send("Welcome to the Express Server!");
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});