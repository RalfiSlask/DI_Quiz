import { IQuestion } from '../models/IQuestion';

export const shuffleQuestions = (questions: IQuestion[]): IQuestion[] => {
  const shuffled = [...questions];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.map((question, index) => ({
    ...question,
    id: index + 1,
  }));
};
