const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const axios = require("axios");
const razorPayRouter = require("./routes/razorPayRouter");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/razorpay", razorPayRouter);

// // methods
// app.get("/", (req, res) => {
//   res.send("hello world");
// });

// listen
app.listen(4040, () => {
  console.log("listening at port 4040");
});
