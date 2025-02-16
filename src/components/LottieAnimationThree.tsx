import { useLottie } from 'lottie-react';
import animationData from '../lotties/dance3.json';

const LottieAnimationThree = () => {
  const options = {
    animationData: animationData,
    loop: true,
  };

  const { View } = useLottie(options);

  return <div className="w-[160px]">{View}</div>;
};

export default LottieAnimationThree;
