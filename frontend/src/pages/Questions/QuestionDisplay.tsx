import React, { useState } from 'react';

// Updated Question interface
interface Question {
  _id: string;
  question: string;
  options: string[];
  correctAnswer: string;
}

interface QuestionProps {
  question: Question;
  onAnswerSelected: (questionId: string, optionId: string) => void;
}

const QuestionDisplay: React.FC<QuestionProps> = ({ question, onAnswerSelected }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const optionValue = event.target.value;
    setSelectedOption(optionValue);
    // Assuming optionId needs to be captured, you might adjust how you identify options
    // For simplicity, we're using the option value (text) as the identifier here
    onAnswerSelected(question._id, optionValue);
  };

  return (
    <div className="flex flex-col p-6 bg-white shadow-md rounded-lg">
      <div className="mb-4">
        <h3 className="text-lg text-gray-600 font-semibold">{question.question}</h3>
      </div>
      <form className="space-y-2">
        {question.options.map((option, index) => (
          <label key={index} className="flex items-center">
            <input
              type="radio"
              name={`question_${question._id}`}
              value={option}
              checked={selectedOption === option}
              onChange={handleOptionChange}
              className="text-blue-600 focus-visible:ring-0 focus-visible:border-blue-700 border-gray-600"
            />
            <span className="ml-2 text-sm text-gray-600">{option}</span>
          </label>
        ))}
      </form>
    </div>
  );
};

export default QuestionDisplay;
