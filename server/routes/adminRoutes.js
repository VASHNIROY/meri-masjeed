import express from "express";
import multer from "multer";
import path from "path";
import {
  addAdminStaff,
  addTimingRowToHr,
  addmessage,
  adminLogin,
  editAdminStaffMember,
  editIqamah,
  forgotPassword,
  getAdminStaff,
  getAdminStaffMember,
  getIqamahDetails,
  getMasjeedDetails,
  getMasjeedTimings,
  getmessages,
  substractTimingRowToHr,
  updateMasjeedDetails,
  updateTimingRow,
  verifyEmailOTPSend,
} from "../controllers/adminController.js";
import { isAuthenticatedAdmin } from "../middleware/auth.js";

export const adminRouter = express.Router();

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

adminRouter.post("/adminlogin", adminLogin);

adminRouter.get("/getmasjeedtimings", isAuthenticatedAdmin, getMasjeedTimings);

adminRouter.post("/forgetpassword", forgotPassword);

adminRouter.post("/adminotpverfiysend", verifyEmailOTPSend);

adminRouter.put("/updateTimingRow", isAuthenticatedAdmin, updateTimingRow);

adminRouter.put(
  "/updatemasjeeddetails",
  upload.single("file"),
  isAuthenticatedAdmin,
  updateMasjeedDetails
);

adminRouter.put("/addhrtorow", isAuthenticatedAdmin, addTimingRowToHr);

adminRouter.put(
  "/substracthrtorow",
  isAuthenticatedAdmin,
  substractTimingRowToHr
);

adminRouter.get("/getmasjeeddetails", isAuthenticatedAdmin, getMasjeedDetails);

adminRouter.post("/addadminstaff", isAuthenticatedAdmin, addAdminStaff);

adminRouter.put(
  "/editadminstaffmember",
  isAuthenticatedAdmin,
  editAdminStaffMember
);

adminRouter.get("/getadminstaffdetails", isAuthenticatedAdmin, getAdminStaff);

adminRouter.get(
  "/getadminstaffmember/:id",
  isAuthenticatedAdmin,
  getAdminStaffMember
);

adminRouter.put("/editIqamah", isAuthenticatedAdmin, editIqamah);

adminRouter.get("/getiqamahtimigs", isAuthenticatedAdmin, getIqamahDetails);

adminRouter.post(
  "/addmessage",
  upload.single("file"),
  isAuthenticatedAdmin,
  addmessage
);

adminRouter.get("/getmessages", isAuthenticatedAdmin, getmessages);
