import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import connectDB from "./config/db.js";
import products from "./data/products.js";

dotenv.config();

connectDB();

const app = express();

// Create a default Home route"
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Create the Products route
app.get("/api/products", (req, res) => {
  res.json(products);
});

// Individual products route
app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p._id == req.params.id);
  res.json(product);
});

const PORT = process.env.PORT || 5000;

// Listening for express on port 5000
// will edit to be an ENV variable later on
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold
  )
);
