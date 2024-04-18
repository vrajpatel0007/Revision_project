const express = require("express");
const http = require("http");
const connectDB = require("./src/db/connect");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const routes = require("./src/routes/route");
const passport = require('passport');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());
require("./src/config/passport")
app.use(passport.initialize());
app.use(routes);

dotenv.config({
  path: "./.env",
});
module.exports = app;
app.set("view engine", "ejs");
app.set("views", "./src/views");

app.get("/", (req, res, next) => {
  res.render("index");
});

app.get("/login", (req, res) => {
  res.render("./login");
});

app.get("/OTP", (req, res) => {
  res.render("./OTP");
});

app.get("/verifyotp", (req, res) => {
  res.render("./verifyotp");
});

app.get("/register", (req, res) => {
  res.render("./register");
});

connectDB();
app.listen(process.env.PORT || 3000, () => {
  console.log(`server is running at port : ${process.env.PORT}`);
});
