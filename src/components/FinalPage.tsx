import { useContext, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { QuestionsContext } from '../context/Context';
import { shuffleQuestions } from '../helpers/helpers';
import LottieAnimationOne from './LottieAnimationOne';
import LottieAnimationThree from './LottieAnimationThree';
import LottieAnimationTwo from './LottieAnimationTwo';

const FinalPage = () => {
  const navigate = useNavigate();
  const context = useContext(QuestionsContext);

  useEffect(() => {
    if (!context || !context.questions.length || !context.activeFaqSection) {
      navigate('/');
    }
  }, [context, navigate]);

  if (!context) {
    return <Navigate to="/" replace />;
  }

  const { questions, setQuestions, activeFaqSection } = context;

  const correctCount = questions.reduce(
    (count, q) => count + (q.correct_answer === q.selected_answer ? 1 : 0),
    0
  );

  const percentage = Math.round((correctCount / questions.length) * 100);

  const handleGoBack = () => {
    const resetQuestions = shuffleQuestions(
      questions.map((q) => ({
        ...q,
        selected_answer: '',
        clicked: false,
      }))
    );

    setQuestions(resetQuestions);
    navigate('/');
  };

  return (
    <main className="flex flex-col items-center gap-8 md:gap-20 px-4 pt-10 pb-20 md:px-8 md:pb-16 bg-bg-primary min-h-screen relative overflow-x-hidden">
      <div className="flex flex-col items-center gap-4 mt-8 md:mt-16">
        <h1 className="text-2xl md:text-4xl font-bold text-bg-tertiary text-center">
          {activeFaqSection?.title}
        </h1>
        <p className="text-lg md:text-xl text-text-gray text-center">
          Ditt resultat
        </p>
      </div>

      <div className="flex gap-4 flex-wrap justify-center max-w-2xl">
        <LottieAnimationOne />
        <LottieAnimationTwo />
        <LottieAnimationThree />
      </div>

      <section className="flex flex-col gap-8 md:gap-12 items-center bg-bg-secondary p-6 md:p-8 rounded-xl shadow-lg max-w-2xl w-full mx-4">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-bg-primary flex items-center justify-center border-4 border-bg-tertiary">
            <span className="text-3xl md:text-5xl font-bold text-bg-tertiary">
              {percentage}%
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="text-xl md:text-2xl text-white font-medium">
              Du fick {correctCount} rätt av {questions.length} möjliga
            </h2>
            <p className="text-lg text-text-gray">
              {percentage >= 80
                ? 'Utmärkt jobbat!'
                : percentage >= 60
                ? 'Bra jobbat!'
                : 'Fortsätt öva!'}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4 w-full max-w-xs">
          <button
            onClick={() => {
              const resetQuestions = shuffleQuestions(
                questions.map((q) => ({
                  ...q,
                  selected_answer: '',
                  clicked: false,
                }))
              );
              setQuestions(resetQuestions);
              navigate('/fragor');
            }}
            className="
              bg-bg-tertiary 
              text-bg-primary 
              text-lg
              px-6 
              py-3
              rounded-xl
              hover:bg-bg-tertiary/85
              transition-colors 
              duration-200
              shadow-md
              font-medium
              w-full
              flex
              items-center
              justify-center
              gap-2
              group
            "
          >
            <span>Försök igen</span>
            <span className="transform transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
          </button>

          <button
            onClick={handleGoBack}
            className="
              bg-bg-primary 
              text-white
              text-lg
              px-6 
              py-3
              rounded-xl
              hover:bg-bg-tertiary
              hover:text-bg-primary
              transition-colors 
              duration-200
              shadow-md
              font-medium
              w-full
              flex
              items-center
              justify-center
              gap-2
              group
              border
              border-white/20
            "
          >
            <span className="transform transition-transform duration-200 group-hover:-translate-x-1">
              ←
            </span>
            <span>Tillbaka till start</span>
          </button>
        </div>
      </section>
    </main>
  );
};

export default FinalPage;
