import { NextFunction, Request, Response } from "express";
import Question from "../models/Questions.js";

export const getAllQuestions = async (req: Request, res:Response, next: NextFunction) => {
    try {
        //get all questions from DB
        const questions =  await Question.find();
        return res.status(200).json({message: "OK", questions })
    } catch (error) {
        console.log(error)
        return res.status(200).json({message: "ERROR", cause: error.message })
    }
};

export const addQuestions = async (req: Request, res:Response, next: NextFunction) => {
    try {
        //add questions
        const {question, options, correctAnswer, fig} = req.body;
        const questions = new Question({question, options, correctAnswer, fig}); 
        await questions.save();
        return res.status(200).json({message: "OK", questions })
    } catch (error) {
        console.log(error)
        return res.status(200).json({message: "ERROR", cause: error.message })
    }
};