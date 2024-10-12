"use strict";
const mysql = require("mysql2");
require("dotenv").config();
const database = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  reconnect: true, // 재연결 설정
  connectionLimit: 10, // 연결 제한 (필요 시 조정)
});
// database.connect();
function handleDisconnect() {
  database.connect((err) => {
    if (err) {
      console.error("Error connecting to MySQL:", err);
      setTimeout(handleDisconnect, 2000); // 2초 후 재시도
    } else {
      console.log("Connected to MySQL!");
    }
  });

  database.on("error", (err) => {
    console.error("MySQL connection error:", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      handleDisconnect(); // 연결이 끊어졌을 때 재연결
    } else {
      throw err;
    }
  });
}

handleDisconnect();
module.exports = database;
