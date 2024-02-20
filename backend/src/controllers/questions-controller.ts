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

export const deleteQuestion = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params; // Assuming you're passing the question's _id in the route parameter as /questions/:id
  
      const deletedQuestion = await Question.findByIdAndDelete(id);
  
      if (!deletedQuestion) {
        // No question found with the given ID
        return res.status(404).json({ message: "Question not found" });
      }
  
      // Successfully deleted the question
      return res.status(200).json({ message: "Question deleted successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "ERROR", cause: error.message });
    }
  };