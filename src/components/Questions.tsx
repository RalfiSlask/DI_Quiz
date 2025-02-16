import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import companyLogo from '../assets/logo.svg';
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

  /**
   * Navigates to the start page if there are no questions
   */
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
    setQuestionIndex(0);
    setShowFeedback(false);
    navigate('/');
  };

  /**
   * Handles the click on an answer
   * @param {string} answer - The answer to click on
   */
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

    // we set a timeout to navigate to the final page after 2 seconds
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
    <main className="flex flex-col items-center gap-8 md:gap-20 px-4 py-4 pb-12 md:p-8 bg-bg-primary min-h-screen relative overflow-x-hidden">
      <div className="flex justify-between w-full md:justify-center">
        <img
          src={companyLogo}
          alt="Digital Island Logo"
          aria-label="Digital Island Logo"
          className="w-10 h-auto md:w-12 md:absolute md:top-8 md:left-10 mb-0"
        />
        <button onClick={handleGoBack} className="primary-button group">
          <span className="transform transition-transform duration-200 group-hover:-translate-x-1">
            ←
          </span>
          <span>Tillbaka hem</span>
        </button>
      </div>
      <div className="flex flex-col items-center gap-4">
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
            feedback-container animate-fadeIn
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
          <button onClick={nextQuestion} className="primary-button group mt-4">
            <span>Nästa fråga</span>
            <span className="transform transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
          </button>
        )}
      </div>
    </main>
  );
};

export default Questions;
