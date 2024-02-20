import { Router } from "express";
import userRoutes from "./user-routes.js";
import adminRoutes from "./admin-routes.js";
import chatRoutes from "./chat-route.js";
import questionsRoutes from "./questions-route.js";
import pdfquestionsRoutes from "./pdfquestions-route.js";


const appRouter = Router();

appRouter.use("/user", userRoutes)
appRouter.use("/admin", adminRoutes)
appRouter.use("/chat", chatRoutes)
appRouter.use("/questions", questionsRoutes)
appRouter.use("/pdfquestions", pdfquestionsRoutes)

export default appRouter; 