import mongoose from "mongoose";

const PdfQuestionSchema = new mongoose.Schema({
    // userId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'User',
    //   required: true
    // },
    question: {
      type: String,
      required: true
    },
    options: [{
      type: String,
      required: true
    }],
    correctAnswer: {
      type: String,
      required: true
    },
  }, { timestamps: true });
  
  export default mongoose.model("PdfQuestion", PdfQuestionSchema);
  