// cron/deleteExpiredMessages.js

import { pool } from "../utils/db.js";

// Define a function to delete expired messages
export const deleteExpiredMessages = async () => {
  try {
    const currentDateTime = new Date();

    const deleteQuery = `
      DELETE FROM message
      WHERE expirydate <= ?
    `;

    const deletedRows = await pool.query(deleteQuery, [currentDateTime]);
    console.log(`${deletedRows.affectedRows} expired message(s) deleted.`);
  } catch (error) {
    console.error("Error deleting expired messages:", error);
  }
};
