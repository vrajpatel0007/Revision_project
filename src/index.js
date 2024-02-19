const express = require("express");
const http = require("http");
const connectDB = require("./db/connect");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const routes = require("./routes/route");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(routes);
app.use(cookieParser());
dotenv.config({
  path: "./.env",
});


connectDB();
app.listen(process.env.PORT || 3000, () => {
  console.log(`server is running at port : ${process.env.PORT}`);
});
