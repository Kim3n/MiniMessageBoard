const postgres = require("postgres");
require("dotenv").config();

console.log("DB_USER:", process.env.DB_USER);

const sql = postgres({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  ssl: false,
});

module.exports = sql;
