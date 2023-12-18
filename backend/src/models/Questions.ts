import mongoose from "mongoose";


const QuestionSchema = new mongoose.Schema({
        question: {
            type: String,
            require: true
        },
        options: [{
            type: String,
            require: true
        }],
        correctAnswer: {
            type: String,
            require: true
        },
        fig: {
            type: String, 
        },
    })
    
export default mongoose.model("Question", QuestionSchema);
