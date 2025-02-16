import { IQuestion } from '../models/IQuestion';

/**
 * Shuffles an array, used for the answers
 * @param {T[]} array - The array to shuffle
 * @returns {T[]} The shuffled array
 */
export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * Shuffles the questions and answers
 * @param {IQuestion[]} questions - The questions to shuffle
 * @returns {IQuestion[]} The shuffled questions
 */
export const shuffleQuestions = (questions: IQuestion[]): IQuestion[] => {
  const shuffled = shuffleArray(questions);
  return shuffled.map((question, index) => ({
    ...question,
    id: index + 1,
    answers: shuffleArray(question.answers),
  }));
};
