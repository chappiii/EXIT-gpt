import { Request, Response, NextFunction } from "express";
import { OpenAIApi } from "openai";
import User from "../models/User.js";
import PdfQuestion from "../models/PdfQuestion.js";
import { configureOpenAI } from "../config/openai-config.js";

export const generateQuestionsFromPdf = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { text } = req.body;

  try {
    console.log("good job")
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).json({ message: "User not registered OR Token malfunctioned" });
    }

    const config = configureOpenAI();
    const openai = new OpenAIApi(config);

    const prompt = `Generate 3 multiple-choice questions based on the text below. Format each question with a number followed by 'Question:', list options labeled a, b, c, and d under 'Options:', and state the 'Correct Answer:' with the option letter. Separate each question with three dashes ('---').\n\n${text}`;

    const response = await openai.createCompletion({
      model: "gpt-3.5-turbo", 
      prompt: prompt,
    
    });

    const questionsText = response.data.choices[0].text;
    // Assuming the questions are separated by three dashes '---'
    const rawQuestions = questionsText.split('---').map(q => q.trim()).filter(q => q);

    const pdfQuestions = rawQuestions.map(questionText => {
      // Here you would parse each questionText to extract the question, options, and correct answer
      // This is an example and might need adjustment based on the actual format of the questionsText
      const parts = questionText.split('\n').filter(part => part);
      const question = parts[0].substring(parts[0].indexOf(':') + 1).trim();
      const options = parts.slice(1, -1); // Assuming last part is the correct answer
      const correctAnswer = parts[parts.length - 1].split(':')[1].trim();

      return new PdfQuestion({
        userId: user._id,
        question: question,
        options: options,
        correctAnswer: correctAnswer,
      });
    });

    // Save all questions to the database
    for (const pdfQuestion of pdfQuestions) {
      await pdfQuestion.save();
    }

    return res.status(200).json({ message: "OK", questions: pdfQuestions });
  } catch (error) {
    console.error("Failed to generate or save questions from text:", error);
    return res.status(500).json({ message: "ERROR", cause: error.message });
  }
};


