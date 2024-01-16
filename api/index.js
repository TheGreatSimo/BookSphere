import mongoose from "mongoose";
import express from "express";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import cors from "cors"; // Import the cors middleware

mongoose.connect("mongodb://localhost/haja");

const db = mongoose.connection;
const app = express();
app.use(express.json());

app.use(cors());

db.on("error", console.error.bind(console, "MongoDb connectio error:"));

db.once("open", () => {
  console.log("Connection to Mongoode");
});

app.listen(3000, () => {
  console.log("the back is running on http://localhost:3000");
});



app.use("/api/user", userRouter);

app.use("/api/auth", authRouter);

app.get("/", (req, res) => {
  res.json({
    message: "API is working",
  });
});


app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";

  // Use next(err) instead of return res.status(statusCode).json({...})
  next(err);
  
  // Optionally, you can still send a JSON response to the client
  res.status(statusCode).json({
    success: false,
    error: message,
    statusCode,
  });
});
