import express from "express";
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
} from "../controllers/superAdminController.js";
import { isAuthenticatedSuperAdmin } from "../middleware/auth.js";

export const superadminrouter = express.Router();

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

superadminrouter.post(
  "/addtofavourite",
  isAuthenticatedSuperAdmin,
  addMasjeedToFavourite
);

superadminrouter.get(
  "/favouritemasjeeds",
  isAuthenticatedSuperAdmin,
  getFavouriteMasjeeds
);

superadminrouter.post(
  "/removefavourite",
  isAuthenticatedSuperAdmin,
  deleteFavouriteMasjeed
);
