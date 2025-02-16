import React, { createContext, ReactNode, useState } from 'react';
import faqData from '../data/faq.json';
import { IQuestion } from '../models/IQuestion';

interface IContextValues {
  faqSections: IFaqSection[];
  activeFaqSection: IFaqSection | null;
  handleClickOnFaqSection: (section: IFaqSection) => void;
  questions: IQuestion[];
  setQuestions: React.Dispatch<React.SetStateAction<IQuestion[]>>;
}

interface IFaqSection {
  title: string;
  id: number;
  questions: IQuestion[];
}

export const QuestionsContext = createContext<IContextValues | undefined>(
  undefined
);

export const QuestionsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const initialFaqSections = faqData.faqSections.map(section => ({
    ...section,
    questions: section.questions.map(question => ({
      ...question,
      clicked: false
    }))
  }));

  const [faqSections] = useState<IFaqSection[]>(initialFaqSections);
  const [activeFaqSection, setActiveFaqSection] = useState<IFaqSection | null>(null);
  const [questions, setQuestions] = useState<IQuestion[]>([]);

  const handleClickOnFaqSection = (section: IFaqSection) => {
    setActiveFaqSection(section);
    setQuestions(section.questions);
  };

  const questionsValue = {
    faqSections,
    activeFaqSection,
    handleClickOnFaqSection,
    questions,
    setQuestions,
  };

  return (
    <QuestionsContext.Provider value={questionsValue}>
      {children}
    </QuestionsContext.Provider>
  );
};
