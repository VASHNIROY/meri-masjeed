// cron/deleteExpiredMessages.js

import CatchAsyncError from "../middleware/catchAsyncError.js";
import { pool } from "../utils/db.js";

// Define a function to delete expired messages

export const deleteExpiredMessages = CatchAsyncError(async (req, res, next) => {
  try {
    const currentDateTime = new Date();

    pool.getConnection((err, connection) => {
      if (err) {
        // Handle connection error
        console.error("Error acquiring connection:", err);
        return next(new ErrorHandler("Database Connection Error", 500));
      }

      const deleteQuery = `
        DELETE FROM message
        WHERE expirydate <= ?
      `;

      // Execute the delete query
      connection.query(deleteQuery, [currentDateTime], (error, deletedRows) => {
        connection.release(); // Release the connection back to the pool

        if (error) {
          console.error("Error deleting expired messages:", error);
          return next(new ErrorHandler(error.message, 500));
        }
      });
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});
