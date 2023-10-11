const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const SchoolroleModel = require("./models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
require("dotenv").config();


const requestRoutes = require('./routes/requests')
const userRoutes = require('./routes/user')

// express app
const app = express();

//middleware
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(cookieParser());

//routes
app.use('/api/requests',requestRoutes)
app.use('/api/user',userRoutes)



mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected to database");
    app.listen(process.env.PORT, () => {
      console.log("listening for requests on port", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
