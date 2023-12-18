import { useLayoutEffect, useState } from "react";
import { getAllQuestions } from "../helpers/api-communicator";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

// Define an interface for the question
interface Question {
  _id: string;
  question: string;
  options: string[];
  correctAnswer: string;
}

function Questions() {
  const auth = useAuth();
  const [questions, setQuestions] = useState<Question[]>([]);

  useLayoutEffect(() => {
    if (auth?.isLoggedIn && auth.user) {
      toast.loading("Loading Questions", { id: "loadquestions" });
      getAllQuestions()
        .then((data: { questions: Question[] }) => {
          setQuestions(data.questions);
          toast.success("Questions loaded Successfully", {
            id: "loadquestions",
          });
        })
        .catch((err) => {
          console.log(err);
          toast.error("Loading Failed", { id: "loadquestions" });
        });
    }
  }, [auth]);

  return (
    <>
      <div className="text-white">
        {questions.map((question) => (
          <div key={question._id}>
            <h3>{question.question}</h3>
            <ul>
              {question.options.map((option, index) => (
                <li key={index}>{option}</li>
              ))}
            </ul>
            <p>Correct Answer: {question.correctAnswer}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default Questions;
