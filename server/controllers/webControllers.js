import ErrorHandler from "../utils/ErrorHandler.js";
// import { connection } from "../utils/db.js";
import CatchAsyncError from "../middleware/catchAsyncError.js";
import { fileURLToPath } from "url";
import { pool } from "../utils/db.js";

import xlsx from "xlsx";
import path from "path";

import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const addMasjeed = CatchAsyncError(async (req, res, next) => {
  try {
    const filename = req.file ? req.file.filename : null;

    const {
      adminname,
      address,
      email,
      postalcode,
      city,
      state,
      country,
      phonenumber,
      masjeedname,
    } = req.body;

    if (!filename) {
      res.status(400).json({ error: "No file uploaded" });
      return;
    }

    const excelExtensions = [".xls", ".xlsx"];

    // Check if the uploaded file has a valid Excel extension
    const isValidExcelFile = excelExtensions.some((ext) =>
      filename.endsWith(ext)
    );
    if (!isValidExcelFile) {
      res.status(400).json({ error: "Please upload an Excel file" });
      return;
    }

    const verifyEmailQuery = `SELECT email FROM masjeed WHERE email = ?`;
    pool.getConnection((err, connection) => {
      if (err) {
        return next(new ErrorHandler("Database Connection Error", 500));
      }
      connection.query(verifyEmailQuery, [email], (error, results) => {
        connection.release(); // Release the connection back to the pool

        if (error) {
          return next(new ErrorHandler(error.message, 500));
        }

        if (results.length > 0) {
          return next(new ErrorHandler("Email already exists", 400));
        }

        const addMasjeedQuery = `INSERT INTO masjeed (adminname,masjeedname,status,address,email,postalcode,city,state,country,phonenumber,prayerdetails) VALUES (?,?,?,?,?,?,?,?,?,?,?)`;

        connection.query(
          addMasjeedQuery,
          [
            adminname,
            masjeedname,
            0,
            address,
            email,
            postalcode,
            city,
            state,
            country,
            phonenumber,
            filename,
          ],
          (insertError) => {
            if (insertError) {
              console.error(
                "Error inserting filename into the database:",
                insertError
              );
              return next(new ErrorHandler("Internal Server Error", 500));
            }

            console.log("Masjeed inserted into the database");
            res
              .status(200)
              .json({ success: true, message: "File uploaded successfully" });
          }
        );
      });
    });
  } catch (error) {
    console.log("Error:", error);
    return next(new ErrorHandler(error.message, 400));
  }
});

