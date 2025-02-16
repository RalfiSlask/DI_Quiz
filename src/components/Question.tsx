import { IQuestion } from '../models/IQuestion';

interface IQuestionProps {
  question: IQuestion;
}

const Question = ({ question }: IQuestionProps) => {
  return (
    <div className="text-xl text-center min-h-[60px] max-w-[325px] sm:max-w-[700px] font-medium text-bg-tertiary">
      {question.question}
    </div>
  );
};

export default Question;
