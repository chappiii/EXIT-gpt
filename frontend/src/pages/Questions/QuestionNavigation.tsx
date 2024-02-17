import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface QuestionNavigationProps {
  totalQuestions: number;
  currentQuestion: number;
  correctAnswersCount: number; // Passed as a prop, not managed as state
  onSelectQuestion: (questionNumber: number) => void;
  onFinishAttempt: () => void;
  onRetryIncorrect?: () => void;
}

const QuestionNavigation: React.FC<QuestionNavigationProps> = ({
  totalQuestions,
  currentQuestion,
  correctAnswersCount, // Use this directly from props
  onSelectQuestion,
  onFinishAttempt,
  onRetryIncorrect,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleFinishAttempt = () => setIsModalOpen(true);

  const handleConfirmFinish = () => {
    setIsModalOpen(false);
    onFinishAttempt();
    navigate('/');
  };

  const handleRetryIncorrect = () => {
    setIsModalOpen(false);
    if (onRetryIncorrect) {
      onRetryIncorrect();
    }
    navigate('/questions?filter=incorrect');
  };

  return (
    <div>
      <div className="flex flex-col items-center p-4 border border-gray-200 rounded-lg bg-gray-100 shadow dark:bg-gray-100 dark:border-gray-700">
        <h2 className="text-lg text-gray-700 font-semibold mb-4">Quiz Navigation</h2>
        <div className="grid grid-cols-5 gap-2 mb-4">
          {[...Array(totalQuestions)].map((_, index) => (
            <button
              key={index}
              className={`w-10 h-10 ${index + 1 === currentQuestion ? 'bg-blue-400' : 'bg-white'} text-black rounded hover:bg-blue-500`}
              onClick={() => onSelectQuestion(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
        <button
          className="w-1/2 bg-gray-800 text-white py-2 rounded hover:bg-gray-900"
          onClick={handleFinishAttempt}
        >
          Finish Attempt
        </button>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center">
          <div className="bg-white p-12 text-gray-700 rounded-lg shadow-lg">
            <h3 className="flex justify-center text-lg items-center font-bold">Mock Exam Results</h3>
            <div className="flex justify-center font-semibold text-lg mt-2">
              Correct Answers: {correctAnswersCount} out of {totalQuestions}
            </div>
            <div className="flex justify-center gap-12 mt-6">
              <button
                className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded"
                onClick={handleRetryIncorrect}
              >
                Retry Incorrect
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
                onClick={handleConfirmFinish}
              >
                Confirm Finish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionNavigation;
