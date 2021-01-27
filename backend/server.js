const express = require("express");
const products = require("./data/products");

const app = express();

// Create a example route, will log "API is running..."
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p._id == req.params.id);
  res.json(product);
});

// Listening for express on port 5000
// will edit to be an ENV variable later on
app.listen(5000, console.log("Server running on port 5000"));
