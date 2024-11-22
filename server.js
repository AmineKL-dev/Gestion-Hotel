import mysql from "mysql2";
import express, { query } from "express";
import cors from "cors"

const app = express();
const port = 3000;
app.use(cors());
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
app.get("/chambre/:N?", (req, res) => {
  const {N}=req.params;
  const query = N
    ? `SELECT * FROM chambre WHERE N_chambre =${N}`
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
app.post("/chambre",(req,res)=>{
  const {num,type,prix}=req.body
  if(!num ||!type ||!prix){
    return res.status(400).send({error:"you must enter these information"})
  }
  const query = 'INSERT INTO chambre (num, type, prix) VALUES (?, ?, ?)';
    db.query(query, [num,type,prix], (err, result) => {
        if (err) {
            console.error('Error executing query:', err.message);
            return res.status(500).send({ error: 'Database error' });
        }
        res.status(201).send({ message: 'User added successfully', id: result.insertId });
    });
});


// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});