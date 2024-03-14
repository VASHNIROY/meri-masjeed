// import { connection } from "../utils/db.js";
import { createSuperAdminTable } from "./superadminTable.js";
import { createMasjeedTable } from "./masjeedTable.js";
import { createAdminTable } from "./adminTable.js";
import { createPrayerTimingsTable } from "./prayerTimingsTable.js";
import { adminStaffTable } from "./adminStaffTable.js";
import { messageTable } from "./messageTable.js";
import { favouriteMasjeedsTable } from "./favouritemasjeeds.js";
import { pool } from "../utils/db.js";
import { ramzanTable } from "./ramzantimings.js";
import { ramzanFile } from "./ramzanfile.js";


const tableToCreate = [
  { tableName: "Super Admin", sql: createSuperAdminTable },
  {
    tableName: "Admin Table",
    sql: createAdminTable,
  },
  {
    tableName: "Masjeed Table",
    sql: createMasjeedTable,
  },
  {
    tableName: "Prayer Timings Table",
    sql: createPrayerTimingsTable,
  },
  {
    tableName: "Admin Staff",
    sql: adminStaffTable,
  },
  {
    tableName: "Message Table",
    sql: messageTable,
  },
  {
    tableName: "Favourite Masjeeds Table",
    sql: favouriteMasjeedsTable,
  },
  {
    tableName: "Ramzon table",
    sql: ramzanTable,
  },
  {
    tableName: "Ramzan file table",
    sql: ramzanFile,
  },
 
];

// export const createTables = () => {
//   for (const table of tableToCreate) {
//     connection.query(table.sql, (err) => {
//       if (err) throw err;
//       console.log(`${table.tableName} table created successfully!`);
//     });
//   }
// };

export const createTables = () => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Database Connection Error:", err);
      return;
    }

    for (const table of tableToCreate) {
      connection.query(table.sql, (queryErr) => {
        if (queryErr) {
          console.error(`Error creating ${table.tableName} table:`, queryErr);
        } else {
          console.log(`${table.tableName} table created successfully!`);
        }
      });
    }

    connection.release(); // Release the connection back to the pool
  });
};
