import React, { useState } from 'react';

// Updated Question interface
interface Question {
  _id: string;
  question: string;
  options: string[];  // Options are strings, adjust if they should be objects or contain IDs
  correctAnswer: string;
}

interface QuestionProps {
  question: Question;
  onAnswerSelected: (questionId: string, selectedOption: string) => void;
}

const QuestionDisplay: React.FC<QuestionProps> = ({ question, onAnswerSelected }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const optionValue = event.target.value;
    setSelectedOption(optionValue);
    onAnswerSelected(question._id, optionValue); // Notify parent component of the selected option
  };

  return (
    <div className="flex flex-col p-6 bg-green-100 shadow-md rounded-lg">
      <div className="mb-4">
        <h3 className="text-lg text-gray-600 font-semibold">{question.question}</h3>
      </div>
      <form className="space-y-4">
        {question.options.map((option, index) => (
          <label key={index} className="flex items-center">
            <input
              type="radio"
              name={`question_${question._id}`} // Ensures all radio buttons in this question group are linked
              value={option}
              checked={selectedOption === option}
              onChange={handleOptionChange}
              className="mr-2"
            />
            <span className="text-sm text-gray-600">{option}</span>
          </label>
        ))}
      </form>
    </div>
  );
};

export default QuestionDisplay;
