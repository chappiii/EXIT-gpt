import { Router } from "express";
import { addQuestions, getAllQuestions } from "../controllers/questions-controller.js";

const questionsRoutes = Router();

questionsRoutes.get("/", getAllQuestions);
questionsRoutes.post("/add", addQuestions);

export default questionsRoutes;