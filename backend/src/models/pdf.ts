import mongoose from "mongoose";
import { randomUUID } from "crypto";


const chatSchema = new mongoose.Schema({
  id: {
      type: String,
      default: randomUUID()
  },
  role: {
      type: String,
      required:true,
  },
  content: {
      type: String,
      required:true,
  }
});

const Pdf = new mongoose.Schema({

  role: {
    type: String,
    required:true,
  },
  content: {
    type: String,
    required:true,
  },
  chats: [chatSchema],
})
  
  export default mongoose.model("Pdf", Pdf);
  