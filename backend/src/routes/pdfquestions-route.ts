import { Router } from "express";
import { validate, pdfQuestionRequestValidator } from "../utils/validators.js";
import { verifyToken } from "../utils/token-manager.js";
// import { generateQuestionsFromPdf } from "../controllers/pdfquestions-controller.js";
import { generatePdfChatCompletion } from "../controllers/pdf.js";

const pdfquestionsRoutes = Router();

pdfquestionsRoutes.post("/new", generatePdfChatCompletion);

export default pdfquestionsRoutes;