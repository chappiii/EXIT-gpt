import { NextFunction, Request, Response } from "express";
import { body, ValidationChain, validationResult } from "express-validator";

export const validate = (validations: ValidationChain[]) => {
    return async (req:Request, res: Response, next:NextFunction) =>{
        for (let validation of validations){
            const result = await validation.run(req);
            if (!result.isEmpty()){
                break;
            }
        }
        const errors = validationResult(req);
        if(errors.isEmpty()){
            return next();
        }
        return res.status(422).json({errors: errors.array()})
    };
};

export const loginValidator =[
    body("email").trim().isEmail().notEmpty().withMessage("email is required"),
    body("password").trim().isLength({min: 6}).notEmpty().withMessage("password should contain at least 6 characters"),
]

export const signupValidator =[
    body("name").notEmpty().withMessage("name is required"),
    ...loginValidator,
]

export const chatCompletionValidator =[
    body("message").notEmpty().withMessage("message is required"),
]

export const pdfQuestionRequestValidator = [
    body("message").trim().notEmpty().withMessage("Text for generating questions is required."),
];
