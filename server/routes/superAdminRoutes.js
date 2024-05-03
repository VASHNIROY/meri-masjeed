import express from "express";
import multer from "multer";
import path from "path";
import {
  addMasjeedToFavourite,
  approveMasjeed,
  deleteFavouriteMasjeed,
  getFavouriteMasjeeds,
  masjeedsList,
  newMasjeeds,
  rejectMasjeed,
  superAdminLogin,
  superAdminRegistration,
  turnoffRamzan,
  turnonRamzan,
  uploadRamzanExcel,
} from "../controllers/superAdminController.js";
import { isAuthenticatedSuperAdmin } from "../middleware/auth.js";

export const superadminrouter = express.Router();

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

superadminrouter.post("/superadminregistration", superAdminRegistration);

superadminrouter.post("/superadminlogin", superAdminLogin);

superadminrouter.get("/getmasjeeds", isAuthenticatedSuperAdmin, masjeedsList);

superadminrouter.get("/newmasjeeds", isAuthenticatedSuperAdmin, newMasjeeds);

superadminrouter.put(
  "/approvemasjeed/:id",
  isAuthenticatedSuperAdmin,
  approveMasjeed
);

superadminrouter.put(
  "/rejectmasjeed/:id",
  isAuthenticatedSuperAdmin,
  rejectMasjeed
);

// superadminrouter.put("/toggleramzan", isAuthenticatedSuperAdmin, toggleRamzan);

superadminrouter.post(
  "/uploadramzantimings",
  upload.single("file"),
  uploadRamzanExcel
);

superadminrouter.post(
  "/turnofframzan",
  isAuthenticatedSuperAdmin,
  turnoffRamzan
);

superadminrouter.post("/turnonramzan", isAuthenticatedSuperAdmin, turnonRamzan);

superadminrouter.post(
  "/addtofavourite",
  isAuthenticatedSuperAdmin,
  addMasjeedToFavourite
);

superadminrouter.post(
  "/getfavouritemasjeeds",
  isAuthenticatedSuperAdmin,
  getFavouriteMasjeeds
);

superadminrouter.post(
  "/deleteFavouriteMasjeed",
  isAuthenticatedSuperAdmin,
  deleteFavouriteMasjeed
);
