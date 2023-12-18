import { Router } from "express";
import userRoutes from "./user-routes.js";
import chatRoutes from "./chat-route.js";
import questionsRoutes from "./questions-route.js";


const appRouter = Router();

appRouter.use("/user", userRoutes)
appRouter.use("/chat", chatRoutes)
appRouter.use("/questions", questionsRoutes)

export default appRouter; 