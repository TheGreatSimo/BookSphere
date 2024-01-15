import mongoose from 'mongoose'
import express from "express";

mongoose.connect('mongodb://localhost/haja');

const db = mongoose.connection;
const app = express();

db.on('error', console.error.bind(console, 'MongoDb connectio error:'))

db.once('open', () => {
  console.log("Connection to Mongoode");
  app.listen(3000, () => {
    console.log("the back is running on http://localhost:3000");
  });
})

