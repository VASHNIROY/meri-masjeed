import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import CatchAsyncError from "../middleware/catchAsyncError.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import nodemailerConfig from "../utils/nodemailer.js";
// import { connection } from "../utils/db.js";
import { pool } from "../utils/db.js";
import moment from "moment";

import { fileURLToPath } from "url";

import xlsx from "xlsx";
import path from "path";

import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const superAdminRegistration = CatchAsyncError(
  async (req, res, next) => {
    try {
      const { name, email, password, phonenumber } = req.body;

      const checkemailQuery = "SELECT * FROM superadmin WHERE email = ?";
      pool.getConnection((err, connection) => {
        if (err) {
          // Handle connection error
          console.error("Error acquiring connection:", err);
          return next(new ErrorHandler("Database Connection Error", 500));
        }

        connection.query(checkemailQuery, [email], (error, results) => {
          connection.release(); // Release the connection back to the pool

          if (error) {
            return next(new ErrorHandler(error.message, 500));
          }

          if (results.length > 0) {
            return next(new ErrorHandler("Email already exists", 400));
          }

          bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) {
              return next(new ErrorHandler(err.message, 500));
            }

            connection.query(
              "INSERT INTO superadmin(name,email,password,phonenumber,roleid) VALUES (?,?,?,?,?)",
              [name, email, hashedPassword, phonenumber, 1],
              (error) => {
                if (error) {
                  return next(new ErrorHandler(error.message, 500));
                }
                res.status(201).json({
                  success: true,
                  message: "Super Admin Registered Successfully",
                });
              }
            );
          });
        });
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

const SECRET_KEY = "uK8Tgvho1Y";

export const superAdminLogin = CatchAsyncError(async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const verifyemailQuery = "SELECT * from superadmin WHERE email = ?";

    pool.getConnection((err, connection) => {
      if (err) {
        // Handle connection error
        console.error("Error acquiring connection:", err);
        return next(new ErrorHandler("Database Connection Error", 500));
      }

      connection.query(verifyemailQuery, [email], async (error, results) => {
        connection.release(); // Release the connection back to the pool

        if (error) {
          return next(new ErrorHandler("Database Error", 500));
        }
        if (results.length === 0) {
          return next(new ErrorHandler("Invalid User", 400));
        }
        const hashedPassword = results[0].password;
        const isPasswordMatched = await bcrypt.compare(
          password,
          hashedPassword
        );

        if (isPasswordMatched) {
          const payload = {
            email: results[0].email,
          };
          const jwt_token = jwt.sign(payload, SECRET_KEY);
          res.send({ jwt_token, message: "Login Successful" });
        } else {
          return next(new ErrorHandler("Invalid Email or Password", 400));
        }
      });
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

export const masjeedsList = CatchAsyncError(async (req, res, next) => {
  try {
    const getMasjeedsQuery = `SELECT * FROM masjeed WHERE status = 1`;
    pool.getConnection((err, connection) => {
      if (err) {
        // Handle connection error
        console.error("Error acquiring connection:", err);
        return next(new ErrorHandler("Database Connection Error", 500));
      }

      connection.query(getMasjeedsQuery, (selectErr, results) => {
        connection.release(); // Release the connection back to the pool

        if (selectErr) {
          console.log("Error fetching masjeeds from Database", selectErr);
          return next(new ErrorHandler("Internal Server Error", 500));
        }
        if (results.length === 0) {
          return next(new ErrorHandler("Masjeeds Not Found", 404));
        }
        res.json({ success: true, message: "Fetched masjeeds", data: results });
      });
    });
  } catch (error) {
    console.log("getting error");
    return next(new ErrorHandler(error.message, 400));
  }
});

export const newMasjeeds = CatchAsyncError(async (req, res, next) => {
  try {
    const getMasjeedsQuery = `SELECT * FROM masjeed WHERE status = 0`;
    pool.getConnection((err, connection) => {
      if (err) {
        // Handle connection error
        console.error("Error acquiring connection:", err);
        return next(new ErrorHandler("Database Connection Error", 500));
      }

      connection.query(getMasjeedsQuery, (selectErr, results) => {
        connection.release(); // Release the connection back to the pool

        if (selectErr) {
          console.log("Error fetching masjeeds from Database", selectErr);
          return next(new ErrorHandler("Internal Server Error", 500));
        }
        if (results.length === 0) {
          return next(new ErrorHandler("Masjeeds Not Found", 404));
        }
        res.json({ success: true, message: "Fetched masjeeds", data: results });
      });
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

/* approved masjeeds status = 1 */
/* rejected masjeeds status = 0 */
// export const approveMasjeed = CatchAsyncError(async (req, res, next) => {
//   try {
//     const masjeedId = req.params.id;
//     const checkmasjeedStatus = `SELECT status FROM masjeed WHERE id = ?`;
//     pool.getConnection((err, connection) => {
//       if (err) {
//         // Handle connection error
//         console.error("Error acquiring connection:", err);
//         return next(new ErrorHandler("Database Connection Error", 500));
//       }

//       connection.query(checkmasjeedStatus, [masjeedId], (err, results) => {
//         connection.release(); // Release the connection back to the pool

//         if (err) {
//           return next(new ErrorHandler("Internal Server Error", 500));
//         }
//         if (results[0].status === 1) {
//           return next(new ErrorHandler("masjeed already approved", 400));
//         }
//         const updateMasjeedStatusQuery = `UPDATE masjeed SET status = 1 WHERE id = ?`;

//         // Update masjeed status
//         connection.query(
//           updateMasjeedStatusQuery,
//           [masjeedId],
//           (updateError) => {
//             if (updateError) {
//               console.log("Error while updating status");
//               return next(new ErrorHandler("Internal Server Error", 500));
//             }
//             const masjeedDetailsQuery =
//               "SELECT adminname,phonenumber,email FROM masjeed WHERE id = ?;";

//             connection.query(
//               masjeedDetailsQuery,
//               [masjeedId],
//               (gettingErr, masjeedDetails) => {
//                 if (gettingErr) {
//                   console.log("Error While fetching masjeed Details");
//                   return next(new ErrorHandler("Internal Server Error", 500));
//                 }

//                 if (masjeedDetails.length === 0) {
//                   return next(new ErrorHandler("masjeed not found", 404));
//                 }

//                 const name = masjeedDetails[0].adminname;
//                 const email = masjeedDetails[0].email;
//                 const phonenumber = masjeedDetails[0].phonenumber;

//                 const addadminQuery = `INSERT INTO admin(name,email,password,status,phonenumber) VALUES(?,?,?,?,?)`;
//                 const password = "123456";

//                 bcrypt.hash(password, 10, (err, hashedPassword) => {
//                   if (err) {
//                     return next(new ErrorHandler(err.message, 500));
//                   }
//                   connection.query(
//                     addadminQuery,
//                     [name, email, hashedPassword, 1, phonenumber],
//                     (error, succesresults) => {
//                       if (error) {
//                         console.log(error);
//                         return next(
//                           new ErrorHandler("Internal Server Error", 500)
//                         );
//                       }

//                       const transporter = nodemailerConfig();
//                       const mailOptions = {
//                         from: process.env.SMTP_MAIL,
//                         to: email,
//                         subject: "Welcome to Mymasjeed. Aprroved Your Request",
//                         html: `
//                       <p>Dear ${name},</p>
//                       <p>Thank you for registering with My Masjeed. We are delighted to have you as part of our community, and we want to extend a warm welcome to you.</p>
//                       <p>This is your email ${email} and password is 123456</p>
//                     `,
//                       };

//                       transporter.sendMail(mailOptions, (emailError, info) => {
//                         if (emailError) {
//                           console.log(emailError);
//                           return next(
//                             new ErrorHandler("Email could not be sent", 500)
//                           );
//                         }
//                       });

//                       // Retrieve prayer details file path
//                       const selectQuery =
//                         "SELECT prayerdetails FROM masjeed WHERE id = ?";

//                       connection.query(
//                         selectQuery,
//                         [masjeedId],
//                         (selectError, results) => {
//                           if (selectError) {
//                             console.error(
//                               "Error fetching prayerdetails from the database:",
//                               selectError
//                             );
//                             return next(
//                               new ErrorHandler("Internal Server Error", 500)
//                             );
//                           }

//                           if (results.length === 0) {
//                             return next(
//                               new ErrorHandler("File not found", 404)
//                             );
//                           }

//                           const filename = results[0].prayerdetails;

//                           // Read the Excel file
//                           const filePath = path.join(
//                             __dirname,
//                             "../uploads",
//                             filename
//                           );
//                           const workbook = xlsx.readFile(filePath);
//                           const sheetName = workbook.SheetNames[0];
//                           const sheet = workbook.Sheets[sheetName];

//                           const secondsheetName = workbook.SheetNames[1];
//                           const secondsheet = workbook.Sheets[secondsheetName];

//                           // Parse Excel data
//                           const prayertimingsData = xlsx.utils.sheet_to_json(
//                             sheet,
//                             {
//                               raw: false,
//                               range: 11,
//                             }
//                           );

//                           // Parse Excel data
//                           const iqamahData = xlsx.utils.sheet_to_json(
//                             secondsheet,
//                             {
//                               raw: false,
//                               range: 1,
//                             }
//                           );

//                           const convertedData = iqamahData.map((data) => {
//                             const convertedValues = {};
//                             for (const key in data) {
//                               const value = data[key];

//                               // Exclude "Jumah Adhan" from conversion
//                               if (key === "Jumah Adhan") {
//                                 convertedValues[key] = value;
//                               } else {
//                                 const value = data[key];
//                                 const intValue = parseInt(value, 10);
//                                 convertedValues[key] = isNaN(intValue)
//                                   ? value
//                                   : intValue;
//                               }
//                             }
//                             return convertedValues;
//                           });

//                           const commonData = convertedData[0];

//                           // Merge common data
//                           const mergedData = prayertimingsData.map((item) => {
//                             // Merge the common data into each item using object spreading
//                             return { ...item, ...commonData };
//                           });

//                           // Insert data into prayertimingstable
//                           mergedData.forEach((row) => {
//                             const {
//                               Month,
//                               Day,
//                               "Fajr Adhan": FajrAdhan,
//                               Shouruq,
//                               "Dhuhr Adhan": DhuhrAdhan,
//                               "Asr Adhan": AsrAdhan,
//                               "Maghrib Adhan": MaghribAdhan,
//                               "Isha Adhan": IshaAdhan,
//                               "Fajr Iqamah": FajrIqamah,
//                               "Dhuhr Iqamah": DhuhrIqamah,
//                               "Asr Iqamah": AsrIqamah,
//                               "Maghrib Iqamah": MaghribIqamah,
//                               "Isha Iqamah": IshaIqamah,
//                               "Jumah Adhan": JumahAdhan,
//                               "Jumah Khutba duration": JumahKhutbaDuration,
//                             } = row;

//                             const insertQuery = `
//                   INSERT INTO prayertimingstable (masjeedid, day, month, fajr, shouruq, dhuhr, asr, maghrib, isha,fajriqamah,
//                     dhuhriqamah,
//                     asriqamah,
//                     maghribiqamah,
//                    ishaiqamah,
//                     jumahadhan,
//                     Jumahkhutbaduration)
//                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? ,?, ?, ?, ?, ?)
//                 `;

//                             connection.query(
//                               insertQuery,
//                               [
//                                 masjeedId,
//                                 Day,
//                                 Month,
//                                 FajrAdhan,
//                                 Shouruq,
//                                 DhuhrAdhan,
//                                 AsrAdhan,
//                                 MaghribAdhan,
//                                 IshaAdhan,

//                                 FajrIqamah,
//                                 DhuhrIqamah,
//                                 AsrIqamah,
//                                 MaghribIqamah,
//                                 IshaIqamah,
//                                 JumahAdhan,
//                                 JumahKhutbaDuration,
//                               ],
//                               (insertError) => {
//                                 if (insertError) {
//                                   console.error(
//                                     "Error inserting data into prayertimingstable:",
//                                     insertError
//                                   );
//                                   return next(
//                                     new ErrorHandler(
//                                       "Internal Server Error",
//                                       500
//                                     )
//                                   );
//                                 }
//                               }
//                             );
//                           });

//                           res.json({
//                             success: true,
//                             message: "Accepted Successfully",
//                           });
//                         }
//                       );
//                     }
//                   );
//                 });
//               }
//             );
//           }
//         );
//       });
//     });
//   } catch (error) {
//     return next(new ErrorHandler(error.message, 400));
//   }
// });

export const approveMasjeed = CatchAsyncError(async (req, res, next) => {
  try {
    const masjeedId = req.params.id;
    const checkmasjeedStatus = `SELECT status FROM masjeed WHERE id = ?`;
    const selectQuery = "SELECT prayerdetails FROM masjeed WHERE id = ?";
    const insertQuery = `
      INSERT INTO prayertimingstable (
        masjeedid, day, month, fajr, shouruq, dhuhr, asr, maghrib, isha, fajriqamah,
        dhuhriqamah, asriqamah, maghribiqamah, ishaiqamah, jumahadhan, Jumahkhutbaduration
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const updateMasjeedStatusQuery = `UPDATE masjeed SET status = 1`;
    const masjeedDetailsQuery = `SELECT adminname,phonenumber,email FROM masjeed WHERE id = ?`;
    const addadminQuery = `
      INSERT INTO admin (name, email, password, status, phonenumber)
      VALUES (?, ?, ?, ?, ?)
    `;

    pool.getConnection((err, connection) => {
      if (err) {
        console.error("Error acquiring connection:", err);
        return next(new ErrorHandler("Database Connection Error", 500));
      }

      connection.query(checkmasjeedStatus, [masjeedId], (err, results) => {
        if (err) {
          connection.release();
          return next(new ErrorHandler("Internal Server Error", 500));
        }
        if (results[0].status === 1) {
          connection.release();
          return next(new ErrorHandler("masjeed already approved", 400));
        }

        connection.query(selectQuery, [masjeedId], (selectError, results) => {
          if (selectError) {
            connection.release();
            console.error(
              "Error fetching prayerdetails from the database:",
              selectError
            );
            return next(new ErrorHandler("Internal Server Error", 500));
          }
          if (results.length === 0) {
            connection.release();
            return next(new ErrorHandler("File not found", 404));
          }

          const filename = results[0].prayerdetails;

          const filePath = path.join(__dirname, "../uploads", filename);
          const workbook = xlsx.readFile(filePath);
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];

          const secondsheetName = workbook.SheetNames[1];
          const secondsheet = workbook.Sheets[secondsheetName];

          const prayertimingsData = xlsx.utils.sheet_to_json(sheet, {
            raw: false,
            range: 11,
          });

          const iqamahData = xlsx.utils.sheet_to_json(secondsheet, {
            raw: false,
            range: 1,
          });

          const convertedData = iqamahData.map((data) => {
            const convertedValues = {};
            for (const key in data) {
              const value = data[key];
              if (key === "Jumah Adhan") {
                convertedValues[key] = value;
              } else {
                const intValue = parseInt(value, 10);
                convertedValues[key] = isNaN(intValue) ? value : intValue;
              }
            }
            return convertedValues;
          });

          const commonData = convertedData[0];

          const mergedData = prayertimingsData.map((item) => {
            return { ...item, ...commonData };
          });

          connection.query(updateMasjeedStatusQuery, (updateError) => {
            connection.release();

            if (updateError) {
              console.error(
                "Error while updating masjeed status:",
                updateError
              );
              return next(new ErrorHandler("Internal Server Error", 500));
            }

            connection.query(
              masjeedDetailsQuery,
              [masjeedId],
              (gettingErr, masjeedDetails) => {
                connection.release();

                if (gettingErr) {
                  console.error(
                    "Error while fetching masjeed details:",
                    gettingErr
                  );
                  return next(new ErrorHandler("Internal Server Error", 500));
                }

                if (masjeedDetails.length === 0) {
                  connection.release();
                  return next(new ErrorHandler("masjeed not found", 404));
                }

                const { adminname, email, phonenumber } = masjeedDetails[0];
                const password = "123456";

                bcrypt.hash(password, 10, (hashError, hashedPassword) => {
                  connection.release();

                  if (hashError) {
                    console.error("Error while hashing password:", hashError);
                    return next(new ErrorHandler("Internal Server Error", 500));
                  }

                  connection.query(
                    addadminQuery,
                    [adminname, email, hashedPassword, 1, phonenumber],
                    (addAdminError) => {
                      connection.release();

                      if (addAdminError) {
                        console.error(
                          "Error while adding admin:",
                          addAdminError
                        );
                        return next(
                          new ErrorHandler("Internal Server Error", 500)
                        );
                      }

                      const transporter = nodemailerConfig();
                      const mailOptions = {
                        from: process.env.SMTP_MAIL,
                        to: email,
                        subject: "Welcome to Mymasjeed. Aprroved Your Request",
                        html: `
                      <p>Dear ${adminname},</p>
                      <p>Thank you for registering with My Masjeed. We are delighted to have you as part of our community, and we want to extend a warm welcome to you.</p>
                      <p>This is your email ${email} and password is 123456</p>
                    `,
                      };

                      transporter.sendMail(mailOptions, (emailError, info) => {
                        connection.release();

                        if (emailError) {
                          console.error(
                            "Error while sending email:",
                            emailError
                          );
                          return next(
                            new ErrorHandler("Email could not be sent", 500)
                          );
                        }

                        mergedData.forEach((row) => {
                          const {
                            Month,
                            Day,
                            "Fajr Adhan": FajrAdhan,
                            Shouruq,
                            "Dhuhr Adhan": DhuhrAdhan,
                            "Asr Adhan": AsrAdhan,
                            "Maghrib Adhan": MaghribAdhan,
                            "Isha Adhan": IshaAdhan,
                            "Fajr Iqamah": FajrIqamah,
                            "Dhuhr Iqamah": DhuhrIqamah,
                            "Asr Iqamah": AsrIqamah,
                            "Maghrib Iqamah": MaghribIqamah,
                            "Isha Iqamah": IshaIqamah,
                            "Jumah Adhan": JumahAdhan,
                            "Jumah Khutba duration": JumahKhutbaDuration,
                          } = row;

                          connection.query(
                            insertQuery,
                            [
                              masjeedId,
                              Day,
                              Month,
                              FajrAdhan,
                              Shouruq,
                              DhuhrAdhan,
                              AsrAdhan,
                              MaghribAdhan,
                              IshaAdhan,
                              FajrIqamah,
                              DhuhrIqamah,
                              AsrIqamah,
                              MaghribIqamah,
                              IshaIqamah,
                              JumahAdhan,
                              JumahKhutbaDuration,
                            ],
                            (insertError) => {
                              connection.release();

                              if (insertError) {
                                console.error(
                                  "Error inserting data into prayertimingstable:",
                                  insertError
                                );
                                return next(
                                  new ErrorHandler("Internal Server Error", 500)
                                );
                              }
                            }
                          );
                        });

                        connection.release();
                        res.json({
                          success: true,
                          message: "Accepted Successfully",
                        });
                      });
                    }
                  );
                });
              }
            );
          });
        });
      });
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

export const rejectMasjeed = CatchAsyncError(async (req, res, next) => {
  const masjeedid = req.params.id;

  try {
    const masjeedDetailsQuery =
      "SELECT adminname,email FROM masjeed WHERE id = ?;";
    pool.getConnection((err, connection) => {
      if (err) {
        // Handle connection error
        console.error("Error acquiring connection:", err);
        return next(new ErrorHandler("Database Connection Error", 500));
      }

      connection.query(
        masjeedDetailsQuery,
        [masjeedid],
        (gettingErr, masjeedDetails) => {
          connection.release(); // Release the connection back to the pool

          if (gettingErr) {
            console.log("Error While fetching masjeed Details");
            return next(new ErrorHandler("Internal Server Error", 500));
          }

          if (masjeedDetails.length === 0) {
            return next(new ErrorHandler("masjeed not found", 404));
          }
          const name = masjeedDetails[0].adminname;
          const email = masjeedDetails[0].email;

          const transporter = nodemailerConfig();
          const mailOptions = {
            from: process.env.SMTP_MAIL,
            to: email,
            subject: "Welcome to Mymasjeed. Rejected Your Request",
            html: `
        <p>Dear ${name},</p>
        <p>Thank you for requesting My Masjeed.Unfortunately your request has been rejected.</p>
        <p>Please contact the adminstrator for further details.</p>
      `,
          };

          transporter.sendMail(mailOptions, (emailError, info) => {
            if (emailError) {
              console.log(emailError);
              return next(new ErrorHandler("Email could not be sent", 500));
            }
          });
        }
      );

      res.json({ success: true, message: "Rejected Masjeed" });
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

export const addMasjeedToFavourite = CatchAsyncError(async (req, res, next) => {
  try {
    const { id } = req.body;

    // Check if the id already exists in the favouritemasjeeds table
    const checkExistenceQuery =
      "SELECT * FROM favouritemasjeeds WHERE favouritemasjeddid = ?";
    pool.getConnection((err, connection) => {
      if (err) {
        // Handle connection error
        console.error("Error acquiring connection:", err);
        return next(new ErrorHandler("Database Connection Error", 500));
      }

      connection.query(checkExistenceQuery, [id], (selectErr, results) => {
        connection.release(); // Release the connection back to the pool

        if (selectErr) {
          console.error("Error checking existence:", selectErr);
          return next(new ErrorHandler("Internal Server Error", 500));
        }

        if (results.length > 0) {
          return next(
            new ErrorHandler("Masjeed already added to favourites", 400)
          );
        }

        // If the id doesn't exist, insert it into the favouritemasjeeds table
        const insertMasjeedIdQuery =
          "INSERT INTO favouritemasjeeds(favouritemasjeddid) VALUES (?)";
        connection.query(insertMasjeedIdQuery, [id], (error) => {
          if (error) {
            console.error("Error adding masjeed to favourites:", error);
            return next(new ErrorHandler("Internal Server Error", 500));
          }
          res.status(201).json({
            success: true,
            message: "Added to Favourite List",
          });
        });
      });
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// export const getFavouriteMasjeeds = CatchAsyncError(async (req, res, next) => {
//   try {
//     const favouriteMasjeedsQuery = "SELECT * FROM favouritemasjeeds";

//     // Execute the query to get favourite masjeed IDs
//     const favouriteMasjeeds = await new Promise((resolve, reject) => {
//       connection.query(favouriteMasjeedsQuery, (selectErr, results) => {
//         connection.release(); // Release the connection back to the pool

//         if (selectErr) {
//           console.log("Error fetching masjeeds from favourites", selectErr);
//           reject(new ErrorHandler("Internal Server Error", 500));
//         } else {
//           resolve(results);
//         }
//       });
//     });

//     // Check if there are no favourite masjeeds
//     if (favouriteMasjeeds.length === 0) {
//       return next(new ErrorHandler("Masjeeds Not Found", 404));
//     }

//     // Fetch masjeed details for each favourite masjeed ID
//     for (const favouritemasjeddid of favouriteMasjeeds) {
//       const masjeedDetails = await new Promise((resolve, reject) => {
//         connection.query(
//           "SELECT * FROM masjeed WHERE id = ?",
//           [favouritemasjeddid.id],
//           (error, output) => {
//             if (error) {
//               console.error("Error fetching data:", error);
//               reject(new ErrorHandler("Internal Server Error", 500));
//             } else {
//               resolve(output);
//             }
//           }
//         );
//       });

//       // Attach masjeed details to the favourite masjeed object
//       if (masjeedDetails.length === 0) {
//         return next(new ErrorHandler("No data found for this ID", 400));
//       } else {
//         favouritemasjeddid.masjeedDetails = masjeedDetails[0];
//       }
//     }

//     res.json({
//       success: true,
//       message: "Fetched masjeed",
//       data: favouriteMasjeeds,
//     });
//   } catch (error) {
//     return next(new ErrorHandler(error.message, 400));
//   }
// });

export const getFavouriteMasjeeds = CatchAsyncError(async (req, res, next) => {
  try {
    // Acquire a connection from the pool
    pool.getConnection((err, connection) => {
      if (err) {
        // Handle connection error
        console.error("Error acquiring connection:", err);
        return next(new ErrorHandler("Database Connection Error", 500));
      }

      const favouriteMasjeedsQuery = "SELECT * FROM favouritemasjeeds";

      // Execute the query to get favourite masjeed IDs
      connection.query(
        favouriteMasjeedsQuery,
        (selectErr, favouriteMasjeeds) => {
          if (selectErr) {
            connection.release(); // Release the connection back to the pool
            console.error("Error fetching masjeeds from favourites", selectErr);
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
                      masjeedDetails: masjeedDetails[0],
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
});

export const deleteFavouriteMasjeed = CatchAsyncError(
  async (req, res, next) => {
    try {
      const { id } = req.body;

      // Check if the favouritemasjeedid exists
      const checkExistenceQuery =
        "SELECT * FROM favouritemasjeeds WHERE favouritemasjeddid = ?";

      pool.getConnection((err, connection) => {
        if (err) {
          // Handle connection error
          console.error("Error acquiring connection:", err);
          return next(new ErrorHandler("Database Connection Error", 500));
        }
        connection.query(checkExistenceQuery, [id], (selectErr, results) => {
          connection.release(); // Release the connection back to the pool

          if (selectErr) {
            console.error("Error checking existence:", selectErr);
            return next(new ErrorHandler("Internal Server Error", 500));
          }

          if (results.length === 0) {
            return next(
              new ErrorHandler("Masjeed not found in favourites", 404)
            );
          }

          // If the favouritemasjeedid exists, delete it from the favouritemasjeeds table
          const deleteQuery =
            "DELETE FROM favouritemasjeeds WHERE favouritemasjeddid = ?";
          connection.query(deleteQuery, [id], (deleteErr, _) => {
            if (deleteErr) {
              console.error(
                "Error deleting masjeed from favourites:",
                deleteErr
              );
              return next(new ErrorHandler("Internal Server Error", 500));
            }
            res.status(200).json({
              success: true,
              message: "Masjeed removed from favourites",
            });
          });
        });
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

export const turnonRamzan = CatchAsyncError(async (req, res, next) => {
  console.log(".called");
  try {
    pool.getConnection((err, connection) => {
      if (err) {
        // Handle connection error
        console.error("Error acquiring connection:", err);
        return next(new ErrorHandler("Database Connection Error", 500));
      }
      const updateMasjeedStatusQuery = `UPDATE masjeed SET ramzanstatus = 1`;

      // Update masjeed status
      connection.query(updateMasjeedStatusQuery, (updateError) => {
        connection.release(); // Release the connection back to the pool

        if (updateError) {
          console.log("Error while updating status");
          return next(new ErrorHandler("Internal Server Error", 500));
        }

        res.status(200).json({
          success: true,
          message: "Turned ON",
        });
      });
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

export const turnoffRamzan = CatchAsyncError(async (req, res, next) => {
  console.log(".called");
  try {
    const masjeedId = req.params.id;
    pool.getConnection((err, connection) => {
      if (err) {
        // Handle connection error
        console.error("Error acquiring connection:", err);
        return next(new ErrorHandler("Database Connection Error", 500));
      }
      const updateMasjeedStatusQuery = `UPDATE masjeed SET ramzanstatus = 0`;

      // Update masjeed status
      connection.query(updateMasjeedStatusQuery, [masjeedId], (updateError) => {
        connection.release(); // Release the connection back to the pool

        if (updateError) {
          console.log("Error while updating status");
          return next(new ErrorHandler("Internal Server Error", 500));
        }

        res.status(200).json({
          success: true,
          message: "Turned OFF",
        });
      });
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

export const uploadRamzanExcel = CatchAsyncError(async (req, res, next) => {
  try {
    const filename = req.file ? req.file.filename : null;

    if (!filename) {
      res.status(400).json({ error: "No file uploaded" });
      return;
    }

    pool.getConnection((err, connection) => {
      if (err) {
        return next(new ErrorHandler("Database Connection Error", 500));
      }

      const checkRamzanfileQuery = `SELECT * FROM ramzanfile`;

      connection.query(checkRamzanfileQuery, (selectErr, results) => {
        if (selectErr) {
          connection.release();
          console.error("Error getting data", selectErr);
          return next(new ErrorHandler("Internal Server Error", 500));
        }

        if (results.length > 0) {
          connection.release();
          return next(new ErrorHandler("File already exists", 400));
        }

        const addMasjeedQuery = `INSERT INTO ramzanfile (ramzanfilename) VALUES (?)`;

        connection.query(addMasjeedQuery, [filename], (insertError) => {
          if (insertError) {
            connection.release();
            console.error(
              "Error inserting filename into the database:",
              insertError
            );
            return next(new ErrorHandler("Internal Server Error", 500));
          }

          console.log("Ramzan file inserted into the database");

          const selectQuery =
            "SELECT ramzanfilename FROM ramzanfile WHERE id = 1";

          connection.query(selectQuery, (selectError, results) => {
            if (selectError) {
              connection.release();
              console.error(
                "Error fetching ramzanfile from the database:",
                selectError
              );
              return next(new ErrorHandler("Internal Server Error", 500));
            }

            if (results.length === 0) {
              connection.release();
              return next(new ErrorHandler("File not found", 404));
            }

            const filename = results[0].ramzanfilename;
            console.log("Filename:", filename);

            const filePath = path.join(__dirname, "../uploads", filename);
            const workbook = xlsx.readFile(filePath);
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];

            const prayertimingsData = xlsx.utils.sheet_to_json(sheet, {
              raw: false,
            });

            const insertQuery = `
              INSERT INTO ramzan (date, day, sehar, iftar)
              VALUES (?, ?, ?, ?)
            `;

            prayertimingsData.forEach((item) => {
              const date = moment(item.date, "M/D/YY").format("YYYY-MM-DD");
              connection.query(
                insertQuery,
                [date, item.day, item.sehar, item.iftar],
                (insertError) => {
                  if (insertError) {
                    console.error(
                      "Error inserting data into ramzan table:",
                      insertError
                    );
                    return next(new ErrorHandler("Internal Server Error", 500));
                  }
                }
              );
            });

            connection.release();
            res.json({
              success: true,
              message: "Data inserted into the database successfully",
            });
          });
        });
      });
    });
  } catch (error) {
    console.log("Error:", error);
    return next(new ErrorHandler(error.message, 400));
  }
});
