import mysql from "mysql2";
import express, { query } from "express";
import cors from "cors"
import { Axios } from "axios";
import e from "express";
const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());
// Create connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "aminesql",
  database: "hoteldb", 
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
// Get request
app.get("/", (req, res) => {
  res.send("Welcome to the Express Server!");
});
app.get("/chambre/:N?", (req, res) => {
  const {N}=req.params;
  const query = N
    ? `SELECT * FROM chambre WHERE Nchambre =${N}`
    : "SELECT * FROM chambre";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Erreur lors de l'exécution de la requête :", err);
      res.status(500).send("Erreur serveur");
      return;
    }
    res.json(results); // Retourne les données au format JSON
  });
});
// POST request
app.post("/chambre", (req, res) => {
  console.log("Request body:", req.body); // Log to verify the request data

  const { Nchambre, type, prix } = req.body;

  if (!Nchambre || !type || !prix) {
      return res.status(400).json({ error: "Missing required fields" });
  }

  const data = [Nchambre, type, prix];
  const query = "INSERT INTO chambre (Nchambre, type, prix) VALUES (?, ?, ?)";

  db.query(query, data, (err, result) => {
      if (err) {
          console.error("Database error:", err);
          return res.status(500).json({ error: "Failed to insert data" });
      }

      res.status(201).json({ message: "Data inserted successfully", result });
  });
});
// DELETE request
app.delete("/chambre/:N",(req,res)=>{
  const {N}=req.params
  const query=`DELETE FROM chambre WHERE Nchambre=${N};`
  db.query(query,(err,result)=>{
    if(err){
      console.log("error",err)
    }res.json({ message: "Data deleted successfully", result });
  })

})
// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});