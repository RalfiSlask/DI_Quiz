import { useContext } from 'react';
import { Link } from 'react-router-dom';
import companyLogo from '../assets/logo.svg';
import { QuestionsContext } from '../context/Context';

const Home = () => {
  const context = useContext(QuestionsContext);

  if (!context) {
    throw new Error('Context not found');
  }

  const { faqSections, handleClickOnFaqSection } = context;

  return (
    <main className="flex flex-col items-center gap-8 md:gap-20 px-4 py-8 md:p-8 bg-bg-primary min-h-screen relative overflow-x-hidden">
      <img
        src={companyLogo}
        alt="Digital Island Logo"
        aria-label="Digital Island Logo"
        className="w-10 h-auto md:w-12 md:absolute md:top-8 md:left-10 mb-4 md:mb-0"
      />
      <div className="flex flex-col items-center gap-2 md:mt-24">
        <h1 className="text-2xl md:text-4xl font-bold text-bg-tertiary text-center">
          Digital Island Quiz
        </h1>
        <p className="text-lg md:text-xl text-text-gray text-center px-4">
          Välj en sektion för att öva
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 w-full max-w-5xl px-4">
        {faqSections.map((section) => (
          <Link
            key={section.id}
            to="/fragor"
            onClick={() => handleClickOnFaqSection(section)}
            className="flex flex-col items-center gap-2 group w-full"
          >
            <button className="question-section">{section.title}</button>
            <span className="text-sm md:text-base text-text-gray font-medium">
              {section.questions.length} frågor
            </span>
          </Link>
        ))}
      </div>
    </main>
  );
};

export default Home;
