import { useState } from "react";

interface Question {
  text: string;
  index: number;
}

interface Choice {
  value: string;
  text: string;
}

interface QuestionProps {
  question?: Question;
  choices?: Choice[];
  onAnswer: (answer: string) => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
}

// Placeholder data
const placeholderQuestion: Question = {
  text: "What is your favorite color?",
  index: 0,
};

const placeholderChoices: Choice[] = [
  { value: "red", text: "Red" },
  { value: "green", text: "Green" },
  { value: "blue", text: "Blue" },
  { value: "yellow", text: "Yellow" },
];

const About: React.FC<QuestionProps> = ({
  question = placeholderQuestion,
  choices = placeholderChoices,
  onAnswer,
  nextQuestion,
  prevQuestion,
}) => {
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedChoice) {
      onAnswer(selectedChoice);
      nextQuestion();
    }
  };

  const quizNumbers = Array.from({ length: 81 }, (_, i) => i + 1);

  return (
    <div className="flex">
      <div className="w-[9%] ml-8 bg-white shadow-md p-4 fixed h-52 mt-40">
        {/* <div className="text-gray-700 text-lg font-bold mb-4">
          
        </div> */}
        <div className="mb-4">
          <div className="text-sm font-bold text-gray-600 mb-2">
            Question {question.index + 1}
          </div>
          <div className="text-sm font-bold text-red-500 mb-2">
            Not yet answered
          </div>
          <div className="text-black mb-6">Mark out of 1.00</div>
        </div>
        <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold  rounded focus:outline-none focus:shadow-outline ">
          Flag question
        </button>
        {/* Additional code for displaying the navigation numbers can be added here */}
      </div>
      <div className="w-[60%] ml-48">
        <div className="container mx-auto mt-32 p-5">
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="block text-gray-700 text-xl font-bold mb-2">
              {question.text}
            </h2>
            <form onSubmit={handleSubmit} className="mb-4">
              {choices.map((choice) => (
                <div key={choice.value} className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2 cursor-pointer">
                    <input
                      type="radio"
                      value={choice.value}
                      className="mr-2 leading-tight"
                      checked={selectedChoice === choice.value}
                      onChange={(e) => setSelectedChoice(e.target.value)}
                    />
                    {choice.text}
                  </label>
                </div>
              ))}
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                disabled={!selectedChoice}
              >
                Submit Answer
              </button>
            </form>
            <div className="flex justify-between">
              <button
                onClick={prevQuestion}
                disabled={question.index === 0}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l focus:outline-none focus:shadow-outline"
              >
                Previous Question
              </button>
              <button
                onClick={nextQuestion}
                disabled={question.index >= choices.length - 1}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r focus:outline-none focus:shadow-outline"
              >
                Next Question
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className=" w-96 bg-white shadow-md p-4 mt-12 ">
        <div className="text-gray-700 text-lg font-bold mb-4">
          Quiz navigation
        </div>
        <div className="grid grid-cols-8 gap-2">
          {quizNumbers.map((number) => (
            <button
              key={number}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-3 rounded"
            >
              {number}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
