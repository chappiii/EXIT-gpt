// types.tsx

export interface AnswerChoice {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  text: string;
  options: AnswerChoice[];
  flagged: boolean;
  correctAnswer: string;
}
