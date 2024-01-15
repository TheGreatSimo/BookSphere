import express from "express";

const app = express();

app.listen(3000, () => {
  console.log("the back is running on http://localhost:3000");
});
