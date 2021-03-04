import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();

connectDB();

const app = express();

app.get("/", (req, res) => {
  res.send("API is running: fixed...");
});

app.use("/api/products", productRoutes);

// Middleware
app.use(notFound);
app.use(errorHandler);

// Custom Error handler that only fires in development mode

const PORT = process.env.PORT || 5000;
const mode = process.env.NODE_ENV || "Production";

app.listen(
  PORT,
  console.log(`Server running in ${mode} mode on port ${PORT}`.yellow.bold)
);
