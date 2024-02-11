import React from 'react';

interface QuestionNavigationProps {
  totalQuestions: number;
  currentQuestion: number;
  onSelectQuestion: (questionNumber: number) => void;
  onFinishAttempt: () => void;
}

const QuestionNavigation: React.FC<QuestionNavigationProps> = ({
  totalQuestions,
  currentQuestion,
  onSelectQuestion,
  onFinishAttempt,
}) => {
  return (
    <div className="flex flex-col items-center p-4">
      <h2 className="text-lg text-gray-700 font-semibold mb-4">Quiz navigation</h2>
      <div className="grid grid-cols-5 gap-2 mb-4">
        {[...Array(totalQuestions)].map((_, index) => (
          <button
            key={index}
            className={`w-10 h-10 ${index + 1 === currentQuestion ? 'bg-blue-600' : 'bg-gray-200'} text-black rounded hover:bg-blue-500`}
            onClick={() => onSelectQuestion(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <button
        className="w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-900"
        onClick={onFinishAttempt}
      >
        Finish attempt ...
      </button>
    </div>
  );
};

export default QuestionNavigation;
