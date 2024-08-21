const mysql = require("mysql2");
require("dotenv").config();

const database = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PSWORD,
  database: process.env.DB_DATABASE,
});

database.connect();

module.exports = database;
