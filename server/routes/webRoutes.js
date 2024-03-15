import express from "express";
import multer from "multer";
import path from "path";

import {
  addMasjeed,
  databaseCities,
  databaseCountries,
  databaseMasjeeds,
  databaseStates,
  getRamzanTimings,
  getWebMessages,
  todaySchedule,
} from "../controllers/webControllers.js";
import { getmessages } from "../controllers/adminController.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

export const webRouter = express.Router();

webRouter.post("/addmasjeed", upload.single("file"), addMasjeed);

webRouter.get("/getTodaySchedule/:id", todaySchedule);

webRouter.get("/getCountries", databaseCountries);

webRouter.get("/getStates", databaseStates);

webRouter.get("/getCities", databaseCities);

webRouter.get("/getwebmasjeeds", databaseMasjeeds);

webRouter.post("/getwebmessages", getWebMessages);

webRouter.get("/getramzantimings", getRamzanTimings);


