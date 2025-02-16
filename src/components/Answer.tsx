interface IAnswerProps {
  answer: string;
  clicked: boolean;
  correct: boolean;
  selected: boolean;
  handleClick: (answer: string) => void;
}

const Answer = ({
  answer,
  clicked,
  correct,
  selected,
  handleClick,
}: IAnswerProps) => {
  const getButtonStyle = () => {
    if (!clicked) {
      return 'bg-bg-secondary text-white hover:bg-bg-tertiary hover:text-bg-primary';
    }
    if (selected && correct) {
      return 'bg-green-600 text-white';
    }
    if (selected && !correct) {
      return 'bg-red-600 text-white';
    }
    if (clicked && correct) {
      return 'bg-green-600 text-white opacity-80';
    }
    return 'bg-bg-secondary text-white opacity-50';
  };

  return (
    <button
      onClick={() => !clicked && handleClick(answer)}
      disabled={clicked}
      className={`
        ${getButtonStyle()}
        min-w-[250px] 
        sm:min-w-[300px] 
        p-4 
        rounded-xl
        transition-colors
        min-h-[80px]
        duration-200
        text-center 
        shadow-md
        font-medium
        ${clicked ? 'cursor-not-allowed' : 'cursor-pointer'}
      `}
    >
      {answer}
    </button>
  );
};

export default Answer;
