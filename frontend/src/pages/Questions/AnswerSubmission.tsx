// import React from 'react';

// interface AnswerChoice {
//   id: string;
//   text: string;
// }

// interface Question {
//   id: string;
//   text: string;
//   options: AnswerChoice[];
//   correctAnswer: string; // Ensure this matches your data structure
// }

// interface AnswerSubmissionProps {
//   question: Question;
//   answerChoices: AnswerChoice[];
//   onAnswerSubmit: (questionId: string, chosenAnswerId: string) => void; // Adjusted for consistency
//   isReviewMode: boolean;
//   selectedAnswer?: string;
//   setSelectedAnswer: React.Dispatch<React.SetStateAction<string | undefined>>;
// }

// const AnswerSubmission: React.FC<AnswerSubmissionProps> = ({
//   question,
//   answerChoices,
//   onAnswerSubmit,
//   isReviewMode,
//   selectedAnswer,
//   setSelectedAnswer,
// }) => {
//   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();

//     if (!selectedAnswer) {
//       console.error('Please select an answer');
//       return;
//     }

//     // Call the onAnswerSubmit function with the question ID and the chosen answer ID
//     onAnswerSubmit(question.id, selectedAnswer);
//   };

//   const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSelectedAnswer(event.target.value);
//   };

//   return (<></>
//     // <form onSubmit={handleSubmit} className="mt-4">
//     //   {answerChoices.map((choice) => (
//     //     <div key={choice.id} className="mb-2">
//     //       <input
//     //         type="radio"
//     //         id={`answer-${choice.id}`}
//     //         name="answer"
//     //         value={choice.id}
//     //         checked={selectedAnswer === choice.id}
//     //         onChange={handleAnswerChange}
//     //         disabled={isReviewMode}
//     //         className="mr-2 focus:ring-2 focus:ring-blue-500 cursor-pointer"
//     //       />
//     //       <label htmlFor={`answer-${choice.id}`} className="cursor-pointer">{choice.text}</label>
//     //     </div>
//     //   ))}

//     //   {!isReviewMode && (
//     //     <button
//     //       type="submit"
//     //       className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded disabled:opacity-50"
//     //       disabled={!selectedAnswer}
//     //     >
//     //       Submit Answer
//     //     </button>
//     //   )}
//     // </form>
//   );
// };

// export default AnswerSubmission;
