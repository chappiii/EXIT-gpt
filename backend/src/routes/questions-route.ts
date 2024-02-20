import { Router } from "express";
import { addQuestions, getAllQuestions, deleteQuestion } from "../controllers/questions-controller.js";

const questionsRoutes = Router();

questionsRoutes.get("/", getAllQuestions);
questionsRoutes.post("/add", addQuestions);
questionsRoutes.delete("/delete/:id", deleteQuestion);


export default questionsRoutes;