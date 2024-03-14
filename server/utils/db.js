import mysql from "mysql";
import dotenv from "dotenv";
dotenv.config();

// export const connection = mysql.createConnection({
//   port: process.env.DBPORT,
//   host: process.env.HOST,
//   user: process.env.USER,
//   password: process.env.PASSWORD,
//   database: process.env.DB,
// });

export const pool = mysql.createPool({
  connectionLimit: 10, 
  port: process.env.DBPORT,
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DB,
});
