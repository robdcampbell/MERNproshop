import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running: MERN Proshop...");
});

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

//Paypal API config
app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

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
