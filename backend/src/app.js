"use strict";
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const http = require("http");
const app = express();
// 라우팅
const route = require("./routes");
const cookieOption = {
  httpOnly: true,
  secure: true,
  sameSite: true,
};
const corsOption = {
  origin: true,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTION"],
};
dotenv.config();
app.use(express.static(path.join(__dirname, ".")));
// app.use(express.static(path.join(__dirname, "../../frontend/dist")));
app.use(bodyParser.json());
//URL을 통해서 전달되는 데이터에 한글, 공백 등과 같은 문자가 포함될 경우 제대로 인식되지 않는 문제 해결
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(cookieOption));
app.use(cors(corsOption));
app.get("/", (req, res) => {
  console.log(req);
  res.sendFile(path.join(__dirname, "./index.html"));
});
app.use("/", route);
module.exports = app;
