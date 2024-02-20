import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Navigation from "./Navigation";
import ProgressBar from "./ProgressBar";
import QuestionDisplay from "./QuestionDisplay";
import FlaggedQuestionDisplay from "./FlaggedQuestionDisplay";
import Timer from "./Timer";
import { getAllQuestions } from "../../helpers/api-communicator";
import { useAuth } from "../../context/AuthContext";
import QuestionNavigation from "./QuestionNavigation";
import LoadingPage from "./LoadingPage";
import Header from "../../components/Header";

interface AnswerChoice {
  id: string;
  text: string;
}

interface Question {
  id: string;
  text: string;
  options: AnswerChoice[];
  flagged: boolean;
  correctAnswer: string;
}

const Questions: React.FC = () => {
  const auth = useAuth();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<number>(1);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(4);
  const [isLoading, setIsLoading] = useState(true);
  const [hasPermission, setHasPermission] = useState(false); // New state variable

  useEffect(() => {
    if (auth?.isLoggedIn && auth?.user) {
      toast.loading("Loading Questions", { id: "loadquestions" });
      getAllQuestions()
        .then((data: { questions: Question[] }) => {
          setQuestions(data.questions);
          setIsLoading(false);
          toast.success("Questions loaded Successfully", {
            id: "loadquestions",
          });
        })
        .catch((err) => {
          console.error(err);
          setIsLoading(false);
          toast.error("Loading Failed", { id: "loadquestions" });
        });
    }
  }, [auth?.isLoggedIn, auth?.user]);

  // Function to grant permission
  const grantPermission = () => {
    setHasPermission(true);
  };

  const handleAnswerSubmit = (questionId: string, chosenAnswerId?: string) => {
    const question = questions.find((q) => q.id === questionId);
    if (question && chosenAnswerId === question.correctAnswer) {
      setCorrectAnswersCount((prevCount) => prevCount + 1);
    }
    console.log(
      `Answer submitted for question ${questionId}: ${chosenAnswerId}`
    );
  };

  const handlePrevQuestion = () => {
    setCurrentQuestion((prev) => Math.max(prev - 1, 1));
  };

  const handleNextQuestion = () => {
    setCurrentQuestion((prev) => Math.min(prev + 1, questions.length));
  };

  const handleEndExam = () => {
    console.log("Exam ended. Answers:");
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  if (!hasPermission) {
    return (
      <>
        <Header />
        <div className="flex flex-col items-center   h-screen justify-start px-6 py-20">
          {/* Your permission button can go here */}
          <button
            className=" items-center justify-center bg-gray-500 hover:bg-blue-600 text-white font-bold py-4 px-4 rounded"
            onClick={grantPermission}
          >
            Attempt model exam
          </button>
        </div>
      </>
    );
  }
  return (
    <>
      <Header />
      <div className="flex flex-col items-center h-screen justify-start px-6 py-2">
        <div className="flex items-center justify-center space-x-4 my-4">
          <Timer totalTime={1200} onTimeExpired={handleEndExam} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-4  w-full">
          <div className="max-w-sm p-2 ">
            {questions[currentQuestion - 1]?.flagged ? (
              <FlaggedQuestionDisplay
                question={questions[currentQuestion - 1]}
                onAnswerSelected={handleAnswerSubmit}
              />
            ) : (
              <div className="lg:col-span-2 py-6 mt-12 items-center justify-center ">
                <ProgressBar
                  progress={currentQuestion}
                  totalSteps={questions.length}
                  questionNumber={currentQuestion}
                  flagged={false}
                  marked={false}
                  answered={false}
                />
              </div>
            )}
          </div>
          {questions.length > 0 && (
            <div className="lg:col-span-6 p-2">
              <QuestionDisplay
                question={questions[currentQuestion - 1]}
                onAnswerSelected={handleAnswerSubmit}
              />
            </div>
          )}
          <div className="lg:col-span-3 max-w-sm p-2 ">
            <QuestionNavigation
              totalQuestions={questions.length}
              currentQuestion={currentQuestion}
              correctAnswersCount={correctAnswersCount}
              onSelectQuestion={(questionNumber) =>
                setCurrentQuestion(questionNumber)
              }
              onFinishAttempt={handleEndExam}
            />
          </div>
        </div>
        <Navigation
          onPrevClick={handlePrevQuestion}
          onNextClick={handleNextQuestion}
          currentQuestion={currentQuestion}
          totalQuestions={questions.length}
        />
      </div>
    </>
  );
};

export default Questions;
