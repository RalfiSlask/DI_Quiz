import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuestionsContext } from '../context/Context';
import { shuffleQuestions } from '../helpers/helpers';
import { IQuestion } from '../models/IQuestion';
import Answer from './Answer';
import Question from './Question';

const Questions = () => {
  const context = useContext(QuestionsContext);

  if (!context) {
    throw new Error('Context is not available');
  }

  const { questions, setQuestions } = context;
  const [questionIndex, setQuestionIndex] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (questions.length === 0) {
      navigate('/');
    }
  }, [questions, navigate]);

  const nextQuestion = () => {
    if (currentQuestion.active) {
      setShowFeedback(false);
      setQuestionIndex((prev) =>
        prev < questions.length - 1 ? prev + 1 : prev
      );
    }
  };

  const handleGoBack = () => {
    const resetQuestions = shuffleQuestions(
      questions.map((q) => ({
        ...q,
        selected_answer: '',
        active: false,
        clicked: false,
      }))
    );

    setQuestions(resetQuestions);
    navigate('/');
  };

  const clickOnAnswer = (answer: string) => {
    const updatedQuestions = questions.map(
      (question: IQuestion, index: number) => {
        if (index === questionIndex) {
          return {
            ...question,
            active: true,
            selected_answer: answer,
          };
        }
        return question;
      }
    );

    setQuestions(updatedQuestions);
    setShowFeedback(true);

    if (questionIndex + 1 === questions.length) {
      setTimeout(() => {
        navigate('/resultat');
      }, 2000);
    }
  };

  const currentQuestion = questions[questionIndex];

  if (!currentQuestion) {
    return null;
  }

  const isCorrect =
    currentQuestion.selected_answer === currentQuestion.correct_answer;

  return (
    <main className="flex flex-col items-center gap-8 md:gap-20 p-4 md:p-8 bg-bg-primary min-h-screen relative overflow-x-hidden">
      <div className="flex flex-col items-center gap-4">
        <button
          onClick={handleGoBack}
          className="
            bg-bg-secondary 
            text-white 
            text-lg
            px-4 md:px-6 
            py-2 
            rounded-xl
            hover:bg-bg-tertiary
            hover:text-bg-primary 
            transition-colors
            duration-200
            flex 
            items-center 
            gap-2
            shadow-md
            group
          "
        >
          <span className="transform transition-transform duration-200 group-hover:-translate-x-1">
            ←
          </span>
          <span>Tillbaka hem</span>
        </button>
        <div className="flex flex-col items-center gap-2 mt-10">
          <h1 className="text-2xl md:text-4xl font-bold text-bg-tertiary text-center">
            {context.activeFaqSection?.title}
          </h1>
          <p className="text-lg md:text-xl text-text-gray text-center">
            Fråga {questionIndex + 1} av {questions.length}
          </p>
        </div>
      </div>

      <section className="flex flex-col gap-8 items-center w-full max-w-5xl">
        <Question question={currentQuestion} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full px-4">
          {currentQuestion.answers.map((answer: string, id: number) => (
            <Answer
              key={id}
              answer={answer}
              clicked={currentQuestion.active}
              correct={currentQuestion.correct_answer === answer}
              selected={currentQuestion.selected_answer === answer}
              handleClick={clickOnAnswer}
            />
          ))}
        </div>
      </section>

      <div className="flex flex-col gap-4 items-center min-h-[150px]">
        {showFeedback && (
          <div
            className={`
            text-lg md:text-xl
            font-medium
            animate-fadeIn 
            p-4 
            rounded-xl 
            shadow-md
            ${
              isCorrect
                ? 'bg-bg-tertiary text-bg-primary border border-bg-tertiary'
                : 'bg-bg-secondary text-white border border-bg-secondary'
            }
          `}
          >
            {isCorrect ? (
              <div className="flex items-center gap-2">
                <span>✓</span> Rätt svar!
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2 text-center">
                <div className="flex flex-col gap-2">
                  <span className="text-white/90">Rätt svar är:</span>
                  <span className="text-bg-tertiary font-medium">
                    {currentQuestion.correct_answer}
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

        {currentQuestion.active && questionIndex < questions.length - 1 && (
          <button
            onClick={nextQuestion}
            className="
              bg-bg-secondary 
              text-white 
              text-lg
              px-4 md:px-8 
              py-2 md:py-3 
              rounded-xl
              hover:bg-bg-tertiary
              hover:text-bg-primary
              transition-colors
              duration-200
              shadow-md
              mt-4
              font-medium
            "
          >
            Nästa fråga →
          </button>
        )}
      </div>
    </main>
  );
};

export default Questions;
