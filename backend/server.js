import express from "express";
import path from "path";
import dotenv from "dotenv";
import colors from "colors";
import morgan from "morgan";
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

dotenv.config();

connectDB();

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("API is running: MERN Proshop...");
// });

// Endpoints: Mount imported routes to these paths
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

// Paypal API config
app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

const folderDir = path.resolve();
app.use("/uploads", express.static(path.join(folderDir, "/uploads")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(folderDir, "/frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(folderDir, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running: MERN Proshop...");
  });
}

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
