import React, { useState, useEffect, useRef } from "react";

interface Question {
  _id: string;
  question: string;
  options: string[];
  correctAnswer: string;
}

interface QuestionProps {
  question: Question;
  onAnswerSelected: (questionId: string, selectedOption: string) => void;
}

const QuestionDisplay: React.FC<QuestionProps> = ({
  question,
  onAnswerSelected,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState<boolean>(false);
  const correctAnswerButtonRef = useRef<HTMLButtonElement>(null);

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const optionValue = event.target.value;
    setSelectedOption(optionValue);
    onAnswerSelected(question._id, optionValue);
  };

  const toggleCorrectAnswer = () => {
    setShowCorrectAnswer(!showCorrectAnswer);
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      correctAnswerButtonRef.current &&
      !correctAnswerButtonRef.current.contains(event.target as Node)
    ) {
      setShowCorrectAnswer(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const correctAnswerStyle = showCorrectAnswer ? "block" : "hidden";

  return (
    <div className="flex flex-col p-6 bg-green-100 shadow-md rounded-lg">
      <div className="mb-4">
        <h3 className="text-lg text-gray-600 font-semibold">
          {question.question}
        </h3>
      </div>
      <form className="space-y-4">
        {question.options.map((option, index) => (
          <label key={index} className="flex items-center">
            <input
              type="radio"
              name={`question_${question._id}`}
              value={option}
              checked={selectedOption === option}
              onChange={handleOptionChange}
              className="mr-2"
            />
            <span className="text-sm text-gray-600">{option}</span>
          </label>
        ))}
      </form>
      <div className="flex items-start justify-start">
        <button
          ref={correctAnswerButtonRef}
          onClick={toggleCorrectAnswer}
          className="mt-4 py-2 px-4 bg-gray-500 text-white font-bold rounded hover:bg-gray-900"
        >
          {showCorrectAnswer ? "Hide Correct Answer" : "Show Correct Answer"}
        </button>
      </div>
      <div className={`mt-4 ${correctAnswerStyle}`}>
        <span className="text-md text-gray-700 font-semibold">
          Correct Answer:{" "}
        </span>
        <span className="text-md text-green-600">{question.correctAnswer}</span>
      </div>
    </div>
  );
};

export default QuestionDisplay;
