import { useLottie } from 'lottie-react';
import animationData from '../lotties/dance2.json';

const LottieAnimationTwo = () => {
  const options = {
    animationData: animationData,
    loop: true,
  };

  const { View } = useLottie(options);

  return <div className="w-[150px]">{View}</div>;
};

export default LottieAnimationTwo;