export const todaySchedule = CatchAsyncError(async (req, res, next) => {
  try {
    const masjeedid = req.params.id;
    // Fetch filename from the database
    const selectQuery = "SELECT * FROM prayertimingstable WHERE masjeedid = ?";
    pool.getConnection((err, connection) => {
      if (err) {
        return next(new ErrorHandler("Database Connection Error", 500));
      }
      connection.query(selectQuery, [masjeedid], (selectError, results) => {
        connection.release(); // Release the connection back to the pool

        if (selectError) {
          console.error(
            "Error fetching prayer details from the database:",
            selectError
          );
          return next(new ErrorHandler("Internal Server Error", 500));
        }

        // Get today's date
        const today = new Date();
        const todayMonth = today.getMonth() + 1; // Month is 0-indexed in JavaScript
        const todayDay = today.getDate();
        // Filter data for today's month and day

        const todayTimeSchedule = results.filter(
          (row) => row.month == todayMonth && row.day == todayDay
        );

        const todayTimings = [
          ...todayTimeSchedule.map((row) => ({
            id: "1",
            name: "fajr",
            starttime: row.fajr,
            endtime: calculateEndTime(row.fajr, row.fajriqamah),
          })),
          ...todayTimeSchedule.map((row) => ({
            id: "2",
            name: "dhuhr",
            starttime: row.dhuhr,
            endtime: calculateEndTime(row.dhuhr, row.dhuhriqamah),
          })),
          ...todayTimeSchedule.map((row) => ({
            id: "3",
            name: "asr",
            starttime: row.asr,
            endtime: calculateEndTime(row.asr, row.asriqamah),
          })),
          ...todayTimeSchedule.map((row) => ({
            id: "4",
            name: "maghrib",
            starttime: row.maghrib,
            endtime: calculateEndTime(row.maghrib, row.maghribiqamah),
          })),
          ...todayTimeSchedule.map((row) => ({
            id: "5",
            name: "isha",
            starttime: row.isha,
            endtime: calculateEndTime(row.isha, row.ishaiqamah),
          })),
        ];

        const masjeedDetailsQuery = "SELECT * FROM masjeed WHERE id = ?";

        connection.query(
          masjeedDetailsQuery,
          [masjeedid],
          (fetchError, results) => {
            if (fetchError) {
              console.error(
                "Error fetching prayer details from the database:",
                selectError
              );
              return next(new ErrorHandler("Internal Server Error", 500));
            }

            if (results.length === 0) {
              return next(new ErrorHandler("Masjeed Not Found", 404));
            }

            const today = new Date();

            const options = {
              weekday: "long",
              day: "2-digit",
              month: "long",
              year: "numeric",
            };

            const formattedDate = new Intl.DateTimeFormat(
              "en-US",
              options
            ).format(today);

            const now = new Date(); // Current time

            let nearestPrayer = null;
            let nearestTimeDifference = Infinity;

            todayTimings.forEach(({ name, starttime }) => {
              const [prayerHour, prayerMinute] = starttime
                .split(":")
                .map(Number);
              let prayerTime = new Date(
                now.getFullYear(),
                now.getMonth(),
                now.getDate(),
                prayerHour,
                prayerMinute
              );

              // If the prayer time has already passed for today, set it to the next day
              if (prayerTime < now) {
                prayerTime = new Date(
                  now.getFullYear(),
                  now.getMonth(),
                  now.getDate() + 1,
                  prayerHour,
                  prayerMinute
                );
              }

              const timeDifference = prayerTime - now;
              if (timeDifference < nearestTimeDifference) {
                nearestTimeDifference = timeDifference;
                nearestPrayer = {
                  name,
                  hours: Math.floor(timeDifference / (1000 * 60 * 60)),
                  minutes: Math.floor(
                    (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
                  ),
                };
              }
            });

            results.forEach((result) => {
              result.date = formattedDate;
            });

            if (nearestPrayer) {
              results.forEach((result) => {
                result.nearestPrayer = ` ${nearestPrayer.name} in ${nearestPrayer.hours} hours and ${nearestPrayer.minutes} minutes.`;
              });
            } else {
              results.forEach((result) => {
                result.nearestPrayer = "There are no more prayers today.";
              });
            }

            results = results[0];

            res.json({
              success: true,
              message: "fetched Majeed details",
              results,
              todayTimings,
            });
          }
        );
      });
    });
  } catch (error) {
    console.log("Error:", error);
    return next(new ErrorHandler(error.message, 400));
  }
});

function calculateEndTime(startTime, iqamah) {
  // Assuming iqamah time is given in minutes
  const startTimeParts = startTime.split(":");
  const hours = parseInt(startTimeParts[0]);
  const minutes = parseInt(startTimeParts[1]);

  const iqamahMinutes = parseInt(iqamah);

  const endMinutes = minutes + iqamahMinutes;
  const endHours = hours + Math.floor(endMinutes / 60);
  const formattedEndMinutes = endMinutes % 60;

  return `${endHours}:${formattedEndMinutes}`;
}

export const databaseCountries = CatchAsyncError(async (req, res, next) => {
  try {
    const coutriesQuery = `SELECT DISTINCT country FROM masjeed WHERE country IS NOT NULL AND status = 1 ORDER BY country ASC `;

    pool.getConnection((err, connection) => {
      if (err) {
        return next(new ErrorHandler("Database Connection Error", 500));
      }
      connection.query(coutriesQuery, (selectError, results) => {
        connection.release();

        if (selectError) {
          console.error("Error fetching countries from the database:");
          return next(new ErrorHandler("Internal Server Error", 500));
        }
        if (results.length === 0) {
          return next(new ErrorHandler("No Countries Found", 404));
        }

        res.json({
          success: true,
          message: "Fetched Countries",
          data: results,
        });
      });
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

export const databaseStates = CatchAsyncError(async (req, res, next) => {
  try {
    const { country } = req.query;

    const statesQuery = `SELECT DISTINCT state FROM masjeed WHERE country = ? AND state IS NOT NULL AND status = 1 ORDER BY state ASC`;
    pool.getConnection((err, connection) => {
      if (err) {
        return next(new ErrorHandler("Database Connection Error", 500));
      }
      connection.query(statesQuery, [country], (selectError, results) => {
        connection.release(); // Release the connection back to the pool

        if (selectError) {
          console.error("Error fetching states from the database:");
          return next(new ErrorHandler("Internal Server Error", 500));
        }
        if (results.length === 0) {
          return next(new ErrorHandler("No States Found", 404));
        }
        res.json({ success: true, message: "Fetched States", data: results });
      });
    });
  } catch (error) {
    return next(new ErrorHandler("Internal Server Error", 500));
  }
});

export const databaseCities = CatchAsyncError(async (req, res, next) => {
  try {
    const { country, state } = req.query;
    const citiesQuery = `SELECT DISTINCT city FROM masjeed WHERE country = ? AND state = ? AND city IS NOT NULL AND status = 1 ORDER BY city ASC`;
    pool.getConnection((err, connection) => {
      if (err) {
        return next(new ErrorHandler("Database Connection Error", 500));
      }
      connection.query(
        citiesQuery,
        [country, state],
        (selectError, results) => {
          connection.release(); // Release the connection back to the pool

          if (selectError) {
            console.error("Error fetching cities from the database:");
            return next(new ErrorHandler("Internal Server Error", 500));
          }
          if (results.length === 0) {
            return next(new ErrorHandler("No Cities Found", 404));
          }

          res.json({ success: true, message: "Fetched Cities", data: results });
        }
      );
    });
  } catch (error) {
    return next(new ErrorHandler("Internal Sever Error", 500));
  }
});

export const databaseMasjeeds = CatchAsyncError(async (req, res, next) => {
  try {
    const { country, state, city } = req.query;

    const databasemasjeedsQuery = `SELECT id, masjeedname FROM masjeed WHERE country = ? AND state = ? AND city = ? AND status = 1 ORDER BY masjeedname ASC`;
    pool.getConnection((err, connection) => {
      if (err) {
        return next(new ErrorHandler("Database Connection Error", 500));
      }
      connection.query(
        databasemasjeedsQuery,
        [country, state, city],
        (selectError, results) => {
          connection.release(); // Release the connection back to the pool

          if (selectError) {
            console.error("Error fetching masjeeds from the database:");
            return next(new ErrorHandler("Internal Server Error", 500));
          }
          if (results.length === 0) {
            return next(new ErrorHandler("No masjeeds Found", 404));
          }

          res.json({
            success: true,
            message: "Fetched masjeeds",
            data: results,
          });
        }
      );
    });
  } catch (error) {
    return next(new ErrorHandler("Internal Server Error", 500));
  }
});

export const getWebMessages = CatchAsyncError(async (req, res, next) => {
  try {
    const { masjeedid } = req.query;

    const getmasjeedmessagesQuery = `SELECT * FROM message WHERE masjeedid = ?`;
    pool.getConnection((err, connection) => {
      if (err) {
        return next(new ErrorHandler("Database Connection Error", 500));
      }

      const formatDate = (dateString) => {
        if (!dateString) return ""; // Return empty string if dateString is null or undefined

        const dateObj = new Date(dateString);
        const day = dateObj.toLocaleString("en-US", { day: "2-digit" });
        const month = dateObj.toLocaleString("en-US", { month: "short" });
        const year = dateObj.toLocaleString("en-US", { year: "numeric" });
        const hours = dateObj.toLocaleString("en-US", {
          hour: "2-digit",
          hour12: true,
        });
        const minutes = dateObj.toLocaleString("en-US", { minute: "2-digit" });

        return `${day} ${month} ${year}, ${hours}:${minutes}`;
      };

      connection.query(
        getmasjeedmessagesQuery,
        [masjeedid],
        (error, results) => {
          connection.release(); // Release the connection back to the pool

          if (error) {
            return next(new ErrorHandler("Internal Server Error", 500));
          }

          if (results.length === 0) {
            return next(new ErrorHandler("Messages Not Found", 404));
          }

          const formattedResults = results.map((result) => ({
            ...result,
            startdate: formatDate(result.startdate),
            expirydate: formatDate(result.expirydate),
            enddate: formatDate(result.enddate),
          }));

          res.json({
            success: true,
            message: "Messages Fetched",
            data: formattedResults,
          });
        }
      );
    });
  } catch (error) {
    return next(new ErrorHandler("Internal Server Error", 500));
  }
});

export const getRamzanTimings = CatchAsyncError(async (req, res, next) => {
  try {
    pool.getConnection((err, connection) => {
      if (err) {
        return next(new ErrorHandler("Database Connection Error", 500));
      }

      const checkRamzanStatus = `SELECT ramzanstatus from masjeed LIMIT 1`;

      connection.query(checkRamzanStatus, (selectErr, output) => {
        if (selectErr) {
          console.error("Error fetching ramzan status", selectErr);
          return next(new ErrorHandler("Internal Server Error", 500));
        }

        if (output[0].ramzanstatus === 0) {
          return next(new ErrorHandler("status Not Found", 404));
        }

        const selectRamzanQuery = `SELECT * FROM ramzan`;

        connection.query(selectRamzanQuery, (selectErr, results) => {
          connection.release(); // Release the connection back to the pool

          if (selectErr) {
            console.error("Error fetching ramzan timings:", selectErr);
            return next(new ErrorHandler("Internal Server Error", 500));
          }

          if (results.length === 0) {
            return next(new ErrorHandler("Timings Not Found", 404));
          }

          const today = new Date(); // Get current date and time
          const todayDate = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate()
          ); // Get date without time

          const filteredResults = results.filter((item) => {
            // Check if the date part of the 'date' property matches today's date
            const itemDate = new Date(item.date); // Convert the 'date' property to a Date object
            const itemDateWithoutTime = new Date(
              itemDate.getFullYear(),
              itemDate.getMonth(),
              itemDate.getDate()
            ); // Get date without time
            return itemDateWithoutTime.getTime() === todayDate.getTime(); // Compare the dates
          });

          if (filteredResults.length === 0) {
            return next(new ErrorHandler("status Not Found", 404));
          }

          res.status(200).json({
            success: true,
            message: "Timings Fetched Successfully",
            data: filteredResults,
          });
        });
      });
    });
  } catch (error) {
    console.log("Error:", error);
    return next(new ErrorHandler(error.message, 400));
  }
});

export const storeRecentMasjeed = CatchAsyncError(async (req, res, next) => {
  const { imei, masjeedid } = req.query;
  const checkImeiQuery = "SELECT * FROM recentmasjeeds WHERE imei = ?";
  pool.getConnection((err, connection) => {
    if (err) {
      return next(new ErrorHandler("Database Connection Error", 500));
    }

    connection.query(checkImeiQuery, [imei], (selectErr, status) => {
      connection.release();
      if (selectErr) {
        console.error("Error checking details from the database:", fetchError);
        return next(new ErrorHandler("Internal Server Error", 500));
      }

      console.log("status", status.length);

      if (status.length > 0) {
        const updateRecentMasjeedQuery =
          "UPDATE recentmasjeeds SET recentmasjeedid = ? WHERE imei = ?";

        connection.query(
          updateRecentMasjeedQuery,
          [masjeedid, imei],
          (updateErr, updateStatus) => {
            if (updateErr) {
              return next(new ErrorHandler("Internal Server Error", 500));
            }

            res.status(200).json({
              success: true,
              message: "Data updated successfully",
            });
          }
        );
      } else {
        const insertimeiQuery =
          "INSERT INTO recentmasjeeds(imei,recentmasjeedid) VALUES(?,?)";

        connection.query(insertimeiQuery, [imei, masjeedid], (insertError) => {
          if (insertError) {
            console.error(
              "Error inserting filename into the database:",
              insertError
            );
            return next(new ErrorHandler("Internal Server Error", 500));
          }

          res
            .status(200)
            .json({ success: true, message: "data inserted successfully" });
        });
      }
    });
  });
});

export const getRecentMasjeed = CatchAsyncError(async (req, res, next) => {
  try {
    const { imei } = req.query;

    const getrecentmasjeedQuery =
      "SELECT recentmasjeedid from recentmasjeeds WHERE imei = ?";

    pool.getConnection((err, connection) => {
      if (err) {
        return next(new ErrorHandler("Database Connection Error", 500));
      }

      connection.query(
        getrecentmasjeedQuery,
        [imei],
        (insertError, results) => {
          connection.release();

          if (insertError) {
            console.error(
              "Error inserting filename into the database:",
              insertError
            );
            return next(new ErrorHandler("Internal Server Error", 500));
          }

          if (results.length === 0) {
            return next(new ErrorHandler("imei Not Found", 404));
          }

          const masjeedid = results[0].recentmasjeedid;

          // const masjeedDetailsQuery = "SELECT * FROM masjeed WHERE id = ?";

          // connection.query(
          //   masjeedDetailsQuery,
          //   [masjeedid],
          //   (fetchError, output) => {
          //     if (fetchError) {
          //       console.error(
          //         "Error fetching prayer details from the database:",
          //         fetchError
          //       );
          //       return next(new ErrorHandler("Internal Server Error", 500));
          //     }

          //     if (output.length === 0) {
          //       return next(new ErrorHandler("Masjeed Not Found", 404));
          //     }

          //     output = output[0];

          //     res.json({
          //       success: true,
          //       message: "fetched Majeed details",
          //       data: output,
          //     });
          //   }
          // );

          const selectQuery =
            "SELECT * FROM prayertimingstable WHERE masjeedid = ?";

          connection.query(selectQuery, [masjeedid], (selectError, output) => {
            connection.release(); // Release the connection back to the pool

            if (selectError) {
              console.error(
                "Error fetching prayer details from the database:",
                selectError
              );
              return next(new ErrorHandler("Internal Server Error", 500));
            }

            // Get today's date
            const today = new Date();
            const todayMonth = today.getMonth() + 1; // Month is 0-indexed in JavaScript
            const todayDay = today.getDate();
            // Filter data for today's month and day

            const todayTimeSchedule = output.filter(
              (row) => row.month == todayMonth && row.day == todayDay
            );

            const todayTimings = [
              ...todayTimeSchedule.map((row) => ({
                id: "1",
                name: "fajr",
                starttime: row.fajr,
                endtime: calculateEndTime(row.fajr, row.fajriqamah),
              })),
              ...todayTimeSchedule.map((row) => ({
                id: "2",
                name: "dhuhr",
                starttime: row.dhuhr,
                endtime: calculateEndTime(row.dhuhr, row.dhuhriqamah),
              })),
              ...todayTimeSchedule.map((row) => ({
                id: "3",
                name: "asr",
                starttime: row.asr,
                endtime: calculateEndTime(row.asr, row.asriqamah),
              })),
              ...todayTimeSchedule.map((row) => ({
                id: "4",
                name: "maghrib",
                starttime: row.maghrib,
                endtime: calculateEndTime(row.maghrib, row.maghribiqamah),
              })),
              ...todayTimeSchedule.map((row) => ({
                id: "5",
                name: "isha",
                starttime: row.isha,
                endtime: calculateEndTime(row.isha, row.ishaiqamah),
              })),
            ];

            const masjeedDetailsQuery = "SELECT * FROM masjeed WHERE id = ?";

            connection.query(
              masjeedDetailsQuery,
              [masjeedid],
              (fetchError, results) => {
                if (fetchError) {
                  console.error(
                    "Error fetching prayer details from the database:",
                    selectError
                  );
                  return next(new ErrorHandler("Internal Server Error", 500));
                }

                if (results.length === 0) {
                  return next(new ErrorHandler("Masjeed Not Found", 404));
                }

                const today = new Date();

                const options = {
                  weekday: "long",
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                };

                const formattedDate = new Intl.DateTimeFormat(
                  "en-US",
                  options
                ).format(today);

                const now = new Date(); // Current time

                let nearestPrayer = null;
                let nearestTimeDifference = Infinity;

                todayTimings.forEach(({ name, starttime }) => {
                  const [prayerHour, prayerMinute] = starttime
                    .split(":")
                    .map(Number);
                  let prayerTime = new Date(
                    now.getFullYear(),
                    now.getMonth(),
                    now.getDate(),
                    prayerHour,
                    prayerMinute
                  );

                  // If the prayer time has already passed for today, set it to the next day
                  if (prayerTime < now) {
                    prayerTime = new Date(
                      now.getFullYear(),
                      now.getMonth(),
                      now.getDate() + 1,
                      prayerHour,
                      prayerMinute
                    );
                  }

                  const timeDifference = prayerTime - now;
                  if (timeDifference < nearestTimeDifference) {
                    nearestTimeDifference = timeDifference;
                    nearestPrayer = {
                      name,
                      hours: Math.floor(timeDifference / (1000 * 60 * 60)),
                      minutes: Math.floor(
                        (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
                      ),
                    };
                  }
                });

                results.forEach((result) => {
                  result.date = formattedDate;
                });

                if (nearestPrayer) {
                  results.forEach((result) => {
                    result.nearestPrayer = ` ${nearestPrayer.name} in ${nearestPrayer.hours} hours and ${nearestPrayer.minutes} minutes.`;
                  });
                } else {
                  results.forEach((result) => {
                    result.nearestPrayer = "There are no more prayers today.";
                  });
                }

                results = results[0];

                res.json({
                  success: true,
                  message: "fetched Majeed details",
                  results,
                  todayTimings,
                });
              }
            );
          });
        }
      );
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

export const addWebToFavourite = CatchAsyncError(async (req, res, next) => {
  try {
    const { deviceid, masjeedid } = req.query;

    // Check if the id already exists in the favouritemasjeeds table
    const checkExistenceQuery =
      "SELECT * FROM favouritemasjeeds WHERE favouritemasjeddid = ? AND deviceid = ?";
    pool.getConnection((err, connection) => {
      if (err) {
        // Handle connection error
        console.error("Error acquiring connection:", err);
        return next(new ErrorHandler("Database Connection Error", 500));
      }

      connection.query(
        checkExistenceQuery,
        [masjeedid, deviceid],
        (selectErr, results) => {
          connection.release(); // Release the connection back to the pool

          if (selectErr) {
            console.error("Error checking existence:", selectErr);
            return next(new ErrorHandler("Internal Server Error", 500));
          }

          if (results.length > 0) {
            const deleteQuery =
              "DELETE FROM favouritemasjeeds WHERE favouritemasjeddid = ? AND deviceid = ?";
            connection.query(
              deleteQuery,
              [masjeedid, deviceid],
              (deleteErr, _) => {
                if (deleteErr) {
                  console.error(
                    "Error deleting masjeed from favourites:",
                    deleteErr
                  );
                  return next(new ErrorHandler("Internal Server Error", 500));
                }
                return res.status(200).json({
                  success: true,
                  message: "Masjeed removed from favourites",
                });
              }
            );
          } else {
            const insertMasjeedIdQuery =
              "INSERT INTO favouritemasjeeds(deviceid,favouritemasjeddid) VALUES (?,?)";
            connection.query(
              insertMasjeedIdQuery,
              [deviceid, masjeedid],
              (error) => {
                if (error) {
                  console.error("Error adding masjeed to favourites:", error);
                  return next(new ErrorHandler("Internal Server Error", 500));
                }
                res.status(201).json({
                  success: true,
                  message: "Added to Favourite List",
                });
              }
            );
          }
        }
      );
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

export const getWebFavouriteMasjeeds = CatchAsyncError(
  async (req, res, next) => {
    try {
      // Acquire a connection from the pool
      const { deviceid } = req.query;

      pool.getConnection((err, connection) => {
        if (err) {
          // Handle connection error
          console.error("Error acquiring connection:", err);
          return next(new ErrorHandler("Database Connection Error", 500));
        }

        const favouriteMasjeedsQuery =
          "SELECT * FROM favouritemasjeeds WHERE deviceid = ?";

        // Execute the query to get favourite masjeed IDs
        connection.query(
          favouriteMasjeedsQuery,
          [deviceid],
          (selectErr, favouriteMasjeeds) => {
            if (selectErr) {
              connection.release(); // Release the connection back to the pool
              console.error(
                "Error fetching masjeeds from favourites",
                selectErr
              );
              return next(new ErrorHandler("Internal Server Error", 500));
            }

            // Check if there are no favourite masjeeds
            if (favouriteMasjeeds.length === 0) {
              connection.release(); // Release the connection back to the pool
              return next(new ErrorHandler("Masjeeds Not Found", 404));
            }

            // Fetch masjeed details for each favourite masjeed ID
            let masjeedPromises = favouriteMasjeeds.map((favourite) => {
              return new Promise((resolve, reject) => {
                connection.query(
                  "SELECT * FROM masjeed WHERE id = ?",
                  [favourite.favouritemasjeddid],
                  (error, masjeedDetails) => {
                    if (error) {
                      console.error("Error fetching data:", error);
                      reject(new ErrorHandler("Internal Server Error", 500));
                    } else {
                      resolve({
                        ...favourite,
                        ...masjeedDetails[0],
                      });
                    }
                  }
                );
              });
            });

            // Resolve all masjeed promises
            Promise.all(masjeedPromises)
              .then((results) => {
                // Release the connection back to the pool
                connection.release();

                res.json({
                  success: true,
                  message: "Fetched masjeed",
                  data: results,
                });
              })
              .catch((error) => {
                // Handle error if any promise fails
                connection.release();
                return next(new ErrorHandler(error.message, 500));
              });
          }
        );
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);
