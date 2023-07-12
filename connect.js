import mysql from "mysql";

export const db = mysql.createConnection({
  host: "socialApp",
  user: "root",
  password: "123456",
  database: "social",
});
