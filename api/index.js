import mongoose from "mongoose";
import express from "express";
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'

mongoose.connect("mongodb://localhost/haja");

const db = mongoose.connection;
const app = express();
app.use(express.json())

db.on("error", console.error.bind(console, "MongoDb connectio error:"));

db.once("open", () => {
  console.log("Connection to Mongoode");
});

app.listen(3000, () => {
  console.log("the back is running on http://localhost:3000");
});


app.use('/api/user', userRouter)

app.use('/api/auth', authRouter)

app.get("/", (req, res) => {
  res.json({
    message: "API is working",
  });
});

