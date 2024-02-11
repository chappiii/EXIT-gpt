import React, { useEffect } from 'react';

interface ProgressBarProps {
  progress: number;
  totalSteps: number;
  questionNumber: number;
  flagged: boolean;
  marked: boolean;
  answered: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  totalSteps,
  questionNumber,
  flagged,
  marked,
  answered,
}) => {
  useEffect(() => {
    // Rest of the useEffect code...
  }, [progress, totalSteps]);

  return (
    <div className="bg-gray-200 rounded-md p-4">
      <div className="w-full bg-gray-600 rounded-full overflow-hidden h-2">
        <div
          className={`blue-500 h-full rounded-full`}
          style={{ width: `${(Math.min(progress, totalSteps) / totalSteps) * 100}%` }}
        />
      </div>
      <div className="flex flex-col mt-2 text-sm text-gray-600">
        <span>{`Question ${questionNumber}`}</span>
        {flagged && <span>Flag</span>}
        {marked && <span>Marked</span>}
        {answered && <span>Answered</span>}
        <span>{`Marked out of 1.00`}</span>
        {!answered && <span>Not Yet Answered</span>}
      </div>
    </div>
  );
};

export default ProgressBar;