import { useLottie } from 'lottie-react';
import animationData from '../lotties/dance1.json';
const LottieAnimationOne = () => {
  const options = {
    animationData: animationData,
    loop: true,
  };

  const { View } = useLottie(options);

  return <div className="w-[175px]">{View}</div>;
};

export default LottieAnimationOne;
