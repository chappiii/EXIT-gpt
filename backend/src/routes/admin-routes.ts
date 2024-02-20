import { Router } from "express";
import {validate, signupValidator, loginValidator} from "../utils/validators.js";
import { verifyToken } from "../utils/token-manager.js";
import { adminSignup, getAllAdmins, adminLogin, verifyAdmin, adminLogout } from "../controllers/admin-controller.js";

const adminRoutes = Router();

adminRoutes.get("/", getAllAdmins);
adminRoutes.post("/signup", validate(signupValidator), adminSignup);
adminRoutes.post("/login", validate(loginValidator), adminLogin);
adminRoutes.get("/auth-status", verifyToken, verifyAdmin);
adminRoutes.get("/logout", verifyToken, adminLogout);

export default adminRoutes; 