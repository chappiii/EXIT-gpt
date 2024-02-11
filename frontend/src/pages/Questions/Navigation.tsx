import React from 'react';

interface NavigationProps {
  onPrevClick: () => void;
  onNextClick: () => void;
  currentQuestion: number;
  totalQuestions: number;
}

const Navigation: React.FC<NavigationProps> = ({
  onPrevClick,
  onNextClick,
  currentQuestion,
  totalQuestions,
}) => {
  const isLastQuestion = currentQuestion === totalQuestions;
  const isFirstQuestion = currentQuestion === 1;

  return (
    <div className="flex items-center justify-center py-4">
      {/* Previous Button */}
      <button
        onClick={onPrevClick}
        disabled={isFirstQuestion}
        className="flex items-center justify-center px-3 h-8 me-3 text-sm font-medium text-gray-500 bg-green-400 border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
      >
        <svg className="w-3.5 h-3.5 me-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5H1m0 0 4 4M1 5l4-4"/>
        </svg>
        Previous
      </button>

      {/* Question Status */}
      <span className="px-6">
       
      </span>
      <span className="px-6">
       
       </span>
       <span className="px-6">
       
       </span>
       <span className="px-6">
       
       </span>
   
      {/* Next Button */}
      <button
        onClick={onNextClick}
        disabled={isLastQuestion}
        className="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-green-400 border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
      >
        Next
        <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
        </svg>
      </button>
    </div>
  );
};

export default Navigation;
