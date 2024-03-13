// import { app } from "./app.js";
// import { createTables } from "./models/createTable.js";
// import { connection } from "./utils/db.js";

// const port = process.env.PORT || 3009;

// app.listen(port, () => {
//   console.log(`listening on port: ${port}`);
// });

// connection.connect((err) => {
//   if (err) throw err;
//   console.log("connected to DB");
//   createTables();
// });
import { app } from "./app.js";
import { createTables } from "./models/createTable.js";
import { pool } from "./utils/db.js"; // Import the connection pool instead of the direct connection

const port = process.env.PORT || 3009;

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});

// Use the connection pool to execute table creation queries
pool.getConnection((err, connection) => {
  if (err) {
    console.error("Database Connection Error:", err);
    return;
  }

  // Execute table creation queries
  createTables(connection);

  connection.release(); // Release the connection back to the pool
});
