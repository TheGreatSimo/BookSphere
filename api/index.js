import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";

// Load environment variables from .env
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);
const db = mongoose.connection;

// Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use(cookieParser())

// MongoDB connection event handling
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Routes
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

// Default route
app.get("/", (req, res) => {
  res.json({
    message: "API is working",
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";

  // Send a JSON response to the client
  res.status(statusCode).json({
    success: false,
    error: message,
    statusCode,
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
