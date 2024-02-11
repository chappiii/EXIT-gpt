import React from 'react';
import { Question, AnswerChoice } from "./Types"

interface FlaggedQuestionDisplayProps {
  question: Question;
  onAnswerSelected: (questionId: string, chosenAnswerId?: string) => void;
}

const FlaggedQuestionDisplay: React.FC<FlaggedQuestionDisplayProps> = ({ question, onAnswerSelected }) => {
  const handleAnswerSelection = (chosenAnswerId: string) => {
    onAnswerSelected(question.id, chosenAnswerId);
  };

  return (
    <div>
      <h1>Flagged Question</h1>
      <h3>{question.text}</h3>
      <ul>
        {question.options.map((option: AnswerChoice) => (
          <li key={option.id}>
            <input
              type="radio"
              id={option.id}
              name={`question-${question.id}`}
              value={option.id}
              onChange={() => handleAnswerSelection(option.id)}
            />
            <label htmlFor={option.id}>{option.text}</label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FlaggedQuestionDisplay;