import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

import productRoutes from "./routes/productRoutes.js";

dotenv.config();

connectDB();

const app = express();

//middleware example/test
/*
app.use((req, res, next) => {
  console.log("HELLO PTERODACTYL");
  console.log(req.originalUrl);
  next();
});
*/

// Create a default Home route"
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/products", productRoutes);

// MiddleWare imported from errorMiddleware.js
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Listening for express on port 5000
// will edit to be an ENV variable later on
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold
  )
);
