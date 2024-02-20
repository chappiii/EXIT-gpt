import { Router } from "express";
import { getAllUsers, userSignup, userLogin, verifyUser, userLogout, deleteUserByEmail } from "../controllers/user-controllers.js";
import {validate, signupValidator, loginValidator} from "../utils/validators.js";
import { verifyToken } from "../utils/token-manager.js";

const userRoutes = Router();

userRoutes.get("/", getAllUsers);
userRoutes.post("/signup", validate(signupValidator), userSignup);
userRoutes.post("/login", validate(loginValidator), userLogin);
userRoutes.get("/auth-status", verifyToken, verifyUser);
userRoutes.get("/logout", verifyToken, userLogout);
userRoutes.get("/logout", verifyToken, userLogout);
userRoutes.delete("/delete/:email", deleteUserByEmail);


export default userRoutes; 